# Discord API 設置指南

為了顯示實時的Discord伺服器成員數量，你可以使用以下兩種方式：

## 方式 A：純前端（不需要 Bot Token）

1. 確保有可用的 Discord 邀請連結（例如 `https://discord.gg/hackit`）
2. 在專案根目錄建立 `.env.local`（如果尚未存在）
3. 加入以下設定：

```
NEXT_PUBLIC_DISCORD_INVITE_URL=https://discord.gg/hackit
```

前端會透過 Discord 公開邀請 API 取得 `approximate_member_count`，不需要任何機器人 Token。

---

## 方式 B：使用 Discord Bot（給 /api/discord-members）

### 1. 創建Discord機器人

1. 前往 [Discord Developer Portal](https://discord.com/developers/applications)
2. 點擊 "New Application" 創建新應用
3. 填寫應用名稱，點擊 "Create"
4. 在側邊欄選擇 "Bot"，點擊 "Add Bot"
5. 在 "TOKEN" 部分，點擊 "Copy" 獲取機器人 Token
6. 務必啟用 "SERVER MEMBERS INTENT" 權限

### 2. 將機器人添加到你的伺服器

1. 在側邊欄選擇 "OAuth2" -> "URL Generator"
2. 勾選 "bot" 範圍
3. 勾選權限: "Read Messages/View Channels"
4. 複製生成的URL並在瀏覽器中訪問
5. 選擇要添加機器人的伺服器，並授權

### 3. 獲取伺服器ID

1. 在Discord設置中啟用開發者模式（設置 -> 進階 -> 開發者模式）
2. 右鍵點擊伺服器圖標
3. 選擇"複製ID"

### 4. 設置環境變數

1. 在專案根目錄創建 `.env.local` 文件（如果尚未存在）
2. 添加以下內容:

```
DISCORD_BOT_TOKEN=你的Discord機器人Token
DISCORD_SERVER_ID=你的Discord伺服器ID
```

3. 重啟開發服務器：`npm run dev`

完成以上步驟後，網站將會顯示你的Discord伺服器的實時成員數量。 
