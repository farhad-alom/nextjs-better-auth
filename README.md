# Better Auth + MongoDB Learning Project

A beginner-friendly **Next.js App Router authentication project** created for **learning purposes only**.

> This project is not intended to be a production-ready authentication system. The goal is to understand how Next.js, Better Auth, MongoDB, React client components, forms, sessions, and authentication routes work together.

## 🧑‍💻 Project Purpose

This project is mainly for practicing:

- Next.js App Router
- JavaScript (not TypeScript)
- Better Auth
- MongoDB Atlas
- Email/password authentication
- Sign up and sign in forms
- Client-side authentication
- Session handling
- Sign out
- Responsive navigation
- Form validation
- HeroUI components

## 🛠️ Main Technologies

- **Next.js**
- **React**
- **JavaScript**
- **Better Auth**
- **MongoDB / MongoDB Atlas**
- **HeroUI**
- **Tailwind CSS**
- **@gravity-ui/icons**

## 🔐 Authentication Flow

The project uses Better Auth for email/password authentication.

### Sign Up

The sign-up form collects:

- Name
- Email
- Password

The password validation requires:

- At least 8 characters
- At least 1 uppercase letter
- At least 1 number

The form sends the data through:

`signUp.email(...)`

The current implementation can be seen in the sign-up page.

## 🔑 Sign In

The sign-in form collects:

- Email
- Password

It uses:

`signIn.email(...)`

The current code also enables `rememberMe` and uses `/` as the callback URL.

## 🚪 Sign Out

The navigation bar checks the current session.

If a user is logged in, it displays the user's name and a **Sign Out** button.

The project uses:

`signOut()`

## 👤 Session

The Navbar uses:

`useSession()`

to read the current authentication session.

While the session is loading, a spinner and `Loading...` message are displayed.

If a session exists, the user's name is shown; otherwise, Sign In and Sign Up links are displayed.

## 🗄️ MongoDB

The Better Auth configuration uses MongoDB through:

`@better-auth/mongo-adapter`

The database connection comes from the environment variable:

`BETTER_AUTH_DB_URL`

The current configuration creates/uses the database:

`better-auth-db`

### Environment Variable

Create a `.env.local` file and keep your real MongoDB connection string there.

Example:

```env
BETTER_AUTH_DB_URL="your-mongodb-connection-string"
```

**Do not commit your real connection string or other secrets to GitHub.**

## 🌐 Better Auth API Route

The project connects Better Auth to the Next.js App Router using:

`toNextJsHandler(auth)`

The route exports both:

- `GET`
- `POST`

This allows Better Auth requests to be handled through the Next.js API route.

## 📁 Important Project Files

```text
app/
├── layout.js
├── page.js
├── components/
│   └── Navbar.jsx
│
├── sign-in/
│   └── page.jsx
│
├── sign-up/
│   └── page.jsx
│
└── api/
    └── auth/
        └── [...all]/
            └── route.js

lib/
├── auth.js
└── auth-client.js
```

> The exact folder structure may differ slightly depending on where the uploaded files are placed in your project.

## 📄 File Responsibilities

### `lib/auth.js`

This is the server-side Better Auth configuration.

It:

- Imports Better Auth
- Creates a MongoDB client
- Selects the `better-auth-db` database
- Enables email/password authentication
- Uses the MongoDB adapter

It also contains:

```js
dns.setDefaultResultOrder("ipv4first");
```

This was added to prefer IPv4 DNS results in the Node.js environment.

### `lib/auth-client.js`

This creates the Better Auth client for React.

It exports:

- `signIn`
- `signUp`
- `signOut`
- `useSession`

The client is configured with the local development URL:

`http://localhost:3000`

### `app/api/auth/[...all]/route.js`

This connects Better Auth with the Next.js App Router:

```js
export const { POST, GET } = toNextJsHandler(auth);
```

### `Navbar.jsx`

The Navbar is a client component.

It:

- Reads the current session
- Shows loading state
- Shows Sign In / Sign Up when logged out
- Shows the user's name when logged in
- Provides Sign Out
- Has a responsive mobile menu

### `sign-up/page.jsx`

The sign-up page:

1. Prevents the default form submission
2. Reads the form using `FormData`
3. Converts the data to an object
4. Calls `signUp.email()`

### `sign-in/page.jsx`

The sign-in page:

1. Prevents the default form submission
2. Reads the form using `FormData`
3. Validates email/password
4. Calls `signIn.email()`
5. Uses `rememberMe: true`
6. Redirects to `/` through the callback URL

### `layout.js`

The root layout:

- Loads Geist fonts
- Loads global CSS
- Includes the Navbar
- Renders page content through `{children}`

## 🎨 UI and Styling

The project uses HeroUI components such as:

- `Button`
- `Form`
- `Input`
- `TextField`
- `Label`
- `FieldError`
- `Description`
- `InputGroup`
- `Spinner`
- `Link`

Tailwind CSS classes are also used for layout and styling.

## 🧪 Learning Checklist

Use this project to understand these concepts one by one:

- [ ] What is Next.js App Router?
- [ ] What does `"use client"` mean?
- [ ] What is a Server Component?
- [ ] What is a Client Component?
- [ ] What is an API route?
- [ ] What is a dynamic route such as `[...all]`?
- [ ] What is Better Auth?
- [ ] What is `createAuthClient()`?
- [ ] What is `useSession()`?
- [ ] What is `signUp.email()`?
- [ ] What is `signIn.email()`?
- [ ] What is `signOut()`?
- [ ] What is a MongoDB connection string?
- [ ] What is MongoDB Atlas?
- [ ] What is a MongoDB adapter?
- [ ] What is `FormData`?
- [ ] What is `Object.fromEntries()`?
- [ ] Why are environment variables used?
- [ ] Why should secrets not be committed to Git?

## ▶️ Running the Project

Install dependencies:

```bash
npm install
```

Then create `.env.local` and add your MongoDB connection string.

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## ⚠️ Learning Project Notice

This repository is for **learning and experimentation**.

The implementation may contain unfinished parts, console logs, placeholder links, or simplified configuration. These are useful while learning and should be reviewed before using similar code in a real production application.

Never expose:

- MongoDB connection strings
- API keys
- Authentication secrets
- Other private environment variables

## 📚 What I Am Learning From This Project

The main goal is not simply to make authentication work.

The goal is to understand the connection between:

```text
Next.js
   ↓
React Components
   ↓
Better Auth Client
   ↓
Better Auth Server
   ↓
MongoDB Adapter
   ↓
MongoDB Atlas
```

By building this project step by step, I can understand how authentication works instead of only copying authentication code.

---

**Project type:** Learning / Practice

**Language:** JavaScript

**Framework:** Next.js

**Authentication:** Better Auth

**Database:** MongoDB Atlas
