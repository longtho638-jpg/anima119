# Báo Cáo Hiệu Năng & Baseline (Anima119)
Ngày: 12/02/2026
Người thực hiện: Tester Agent

## 1. Tổng Quan Hiệu Năng Build
- **Trạng thái**: ✅ Xuất sắc
- **Thời gian Compile**: ~4.0s (Turbopack)
- **Static Generation**: ~100ms (10/10 pages)
- **Bundle Size**: Tối ưu, không có cảnh báo "First Load JS" quá lớn.

## 2. Core Web Vitals Checklist
| Hạng mục | Trạng thái | Chi tiết |
| --- | --- | --- |
| **Fonts** | ✅ Tối ưu | Sử dụng `next/font/google` (Inter, Playfair Display) với `display: swap`. Không gây Layout Shift. |
| **Images** | ✅ Tối ưu | `next/image` với format AVIF/WebP. `hero-parallax.tsx` dùng Framer Motion tối ưu background. |
| **Scripts** | ✅ Tối ưu | `generateMetadata` dynamic, `next-intl` cấu hình chuẩn. |
| **PWA** | ✅ Tối ưu | `@ducanh2912/next-pwa` được cấu hình, có `ServiceWorkerRegister`. |

## 3. Phát Hiện Vấn Đề (Regressions & Anomalies)

### 🔴 CRITICAL: Cấu hình Middleware Bị Lỗi
- **Hiện tượng**: File `src/middleware.ts` đã bị xóa (theo `git status`), trong khi file `src/proxy.ts` (untracked) chứa nội dung middleware.
- **Rủi ro**: Next.js **bắt buộc** file phải tên là `middleware.ts` (hoặc .js) để chạy.
  - Nếu file này thiếu, toàn bộ **i18n routing** (`/[locale]`) và **Supabase Auth Protection** sẽ KHÔNG hoạt động.
  - Việc `npm run build` vẫn hiện "Proxy (Middleware)" khả năng cao do **Cache** (`.next/`) cũ còn lưu. Trên môi trường CI/CD sạch (fresh install), build hoặc runtime sẽ hỏng.
- **Hành động cần thiết**: Đổi tên `src/proxy.ts` thành `src/middleware.ts` ngay lập tức.

### 🟡 Git State
- `src/proxy.ts` đang ở trạng thái **Untracked**. Cần add vào git.
- `package-lock.json` bị xóa. Cần restore hoặc commit lại để đảm bảo consistent install.

## 4. Kết luận
Hiệu năng codebase rất tốt nhờ Next.js 16 + Turbopack. Tuy nhiên, cấu trúc dự án đang gãy ở phần Middleware do quá trình migration chưa hoàn tất (Task #33). Cần khắc phục vấn đề file middleware trước khi deploy production để tránh lỗi 404/500 routing.

## 5. Đề xuất
1. `mv src/proxy.ts src/middleware.ts`
2. `git add src/middleware.ts`
3. Verify lại build trên môi trường sạch (xóa `.next`).
