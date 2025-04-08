E-commerce Frontend

This is the frontend of the E-commerce application built with React and Vite, styled using Tailwind CSS. It interacts with a backend API to provide a complete shopping experience.

📊 Features

Product listing and detailed product view

Add to cart and cart management

User authentication (Login/Register)

Order placement and order history

Admin panel to manage products

📚 Tech Stack

React

Vite

Tailwind CSS

Axios

React Router DOM

React Toastify

⚖️ Environment Variables

Create a .env file in the root of the frontend folder:

VITE_API_BASE_URL=https://shopease.duckdns.org/api

🚀 Getting Started

1. Install Dependencies

npm install

2. Run Locally

npm run dev

3. Build for Production

npm run build

🌐 Deployment

The frontend is deployed using Vercel. Push to the main branch triggers a new deployment.

🛡️ Security Notes

Ensure the backend API URL uses HTTPS in production. Avoid using public IPs or insecure links.

📝 Notes

Authentication credentials and cart data are managed via context.

Axios interceptors are used for global request handling.
