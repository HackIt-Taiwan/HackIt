# 資料架構重構說明

## 概述

本次重構將原本硬編碼在 utils 文件中的資料遷移到 `public/data/` 資料夾，採用 JSON 文件分離的方式管理。

## 新架構

### 資料夾結構

```
public/
  data/
    events/
      *.json          # 各活動的 JSON 檔案
    news/
      *.json          # 各新聞的 JSON 檔案
```

### API 端點

每個資料類型都有對應的 API 端點來動態掃描和加載檔案：

- `/api/data/events` - 掃描並返回所有活動資料
- `/api/data/news` - 掃描並返回所有新聞資料

### Utils 函數更新

所有 utils 函數都已更新為 async 函數，支援：

1. **動態文件發現** - 自動掃描資料夾中的新文件
2. **緩存機制** - 避免重複加載相同資料
3. **錯誤處理** - 優雅處理文件讀取失敗
4. **清除緩存** - 開發和測試時可清除緩存

## 使用方式

### 添加新資料

1. **新增活動**：在 `public/data/events/` 創建新的 JSON 文件
2. **新增新聞**：在 `public/data/news/` 創建新的 JSON 文件

系統會自動發現新文件，無需修改程式碼。

### JSON 文件格式

#### 活動 (Events)
```json
{
  "slug": "event-slug",
  "frontmatter": {
    "id": 1,
    "title": "活動標題",
    "date": "2025-01-01",
    "endDate": "2025-01-02",
    "time": "10:00",
    "location": "活動地點",
    "image": "/images/event.jpg",
    "url": "https://example.com",
    "category": "分類",
    "tags": ["標籤1", "標籤2"],
    "spots": 100,
    "spotsLeft": 50,
    "isCompleted": false,
    "isFeatured": true,
    "color": "blue",
    "emoji": "🎉",
    "description": "活動描述"
  },
  "content": "活動詳細內容"
}
```

#### 新聞 (News)
```json
{
  "slug": "news-slug",
  "frontmatter": {
    "id": 1,
    "title": "新聞標題",
    "date": "2025-01-01",
    "author": "作者名稱",
    "category": "分類",
    "image": "https://example.com/image.jpg",
    "isFeatured": true,
    "tags": ["標籤1", "標籤2"]
  },
  "content": "新聞詳細內容"
}
```


## 優勢

1. **模組化管理** - 每個項目獨立文件，便於維護
2. **動態加載** - 自動發現新文件，無需修改程式碼
3. **緩存優化** - 提升效能，避免重複讀取
4. **錯誤隔離** - 單個文件錯誤不影響其他資料
5. **易於擴展** - 添加新資料類型只需創建對應的 API 端點

## 開發建議

1. 使用 JSON 格式確保資料一致性
2. 為每個文件使用描述性的文件名
3. 定期檢查文件格式的正確性
4. 開發時可使用 `clearXxxCache()` 函數清除緩存
