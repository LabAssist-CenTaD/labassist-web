# LabAssist Frontend

LabAssist is an AI-powered laboratory assistant designed to assist students in performing chemistry experiments accurately while reducing teacher workload. This repository contains the frontend code for the LabAssist system, built using **React**.

## 📜 Features

- **Interactive Timeline**: Navigate through the experiment's recorded timeline to review specific procedural errors.
- **Performance Summary Dashboard**: Provides a comprehensive overview of student performance and detected errors.
- **Experiment Playback Controls**: Replay experiments with annotated feedback for better understanding.
- **Real-time Feedback Integration**: Seamless integration with the backend to display detected errors during live experiments.

## 🛠️ Technologies Used

- **React**: For building a dynamic and interactive user interface.
- **Axios**: For communicating with the Flask backend API.
- **Iconsax**: Beautiful icons from Vuesax.

## 📂 Project Structure

```
labassist-web/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images and other static files
│   ├── components/     # Reusable UI components
│   ├── config/         # Configuration files
│   ├── hooks/          # Custom React hooks
│   ├── managers/       # State or logic management
│   ├── providers/      # Context providers for global state
│   ├── shared/         # Shared utilities or types
│   ├── styles/         # CSS and styling
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # General utility functions
│   ├── App.css         # Application-wide styles
│   ├── App.tsx         # Main application component
│   ├── index.css       # Global CSS
│   ├── main.tsx        # Application entry point
│   └── vite-env.d.ts   # Vite environment definitions
├── .gitignore          # Git ignore rules
├── .prettierrc         # Prettier configuration
├── eslint.config.js    # ESLint configuration
├── index.html          # HTML template
├── LICENSE             # Licence information
├── package-lock.json   # Lockfile for dependencies
├── package.json        # Project metadata and dependencies
├── tsconfig.app.json   # TypeScript configuration for the app
├── tsconfig.json       # General TypeScript configuration
├── tsconfig.node.json  # TypeScript configuration for Node.js
└── vite.config.ts      # Vite configuration
```

## 📄 Licence

This project is licensed under the MIT Licence. See the `LICENSE` file for details.

## 🔗 API Repository

The API (backend) for this project is available at: [labassist-api](https://github.com/LabAssist-CenTaD/labassist-api.git)
