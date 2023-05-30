import React from 'react';


interface BookProps {
    title: string;
    author: string;
    publishedDate: string;
    description: string;
    price: number;
  }
  
  const Book: React.FC<BookProps> = ({ title, author, publishedDate, description, price }) => {
    return (
      <div className="max-w-md mx-auto p-4 border shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-700 font-semibold mb-2">Author: {author}</p>
        <p className="text-gray-700 mb-2">Published Date: {publishedDate}</p>
        <p className="text-gray-700 mb-4">{description}</p>
        <p className="text-green-600 font-bold text-lg">Price: ${price}</p>
      </div>
    );
  };
  
  export default Book;
