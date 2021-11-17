import React from "react";
import { Link } from "react-router-dom";
import { usePostActions } from "../actions/postActions";
import {
  FaRegHeart,
  FaRegEdit,
  FaRegTrashAlt,

  // FaHeart,
} from "react-icons/fa";
export default function Post({ post }) {
  const { likePost, deletePost } = usePostActions();
  return (
    <article className="post">
      <div className="img-container">
        <img src={post?.image?.url} alt={post.title} />
      </div>
      <div className="post-body">
        <h3>
          <Link to={`/post/${post._id}`}>{post.title}</Link>
        </h3>
        <em> posted on {post.createdAt.substring(0, 10)}</em>
      </div>
      <div className="underline"></div>
      <div className="post-footer">
        <div className="post-footer-author">
          <img src={post?.image?.url} alt={post.title} />
          <p> by {post?.author?.username}</p>
        </div>

        <div className="post-options">
          <p>{post.likes?.counts}</p>
          <div className="post-options-icon">
            <FaRegHeart onClick={() => likePost(post._id)} />
          </div>
          <div className="post-options-icon">
            <Link to={`/editpost/${post?._id}`}>
              <FaRegEdit />
            </Link>
          </div>

          <div className="post-options-icon">
            <FaRegTrashAlt onClick={() => deletePost(post._id)} />
          </div>
        </div>
      </div>
    </article>
  );
}
