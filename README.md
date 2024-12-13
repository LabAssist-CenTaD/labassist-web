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

## 📂 Project Structure

```
labassist-frontend/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Application pages
│   ├── services/       # API communication logic
│   ├── styles/         # CSS and styling
│   └── App.js          # Main application file
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```

## 📄 Licence

This project is licensed under the MIT Licence. See the `LICENSE` file for details.

## 🔗 API Repository

The API (backend) for this project is available at: [labassist-api](https://github.com/LabAssist-CenTaD/labassist-api.git)
