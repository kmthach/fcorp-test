
'use client'

import React, { useEffect, useState } from 'react';
import Book from '../components/Book';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';

interface Comment {
  id: string;
  text: string;
  replies?: Comment[];
}

interface Book {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
  description: string;
  price: number;
  comments: Comment[];
}

const BookPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    fetch('http://localhost:3000/books')
      .then((response) => response.json())
      .then((data) => setBooks(data.data.map((book:any)=> ({...book, comments: []}))))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);
  const handleAddComment = (comment: string, bookId: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      text: comment,
    };

    const updatedBooks = books.map((book) => {
      if (book.id === bookId) {
        return { ...book, comments: [...book.comments, newComment] };
      }
      return book;
    });

    setBooks(updatedBooks);
  };

  const handleReply = (reply: string, parentId: string, bookId: string) => {
    const updatedBooks = books.map((book) => {
      if (book.id === bookId) {
        const updatedComments = book.comments.map((comment) => {
          if (comment.id === parentId) {
            const updatedReplies: Comment[] = comment.replies
              ? [...comment.replies, { id: Date.now().toString(), text: reply }]
              : [{ id: Date.now().toString(), text: reply }];
            return { ...comment, replies: updatedReplies };
          }
          return comment;
        });

        return { ...book, comments: updatedComments };
      }
      return book;
    });

    setBooks(updatedBooks);
  };

  const handleEditComment = (commentId: string, newText: string, bookId: string) => {
    const updatedBooks = books.map((book) => {
      if (book.id === bookId) {
        const updatedComments = book.comments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, text: newText };
          }
          return comment;
        });

        return { ...book, comments: updatedComments };
      }
      return book;
    });

    setBooks(updatedBooks);
  };

  const handleDeleteComment = (commentId: string, bookId: string) => {
    const updatedBooks = books.map((book) => {
      if (book.id === bookId) {
        const updatedComments = book.comments.filter((comment) => comment.id !== commentId);
        return { ...book, comments: updatedComments };
      }
      return book;
    });

    setBooks(updatedBooks);
  };

  return (
    <div>
      {books.map((book) => (
        <div key={book.id}>
          <Book
            title={book.title}
            author={book.author}
            publishedDate={book.publishedDate}
            description={book.description}
            price={book.price}
          />
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Comments</h2>
            <CommentForm onSubmit={(comment) => handleAddComment(comment, book.id)} />
            {book.comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onReply={(reply) => handleReply(reply, comment.id, book.id)}
                onEdit={(newText) => handleEditComment(comment.id, newText, book.id)}
                onDelete={() => handleDeleteComment(comment.id, book.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookPage;