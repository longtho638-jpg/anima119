# Phase 2: TypeScript & i18n Sync (Rule 8)

## Context Links
- [Main Plan](./plan.md)
- [Binh Pháp Rule 8: i18n Sync Protocol](../../../../.claude/rules/binh-phap-core.md)

## Overview
- **Priority**: High
- **Status**: Pending
- **Description**: Đảm bảo tất cả các key dịch thuật (i18n) được đồng bộ giữa code và file locales, tránh lỗi hiển thị raw key trên production. Rà soát lại Type Safety cho các schema và API routes.

## Key Insights
- Rebranding từ 84tea sang anima119 có thể để sót các key cũ hoặc sai đường dẫn key.
- Rule 8 yêu cầu phải grep toàn bộ code tìm `t('key')` và so sánh với file locales.

## Requirements
- 100% i18n keys tồn tại trong tất cả các file locales (`vi.json`/`en.json` hoặc `.ts`).
- Không có hardcoded strings trong JSX (trừ các trường hợp đặc biệt).
- Type safety cho các response từ API và Supabase.

## Implementation Steps
1. [ ] Grep toàn bộ code tìm các lời gọi `t('...')` hoặc `t("...")`.
2. [ ] So sánh danh sách key tìm được với `messages/vi.json` và `messages/en.json`.
3. [ ] Sửa các key bị thiếu hoặc sai chính tả.
4. [ ] Kiểm tra các file schema (Zod) trong `src/lib/validations` (nếu có) để đảm bảo type safety cho form và API.
5. [ ] Rà soát các file trong `src/app/api` để đảm bảo response types được định nghĩa rõ ràng.

## Todo List
- [ ] Chạy script/lệnh grep để trích xuất keys.
- [ ] Verify keys với file locales.
- [ ] Fix missing/wrong keys.
- [ ] Review API types.

## Success Criteria
- Script verification i18n trả về 0 lỗi.
- Không còn raw key hiển thị khi chạy dev server.
