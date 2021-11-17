import React, { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import { useCommentContext } from "../context/commentContext";
import { useCommentActions } from "../actions/commentActions";
//import { usePostActions } from "../actions/postActions";
import ReplySection from "../components/ReplySection";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import {
  FaRegHeart,
  FaReply,
  FaRegEdit,
  FaRegTrashAlt,
  // FaHeart,
} from "react-icons/fa";
//import { LIKE_COMMENT_RESET } from "../constants/comment";
export default function CommentSection({ comment }) {
  const [commentEdit, setCommentEdit] = useState("");
  const [showCommentEdit, setShowCommentEdit] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyBox, setReplyBox] = useState(false);
  const [reply, setReply] = useState("");
  const { state } = useCommentContext();
  const { createdReply, commentUpdated, commentDeleted } = state;
  // const [text, setText] = useState("");
  const { createReply, editComment, deleteComment, likeComment } =
    useCommentActions();
  // const { getPostDetails } = usePostActions();
  const editCommentBtn = (cId) => {
    editComment({ comment: commentEdit, cId });
  };
  const handleShowCommentEdit = (comment) => {
    setShowCommentEdit(!showCommentEdit);

    setCommentEdit(comment);
  };
  const handleReplySubmit = (id) => {
    createReply(id, { reply });
  };
  useEffect(() => {
    setShowCommentEdit(false);

    setReplyBox(false);

    if (createdReply) {
      setReply("");
    }
  }, [createdReply, commentUpdated, commentDeleted]);
  const handleLike = async (id) => {
    await likeComment(id);

    //dispatch({ type: LIKE_COMMENT_RESET });
  };
  console.log(state);
  return (
    <div>
      <div className="comment-author">
        <div className="avater">
          <img
            src={comment?.author?.image?.url}
            alt={comment?.author?.username}
            className="photo"
          />
        </div>
        <p>{comment?.author?.username}</p>
      </div>
      {showCommentEdit ? (
        <div style={{ marginBottom: "30px" }}>
          <div className="form-control">
            <textarea
              type="text "
              className="form-input"
              value={commentEdit}
              onChange={(e) => setCommentEdit(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn"
            onClick={() => editCommentBtn(comment._id)}
          >
            Edit
          </button>
        </div>
      ) : (
        <p>{comment?.comment}</p>
      )}

      <div className="comment-icons">
        <div className="comment-icon">
          <p>{comment.likes.counts > 0 ? comment.likes.counts : null}</p>
        </div>

        <div className="comment-icon">
          <FaRegHeart onClick={() => handleLike(comment._id)} />
        </div>

        <div className="like comment-icon">
          <FaReply onClick={() => setReplyBox(!replyBox)} />
        </div>

        <div className="like comment-icon">
          <FaRegEdit onClick={() => handleShowCommentEdit(comment.comment)} />
        </div>
        <div className="like comment-icon">
          <FaRegTrashAlt onClick={() => deleteComment(comment._id)} />
        </div>
      </div>
      {replyBox && (
        <div>
          <div className="form-control">
            <textarea
              type="text "
              className="form-input-mini"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
          </div>
          <button
            type="submit"
            onClick={() => handleReplySubmit(comment._id)}
            className="btn btn-primary"
          >
            reply
          </button>
        </div>
      )}
      {comment.replies.length > 0 && (
        <div
          className="reply-notification"
          onClick={() => setShowReplies(!showReplies)}
        >
          <h5>
            ({comment.replies.length})
            {comment.replies.length === 1 ? "Reply" : "Replies"}
          </h5>
          <div className="reply-notification-icon">
            {showReplies ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </div>
        </div>
      )}

      {showReplies &&
        comment.replies.map((reply) => (
          <section key={reply._id} className="reply">
            <ReplySection reply={reply} />
          </section>
        ))}
    </div>
  );
}
