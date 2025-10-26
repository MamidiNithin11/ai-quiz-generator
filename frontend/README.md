## 🌐 Frontend Setup (React + Vite + TailwindCSS)

### 1️⃣ Create the project

```bash
npm create vite@latest frontend
# Select:
# - Framework: React
# - Variant: JavaScript
cd frontend
npm install
```

---

### 2️⃣ Install additional dependencies

```bash
npm install axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update `tailwind.config.js`:

```js
content: ["./index.html", "./src/**/*.{js,jsx}"]
```

Import Tailwind in `index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### 3️⃣ Frontend Components

* **GenerateQuizTab.jsx** – Input URL and generate quiz
* **HistoryTab.jsx** – View all past quizzes
* **QuizDisplay.jsx** – Display full quiz
* **Modal.jsx** – Show explanations and details
* **icons/** – Custom React icons (Loader, Book, Check, etc.)
* **services/api.js** – Axios API calls to backend

---

### 4️⃣ Frontend API Calls

* **Generate Quiz:** `POST /generate_quiz?url=<Wikipedia_URL>`
* **Fetch History:** `GET /history`
* **Fetch Quiz by ID:** `GET /quiz/<id>`

---
