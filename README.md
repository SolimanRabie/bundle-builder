# 🔐 Frontend Bundle Builder

A responsive React application that recreates the provided **Bundle Builder** Figma design. Users can build a custom security system through a multi-step configuration process while viewing a synchronized live order summary.

Built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**, following modern frontend best practices with reusable components and centralized state management.

---

## 🚀 Features

- Multi-step accordion bundle builder
- Live review panel with real-time updates
- Data-driven UI powered by JSON
- Product variant selection
- Independent quantity tracking per variant
- Synchronized quantity steppers
- Dynamic pricing calculations
- Responsive design
- Local Storage persistence
- Reusable and modular component architecture

---

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Context API
- useReducer
- Local Storage

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── Accordion/
│   ├── Button/
│   ├── Price/
│   ├── ProductCard/
│   ├── QuantityStepper/
│   ├── ReviewItem/
│   ├── ReviewPanel/
│   └── VariantSelector/
│
├── context/
├── data/
├── hooks/
├── pages/
├── types/
├── utils/
│
├── App.tsx
└── main.tsx
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/<your-username>/bundle-builder.git
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 🏗️ Architecture

The application follows a **data-driven architecture** where products are loaded from a JSON source instead of hardcoded components.

Global state is managed using **Context API** and **useReducer**, providing a single source of truth for:

- Selected products
- Product variants
- Quantities
- Pricing
- Review panel
- Accordion state

Business logic is separated from UI components through utility functions.

---

## 🎨 Variant Management

Each product variant maintains its own quantity.

Example:

```text
Outdoor Camera

White ×2
Black ×1
```

Changing the selected variant only changes which quantity is edited. Previously selected variants remain in the review panel until removed.

---

## 💾 Persistence

The **Save my system for later** feature stores the bundle configuration in **Local Storage**.

Saved data includes:

- Selected products
- Selected variants
- Quantities
- Bundle configuration

The configuration is restored automatically when the application reloads.

---

## 📱 Responsive Design

The application is responsive across:

- Desktop
- Tablet
- Mobile

The review panel moves below the builder on smaller screens while preserving all functionality.

---

## 📌 Assignment Requirements

- ✅ Multi-step accordion
- ✅ Product variants
- ✅ Independent variant quantities
- ✅ Live review panel
- ✅ Dynamic pricing
- ✅ Responsive layout
- ✅ Local Storage persistence
- ✅ JSON-driven rendering

---

## 🔮 Future Improvements

- Backend API integration
- Unit & integration tests
- Accessibility improvements
- Product search and filtering
- Smooth animations
- Performance optimizations

---

## 👨‍💻 Author

- Soliman Rabie
- www.linkedin.com/in/soliman-rabie-017b401b8

Developed as part of a Frontend Take-Home Assignment using modern React best practices with a focus on scalability, maintainability, and clean architecture.
