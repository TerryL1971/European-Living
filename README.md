# 🏠 European Living: Travel Phrasebook & Content Hub

**European Living** is a modern travel and content application designed to help users navigate European life, featuring an essential phrasebook and detailed city guides. The project features a clean, responsive interface built with React and Tailwind CSS, with all content sourced from a powerful Sanity.io CMS.

## ✨ Features

  * **10+ Language Phrasebook:** Master essential phrases for travel across Europe with built-in text-to-speech (TTS) pronunciation.
  * **Dynamic City Guides:** Detailed articles for cities like Stuttgart, London, Rome, and more, managed entirely within Sanity.io.
  * **Instant Search:** Quickly find phrases in English or the target language.
  * **Sanity.io CMS:** Content repository providing a dedicated, user-friendly interface for managing articles, destinations, and phrases.
  * **Modern Stack:** Built on React, TypeScript, and Vite for a highly optimized development and build experience.

## 🛠️ Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | [React](https://reactjs.org/) | Core UI framework |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type safety and better code quality |
| **Bundler** | [Vite](https://vitejs.dev/) | Next-generation frontend tooling |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| **Content** | [Sanity.io](https://www.sanity.io/) | Headless CMS for structured content |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, consistent icons |

## 🚀 Getting Started

Follow these steps to set up the **European Living** project locally.

### 1\. Prerequisites

You need **Node.js** (version 18+) and **npm** installed.

### 2\. Clone the Repository

Assuming your project folder is named `european-living`:

```bash
git clone <YOUR_REPO_URL>
cd european-living
```

### 3\. Install Dependencies

```bash
npm install
```

### 4\. Set up Sanity.io

This project fetches content from a Sanity.io instance.

1.  **Create Sanity Project:** Set up your Sanity Studio (the content editor) and define your schemas for `phrase`, `category`, and `article`.

2.  **Environment Variables:** Create a file named `.env.local` in the project root and add your Sanity credentials. These are used by the React frontend to fetch data:

    ```bash
    # .env.local
    VITE_SANITY_PROJECT_ID="YOUR_SANITY_PROJECT_ID"
    VITE_SANITY_DATASET="production" 
    VITE_SANITY_API_VERSION="2023-03-01" 
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
│   ├── data/              # Static data definitions (languages, destinations, articles)
│   ├── services/          # Data fetching logic (e.g., phraseService.ts)
│   ├── components/page/   # Main page sections (e.g., TravelPhrasesSection.tsx)
│   ├── lib/               # Utility functions (e.g., sanityClient.ts)
│   └── main.tsx           # Entry point
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
└── package.json
```

## 📐 Styling and Customization

The design uses a custom color palette defined via CSS variables in `index.css` and referenced throughout the React components:

| Variable | Description | Example Usage |
| :--- | :--- | :--- |
| `--brand-primary` | The main action color (e.g., buttons, selected states) | `bg-[var(--brand-primary)]` |
| `--brand-dark` | Used for headings and strong text contrast | `text-[var(--brand-dark)]` |
| `--brand-bg` | Light background for sections | `bg-[var(--brand-bg)]` |

## 📝 License

This project is licensed under the MIT License.

```
```
