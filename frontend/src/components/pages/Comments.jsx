import { useState, useEffect } from "react";
import axios from "axios";
import { createComments, getComments } from "../../../APIRoutes";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Comments = ({ blogId, onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await axios.get(getComments(blogId));
        console.log(res)
        const fetchedComments = Array.isArray(res.data.comments)
          ? res.data.comments
          : [];

        const sortedComments = fetchedComments.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setComments(sortedComments);
        setError(null);
      } catch (err) {
        console.error("Error fetching comments", err);
        setError("Failed to load comments");
        toast.error("Failed to load comments");
      } finally {
        setLoading(false);
      }
    };

    if (blogId) fetchComments();
  }, [blogId]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      toast.warning("Comment cannot be empty");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Please login to comment");
        return;
      }

      const res = await axios.post(
        createComments(blogId),
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments([res.data.comment, ...comments]);
      setNewComment("");
      toast.success("Comment added successfully");
    } catch (error) {
      console.error("Error submitting comment", error);
      toast.error(error.response?.data?.message || "Failed to add comment");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-2xl shadow-lg w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-xl font-semibold text-gray-800">
            {comments.length === 1 ? "1 Comment" : `${comments.length} Comments`}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Close comments"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Comments Box */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
          {loading ? (
            <div className="flex justify-center items-center h-20">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="border border-gray-200 rounded-lg p-3 bg-gray-50"
              >
                <div className="flex items-center gap-2 mb-1">
                  {/* <img 
                    src={comment.avatar || '/default-avatar.png'} 
                    alt={comment.username} 
                    className="w-6 h-6 rounded-full"
                    onError={(e) => { e.target.src = '/default-avatar.png'; }}
                  /> */}
                  <div className="text-sm font-bold text-gray-700">
                    @{comment.username}
                  </div>
                </div>
                <div className="text-gray-800 text-sm mt-1">
                  {comment.content}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(comment.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic text-center py-4">No comments yet. Be the first to comment!</p>
          )}
        </div>

        {/* Comment Input */}
        <div className="mt-auto">
          <textarea
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
            rows={3}
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={loading}
          />

          {/* Submit Button */}
          <button
            onClick={handleCommentSubmit}
            disabled={loading || !newComment.trim()}
            className={`mt-2 w-full bg-blue-600 text-white font-medium px-5 py-2 rounded-lg hover:bg-blue-700 transition ${
              (loading || !newComment.trim()) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </div>
    </div>
  );
};