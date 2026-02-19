## Báo cáo cơ hội AGI cho Anima 119

**Ngày:** 2026-02-14

**Mục tiêu:** Xác định các khối logic/component "tĩnh" có thể nâng cấp thành "thông minh/thích ứng" trong `apps/anima119/src`.

---

### 1. Hero Section (Trang chủ)

*   **Tên file:** `/Users/macbookprom1/mekong-cli/apps/anima119/src/components/home/hero-section.tsx`
*   **Trạng thái hiện tại:** Nội dung hero (text, hình ảnh, CTA) được mã hóa cứng (`hardcoded`) và không thay đổi.
*   **Cơ hội AGI:** Tự động điều chỉnh nội dung hero dựa trên ngữ cảnh người dùng:
    *   **Cá nhân hóa:** Hiển thị nội dung hero (tiêu đề, mô tả, hình ảnh, nút CTA) phù hợp với nhân khẩu học, thời gian trong ngày, dữ liệu thời tiết, nguồn giới thiệu (`referrer`) hoặc hành vi duyệt web trước đây của người dùng. Ví dụ: một người dùng quay lại và đã xem một danh mục sản phẩm cụ thể có thể thấy hero liên quan đến danh mục đó. Người dùng mới có thể thấy hero giới thiệu chung.
    *   **Chiến dịch động:** Tự động thay đổi hero để phù hợp với các chiến dịch khuyến mãi hiện tại hoặc sự kiện đặc biệt.

---

### 2. Danh sách Sản phẩm và Sản phẩm Nổi bật

*   **Tên file:**
    *   `/Users/macbookprom1/mekong-cli/apps/anima119/src/components/products/product-listing.tsx`
    *   `/Users/macbookprom1/mekong-cli/apps/anima119/src/components/home/featured-products.tsx`
*   **Trạng thái hiện tại:** Sản phẩm được lọc và sắp xếp dựa trên các danh mục, giá, tên và cờ "nổi bật" tĩnh. Các sản phẩm nổi bật được mã hóa cứng.
*   **Cơ hội AGI:** Triển khai các đề xuất và sắp xếp sản phẩm động:
    *   **Sắp xếp cá nhân hóa:** Tự động sắp xếp lại sản phẩm dựa trên lịch sử duyệt web, mẫu mua hàng hoặc các mặt hàng thường được mua cùng nhau của từng người dùng.
    *   **Nổi bật theo ngữ cảnh:** Tự động làm nổi bật các sản phẩm dựa trên xu hướng hiện tại, mức tồn kho, tính thời vụ hoặc dữ liệu bán hàng thời gian thực.
    *   **Tối ưu hóa hiển thị:** Tự động thử nghiệm A/B các chiến lược hiển thị sản phẩm khác nhau để tối ưu hóa tỷ lệ chuyển đổi.

---

### 3. Quy trình Thanh toán (Checkout)

*   **Tên file:** `/Users/macbookprom1/mekong-cli/apps/anima119/src/app/[locale]/checkout/checkout-content.tsx`
*   **Trạng thái hiện tại:** Một biểu mẫu thanh toán tiêu chuẩn với các trường cố định. Phí vận chuyển được tính dựa trên ngưỡng cố định.
*   **Cơ hội AGI:** Điều chỉnh luồng thanh toán để tối ưu hóa chuyển đổi và trải nghiệm người dùng:
    *   **Đơn giản hóa biểu mẫu động:** Dựa trên cấp độ thành viên thân thiết của người dùng (từ `loyalty-tier-utilities.ts`), lịch sử mua hàng trước đây hoặc vị trí được phát hiện, tự động điền trước các trường hoặc đơn giản hóa số lượng trường bắt buộc. Ví dụ, khách hàng thân thiết có thể có ít bước hơn.
    *   **Ưu đãi vận chuyển cá nhân hóa:** Điều chỉnh động ngưỡng phí vận chuyển hoặc cung cấp giao hàng miễn phí dựa trên cấp độ thành viên thân thiết của người dùng hoặc giá trị đơn hàng dự kiến để khuyến khích hoàn tất thanh toán.
    *   **Phát hiện gian lận:** Tích hợp tính năng chấm điểm gian lận thời gian thực để điều chỉnh các tùy chọn thanh toán hoặc thêm các bước xác minh bổ sung cho các giao dịch rủi ro cao.

---

### 4. Nút liên hệ nổi (Floating Contact)

*   **Tên file:** `/Users/macbookprom1/mekong-cli/apps/anima119/src/components/ui/floating-contact.tsx`
*   **Trạng thái hiện tại:** Các nút liên hệ WhatsApp và Zalo tĩnh, luôn hiển thị.
*   **Cơ hội AGI:** Hiển thị hoặc điều chỉnh các tùy chọn liên hệ một cách linh hoạt dựa trên hành vi hoặc ngữ cảnh người dùng:
    *   **Hiển thị theo ngữ cảnh:** Chỉ hiển thị các tùy chọn liên hệ khi người dùng có vẻ gặp khó khăn (ví dụ: dành quá nhiều thời gian trên trang thanh toán, liên tục xem Câu hỏi thường gặp mà không có chuyển đổi).
    *   **Kênh cá nhân hóa:** Nếu người dùng đã từng sử dụng WhatsApp trước đây, ưu tiên nút WhatsApp. Nếu họ là khách hàng có giá trị cao, có thể cung cấp một đường dây điện thoại trực tiếp.

---

### 5. Tiện ích cấp độ thành viên thân thiết (Loyalty Tier Utilities)

*   **Tên file:** `/Users/macbookprom1/mekong-cli/apps/anima119/src/lib/loyalty-tier-utilities.ts`
*   **Trạng thái hiện tại:** Cấp độ thành viên thân thiết và ngưỡng điểm cố định.
*   **Cơ hội AGI:** Tự động điều chỉnh phần thưởng và cấp độ thành viên thân thiết:
    *   **Ngưỡng cấp độ thích ứng:** Điều chỉnh ngưỡng điểm cho các cấp độ dựa trên mức độ tương tác tổng thể của khách hàng, điều kiện kinh tế hoặc để thúc đẩy các hành vi cụ thể.
    *   **Phần thưởng cá nhân hóa:** Tự động cung cấp các phần thưởng hoặc lợi ích cụ thể cho người dùng trong một cấp độ dựa trên sở thích hoặc nhu cầu cá nhân của họ, thay vì một bộ lợi ích chung.

