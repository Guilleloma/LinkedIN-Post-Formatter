# 📝 LinkedIn Post Formatter

**LinkedIn Post Formatter** is a WebApp that allows you to write, format, and copy texts with bold, italics, and other styles compatible with LinkedIn. Since LinkedIn doesn't allow HTML or Markdown, this tool converts text to Unicode, ensuring that posts are more attractive and easier to read.

## 🚀 Features

✅ **Rich Text Editor** (Bold, Italics, Lists, Emojis)  
✅ **Automatic Unicode Conversion** (for LinkedIn compatibility)  
✅ **Post Preview** before copying  
✅ **"Copy to Clipboard" Button**  
✅ **Change History with LocalStorage**  
✅ **Dark/Light Mode (coming soon)**  

---

## 🛠️ Technologies Used

### **Frontend**
- ⚡ **React + Vite** → Fast and modern
- ✍️ **Tiptap** → Rich text editor
- 🎨 **TailwindCSS** → Clean and responsive design

### **Deployment and Hosting**
- ☁️ **Vercel** → For hosting and continuous deployment
- 🛠 **GitHub Actions** → For continuous integration (CI/CD)

### **Automated Testing**
- 🧪 **Jest + React Testing Library** → Unit tests
- 🔄 **Cypress / Playwright** → Integration and E2E tests

---

## 📌 Project Structure

```
/linkedin-editor
 ├── /public               # Static files
 ├── /src
 │   ├── /components       # Reusable components (buttons, toolbar, etc.)
 │   ├── /pages
 │   │   ├── index.jsx     # Main page with editor
 │   │   ├── about.jsx     # (Optional) Tool information
 │   ├── /utils            # Unicode conversion functions
 │   ├── App.js            # App configuration
 │   ├── main.js           # Entry point if using Vite
 ├── package.json          # Dependencies
 ├── README.md             # Project documentation
```

---

## 🔄 Development Flow and CI/CD

This project follows a **Trunk-Based Development** flow with two main branches:

- **`trunk`** → Stable and production-ready branch
- **`development`** → Branch for development and testing

### **Development Cycle**
1. Feature branches are created (**`feature/new-function`**) from `development`
2. New features are developed and integrated into `development` (Merges always with commits to maintain visual history in gitgraph)
    - Logs are added during new feature development to facilitate debugging
3. **GitHub Actions runs automated tests** before merging to `trunk` (Merges always with commits to maintain visual history in gitgraph)
    - Unit Tests (Vitest)
    - Integration Tests (Cypress)
    - End-to-End Tests on complete user flow
4. If tests pass, it's merged to `trunk` and **Vercel automatically deploys the new version** (Merges always with commits to see them in gitgraph)

---

## 🏗️ Project Roadmap

| Phase | Main Feature | Status |
|------|------------------|--------|
| **1** | Basic editor with bold/italic and copy | ✅ Trunk |
| **2** | Emojis | ✅ Trunk|
| **3** | Other text fonts | 🚧 In planning |
| **4** | AI for text improvements and suggestions | 🚧 In planning |

---

## ⚡ Installation and Usage

### **Prerequisites**
- Node.js 18+
- npm or yarn

### **Clone the repository**
```bash
git clone https://github.com/guilleloma/linkedin-post-formatter.git
cd linkedin-post-formatter
```

### **Install dependencies**
```bash
npm install
```

### **Start the project in development**
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

### **Deploy to Vercel**
If using **Vercel**, you can deploy with:
```bash
vercel deploy
```

---

## 🛠 Contributions

🚀 Contributions are welcome! If you want to collaborate:
1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/new-function`)
3. **Push your changes** (`git commit -m "Added new function"`)
4. **Make a PR to `development`**

---

## 🔗 Resources and Documentation

- [Tiptap Docs](https://tiptap.dev/docs)
- [Cypress Docs](https://www.cypress.io/)
- [Playwright Docs](https://playwright.dev/)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

## 📢 Contact
If you have questions, suggestions, or feedback, open an **issue** on GitHub or contact me on [LinkedIn](https://www.linkedin.com/in/guillermolopezmarin/).

---

**🚀 Created with passion to improve the writing experience on LinkedIn.**  
```

