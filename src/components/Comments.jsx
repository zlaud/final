import { supabase } from "../client";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Comments = () => {
  const [comments, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const readComments = async () => {
      const { data } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", id);
      setComment(data);
    };
    readComments();
  }, []);

  console.log(newComment);

  const addComment = async () => {
    try {
      const { error } = await supabase.from("comments").insert({
        comment: newComment,
        post_id: id,
      });
      if (error) {
        throw error;
      }
      setNewComment("");
      const readComments = async () => {
        const { data } = await supabase
          .from("comments")
          .select("*")
          .eq("post_id", id);
        setComment(data);
      };
      readComments();
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addComment();
    }
  };

  return (
    <div className="m-5">
      <h3 className="text-neutral-500">Comments:</h3>
      <div>
        {comments &&
          comments.map((comment, index) => (
            <div
              key={index}
              className="border rounded-lg p-3 m-2 bg-white drop-shadow-md bg-opacity-70 font-light"
            >
              <h2>{comment.comment}</h2>
            </div>
          ))}

        <div>
          <input
            type="text"
            placeholder="Leave a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border rounded-lg p-3 m-2 bg-white drop-shadow-md bg-opacity-90 font-light w-[98.75%]"
          />
        </div>
      </div>
    </div>
  );
};
export default Comments;
