# Báo Cáo Kiểm Tra Nợ Kỹ Thuật (Technical Debt Audit)

**Ngày báo cáo:** 12/02/2026
**Người thực hiện:** Code Reviewer (Antigravity)
**Phạm vi:** Toàn bộ codebase `src/`

## 1. Tóm tắt

Codebase hiện tại có chất lượng nền tảng tốt:
- ✅ **Type Safety:** `tsc` build thành công, không có lỗi TypeScript nghiêm trọng.
- ✅ **Clean Code:** Không tìm thấy `TODO`, `FIXME`, hay `HACK` comment nào.
- ✅ **Kiến trúc:** Không có phụ thuộc vòng (circular dependencies).
- ⚠️ **Vấn đề:** Có cảnh báo Linting cần xử lý và một danh sách lớn các file tiềm năng không được sử dụng.

## 2. Chi tiết nợ kỹ thuật

### 2.1. Comments & Annotations
- **TODO/FIXME/HACK:** 0 (Tuyệt vời)

### 2.2. Mã nguồn chết (Dead Code) tiềm năng
Công cụ phân tích tĩnh phát hiện **67 file** có thể không được import trực tiếp. Cần kiểm tra thủ công vì Next.js có thể import động hoặc file chỉ dùng trong cấu hình:

**Các file đáng chú ý cần kiểm tra:**
- `src/components/SafariPolyfill.tsx`
- `src/components/auth/auth-button.tsx`
- `src/components/home/*` (Các section của trang chủ nếu không được import vào page chính)
- `src/lib/payos.ts` (Nếu chưa tích hợp thanh toán)
- `src/lib/supabase/*` (Nếu chưa dùng database)

*(Danh sách đầy đủ có trong log phân tích)*

### 2.3. Vấn đề Linting & Best Practices

#### High Priority (Cần sửa ngay)
1.  **React Hooks Dependencies (`src/lib/auth-context.tsx`):**
    -   Các hàm `refreshProfile`, `updateProfile`, `signInWithOtp`, `signInWithGoogle`, `signOut` gây thay đổi dependency của `useMemo` mỗi lần render.
    -   **Fix:** Bọc các hàm này trong `useCallback`.

2.  **React Compiler Issue (`src/components/SafariPolyfill.tsx`):**
    -   Lỗi: `Compilation Skipped: this is not supported syntax`.
    -   **Fix:** Viết lại polyfill hoặc cấu hình lại cách inject `this`.

#### Medium Priority
1.  **Script Imports (`scripts/` & root):**
    -   `compare_i18n.js` dùng `require()` thay vì `import` chuẩn ES Module.
    -   **Fix:** Chuyển sang `import/export` hoặc cấu hình eslint ignore cho file script nodejs.

#### Low Priority
1.  **Unused Variables:**
    -   Biến `_` không dùng trong các file test (`src/__tests__/api/payment-webhook-route.test.ts`, `src/lib/validation.test.ts`).
    -   **Fix:** Xóa hoặc đổi tên thành `_unused`.

2.  **Unused Metadata (`src/app/[locale]/page.tsx`):**
    -   `Metadata` và `Viewport` được define nhưng không dùng.
    -   **Fix:** Xóa export nếu không cần thiết hoặc implement đúng cách.

3.  **Custom Font Loading (`src/app/[locale]/layout.tsx`):**
    -   Cảnh báo về việc load font tùy chỉnh không qua `pages/_document.js` (hoặc `layout.tsx` root chuẩn của Next 13+).

## 3. Khuyến nghị hành động

1.  **Refactor Auth Context:** Áp dụng `useCallback` cho các hàm trong `src/lib/auth-context.tsx` để tối ưu hiệu năng và fix lint warning.
2.  **Clean up Scripts:** Chuyển đổi các script tiện ích sang TypeScript hoặc ES Modules chuẩn.
3.  **Prune Dead Code:** Review danh sách 67 file, xóa các component cũ từ template `84tea` nếu không dùng cho `anima119`.
4.  **Polyfill Fix:** Xử lý vấn đề cú pháp trong `SafariPolyfill.tsx`.

## 4. Kết luận
Dự án ở trạng thái tốt để tiếp tục phát triển (Phase 2/3). Nợ kỹ thuật chủ yếu nằm ở việc dọn dẹp code thừa từ quá trình clone dự án và tinh chỉnh React Hooks.
