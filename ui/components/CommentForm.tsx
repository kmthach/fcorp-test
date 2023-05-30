import React, { useState } from 'react';

interface CommentFormProps {
    onSubmit: (comment: string, parentId?: string) => void;
    setReplyFormVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, setReplyFormVisible }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (comment.trim() !== '') {
        onSubmit(comment);
        setComment('');
        if (setReplyFormVisible) {
            setReplyFormVisible(false);
        }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex my-2">
        <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-grow border p-2 rounded-l"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r">
            Add
        </button>
        </form>
    );
};

export default CommentForm;