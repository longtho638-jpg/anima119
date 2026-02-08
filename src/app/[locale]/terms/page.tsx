import { getTranslations } from "next-intl/server";
import { HeaderNavigation, FooterSection } from "@/components/layout";
import { Typography } from "@/components/ui/typography";
import { Card, CardContent } from "@/components/ui/card";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const title = locale === "vi" ? "Điều Khoản Sử Dụng" : "Terms of Service";
  const description =
    locale === "vi"
      ? "Dieu khoan va dieu kien su dung website anima119.com"
      : "Terms and conditions for using anima119.com";

  return generatePageMetadata({
    title,
    description,
    path: "/terms",
    locale,
    type: "article",
  });
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <HeaderNavigation />

      <main className="flex-1 pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <Typography
            variant="display-small"
            className="text-primary mb-8 font-bold"
          >
            Điều Khoản Sử Dụng
          </Typography>

          <Card className="shadow-lg border-none bg-surface-container-low">
            <CardContent className="p-8">
              <Typography
                variant="body-medium"
                className="text-on-surface-variant mb-6 italic"
              >
                Cập nhật lần cuối: Tháng 02, 2026
              </Typography>

              <div className="space-y-8">
                <section>
                  <Typography
                    variant="headline-small"
                    className="text-primary mb-4 font-bold"
                  >
                    1. Giới thiệu
                  </Typography>
                  <Typography
                    variant="body-large"
                    className="text-on-surface-variant mb-4"
                  >
                    Chao mung ban den voi ANIMA 119. Khi truy cap va su dung website
                    anima119.com, ban dong y tuan thu cac dieu khoan va dieu kien
                    duoc neu trong tai lieu nay.
                  </Typography>
                </section>

                <section>
                  <Typography
                    variant="headline-small"
                    className="text-primary mb-4 font-bold"
                  >
                    2. Thông tin công ty
                  </Typography>
                  <Typography
                    variant="body-large"
                    className="text-on-surface-variant mb-4"
                  >
                    <strong>ZenX Holdings Joint Stock Company</strong>
                    <br />
                    Dia chi: 15/11 Duy Tan, Phuong Cau Giay, Quan Cau Giay, Ha Noi
                  </Typography>
                </section>

                <section>
                  <Typography
                    variant="headline-small"
                    className="text-primary mb-4 font-bold"
                  >
                    3. Sản phẩm và dịch vụ
                  </Typography>
                  <Typography
                    variant="body-large"
                    className="text-on-surface-variant mb-4"
                  >
                    ANIMA 119 cung cap thuc pham bo sung tu Dong Y len men Han Quoc.
                    Tat ca san pham duoc san xuat theo tieu chuan FSSC 22000
                    va co nguon goc ro rang tu Han Quoc.
                  </Typography>
                </section>

                <section>
                  <Typography
                    variant="headline-small"
                    className="text-primary mb-4 font-bold"
                  >
                    4. Đặt hàng và thanh toán
                  </Typography>
                  <ul className="list-disc list-inside text-on-surface-variant mb-4 space-y-2 ml-4">
                    <li>Đơn hàng được xác nhận sau khi thanh toán thành công</li>
                    <li>Chúng tôi chấp nhận thanh toán qua VietQR (PayOS)</li>
                    <li>Giá sản phẩm đã bao gồm VAT</li>
                    <li>
                      Phí vận chuyển được tính riêng theo địa chỉ giao hàng
                    </li>
                  </ul>
                </section>

                <section>
                  <Typography
                    variant="headline-small"
                    className="text-primary mb-4 font-bold"
                  >
                    5. Giao hàng
                  </Typography>
                  <Typography
                    variant="body-large"
                    className="text-on-surface-variant mb-4"
                  >
                    Đơn hàng sẽ được giao trong 2-5 ngày làm việc tùy khu vực.
                    Miễn phí vận chuyển cho đơn hàng từ 500.000đ.
                  </Typography>
                </section>

                <section>
                  <Typography
                    variant="headline-small"
                    className="text-primary mb-4 font-bold"
                  >
                    6. Đổi trả và hoàn tiền
                  </Typography>
                  <Typography
                    variant="body-large"
                    className="text-on-surface-variant mb-4"
                  >
                    Khách hàng có thể đổi/trả sản phẩm trong vòng 7 ngày kể từ
                    ngày nhận hàng với điều kiện sản phẩm còn nguyên seal, chưa
                    sử dụng. Xem chi tiết tại trang Chính sách đổi trả.
                  </Typography>
                </section>

                <section>
                  <Typography
                    variant="headline-small"
                    className="text-primary mb-4 font-bold"
                  >
                    7. Quyền sở hữu trí tuệ
                  </Typography>
                  <Typography
                    variant="body-large"
                    className="text-on-surface-variant mb-4"
                  >
                    Tat ca noi dung tren website anima119.com bao gom logo, hinh
                    anh, van ban la tai san cua ZenX Holdings JSC va duoc bao ve boi
                    luat so huu tri tue.
                  </Typography>
                </section>

                <section>
                  <Typography
                    variant="headline-small"
                    className="text-primary mb-4 font-bold"
                  >
                    8. Liên hệ
                  </Typography>
                  <Typography
                    variant="body-large"
                    className="text-on-surface-variant mb-4"
                  >
                    Moi thac mac vui long lien he:
                    <br />
                    Email: contact@anima119.com
                  </Typography>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
