# 音樂會場刊 Concert Program Booklet

這是一個為 Judy Cheng 慈善音樂會製作的在線場刊，支援手機閱讀，並提供可選的掀頁效果。

This is an online program booklet for Judy Cheng's charity concert, optimized for mobile viewing with an optional page-flip effect.

## 功能特點 Features

- 📱 **手機優化** - 完美適配各種手機屏幕
- 📖 **雙模式** - 支持滾動模式和掀頁模式
- 🎨 **美觀設計** - 漸變背景和優雅排版
- 👆 **觸控友好** - 支持滑動翻頁
- ⌨️ **鍵盤導航** - 可用鍵盤方向鍵翻頁
- 🖨️ **列印友好** - 支持列印輸出

---

- 📱 **Mobile Optimized** - Perfect for all mobile screens
- 📖 **Dual Modes** - Scroll mode and flip mode
- 🎨 **Beautiful Design** - Gradient background and elegant typography
- 👆 **Touch-Friendly** - Swipe to flip pages
- ⌨️ **Keyboard Navigation** - Use arrow keys to navigate
- 🖨️ **Print-Friendly** - Ready for printing

## 如何使用 How to Use

### 方法 1: 直接開啟 (推薦)
直接用瀏覽器開啟 `index.html` 檔案即可使用。

Simply open `index.html` in your browser.

### 方法 2: 本地伺服器
如果需要更好的體驗，可以使用本地伺服器：

```bash
# 使用 Python 3
python3 -m http.server 8000

# 或使用 Node.js (需先安裝 http-server)
npx http-server
```

然後在瀏覽器中打開 `http://localhost:8000`

Then open `http://localhost:8000` in your browser.

### 方法 3: 上傳到網站
將所有檔案上傳到您的網站空間即可在線使用。

Upload all files to your web hosting to use online.

## 模式切換 Mode Switching

- **滾動模式** (預設) - 適合快速瀏覽，向下滾動查看所有內容
- **掀頁模式** - 點擊按鈕啟用，提供真實的翻頁體驗

---

- **Scroll Mode** (Default) - Quick browsing, scroll down to view all content
- **Flip Mode** - Click button to enable, provides realistic page-flipping experience

## 操作說明 Controls

### 滾動模式 Scroll Mode
- 向下滾動查看所有頁面
- Scroll down to view all pages

### 掀頁模式 Flip Mode
- 點擊左右按鈕翻頁
- 在頁面上左右滑動翻頁
- 使用鍵盤方向鍵 (←/→) 翻頁
- 使用 Home/End 鍵跳到首頁/尾頁

---

- Click left/right buttons to flip pages
- Swipe left/right on pages to flip
- Use arrow keys (←/→) to navigate
- Use Home/End keys to jump to first/last page

## 檔案結構 File Structure

```
judy-booklet-easier/
├── index.html      # 主 HTML 檔案 / Main HTML file
├── styles.css      # 樣式表 / Stylesheet
├── script.js       # JavaScript 功能 / JavaScript functions
└── README.md       # 說明文件 / Documentation
```

## 瀏覽器支援 Browser Support

- ✅ Chrome/Edge (推薦 Recommended)
- ✅ Safari (iOS & macOS)
- ✅ Firefox
- ✅ Samsung Internet
- ✅ 其他現代瀏覽器 / Other modern browsers

## 技術說明 Technical Details

- **jQuery** - JavaScript 函式庫 / JavaScript library
- **turn.js** - 掀頁效果庫 / Page flip library
- **純 HTML/CSS/JS** - 無需後端伺服器 / No backend required
- **響應式設計** - 自動適配不同屏幕 / Responsive design

## 自訂修改 Customization

### 更改顏色主題 Change Color Theme
編輯 `styles.css` 中的漸變色：

Edit gradient colors in `styles.css`:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### 調整頁面大小 Adjust Page Size
編輯 `script.js` 中的 `getFlipbookWidth()` 和 `getFlipbookHeight()` 函數。

Edit `getFlipbookWidth()` and `getFlipbookHeight()` functions in `script.js`.

### 添加內容 Add Content
直接編輯 `index.html` 中的內容，記得同時更新滾動模式和掀頁模式的內容。

Edit content in `index.html`, remember to update both scroll and flip modes.

## 問題排解 Troubleshooting

### 掀頁效果無法使用
確保有網絡連接以載入 jQuery 和 turn.js 庫。

Ensure internet connection to load jQuery and turn.js libraries.

### 手機上顯示不正常
嘗試重新整理頁面或清除瀏覽器快取。

Try refreshing the page or clearing browser cache.

## 支持 Support

如有問題或建議，請聯繫場刊製作團隊。

For questions or suggestions, please contact the booklet production team.

---

**製作支持 Production Support:** Claude Code
**音樂會發起人 Concert Organizer:** Judy Cheng
**支持機構 Supporting Organization:** 維樂天蝴蝶計劃 Butterfly Project
