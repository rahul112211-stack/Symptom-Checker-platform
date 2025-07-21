# Medical Symptom Checker Application

## Overview

This is a full-stack web application that provides a medical symptom checker interface. Users can select symptoms from a predefined list and receive potential medical condition matches with severity levels and treatment recommendations. The application features a modern React frontend with shadcn/ui components and a basic Express backend structure.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom medical theme variables
- **State Management**: React Query (TanStack Query) for server state
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Module System**: ES Modules (type: "module")
- **Development**: tsx for TypeScript execution in development
- **Production**: esbuild for bundling and compilation
- **Middleware**: JSON parsing, URL encoding, custom request logging

### Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon Database serverless driver
- **ORM**: Drizzle ORM with Zod integration for type safety
- **Migrations**: Drizzle Kit for schema migrations
- **Development Storage**: In-memory storage implementation for development/testing
- **Session Storage**: PostgreSQL sessions via connect-pg-simple

### Database Schema
- **Users Table**: Basic user structure with id, username, and password fields
- **Schema Location**: Shared between client and server at `/shared/schema.ts`
- **Type Safety**: Drizzle Zod integration for runtime validation

## Key Components

### Frontend Components
- **SymptomChecker**: Main application page handling symptom selection and condition matching
- **SymptomCard**: Individual symptom selection component with emoji icons
- **ConditionResult**: Display component for matched medical conditions
- **UI Components**: Complete shadcn/ui component library (buttons, cards, alerts, forms, etc.)

### Backend Components
- **Routes**: Modular route registration system with placeholder API endpoints
- **Storage Interface**: Abstracted storage layer supporting both in-memory and database implementations
- **Vite Integration**: Development server with HMR and production static file serving

### Medical Data
- **Symptoms**: Predefined list with descriptions and emoji representations
- **Conditions**: Medical conditions with associated symptoms, severity levels, and treatment recommendations
- **Matching Algorithm**: Client-side percentage-based matching system

## Data Flow

1. **User Interaction**: Users select symptoms through checkbox interface
2. **Local Processing**: Client-side algorithm calculates condition matches based on symptom overlap
3. **Result Display**: Matched conditions shown with percentage match, severity, and treatment info
4. **API Ready**: Backend structure prepared for future server-side processing and data persistence

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless database connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **express**: Backend web framework
- **wouter**: Lightweight React router

### UI Dependencies
- **@radix-ui/***: Unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Build tool and development server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: JavaScript bundler for production builds

## Deployment Strategy

### Development
- **Frontend**: Vite development server with HMR
- **Backend**: tsx for live TypeScript execution
- **Database**: Connection to Neon Database via DATABASE_URL environment variable

### Production
- **Build Process**: 
  - Frontend: Vite build to `dist/public`
  - Backend: esbuild bundle to `dist/index.js`
- **Serving**: Express serves both API routes and static frontend files
- **Database**: Production PostgreSQL via Neon Database serverless
- **Environment**: NODE_ENV-based configuration switching

### Key Features
- **Medical Theme**: Custom Tailwind configuration with medical-specific color palette
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Type Safety**: Full TypeScript coverage across frontend, backend, and shared schemas
- **Development Experience**: Hot reloading, error overlays, and integrated development tools
- **Accessibility**: Built on Radix UI primitives ensuring WCAG compliance
- **Extensible Architecture**: Modular components and storage interfaces ready for expansion