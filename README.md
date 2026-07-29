# Apex - University Help Desk Chatbot 

A highly polished, premium client-side web application designed as a university student support assistant named **Apex**. It runs entirely on standard browser APIs without external server dependencies, databases, or AI models, tailored for Sri Lankan higher education systems.

---

## 📸 Visual Preview

Here is a preview of the premium, glassmorphic UI designed for the help desk:

![Apex Bot Chatbot UI Preview](https://github.com/reezmahanan/Apex-Bot/blob/main/assets/chatbot_preview.png)

---

## 🚀 Key Features

* **Deterministic Guided Chat:** Users can navigate university resources via an interactive, button-based decision-tree flow (Admissions, Academics, IT Support, Mahapola bursary payments, etc.).
* **Keyword Matching Engine:** A score-based string parser parses custom typed questions against a predefined keyword dictionary. It weights multi-word phrases and single word overlaps to route users to the correct answer with 100% accuracy (zero hallucinations).
* **Multi-User Profile Switcher:** Toggle between different active student profiles (Kasun, Sanduni, and Nimal) directly in the Dashboard. Switching profile automatically synchronizes:
  * Personalized greetings (Ayubowan, Kasun! etc.).
  * Dashboard statistics (Index number, GPA, Completed credits, and Registrar Holds).
  * FAFSA checklist statuses.
  * Active IT support ticket lists in the Contact Us page.
* **Animated FAQ Accordion:** An expandable accordion interface to explore top queries with smooth height transition animations.
* **Notices & Services Directories:** Directories displaying university announcements and links to digital tools (Student LMS, email portals, campus map).
* **Dynamic Theme Toggle:** A checkbox slider in the sidebar footer that switches the app between a glowing violet glassmorphic Dark Theme and a clean, high-contrast Light Theme.
* **Text-to-Speech (TTS):** Enable readouts in the settings panel to hear bot responses spoken aloud in real-time using the native Web SpeechSynthesis API.

---

## 🛠️ Technology Stack

* **Structure:** HTML5 (semantic layout with view routing sections).
* **Styling:** CSS3 variables, transitions, CSS Grid, Flexbox, glassmorphic card overlays, and dark/light mode token overrides.
* **Logic:** Vanilla JavaScript (ES6+, DOM event binds, keyword scoring routing, and local state management).

---

## 📂 File Structure

```
c:\Users\HANAN\Downloads\ChatBot\
├── index.html       # Sidebar menu, active panel views, FAQs, and ticket forms
├── styles.css       # Design tokens, theme variables, accordion animations, and layouts
├── chatbot-data.js  # Hierarchical decision tree nodes and keyword dictionary mappings
├── app.js           # View routing, keyword matching parser, profile loaders, and speech synthesis
├── assets/
│   └── chatbot_preview.jpg  # Project preview screenshot
└── README.md        # Documentation of the project
```

---

## 💻 How to Run the Project

The application is lightweight and self-contained:

1. Clone or download the files.
2. Locate [index.html](file:///c:/Users/HANAN/Downloads/ChatBot/index.html) in your file manager.
3. **Double-click** the file to open it directly in any modern web browser (Chrome, Firefox, Safari, Edge).
4. No installation, server setup, or network connections are required.
