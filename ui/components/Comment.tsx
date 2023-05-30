import React, { useState } from 'react';
import CommentForm from './CommentForm';

interface CommentProps {
  comment: {
    id: string;
    text: string;
    replies?: CommentProps['comment'][];
    
  };
  onReply: (reply: string, parentId: string) => void;
  onEdit: ( newText: string) => void; // New prop for editing a comment
  onDelete: (commentId: string) => void; // New prop for deleting a comment
  setReplyFormVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  isReply?: boolean;
}

const Comment: React.FC<CommentProps> = ({ comment, onReply, onEdit, onDelete, setReplyFormVisible, isReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.text);

  const handleToggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleAddReply = (reply: string) => {
    onReply(reply, comment.id);
    setShowReplyForm(false);
    if (setReplyFormVisible) {
      setReplyFormVisible(false);
    }
  };

  const handleEditComment = () => {
    setEditMode(true);
  };

  const handleSaveEdit = () => {
    if (editedComment.trim() !== '') {
      onEdit(editedComment);
      setEditMode(false);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedComment(comment.text);
  };

  const handleDeleteComment = () => {
    onDelete(comment.id);
  };

  return (
    <div className="my-4">
      {editMode ? (
        <>
          <textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            className="border p-2 rounded"
          />
          <div className="flex justify-between mt-2">
            <button
              onClick={handleSaveEdit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-gray-700 mb-2">{comment.text}</p>
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-4">
              {comment.replies.map((reply) => (
                <Comment
                  key={reply.id}
                  comment={reply}
                  onReply={onReply}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  setReplyFormVisible={setReplyFormVisible}
                  isReply
                />
              ))}
            </div>
          )}
          {!isReply && (
            <div className="flex mt-2">
              <button
                onClick={handleToggleReplyForm}
                className="text-blue-500 underline bg-transparent border border-blue-500 hover:bg-blue-500 hover:text-white px-2 py-1 rounded"
              >
                Reply
              </button>
              <button
                onClick={handleEditComment}
                className="text-green-500 underline bg-transparent border border-green-500 hover:bg-green-500 hover:text-white px-2 py-1 ml-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteComment}
                className="text-red-500 underline bg-transparent border border-red-500 hover:bg-red-500 hover:text-white px-2 py-1 ml-2 rounded"
              >
                Delete
              </button>
            </div>
          )}
          {showReplyForm && (
            <div className="ml-4">
              <CommentForm onSubmit={handleAddReply} setReplyFormVisible={setReplyFormVisible} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Comment;
