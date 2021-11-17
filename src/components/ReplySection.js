import React, { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import { useCommentActions } from "../actions/commentActions";
import {
  FaRegHeart,
  FaRegEdit,
  FaRegTrashAlt,
  // FaHeart,
} from "react-icons/fa";
import { useCommentContext } from "../context/commentContext";
export default function ReplySection({ reply }) {
  const [replyEdit, setReplyEdit] = useState("");
  const [showReplyEdit, setShowReplyEdit] = useState(false);

  // const [text, setText] = useState("");
  const { editReply, deleteReply, likeReply } = useCommentActions();
  const { state } = useCommentContext();
  const { replyUpdated, replyDeleted } = state;
  const editReplyBtn = (id) => {
    editReply({ reply: replyEdit, id });
  };
  const handleShowReplyEdit = (reply) => {
    setShowReplyEdit(!showReplyEdit);

    setReplyEdit(reply);
  };
  useEffect(() => {
    setShowReplyEdit(false);
  }, [replyUpdated, replyDeleted]);
  return (
    <div>
      <div className="comment-author">
        <div className="avater">
          <img
            src={reply?.author?.image?.url}
            alt={reply?.author?.username}
            className="photo"
          />
        </div>
        <p>{reply.author.username}</p>
      </div>
      {showReplyEdit ? (
        <>
          <div style={{ marginBottom: "30px" }}>
            <div className="form-control">
              <textarea
                type="text "
                className="form-input"
                value={replyEdit}
                onChange={(e) => setReplyEdit(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn"
              onClick={() => editReplyBtn(reply._id)}
            >
              Edit
            </button>
          </div>
        </>
      ) : (
        <p>{reply.reply}</p>
      )}

      <div className="comment-icons">
        <div className="comment-icon">
          <p>{reply.likes.counts > 0 ? reply.likes.counts : null}</p>
        </div>

        <div className="like comment-icon">
          <FaRegHeart onClick={() => likeReply(reply._id)} />
        </div>

        <div className="like comment-icon">
          <FaRegEdit onClick={() => handleShowReplyEdit(reply.reply)} />
        </div>
        <div className="like comment-icon">
          <FaRegTrashAlt onClick={() => deleteReply(reply._id)} />
        </div>
      </div>
    </div>
  );
}
