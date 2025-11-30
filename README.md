# Mini Product Dashboard

A responsive product management dashboard built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 📱 **Fully Responsive Design** - Works on mobile, tablet, and desktop devices
- 🛠️ **CRUD Operations** - Create, read, update, and delete products
- 🔍 **Search & Filter** - Search products by title and filter by category
- 📊 **Dashboard** - Overview of product statistics
- 🎨 **Modern UI** - Clean, intuitive interface with dark mode support

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Data Management**: TanStack Table (React Table)
- **API**: Fake Store API
- **State Management**: React Context API
- **Form Handling**: React Hook Form, Zod validation

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Responsive Design

The application is fully responsive and adapts to different screen sizes:
- **Mobile**: Card-based layout for products
- **Tablet**: Scrollable table view
- **Desktop**: Full table view with all features

## Folder Structure

```
app/              # Next.js app router pages
components/       # Reusable UI components
  products/       # Product-specific components
  ui/             # shadcn/ui components
lib/              # Utility functions and API integration
```

## Learnings

This project demonstrates:
- Building responsive layouts with Tailwind CSS
- Implementing CRUD operations with REST APIs
- Creating reusable React components
- State management with React Context
- TypeScript best practices
- Modern Next.js 14 features

Built with ❤️ by Faraidun Bahaden