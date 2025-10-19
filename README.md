-----

# 🗺️ Polyglot Pilot: European Travel Phrasebook

A modern, fast travel companion built to help users quickly learn and pronounce essential phrases in multiple European languages. This application features a clean, responsive interface powered by React and styled with Tailwind CSS, with all phrase data managed by a Supabase backend.

## ✨ Features

  * **10+ Languages:** Master phrases for German, French, Italian, Spanish, Czech, Dutch, and more.
  * **Contextual Phrase Grouping:** Phrases are organized into essential travel categories (e.g., Greetings, Transportation, Food).
  * **Text-to-Speech (TTS):** Native browser speech synthesis allows users to hear the correct pronunciation of every phrase.
  * **Instant Search:** Quickly find phrases in English or the target language.
  * **Supabase Backend:** All categories and phrases are dynamically loaded from a PostgreSQL database hosted on Supabase.
  * **Modern Stack:** Built on React, TypeScript, and Vite for a highly optimized development and build experience.

## 🛠️ Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | [React](https://reactjs.org/) | Core UI framework |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type safety and better code quality |
| **Bundler** | [Vite](https://vitejs.dev/) | Next-generation frontend tooling |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| **Backend/DB** | [Supabase](https://supabase.io/) | Hosted PostgreSQL database and API |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, consistent icons |

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1\. Prerequisites

You need **Node.js** (version 18+) and **npm** installed.

### 2\. Clone the Repository

```bash
git clone <YOUR_REPO_URL>
cd polyglot-pilot
```

### 3\. Install Dependencies

```bash
npm install
```

### 4\. Set up Supabase

This project requires a Supabase project for data management.

1.  **Create a Project:** Sign up for [Supabase](https://supabase.io/) and create a new project.

2.  **Database Schema:** Run the initial SQL schema script (found in your project, e.g., `schema.sql`) to create the `phrase_categories` and `phrases` tables.

3.  **Environment Variables:** Create a file named `.env.local` in the project root and add your Supabase credentials:

    ```bash
    # .env.local
    VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
    VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_PUBLIC_KEY"
    ```

### 5\. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 📂 Project Structure

```
.
├── public/                # Static assets (e.g., /images)
├── src/
│   ├── components/        # Reusable UI components (Card, Button, etc.)
│   ├── data/              # Static data definitions (languages, etc.)
│   ├── services/          # Supabase data fetching logic (phraseService.ts)
│   ├── components/page/   # Main page sections (e.g., TravelPhrasesSection.tsx)
│   ├── lib/               # Utility functions (e.g., supabaseClient.ts)
│   └── main.tsx           # Entry point
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
└── package.json
```

## 📐 Styling and Customization

The design uses a clean, accessible layout with a custom color palette defined via CSS variables in `index.css` and referenced throughout the React components:

| Variable | Description | Example Usage |
| :--- | :--- | :--- |
| `--brand-primary` | The main action color (e.g., buttons, selected states) | `bg-[var(--brand-primary)]` |
| `--brand-dark` | Used for headings and strong text contrast | `text-[var(--brand-dark)]` |
| `--brand-bg` | Light background for sections | `bg-[var(--brand-bg)]` |

## 📝 License

This project is licensed under the MIT License.

```
```
