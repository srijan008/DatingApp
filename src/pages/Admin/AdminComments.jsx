import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminComments = () => {
  const [comments, setComments] = useState([]); // Store comments fetched from the backend
  const [reply, setReply] = useState({}); // Store replies for each comment

  // Fetch comments from the backend
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('/api/comments'); // Backend endpoint to fetch comments
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  const handleReply = async (commentId) => {
    try {
      const response = await axios.post(`/api/comments/${commentId}/reply`, {
        reply: reply[commentId],
      });

      if (response.status === 200) {
        alert('Reply submitted successfully!');
        setReply((prev) => ({ ...prev, [commentId]: '' })); // Clear the reply box
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  // Handle input change for replies
  const handleInputChange = (commentId, value) => {
    setReply((prev) => ({ ...prev, [commentId]: value }));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Admin Comments Dashboard</h1>
      {comments.length === 0 ? (
        <p>Loading comments...</p>
      ) : (
        <div>
          {comments.map((comment) => (
            <div
              key={comment.id}
              style={{
                border: '1px solid #ddd',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
              }}
            >
              <p><strong>User:</strong> {comment.user}</p>
              <p><strong>Comment:</strong> {comment.text}</p>
              <p><strong>Date:</strong> {new Date(comment.date).toLocaleString()}</p>
              <textarea
                rows="3"
                style={{ width: '100%', marginTop: '10px' }}
                placeholder="Write a reply..."
                value={reply[comment.id] || ''}
                onChange={(e) => handleInputChange(comment.id, e.target.value)}
              />
              <button
                style={{ marginTop: '10px', padding: '5px 10px' }}
                onClick={() => handleReply(comment.id)}
              >
                Submit Reply
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminComments;
