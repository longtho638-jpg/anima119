# Giai đoạn 1: Nền tảng & Đo lường (Foundation & Telemetry)

## Overview
-   **Priority:** High
-   **Status:** In Progress
-   **Description:** Thiết lập cơ sở hạ tầng cơ bản để hỗ trợ các khả năng AGI, bao gồm lưu trữ vector (pgvector) cho kiến thức TCM và hệ thống telemetry để thu thập dữ liệu hành vi người dùng phục vụ cho việc cá nhân hóa "Bio-Energy".

## Requirements

### Functional
-   Hệ thống cơ sở dữ liệu hỗ trợ lưu trữ và truy vấn vector (embedding).
-   Lưu trữ hồ sơ "Bio-Energy" của người dùng (Âm/Dương, Ngũ hành).
-   Thu thập các sự kiện tương tác người dùng (view_product, add_to_cart, search, rage_click) để phân tích.

### Non-Functional
-   Hiệu suất truy vấn vector phải nhanh (<100ms).
-   Telemetry không được làm chậm trải nghiệm người dùng (sử dụng `sendBeacon` hoặc `fetch` không đồng bộ).
-   Bảo mật dữ liệu người dùng.

## Architecture

### Database (Supabase)
-   Enable extension `vector`.
-   Table `agi_memory`: Lưu trữ các embedding kiến thức TCM.
-   Table `user_bio_energy_profiles`: Lưu trữ điểm số năng lượng của người dùng.
-   Table `agi_events`: Log các sự kiện quan trọng.

### Logic (Hybrid Brain)
-   `src/lib/hub/agi-core.ts`: Module trung tâm xử lý logic AGI.
    -   `trackAgiEvent()`: Ghi nhận sự kiện.
    -   `calculateBioEnergy()`: (Placeholder cho Phase 2) Tính toán năng lượng.

## Implementation Steps

1.  **Database Update:**
    -   Cập nhật `docs/database-schema.sql` để thêm extension `vector` và các bảng mới.
2.  **AGI Core Library:**
    -   Tạo `src/lib/hub/agi-core.ts` định nghĩa các Type và hàm cơ bản.
3.  **Roadmap Update:**
    -   Cập nhật `docs/project-roadmap.md` để phản ánh lộ trình AGI.

## Success Criteria
-   File `docs/database-schema.sql` chứa định nghĩa bảng `vector` và các bảng AGI.
-   File `src/lib/hub/agi-core.ts` biên dịch thành công và có các hàm skeleton.
-   Roadmap dự án hiển thị rõ ràng các giai đoạn AGI.
