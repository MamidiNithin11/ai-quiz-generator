🧠 AI Wiki Quiz Generator

An intelligent web application that scrapes Wikipedia articles, uses **Google Gemini AI** to generate multiple-choice quizzes, and stores them in a **Neon-hosted PostgreSQL** database.
The frontend (built with **Vite + React + TailwindCSS**) allows users to input any Wikipedia URL, generate AI-powered quizzes, and view quiz history.

---

## 🚀 Features

* ✅ Scrape Wikipedia pages automatically
* ✅ Generate quizzes using **Gemini AI** via **LangChain**
* ✅ Store quizzes in **Neon PostgreSQL** (cloud-hosted)
* ✅ RESTful backend powered by **FastAPI**
* ✅ Frontend built with **Vite + React + TailwindCSS**
* ✅ Quiz history tracking with detailed quiz view
* ✅ Full CORS support for smooth frontend-backend communication

---

## 🧩 Tech Stack

| Layer           | Technologies Used               |
| --------------- | ------------------------------- |
| **Frontend**    | React, Vite, TailwindCSS, Axios |
| **Backend**     | FastAPI, SQLAlchemy, LangChain  |
| **AI Model**    | Google Gemini 1.5 / 2.5         |
| **Database**    | PostgreSQL (Neon Serverless)    |
| **Environment** | Python 3.10+, Node.js 18+       |

---

## 📁 Project Structure

```
ai-quiz-generator/
├── backend/
│   ├── __init__.py
│   ├── database.py
│   ├── llm_quiz_generator.py
│   ├── main.py
│   ├── models.py
│   ├── requirements.txt
│   ├── scraper.py
│   └── __pycache__/
└── frontend/
    ├── App.jsx
    ├── index.html
    ├── index.jsx
    ├── metadata.json
    ├── package.json
    ├── README.md
    ├── types.ts
    ├── vite.config.ts
    ├── assets/
    ├── components/
    │   ├── GenerateQuizTab.jsx
    │   ├── HistoryTab.jsx
    │   ├── Modal.jsx
    │   ├── QuizDisplay.jsx
    │   └── icons/
    │       ├── BookOpenIcon.jsx
    │       ├── CheckIcon.jsx
    │       ├── ClipboardIcon.jsx
    │       ├── ClockIcon.jsx
    │       ├── CogIcon.jsx
    │       ├── ExternalLinkIcon.jsx
    │       ├── HistoryIcon.jsx
    │       ├── InfoIcon.jsx
    │       ├── LoaderIcon.jsx
    │       ├── TrophyIcon.jsx
    │       └── XIcon.jsx
    └── services/
        └── api.js
```

---

## ⚙️ Backend Setup (FastAPI)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<Mamidinithin11>/ai-quiz-generator.git
cd ai-quiz-generator/backend
```

---

### 2️⃣ Create a virtual environment

```bash
python -m venv venv
.\venv\Scripts\activate      # Windows
# OR
source venv/bin/activate     # macOS / Linux
```

---

### 3️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

**`requirements.txt` includes:**

```
fastapi==0.120.0
uvicorn==0.38.0
SQLAlchemy==2.0.44
pydantic==2.12.3
requests==2.32.5
beautifulsoup4==4.14.2
python-dotenv==1.1.1
...
```

---

### 4️⃣ Configure environment variables

Create a `.env` file inside `/backend`:

```env
# PostgreSQL connection string from Neon
DATABASE_URL=postgresql+psycopg2://<username>:<password>@<host>:<port>/<database>
GEMINI_API_KEY=your_gemini_api_key_here
```
Used Neon App For DataBase:



> 🧠 Replace `<username>`, `<password>`, `<host>`, `<port>`, and `<database>` with values from your **Neon Console**. Neon provides a **serverless PostgreSQL database**, so you don’t need local PostgreSQL installation.

---

### 5️⃣ Initialize the database

FastAPI with SQLAlchemy will automatically create the required tables on first run:

```python
from database import Base, engine
Base.metadata.create_all(bind=engine)
```

---

### 6️⃣ Run the backend server

```bash
uvicorn main:app --reload
```

The backend will start at 👉 [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 🌐 API Endpoints

| Method | Endpoint         | Description                        |
| ------ | ---------------- | ---------------------------------- |
| `GET`  | `/`              | Health check                       |
| `POST` | `/generate_quiz` | Generate quiz from a Wikipedia URL |
| `GET`  | `/history`       | List all saved quizzes             |
| `GET`  | `/quiz/{id}`     | Get full quiz details by ID        |

### 🧾 Example Response (`/generate_quiz`)


```json
{
  "id": 1,
  "url": "[https://en.wikipedia.org/wiki/Alan_Turing](https://en.wikipedia.org/wiki/Alan_Turing)",
  "title": "Alan Turing",
  "summary": "Alan Turing was a British mathematician and computer scientist...",
  "key_entities": {
    "people": ["Alan Turing", "Alonzo Church"],
    "organizations": ["University of Cambridge", "Bletchley Park"],
    "locations": ["United Kingdom"]
  },
  "sections": ["Early life", "World War II", "Legacy"],
  "quiz": [
    {
      "question": "Where did Alan Turing study?",
      "options": [
        "Harvard University",
        "Cambridge University",
        "Oxford University",
        "Princeton University"
      ],
      "answer": "Cambridge University",
      "difficulty": "easy",
      "explanation": "Mentioned in the 'Early life' section."
    },
    {
      "question": "What was Alan Turing's main contribution during World War II?",
      "options": [
        "Atomic research",
        "Breaking the Enigma code",
        "Inventing radar",
        "Developing jet engines"
      ],
      "answer": "Breaking the Enigma code",
      "difficulty": "medium",
      "explanation": "Detailed in the 'World War II' section."
    }
  ],
  "related_topics": ["Cryptography", "Enigma machine", "Computer science history"]
}

```

---

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

## 🛠 Development Notes

* Backend auto-creates tables via SQLAlchemy.
* Use `/docs` endpoint for Swagger UI testing.
* If quiz generation fails, check your Gemini API key.

---

## 🧠 Future Enhancements

* User authentication & login-based quiz tracking
* Leaderboard system
* Custom quiz generation from uploaded documents
* Dark mode UI
* Export quizzes to PDF

---

## 🤝 Contributing

1. Fork this repo
2. Create a feature branch (`feature/new-ui`)
3. Commit changes (`git commit -m "Add feature"`)
4. Push and open a Pull Request

---

## 🛡️ License

MIT License – free to use, modify, and distribute.

---

## 💬 Credits

Developed by **MamidiNithin11**
Powered by **Gemini AI + FastAPI + React + TailwindCSS**

---
outpus:

<img width="1915" height="971" alt="Screenshot 2025-10-26 021429" src="https://github.com/user-attachments/assets/c467f4ea-b4f8-4817-b8b7-452de7ee3e6d" />

_______________________________________________________________________________________________________________________________________________________________

<img width="1902" height="963" alt="Screenshot 2025-10-26 021521" src="https://github.com/user-attachments/assets/e940f35e-d080-4aea-8f09-a5ab86ba5c79" />

_______________________________________________________________________________________________________________________________________________________________



<img width="1328" height="966" alt="Screenshot 2025-10-26 012001" src="https://github.com/user-attachments/assets/8a60b449-77a5-4147-bebc-aee645107a67" />

_______________________________________________________________________________________________________________________________________________________________



<img width="1261" height="952" alt="Screenshot 2025-10-26 012140" src="https://github.com/user-attachments/assets/155c0b08-e1ea-4933-9b01-8427a360c1af" />

_______________________________________________________________________________________________________________________________________________________________



<img width="1318" height="962" alt="Screenshot 2025-10-26 012156" src="https://github.com/user-attachments/assets/41c6bc63-b4cf-454d-b220-11d7e24220a7" />

_______________________________________________________________________________________________________________________________________________________________




<img width="1414" height="951" alt="Screenshot 2025-10-26 012212" src="https://github.com/user-attachments/assets/66a4243e-4c86-47ce-be93-43856b48bc19" />
_______________________________________________________________________________________________________________________________________________________________



<img width="1428" height="947" alt="Screenshot 2025-10-26 012232" src="https://github.com/user-attachments/assets/a51c0ce0-05d9-4427-9644-4f382571e3c3" />
_______________________________________________________________________________________________________________________________________________________________



<img width="910" height="954" alt="Screenshot 2025-10-26 012111" src="https://github.com/user-attachments/assets/b0fd47d1-4c8d-42ba-9534-d6c6c8395ca7" />
_______________________________________________________________________________________________________________________________________________________________




<img width="961" height="964" alt="Screenshot 2025-10-26 012100" src="https://github.com/user-attachments/assets/360f78cc-41ae-4daf-b95c-c2d1d95522ad" />



