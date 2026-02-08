import { HeaderNavigation, FooterSection } from "@/components/layout";
import { Typography } from "@/components/ui/typography";
import { Card, CardContent } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ShippingPage" });

  return generatePageMetadata({
    title: t("title"),
    description: t("title"),
    path: "/shipping",
    locale,
    type: "article",
  });
}

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <HeaderNavigation />

      <main className="flex-1 pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <Typography
            variant="display-small"
            className="text-primary mb-8 font-bold"
          >
            Chính Sách Giao Hàng
          </Typography>

          <Card className="shadow-lg border-none bg-surface-container-low">
            <CardContent className="p-8">
              {/* Highlight Box */}
              <div className="bg-secondary-container/30 border border-secondary-container rounded-xl p-6 mb-8">
                <Typography
                  variant="title-medium"
                  className="text-primary text-center font-bold"
                >
                  🚚 Miễn phí vận chuyển cho đơn hàng từ 500.000đ
                </Typography>
              </div>

              <Typography
                variant="headline-small"
                className="text-primary mt-8 mb-4 font-bold"
              >
                Phí vận chuyển
              </Typography>

              <div className="overflow-x-auto mb-8 rounded-lg border border-outline-variant">
                <table className="w-full text-left">
                  <thead className="bg-surface-variant/50">
                    <tr>
                      <th className="py-3 px-4">
                        <Typography
                          variant="title-small"
                          className="text-on-surface font-bold"
                        >
                          Khu vực
                        </Typography>
                      </th>
                      <th className="py-3 px-4">
                        <Typography
                          variant="title-small"
                          className="text-on-surface font-bold"
                        >
                          Phí ship
                        </Typography>
                      </th>
                      <th className="py-3 px-4">
                        <Typography
                          variant="title-small"
                          className="text-on-surface font-bold"
                        >
                          Thời gian
                        </Typography>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30">
                    {[
                      {
                        area: "Hà Nội (nội thành)",
                        price: "20.000đ",
                        time: "1-2 ngày",
                      },
                      {
                        area: "Hà Nội (ngoại thành)",
                        price: "25.000đ",
                        time: "2-3 ngày",
                      },
                      {
                        area: "TP. Hồ Chí Minh",
                        price: "30.000đ",
                        time: "3-4 ngày",
                      },
                      {
                        area: "Các tỉnh miền Bắc",
                        price: "30.000đ",
                        time: "2-4 ngày",
                      },
                      { area: "Miền Trung", price: "35.000đ", time: "3-5 ngày" },
                      { area: "Miền Nam", price: "35.000đ", time: "4-5 ngày" },
                    ].map((row, idx) => (
                      <tr key={idx}>
                        <td className="py-3 px-4">
                          <Typography
                            variant="body-medium"
                            className="text-on-surface-variant"
                          >
                            {row.area}
                          </Typography>
                        </td>
                        <td className="py-3 px-4">
                          <Typography
                            variant="body-medium"
                            className="text-on-surface-variant"
                          >
                            {row.price}
                          </Typography>
                        </td>
                        <td className="py-3 px-4">
                          <Typography
                            variant="body-medium"
                            className="text-on-surface-variant"
                          >
                            {row.time}
                          </Typography>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Typography
                variant="headline-small"
                className="text-primary mt-8 mb-4 font-bold"
              >
                Đơn vị vận chuyển
              </Typography>
              <Typography
                variant="body-large"
                className="text-on-surface-variant mb-4"
              >
                Chúng tôi hợp tác với các đơn vị vận chuyển uy tín:
              </Typography>
              <ul className="list-disc list-inside text-on-surface-variant mb-4 space-y-2 ml-4">
                <li>Giao Hàng Nhanh (GHN)</li>
                <li>Giao Hàng Tiết Kiệm (GHTK)</li>
                <li>Viettel Post</li>
                <li>J&T Express</li>
              </ul>

              <Typography
                variant="headline-small"
                className="text-primary mt-8 mb-4 font-bold"
              >
                Theo dõi đơn hàng
              </Typography>
              <Typography
                variant="body-large"
                className="text-on-surface-variant mb-4"
              >
                Sau khi đơn hàng được gửi đi, bạn sẽ nhận được SMS hoặc email
                thông báo kèm mã vận đơn để theo dõi.
              </Typography>

              <Typography
                variant="headline-small"
                className="text-primary mt-8 mb-4 font-bold"
              >
                Lưu ý khi nhận hàng
              </Typography>
              <ul className="list-disc list-inside text-on-surface-variant mb-4 space-y-2 ml-4">
                <li>Vui lòng kiểm tra hàng trước khi nhận</li>
                <li>Quay video khi mở hộp để làm bằng chứng nếu có vấn đề</li>
                <li>Từ chối nhận nếu hàng bị hư hỏng bên ngoài</li>
                <li>Liên hệ hotline ngay nếu có sự cố</li>
              </ul>

              <div className="bg-secondary-container/30 rounded-xl p-6 mt-8 border border-secondary-container/50">
                <Typography
                  variant="title-medium"
                  className="text-on-surface font-bold mb-2"
                >
                  Cần hỗ trợ?
                </Typography>
                <Typography
                  variant="body-medium"
                  className="text-on-surface-variant"
                >
                  Email: contact@anima119.com
                </Typography>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
