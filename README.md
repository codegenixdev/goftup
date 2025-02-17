# Goftup - Real-time Chat Application Demo

A modern real-time chat application built with React 19, showcasing advanced technical capabilities and best practices. This project serves as a technical demonstration featuring Socket.IO integration, comprehensive internationalization, and robust architecture.

[Live Demo](https://goftup.darkube.app/)

## 🚀 Key Features

- Real-time chat functionality using Socket.IO
- Comprehensive i18n support with RTL/LTR layouts
- Dark/Light/System theme modes
- React 19 & TailwindCSS v4
- Enhanced shadcn components with React Hook Form integration
- Zustand state management with immer & persist middleware
- Clean architecture and maintainable codebase
- Live user tracking and auto-dismissal
- Admin control panel
- Responsive design with mount/unmount animations
- Accessibility-focused implementation

## 🛠️ Tech Stack

### Frontend

- React 19
- TailwindCSS v4
- Socket.IO Client
- Zustand
- React Hook Form
- shadcn/ui
- i18next

### DevOps

- Docker
- Nginx
- Hamravesh deployment service

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/codegenixdev/goftup.git

# Start the application
docker compose up -d
```

### Manual Setup

```bash
# Frontend Setup
cd frontend
npm install
npm run dev

# Backend Setup (in a separate terminal)
cd backend
npm install
npm run dev
```

## 🌟 Features in Detail

### Real-time Capabilities

- Live chat functionality
- Automatic user dismissal on tab close
- Real-time user presence tracking

### User Experience

- Mount/unmount animations
- Auto-focus on inputs
- Confirmation alerts for sensitive operations
- Comprehensive accessibility support

### Internationalization

- Full i18n support across all sections
- RTL/LTR layout support
- Localized validation errors

### Architecture & Code Quality

- Clean architecture principles
- Custom ESLint and Prettier configuration
- Custom field controllers
- Maintainable and scalable codebase

### Admin Features

- Manual user management
- User activity monitoring
- Administrative controls

## 🔧 Configuration

The project uses various configuration files for different aspects:

- ESLint and Prettier for code consistency
- Docker configuration for containerization
- Nginx configuration for production deployment

## 🙏 Acknowledgments

Special thanks to the team for providing this opportunity to demonstrate technical capabilities through this project.
