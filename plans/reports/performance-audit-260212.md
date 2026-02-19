# Báo cáo Phân tích Hiệu suất ANIMA 119

## Tóm tắt

Tôi đã tiến hành kiểm tra mã nguồn của `apps/anima119` để tìm các điểm nghẽn hiệu suất tiềm ẩn. Dưới đây là các phát hiện chính:

1.  **Vấn đề N+1 Query nghiêm trọng** trong xử lý đơn hàng.
2.  **Độ trễ Middleware** do xác thực phiên làm việc trên mọi request.
3.  **Tối ưu hóa hình ảnh và Lazy Loading** đã được thực hiện tốt.

---

## Chi tiết Phát hiện

### 1. API Routes & Database (Quan trọng)

**Vị trí:** `src/lib/payment-utils.ts` - hàm `validateCartItems`

**Vấn đề:**
Hàm này đang thực hiện query database tuần tự trong vòng lặp (`for...of`), gây ra lỗi N+1 query. Nếu khách hàng mua 10 sản phẩm khác nhau, hệ thống sẽ thực hiện 10 lần gọi network riêng biệt đến Supabase chờ đợi nhau.

```typescript
// src/lib/payment-utils.ts
for (const item of cartItems) {
  // 🔴 VẤN ĐỀ: Query trong vòng lặp -> Chậm
  const { data: product, error } = await supabase
    .from('products')
    .select(...)
    .single();
}
```

**Tác động:** Làm chậm đáng kể quá trình checkout, đặc biệt khi mạng chậm hoặc đơn hàng nhiều món. Có thể gây timeout API.

**Giải pháp đề xuất:** Sử dụng `in` query để lấy tất cả sản phẩm trong một lần gọi DB duy nhất.

### 2. Middleware Impact (Trung bình)

**Vị trí:** `src/lib/supabase/middleware.ts`

**Vấn đề:**
Middleware gọi `await supabase.auth.getUser()` trên **mọi request** (được định nghĩa trong `matcher`). Điều này có nghĩa là mỗi lần tải trang, tải hình ảnh, hoặc gọi API (nếu khớp matcher) đều phải chờ xác thực với Supabase Auth server xong mới được tiếp tục.

```typescript
// src/lib/supabase/middleware.ts
await supabase.auth.getUser() // 🔴 Network call trên mỗi request
```

**Tác động:** Tăng Time to First Byte (TTFB) cho toàn bộ ứng dụng.

**Giải pháp đề xuất:** Chỉ chạy logic auth này trên các route cần bảo vệ (như `/club`, `/checkout`, `/admin`) thay vì toàn bộ site public, hoặc chấp nhận trade-off nếu cần session user ở khắp nơi (ví dụ cho header).

### 3. Client-side Data Fetching (Tốt)

**Vị trí:** `src/app/[locale]/page.tsx`, `src/components/products/product-listing.tsx`

**Hiện trạng:**
*   Trang chủ sử dụng `next/dynamic` để lazy load các component nặng (`HeroParallax`, `BenefitsSection`), giúp cải thiện chỉ số LCP (Largest Contentful Paint).
*   Trang danh sách sản phẩm nhận dữ liệu `initialProducts` từ Server Component, tránh được waterfall (chờ JS tải xong mới fetch dữ liệu).
*   Logic lọc sản phẩm (`useMemo`) chạy ở client. Với số lượng sản phẩm hiện tại (ít), điều này là RẤT NHANH và tốt cho trải nghiệm người dùng (instant feedback).

### 4. Rate Limiting

**Vị trí:** `src/app/api/orders/route.ts`

**Hiện trạng:**
Sử dụng `strictLimiter` (10 requests / 15 phút). Cấu hình này an toàn để chống spam đơn hàng ảo.

---

## Kiến nghị Hành động

1.  **Ưu tiên 1 (Fix ngay):** Refactor `validateCartItems` trong `src/lib/payment-utils.ts` để dùng single query `where id in (...)`.
2.  **Ưu tiên 2:** Đánh giá lại `matcher` trong `middleware.ts` hoặc logic `getUser`. Cân nhắc loại bỏ check auth cho các trang static public thuần túy (như `/about`, `/landing`) nếu không cần thiết hiển thị thông tin user đăng nhập.
