# 資料架構重構說明

## 概述

活動資料已改為從 NocoDB 公開分享表讀取，新聞資料維持 JSON 檔案管理。前端仍透過統一的 `/api/data/events` 取得資料，API 端點會把 NocoDB 欄位轉成前端需要的 Event 結構。

## 新架構

### 資料來源

- Events：NocoDB 公開分享 View（無 token）
- News：`public/data/news/*.json`

### API 端點

- `/api/data/events` - 代理 NocoDB share view，轉換為 `Event` 格式
- `/api/data/news` - 掃描並返回所有新聞資料

### 環境設定

在 `.env.local` 內設定：

- `NOCODB_EVENTS_SHARE_URL`：NocoDB 公開分享連結（例如 `https://xxx/#/nc/share/<shareId>`，或 `https://xxx/#/nc/view/<viewId>?shared=<shareId>`）
- `NOCODB_EVENTS_API_URL`（可選）：直接填 `https://xxx/api/v2/shared/<shareId>/records`

> 若你的 NocoDB 是 v1 且只拿得到 `#/nc/view/<viewId>` 的公開 view 連結，後端會自動改走 `https://<host>/api/v1/db/public/shared-view/<viewId>/rows`。

### NocoDB Events 表欄位（建議命名）

| 欄位 | 型別 | 必填 | 說明 |
| --- | --- | --- | --- |
| slug | Single line text | ✅ | `/events/[slug]` 的 URL 片段，需唯一 |
| title | Single line text | ✅ | 活動標題 |
| date | Date | ✅ | 活動開始日期 |
| endDate | Date | ⛔ | 活動結束日期（多日活動用） |
| time | Single line text | ⛔ | 活動時間（顯示用字串） |
| location | Single line text | ⛔ | 活動地點 |
| image | Attachment | ✅ | 圖片附件（後端會取第一張附件的 URL 顯示） |
| url | URL | ⛔ | 報名或活動頁面連結 |
| category | Single select | ✅ | 活動分類 |
| tags | Multi select | ⛔ | 標籤（多選或逗號分隔） |
| spots | Number | ✅ | 名額總數 |
| spotsLeft | Number | ✅ | 剩餘名額 |
| isFeatured | Checkbox | ⛔ | 是否為精選活動 |
| color | Single line text | ⛔ | 視覺主題色（可選） |
| emoji | Single line text | ⛔ | 活動表情符號 |
| description | Long text | ✅ | 短描述 |
| content | Long text | ⛔ | 詳細內容（支援 Markdown/MDX） |
| id | Number | ⛔ | 需要自訂排序或外部對接時再建立 |

> `image` 為附件時，請在 `next.config.js` 的 `images.domains` 加入 NocoDB 網域，確保 Next/Image 能載入圖片。
> `isCompleted` 由後端自動計算，不需要建立欄位。規則：當今天日期 >= `endDate + 1 天`（含當天）視為已完成；若沒有 `endDate`，則以 `date` 計算。

### 使用方式

#### 新增/更新活動

1. 在 NocoDB Events 表新增或更新一筆資料
2. 確保 `slug`、`title`、`date` 等必填欄位完整
3. 前端會自動透過 `/api/data/events` 取得最新資料
