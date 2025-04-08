# 🛍️ E-commerce Frontend

This is the frontend of the **E-commerce Application** built using **React**, **Vite**, and **Tailwind CSS**. It interacts with a secure backend API to provide a complete online shopping experience.

---

## 🚀 Features

- 🛒 Product listing and detailed product view  
- ➕ Add to cart and manage cart items  
- 🔐 User authentication (Login / Register)  
- 📦 Place orders and view order history  
- 🧑‍💼 Admin panel to manage products  

---

## 🧰 Tech Stack

- **React** (with Hooks & Context API)  
- **Vite** for lightning-fast bundling  
- **Tailwind CSS** for styling  
- **Axios** for HTTP requests  
- **React Router DOM** for routing  
- **React Toastify** for notifications  

---

## ⚙️ Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_API_BASE_URL=https://shopease.duckdns.org/api

```
---


## 🚧 Project Setup

Follow these instructions to set up the project locally:

## 📥 Clone the Repository

```
git clone https://github.com/<YOUR_GITHUB_USERNAME>/E-commerce-frontend.git
cd E-commerce-frontend
```
## 📦 Install Dependencies
```
npm install
```

## 🚀 Run the Development Server
```
npm run dev
```

The application will be accessible at http://localhost:5173.

## 🏗️ Build for Production

To generate an optimized production build:
  ```
npm run build
```



## 🌐 Deployment

The frontend is deployed to Vercel.
Every push to the main branch automatically triggers a new deployment.

---

## 🔐 Security Best Practices

	•	Always use HTTPS endpoints for your backend API.
	•	Avoid exposing sensitive environment variables or credentials.
	•	Regularly update dependencies and review security practices.


##  📌 Important Notes

	•	Authentication and shopping cart state management is implemented via React’s Context API.
	•	API requests and global error handling are managed with Axios interceptors for better maintainability and consistency.
	•	Ensure your backend API is always running and accessible.

##  📄 License

This project is open source and available under the MIT License.

## Enjoy building and scaling your e-commerce app! 🚀🛍️✨
