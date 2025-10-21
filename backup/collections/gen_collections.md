# AI Agent Task: Tạo / Tùy biến Collections cho Payload (DTech)

## Mục tiêu

Tạo hoàn chỉnh các collection cho Payload CMS phù hợp với website DTech, dựa trên cấu trúc starter trước đó. Agent sẽ:

- Tạo/ghi đè file collection trong `src/collections/` cho: `Products`, `Categories`, `Brands`, `Media`, `Users`.
- Cập nhật `src/payload.config.ts` nếu cần.
- Đảm bảo các hook, type import, và dependency (ví dụ slugify) được khai báo hợp lệ.
- Xuất file SQL/JSON seed mẫu (tùy chọn) để test.

## Input (Agent nhận)

- Base repo path (ví dụ `/workspace/payload-dtech-starter`) — nơi chứa `package.json`, `src/`.
- Biến môi trường sample (nếu cần) — không bắt buộc.
- Yêu cầu: fields giống như spec DTech (tên, slug, sku, brand, category, origin, warranty, series, images, shortDescription, description, contentBlocks, specifications, attachments, meta, published).

## Output (kết quả mong muốn)

- Các file đã tạo / cập nhật:
  - `src/collections/Products.ts`
  - `src/collections/Categories.ts`
  - `src/collections/Brands.ts`
  - `src/collections/Media.ts`
  - `src/collections/Users.ts`
  - (nếu cần) `src/payload.config.ts` cập nhật
- Một file seed mẫu: `data/sample-products.json` (khoảng 2 sản phẩm), chứa minimal fields (name, slug, sku, brand, category, images url, shortDescription, contentBlocks/specs)

## Các ràng buộc / Quy ước

- Sử dụng TypeScript, cấu trúc `CollectionConfig` của Payload.
- Nếu auto-gen slug, dùng `slugify` trong hook `beforeChange`.
- `contentBlocks` phải dùng `blocks` kiểu: `text`, `image`, `specTable` (theo scaffold).
- `Media` collection phải khai upload `staticDir` là `../media` hoặc `../../media` phù hợp repo.
- Không hardcode secrets / DB URL trong files.

## Các bước chi tiết (step-by-step)

1. **Kiểm tra repo**: Nếu `src/collections` đã tồn tại, đọc nội dung hiện tại và backup (copy) sang `backup/collections/`.
2. **Tạo/ghi đè file `Products.ts`** theo mẫu DTech:
   - include `hooks.beforeChange` tạo slug nếu không có.
   - fields: name, slug, sku, brand (relationship -> brands), category (relationship -> categories), origin, warranty, series, images (upload->media, hasMany), shortDescription, description (richText), contentBlocks (blocks: text, image, specTable), specifications (array key/value), attachments (array of upload+title), meta (group), published (checkbox).
3. **Tạo `Brands.ts`**: name, logo (upload->media), description.
4. **Tạo `Categories.ts`**: name, slug, description, order.
5. **Tạo `Media.ts`**: upload config + alt field (image sizes thumbnail/large).
6. **Tạo `Users.ts`**: auth true, fields name/email.
7. **Cập nhật `payload.config.ts`**:
   - Import các collections và đăng ký vào `collections` array.
   - Sử dụng Postgres adapter nếu repository dùng `@payloadcms/db-postgres`.
   - Thiết lập `upload.staticDir` trỏ đúng folder `media`.
8. **Tạo seed JSON** `data/sample-products.json` có 2 sản phẩm minh họa (tham chiếu tới image URLs công khai).
9. **Chạy local quick-check**:
   - `npm install` (nếu cần).
   - `npm run dev` để start Payload.
   - Kiểm tra endpoint API: `GET http://localhost:3000/api/products?depth=1` trả về docs.

## File templates (agent phải viết chính xác vào các file)

- Agent phải tạo file `src/collections/Products.ts` theo nội dung mẫu (tham khảo scaffold có sẵn). Sử dụng `export default Products`.
- Tương tự cho các collection khác.

## Testing / Acceptance criteria

- Khi chạy `npm run dev` không có lỗi compile Typescript.
- Truy cập `http://localhost:3000/admin` hiển thị menu: Sản phẩm, Danh mục, Hãng, Media, Users.
- `GET /api/products?depth=1` trả code 200 và JSON có field `docs`.
- Thêm 1 sản phẩm thử thủ công trong /admin và kiểm tra product.slug tự tạo khi lưu (nếu không set).

## Example seed object (sample-products.json)

```json
[
  {
    "name": "Aptomat Schneider NSX160N 160A",
    "slug": "apto-nsx160n-160a",
    "sku": "LV429557",
    "brand": "Schneider",
    "category": "Aptomat",
    "shortDescription": "Aptomat MCCB Schneider NSX160N dòng 160A",
    "specifications": [
      { "key": "Dòng định mức", "value": "160A" },
      { "key": "Số cực", "value": "3P" }
    ],
    "published": true
  },
  {
    "name": "Aptomat LS Metasol 3P",
    "slug": "ls-metasol-3p",
    "sku": "LS12345",
    "brand": "LS",
    "category": "Aptomat",
    "shortDescription": "Aptomat LS Metasol kinh tế",
    "specifications": [{ "key": "Dòng định mức", "value": "100A" }],
    "published": true
  }
]
```
