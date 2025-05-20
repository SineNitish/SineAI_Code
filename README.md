<p align="center">
  <a href="https://sine-ai-code.vercel.app/" target="_blank">
    <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&duration=3000&pause=1000&color=00FEEF&center=true&vCenter=true&width=600&lines=SINE+AI+Code+%F0%9F%A4%96%E2%9C%A8;Prompt%2C+Run%2C+Edit%2C+Deploy+Web+Apps;Powered+by+Next.js+%26+Gemini+API+%F0%9F%94%A5" alt="SINE AI Code - AI Powered Code Generation Platform"/>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Google_Gemini_API-4A80EF?style=for-the-badge&logo=google&logoColor=white" alt="Google Gemini API"/>
  <img src="https://img.shields.io/badge/Convex-1E1E2E?style=for-the-badge&logo=convex&logoColor=white" alt="Convex"/>
  <img src="https://img.shields.io/badge/Sandpack-yellow?style=for-the-badge&logo=codesandbox&logoColor=black" alt="CodeSandbox Sandpack"/>
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>
</p>

<p align="center">
  <strong>Instantly bring your web app ideas to life with AI-driven code generation, an interactive online IDE, and live deployment previews.</strong>
</p>

<p align="center">
  ⚡ For project insights, collaboration, or inquiries, please contact Nitish Sine at: <strong><a href="mailto:sine.nitish@gmail.com">sine.nitish@gmail.com</a></strong> ⚡
</p>

# 🤖 SINE AI Code ✨

> **SINE AI Code** is an innovative AI-powered code generator that allows you to prompt, run, edit, and deploy full-stack web applications directly in your browser. Inspired by tools like `bolt.new`, SINE AI Code aims to streamline the development process by leveraging artificial intelligence to generate code and provide an online environment for execution and modification. It was built as a real-time AI code generation platform with Sandpack, aiming to reduce dev time by 50%.

**Live Demo:**
* 🌐 **Access SINE AI Code:** [https://sine-ai-code.vercel.app/](https://sine-ai-code.vercel.app/)

---

## 🚀 Introduction

SINE AI Code revolutionizes the way developers and enthusiasts create web applications. By simply describing your desired application or component, our AI, powered by Google's Gemini API, generates the foundational code. This platform, built with Next.js, offers an integrated environment where you can not only generate code but also edit it in a familiar IDE-like interface, see live previews through CodeSandbox's Sandpack, and manage your projects with ease using Convex for the backend.

---

## 🎯 Project Aim

To provide a seamless and intuitive platform that significantly accelerates the web development lifecycle, from idea conception to a runnable prototype, by harnessing the power of AI for code generation and providing an integrated online development experience.

---

## ✅ Objectives

* 🧠 **AI-Powered Code Generation:** Utilize Google's Gemini API to translate natural language prompts into functional code.
* 💻 **Interactive Online IDE:** Allow users to view, edit, and manage the generated code files directly in the browser.
* 🌐 **Live Previews:** Integrate CodeSandbox Sandpack for instant visualization and testing of the generated web applications.
* 💾 **Project Management:** Enable users to manage their generated projects, including history and modifications (leveraging Convex for backend).
* 💬 **Iterative Development:** Facilitate refinement of generated code through conversational AI interactions.
* 🚀 **User-Friendly Interface:** Ensure a clean, intuitive, and responsive user experience built with Next.js, Tailwind CSS, and Shadcn/UI.

---

## 👨‍💻 Tech Stack

| Layer         | Technologies                                                                                                  |
|---------------|---------------------------------------------------------------------------------------------------------------|
| **Frontend** | Next.js, React, Tailwind CSS, Shadcn/UI (Radix UI, Lucide React), Sandpack, Axios, React Markdown, Sonner (Notifications) |
| **AI & Backend**| Google Gemini API (`@google/generative-ai`), Convex (Realtime Database & Backend Functions)                    |
| **DevOps** | Vercel (Deployment), GitHub                                                                                   |
| **Core Libs** | `next-themes`, `class-variance-authority`, `clsx`, `tailwind-merge`, `tailwindcss-animate`, `uuid4`, Geist Font |

---

## 📦 Core Features

* 🎯 **Prompt-Based Code Generation**: Describe what you want to build, and let the AI create it.
    ![SINE AI Code - Prompt Screen](screenshots/PromptScreen.png)
* ⚙️ **AI-Driven Generation Process**: Watch as SINE AI Code brings your idea to life.
    ![SINE AI Code - Generating Files](screenshots/GeneratingFiles.png)
* ✏️ **Integrated Code Editor**: View and modify HTML, CSS, JavaScript (or other relevant files) directly.
    ![SINE AI Code - Code View](screenshots/CodeView.png)
* 👁️ **Live Application Preview**: Instantly see your web application running in a sandboxed environment.
    ![SINE AI Code - Preview](screenshots/Preview.png)
* 💬 **Conversational Refinement**: Chat with the AI to modify features, fix errors, or add new functionalities.
* 💾 **Project History & Management**: (Via Convex backend) Keep track of your created projects and their versions.
* 💅 **Modern UI/UX**: Clean and intuitive interface using Tailwind CSS and Shadcn/UI components.

---

## 🗂 Folder Structure

```bash
SINECODE/
├── app/                      # Next.js App Router: Pages and API Routes
│   ├── (main)/               # Main application routes (e.g., pricing, workspace)
│   │   ├── pricing/page.jsx
│   │   └── workspace/[id]/page.jsx
│   ├── api/                  # API endpoints
│   │   ├── ai-chat/route.js
│   │   └── gen-ai-code/route.jsx
│   ├── layout.js             # Main app layout
│   ├── page.js               # Homepage
│   └── provider.jsx          # Context/Global providers
├── components/               # Reusable UI components
│   ├── configs/
│   ├── custom/               # Custom components (AppSidebar, ChatView, CodeView, etc.)
│   └── ui/
