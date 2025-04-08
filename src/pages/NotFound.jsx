export default function NotFound() {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-800">
        <h1 className="text-4xl font-bold mb-2">🚫 404 - Page Not Found</h1>
        <p className="text-lg mb-4">Oops! The page you're looking for doesn't exist.</p>
        <a
          href="/"
          className="text-blue-600 underline hover:text-blue-800 transition"
        >
          Go back home
        </a>
      </div>
    );
  }