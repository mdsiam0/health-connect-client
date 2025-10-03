## HealthConnect: Medical Camp Management System (MCMS)


This project is a Medical Camp Management System (MCMS) developed using the MERN stack. It's designed to efficiently help organizers and participants manage and coordinate medical camps, featuring separate, secure dashboards for different user roles.

<hr>

## 🔗 Live Site Access


- Website Name: HealthConnect
- Live Site URL: [(https://healthconnect-ph.netlify.app/)]
- Organizer Username: mdsiam5112@gmail.com
- Organizer Password:	25252525




<hr>

## ✨ Key Features
This platform is built with a focus on usability, security, and efficiency, encompassing the following core features:

MERN Stack Foundation: Built on a robust and scalable architecture using MongoDB, Express, React, and Node.js.

Role-Based Secure Dashboards: Implements distinct, private dashboards for Organizers and Participants with segregated functionality.

JWT Authentication: Utilizes JSON Web Tokens (JWT), stored in Local Storage, to secure routes and manage session persistence without redirecting users on reload.

Advanced Data Handling: All data fetching (GET requests) is managed using TanStack Query for efficient caching, synchronization, and state management.

Comprehensive Camp Management (Organizer): Organizers can effortlessly Add, View, Update, and Delete camp details.

Secure Payment Gateway: Features Stripe integration for secure processing of camp fees, updating payment status on success.

Dynamic Filtering & Sorting: The Available Camps page supports searching, and sorting by criteria like Most Registered, Camp Fees, and Camp Name.

Participant Analytics: Participants get a dedicated dashboard route with Recharts-based analytics visualizing their registered camp history.

Feedback & Ratings System: Participants can provide feedback and ratings post-payment, which is then displayed prominently on the homepage.

Custom Alert System: Provides a smooth user experience with Sweet Alerts/Toasts for all CRUD operations and successful authentication, replacing default browser alerts.

Responsive Design: Ensures a seamless experience across all devices (mobile, tablet, and desktop) with a fully responsive layout, including the dashboards.

Environment Variable Security: Sensitive credentials (Firebase config, MongoDB URI) are securely hidden using Environment Variables.

<hr>

## 💻 Technology Stack
Frontend: React, React Router DOM, TanStack Query, Tailwind, Daisy UI, Recharts, React Hook Form.

Backend: Node.js, Express.js, MongoDB (Mongoose), JWT.

Database: MongoDB.

Authentication: Firebase Authentication (for social login/email-password), JWT (for secure route access).

Payment: Stripe.

Styling: Tailwind CSS.


## npm packages

- npm create vite@latest
- npm install tailwindcss @tailwindcss/vite
- npm i -D daisyui@latest
- npm i react-router
- npm install react-hook-form
- npm install firebase
- npm install react-icons
- npm install react-responsive-carousel
- npm install react-hot-toast
- npm install @tanstack/react-query
- npm install axios
- npm install sweetalert2
- npm install lucide-react
- npm install --save @stripe/react-stripe-js @stripe/stripe-js
- npm install stripe
- npm install recharts
- npm install react-countup
- npm install motion