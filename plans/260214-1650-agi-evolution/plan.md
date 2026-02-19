# Kế hoạch tổng thể: Tiến hóa AGI cho Anima119 (Phiên bản v1.0)

## Overview
Kế hoạch này phác thảo lộ trình để tích hợp các khả năng AGI (Trí tuệ nhân tạo tổng quát) vào nền tảng thương mại điện tử Anima119, tập trung vào việc tạo ra trải nghiệm người dùng thích ứng và tự phục hồi, được điều khiển bởi "Bio-Energy" cá nhân hóa dựa trên y học cổ truyền Phương Đông (TCM).

## Các giai đoạn triển khai

1.  **Giai đoạn 1: Nền tảng & Đo lường (Foundation & Telemetry)**
    *   Mục tiêu: Thiết lập cơ sở hạ tầng để thu thập dữ liệu, lưu trữ kiến thức TCM và phân tích hành vi người dùng.
    *   Chi tiết: `phase-01-foundation-telemetry.md`
2.  **Giai đoạn 2: Cá nhân hóa Bio-Energy**
    *   Mục tiêu: Triển khai logic cốt lõi để phân tích "Bio-Energy" của người dùng và điều chỉnh đề xuất sản phẩm, giao diện.
    *   Chi tiết: `phase-02-bio-energy-personalization.md`
3.  **Giai đoạn 3: Vườn ươm tự động (Autonomous Gardener)**
    *   Mục tiêu: Phát triển các agent tự động tạo và tối ưu hóa nội dung (SEO, mô tả sản phẩm).
    *   Chi tiết: `phase-03-autonomous-gardener.md`
4.  **Giai đoạn 4: Bác sĩ UX (UX Doctor)**
    *   Mục tiêu: Triển khai các agent giám sát trải nghiệm người dùng và tự động can thiệp để cải thiện.
    *   Chi tiết: `phase-04-ux-doctor.md`
5.  **Giai đoạn 5: Tối ưu hóa & Tự phục hồi**
    *   Mục tiêu: Liên tục tối ưu hóa các agent và hệ thống, cho phép học hỏi và thích nghi tự động.
    *   Chi tiết: `phase-05-optimization-self-healing.md`

## Key Insights từ các Agent:

### Kiến trúc sư (Architect): Kiến trúc Hybrid Brain
-   **Đề xuất:** Kết hợp Next.js API Routes (cho logic điều phối) và Supabase Edge Functions (cho các phản ứng theo thời gian thực, có độ trễ thấp).
-   **Database:** Supabase với tiện ích mở rộng `pgvector` cho cơ sở tri thức TCM dạng nhúng ngữ nghĩa.

### Nhà nghiên cứu (Researcher): Khả năng AGI
-   **Cá nhân hóa Bio-Energy:** Dựa trên các nguyên lý TCM (Âm/Dương, Ngũ hành, Khí Huyết) để tạo hồ sơ động cho người dùng.
-   **Autonomous Gardener:** Tự động tối ưu hóa nội dung web (SEO, A/B testing tiêu đề/mô tả).
-   **UX Doctor:** Phát hiện các mẫu hành vi tiêu cực (rage clicks, dead clicks) và tự động khắc phục (đơn giản hóa UI, gợi ý chatbot).

### Nhà quy hoạch (Planner): Lộ trình AGI
-   **5 giai đoạn:** Từ Nền tảng → Phân tích mẫu → Thích ứng nội dung → Tối ưu hóa logic → Tự chủ hoàn toàn.
-   **Trọng tâm ban đầu:** Xây dựng Telemetry và hệ thống thu thập sự kiện để cung cấp dữ liệu cho AGI.

### Nhà phát triển Fullstack (Fullstack Developer): Cơ hội triển khai
-   **Dynamic Hero Section:** `src/components/home/hero-section.tsx` sẽ thích ứng theo Bio-Energy.
-   **Bio-Energy Product Sorting:** `src/components/products/product-listing.tsx` sẽ sắp xếp sản phẩm dựa trên hồ sơ người dùng.
-   **Smart Checkout Flow:** `src/app/[locale]/checkout/checkout-content.tsx` sẽ tối ưu hóa quy trình thanh toán bằng AGI.

## Related Code Files (Giai đoạn 1)

### Files để tạo:
-   `src/lib/hub/agi-core.ts`: Logic cốt lõi cho Bio-Energy và giám sát AGI.

### Files để sửa đổi:
-   `docs/database-schema.sql`: Cập nhật schema để hỗ trợ `pgvector` và bảng `user_bio_energy_profile`.
-   `docs/project-roadmap.md`: Cập nhật lộ trình dự án với các giai đoạn AGI.
-   `src/lib/supabase/client.ts`: Khởi tạo Supabase client với `pgvector`. (nếu cần)
-   `src/lib/supabase/admin.ts`: Tương tác với cơ sở dữ liệu từ backend. (nếu cần)

## Todo List

- [ ] Tạo `plans/260214-1650-agi-evolution/plan.md`
- [ ] Tạo `plans/260214-1650-agi-evolution/phase-01-foundation-telemetry.md`
- [ ] Thêm file `src/lib/hub/agi-core.ts`
- [ ] Cập nhật `docs/database-schema.sql`
- [ ] Cập nhật `docs/project-roadmap.md`

## Next Steps
Sau khi phê duyệt kế hoạch này, tôi sẽ bắt đầu triển khai Giai đoạn 1.
