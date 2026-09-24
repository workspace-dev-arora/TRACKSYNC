# 🚆 TrackSync · AI-Powered Railway Maintenance Block Planning System

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **TrackSync** is a state-of-the-art AI-assisted Railway Maintenance Block Planning & Execution Platform designed for Indian Railways. It optimizes corridor maintenance requisitions, automates timetable conflict resolution, minimizes passenger & freight train traffic disruption, and connects field engineers with central block planners in real time.

---

## 🌟 Key Platform Capabilities

### 1. 🖥️ Central Web Console (For Block Planners)
- **Executive Control Center**: Real-time section telemetry, active corridor metrics, safety status indicators, and division alerts.
- **AI Planning & Conflict Resolution Engine**: Evaluates track requisitions against train schedules, predicts throughput loss, and generates zero-conflict maintenance block slots.
- **Interactive Gantt Block Scheduler**: Visual timeline across 24-hour cycles with drag-and-drop capability, overlapping alert detectors, and departmental color codes (S&T, Engineering, Traction).
- **Corridor Schematic Diagram**: Live visual representation of railway tracks, station interlocks, maintenance blocks, and train position simulation.
- **Operational Analytics Dashboard**: Recharts-powered graphs for block utilization efficiency, delay reduction percentage, and departmental performance audit.
- **Subsystem Integrations**: Monitoring real-time data feeds from TMS (Train Management System), FOIS (Freight Operations Information System), COA (Control Office Application), and IoT track sensors.

### 2. 📱 Field Operations Console (For Supervisors & Field Engineers)
- **Dual View Modes (Mobile & Web)**: Features a subtle top toggle switch (**`[ 📱 Mobile View | 🖥️ Web View ]`**) allowing field staff to toggle between an ergonomic **iPhone 16 Pro mobile mockup** and a full-bleed **Desktop Web Console**.
- **Block Application & Status Tracking**: One-tap maintenance requisition submission, instant status updates (`APPROVED`, `WORK IN PROGRESS`, `COMPLETED`), and automated safety checklists.
- **Active Task Management**: Live timer for active track blocks, field issue reporting with photo/log attachments, and instant completion signaling back to central controllers.

---

## 👥 System Roles & Workflow

| Role | Interface | Primary Responsibilities |
| :--- | :--- | :--- |
| **Block Planner (Central Division)** | Central Web Console | Reviews requisitions, approves AI-suggested blocks, oversees multi-section corridor Gantt timelines, and manages divisional train traffic conflicts. |
| **Supervisor & Field Engineer** | Field Mobile & Web Console | Submits block requisitions, tracks approved block slots, executes field maintenance work, logs safety compliance, and completes blocks on-site. |

---

## 🛠️ Technology Stack

- **Frontend Framework**: [React 19](https://react.dev/) & [React DOM 19](https://react.dev/)
- **Language**: [TypeScript 5.7](https://www.typescriptlang.org/) (Strict typing, interfaces, schema models)
- **Build System & HMR**: [Vite 8](https://vitejs.dev/) with `@vitejs/plugin-react`
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **Design System**: Indian Railways Palette (*Navy `#123B66`*, *Deep `#0B2545`*, *Saffron `#F28C28`*, *Railway Green `#138A4B`*)
- **Icons**: [Lucide React](https://lucide.react.dev/)
- **Charts & Visualization**: [Recharts](https://recharts.org/)
- **State Management**: React Context API (`AppContext.tsx`) with automatic `localStorage` persistence.

---

## 📁 Repository Directory Structure

```text
TrackSync Prototype/
├── index.html                  # Main HTML shell loading src/main.tsx
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite 8 configuration with React & Tailwind plugins
├── PROJECT_STRUCTURE.md       # Extended technical architecture reference
├── README.md                   # Primary GitHub repository documentation
└── src/                        # Main Application Source Code
    ├── main.tsx                # React root entrypoint
    ├── App.tsx                 # App phase state machine & main navigation shell
    ├── index.css               # Global CSS entrypoint & Tailwind v4 setup
    ├── types.ts                # TypeScript data interfaces & types
    │
    ├── context/                # Global State Management
    │   └── AppContext.tsx      # AppProvider context hook for requests, blocks, toasts & logs
    │
    ├── data/                   # Mock Datasets & Seed Files
    │   └── mockData.ts         # Pre-populated Indian Railways sections, blocks & requisitions
    │
    ├── utils/                  # Utilities & Helpers
    │   └── storage.ts          # LocalStorage persistence & factory reset handlers
    │
    ├── components/             # Reusable Modals & UI Components
    │   ├── ActivityLogModal.tsx   # System audit trail viewer
    │   ├── BlockModifyModal.tsx   # Scheduled block editor
    │   ├── ConflictModal.tsx      # AI conflict warning modal
    │   ├── EditRequestModal.tsx   # Requisition modification modal
    │   ├── NewRequestModal.tsx    # Requisition submission modal
    │   ├── NotificationsDrawer.tsx# System alerts drawer
    │   ├── RequestDetailsModal.tsx# Comprehensive requisition viewer
    │   ├── ResetDemoDialog.tsx   # Factory reset confirmation dialog
    │   └── ToastContainer.tsx    # Dynamic toast alert system
    │
    └── screens/                # Application Screens & Modules
        ├── WelcomeAnimation.tsx   # System launch animation
        ├── LandingPage.tsx        # Overview landing page
        ├── LoginPage.tsx          # Role-based authentication screen
        ├── PostLoginTransition.tsx# Interstitial loading transition
        ├── ControlCenter.tsx      # Executive dashboard & KPIs
        ├── MaintenanceRequests.tsx# Requisitions management list
        ├── AIPlanning.tsx         # AI conflict solver console
        ├── BlockPlanner.tsx       # Gantt chart timeline scheduler
        ├── CorridorView.tsx       # Schematic track diagram & live train tracker
        ├── Analytics.tsx          # Recharts operational analytics
        ├── DataSources.tsx        # Connected railway subsystem feeds
        └── MobileFigmaApp.tsx     # Field Supervisor & Engineer Dual (Mobile & Web) Console
```

---

## 🚀 Local Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0 or higher
- `npm` or `pnpm`

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/workspace-dev-arora/TRACKSYNC.git
   cd TRACKSYNC
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start Local Development Server**:
   ```bash
   npm run dev
   ```
   *The application will launch on `http://localhost:8443` (or available local port).*

4. **Build for Production**:
   ```bash
   npm run build
   ```
   *Outputs optimized static assets to the `dist/` folder.*

---

## 🔑 Login & Quick Demonstration Roles

When prompted at the **Sign-In Screen**, you can select either:

1. **`Block Planner (Central Division)`**:
   - Accesses the full **Central Web Console** (Control Center, AI Planning, Gantt Planner, Corridor View, Analytics).

2. **`Supervisor & Field Engineer (S&T / Engg)`**:
   - Accesses the **Field Operations Console**.
   - Use the top toggle (**`[ 📱 Mobile View | 🖥️ Web View ]`**) to switch between the mobile app view and the expanded web console.

*(Note: You can type any Employee ID and Password to sign in during prototype demonstration).*

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more details.
