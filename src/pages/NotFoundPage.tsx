import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="text-center">
      <h1 className="text-black text-9xl font-bold">404</h1>
        <div
          className="bg-cover bg-center h-96 flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
          }}
        >
        </div>
        <div className="mt-[-50px]">
          <h3 className="text-4xl font-semibold">Looks like you're lost</h3>
          <p className="text-xl">The page you're looking for is not available!</p>
          <a
            href="/"
            className="inline-block mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
