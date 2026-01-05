# 📰 Blog Application (Invite-Only Admin System)

A secure, scalable blog application where only a **SuperAdmin** can access the admin panel, invite editors by email, and manage content — while public users can read blogs without authentication.

Built with **Node.js, Express, TypeScript, and MongoDB**, following a modular architecture and industry best practices.

---

## ✨ Features

### 🔐 Authentication & Authorization

- **JWT-based Authentication**: Secure access using JSON Web Tokens.
- **Role-Based Access Control (RBAC)**: Fine-grained permissions for different user roles.
- **Invite-Only Editor System**: Editors are added via invitations, maintaining a controlled environment.
- **No Public Registration**: Prevents unauthorized account creation.

### 👑 Roles

- **SuperAdmin**:
  - Full access to the admin dashboard.
  - Ability to invite and manage Editors.
  - Complete control over all blogs and users.
- **Editor**:
  - Create, edit, and publish blogs.
  - Manage their own content.
- **Public**:
  - Read published blogs without needing to log in.

### 📝 Blog Management

- **Draft & Publish**: Support for workflow states.
- **Role-Based Permissions**: Specific actions tied to user roles.
- **Public APIs**: Optimized endpoints for consuming content on front-end applications.

---

## 🧱 Architecture

The project follows a **modular folder structure** for better maintainability and scalability.

- **Modular Design**: Each feature (auth, user, blog) is isolated in its own module.
- **Clean Separation of Concerns**: Controllers, services, routes, and models are clearly separated.
- **Type-Safety**: Comprehensive TypeScript implementation ensures robust data handling.
- **Production-Ready**: Robust startup flow with database connection and SuperAdmin seeding.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB + Mongoose
- **Security**: JWT, bcrypt
- **Validation**: Zod 

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── modules/
│   │   ├── auth/           # Authentication logic
│   │   ├── user/           # User management
│   │   ├── blog/           # Blog content management
│   ├── middlewares/
│   │   ├── globalErrorHandler.ts
│   │   └── notFound.ts
│   └── routes/             # Centralized routing logic
|
├── lib/
│   ├── conectDB.ts        # Database connection
│   ├── seedSuperAdmin.ts  # SuperAdmin auto-seeding
│   ├── AppError.ts        # Custom error handling
│   └── sendResponse.ts    # Standardized response utility
│
├── config/
│   └── index.ts            # Environment variables & configuration
│
├── app.ts                  # Application configuration
└── server.ts               # Server entry point
```

---

## ⚙️ Environment Variables
copy .env.example to .env and fill the values
---

## 🔐 SuperAdmin Creation (Important)

There is **NO signup API** for the SuperAdmin. The SuperAdmin is created automatically on server startup using the environment variables provided.

### How it works:

1. On server start, the application checks if a SuperAdmin exists.
2. If not found, it creates one using `SUPERADMIN_EMAIL` and `SUPERADMIN_PASSWORD`.
3. This process is **idempotent**, meaning it is safe to run on every restart.

```typescript
// Internal flow in server.ts
await connectDB();
await seedSuperAdmin();
```

---

## ▶️ Getting Started

### 1️⃣ Install dependencies

```bash
npm install
# or
pnpm install
```

### 2️⃣ Run in development

```bash
npm run dev
```

### 3️⃣ Verify Startup

Upon success, you should see one of the following in your terminal:

- `🔥 SuperAdmin created`
- `✅ SuperAdmin already exists`

---

## 📜 License

This project is licensed under the [ISC License](LICENSE).
