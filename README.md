# Lumina SaaS

Lumina is a modern SaaS application built with **React**, **Vite**, and **Firebase**. It features a high-converting landing page, secure authentication, a protected user dashboard, and a robust settings system.

## 🚀 Features

### **Landing Page**

A professional, high-performance landing page designed to convert:

- **Hero Section**: Immersive background with fade-in animations.
- **Features**: Interactive grid with **3D Tilt** effects on hover.
- **How It Works**: Step-by-step process with **Pop & Wiggle** animations and a drawing connector line.
- **Testimonials**: Social proof with **Floating + Scale** card animations.
- **Pricing**: Clear pricing tiers with a **Pulse** effect on the popular plan.
- **FAQ**: Objection handling with **Cascade** entrance and **Focus Glow** effects.
- **Footer**: 4-column layout with integrated **Newsletter Signup**.

### **Core Application**

- **Authentication**: Secure Google & Email/Password login via **Firebase Auth**.
- **Dashboard**: Protected user area with responsive sidebar navigation.
- **Settings**: Comprehensive user preferences (Profile, Security, Notifications, Billing).
- **Profile Management**: Custom avatar upload (stored via Base64 in Firestore) with real-time sync.
- **Dark Mode**: System-wide dark mode with persistent state.

### **New Pages**

- **Careers Page**:
  - **Hero & Culture**: Immersive visuals with parallax effects.
  - **Job Board**: Dynamic list of open positions.
  - **Application System**: Seamless **Modal Form** integrated with Firebase.
  - **Resume Upload**: Auto-converts files to Base64 for secure storage.
- **Contact Page**:
  - **Split Layout**: Professional design with "What to expect" guidelines.
  - **Validation**: Real-time form validation and user feedback.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite
- **UI Library**: **shadcn/ui** (Headless UI + Tailwind)
- **Styling**: Tailwind CSS v4, Lucide React
- **Animation**: **Framer Motion** (Complex gestures & transitions)
- **Backend**: Firebase (Auth, Firestore)
- **Email**: EmailJS (Welcome emails)

## 📦 Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/VictorChidex1/lumina-saas.git
    cd lumina
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file with your Firebase and EmailJS keys (see `.env.example`).

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 🚀 Deployment

### Vercel (Recommended)

The project is optimized for Vercel. Simply import the repository and add your environment variables.

### GitHub Pages

To deploy to GitHub Pages:

```bash
npm run deploy
```

## 📄 License

This project is licensed under the MIT License.
