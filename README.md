# LabAssist

LabAssist is an AI-powered laboratory assistant designed to help students perform chemistry experiments more accurately while reducing teacher workload. The system uses computer vision to detect and provide real-time feedback on common mistakes during laboratory procedures, with an initial focus on titration experiments.

## 🔬 Problem Statement

In school laboratories, teachers face significant challenges:

- Managing and monitoring 30+ students simultaneously
- Keeping track of multiple experiment procedures throughout the year
- Catching minute but important procedural errors
- Ensuring safety compliance while providing individual attention

## 🎯 Key Features

- **Real-time Error Detection**: Uses advanced AI to identify common mistakes during laboratory procedures
- **Dual AI System**:
  - Object Detection using YOLOv10m for identifying laboratory equipment and safety gear
  - Action Detection using X3D_M framework for analyzing procedure execution (e.g., proper swirling technique)
- **Comprehensive UI**:
  - Timeline view for chronological error tracking
  - Summary dashboard for performance overview
  - One-click navigation to specific error instances

## 🤖 Technical Architecture

### Backend

- **Object Detection Model**
  - Built on YOLOv10m architecture
  - Trained on 4,500+ manually labeled images
  - Dataset augmented to 22,500 images
  - Detects 9 key objects: beaker, burette, pipette, conical flask, volumetric flask, funnel, white tile, face, and lab goggles

### Frontend

- **User Interface**
  - Built with Python and Tkinter
  - Interactive timeline for error navigation
  - Performance summary dashboard
  - Intuitive experiment playback controls

## 📊 Current Performance

The object detection model shows promising results with:

- > 90% mAP50 accuracy for most object classes
- Strong performance in distinguishing similar laboratory equipment (including transparent objects)
- Reliable safety equipment detection (lab goggles etc.)

## 🚀 Future Development

Planned improvements include:

- Expanding the training dataset for enhanced object detection
- Implementing the action detection model
- Completing the frontend user interface with **React**
- Integrating frontend and backend systems with **Flask**
- Writing detailed documentation for user guidance
- Expanding to other experiment types besides titration

## 🔗 References

Based on research from:
Gligorea I, et al. (2023). Adaptive Learning Using Artificial Intelligence in e-Learning: A Literature Review. Education Sciences, 13(12):1216.

## 🤝 Contributing

This project is currently under development. For more information or to contribute, please contact the development team.
