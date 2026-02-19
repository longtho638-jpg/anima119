# Phase 3: Architectural Polish & Next.js 16 Alignment

## Context Links
- [Main Plan](./plan.md)
- [Next.js Middleware to Proxy Migration Guide](https://nextjs.org/docs/messages/middleware-to-proxy)

## Overview
- **Priority**: Medium
- **Status**: Pending
- **Description**: Giải quyết các cảnh báo kiến trúc từ Next.js 16 và dọn dẹp môi trường phát triển (lockfiles) để đảm bảo tính nhất quán.

## Key Insights
- Next.js 16 thông báo `middleware.ts` bị deprecated và khuyến khích dùng `proxy.ts`.
- Việc tồn tại cả `package-lock.json` và `pnpm-lock.yaml` gây nhầm lẫn về package manager được sử dụng.

## Requirements
- Loại bỏ `package-lock.json`.
- Di chuyển logic từ `middleware.ts` sang `proxy.ts` (nếu phù hợp với yêu cầu project).
- Đảm bảo Turbopack root được xác định chính xác để xóa cảnh báo build.

## Implementation Steps
1. [ ] Xóa file `package-lock.json` để thống nhất dùng `pnpm`.
2. [ ] Rà soát file `src/middleware.ts`.
3. [ ] Chuyển đổi sang `src/proxy.ts` theo chuẩn Next.js 16.
4. [ ] Cấu hình `turbopack.root` trong `next.config.mjs` nếu cần thiết để xóa cảnh báo build.
5. [ ] Kiểm tra lại build sau khi thay đổi cấu trúc.

## Todo List
- [ ] Delete `package-lock.json`.
- [ ] Rename/Refactor `middleware.ts` -> `proxy.ts`.
- [ ] Update `next.config.mjs`.
- [ ] Verify build clean (no warnings).

## Success Criteria
- Build log không còn cảnh báo về lockfiles hoặc middleware deprecation.
- Chức năng chuyển hướng/i18n (thường nằm trong middleware) vẫn hoạt động tốt.
