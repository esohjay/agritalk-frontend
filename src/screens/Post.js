import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/store";
import { usePostActions } from "../actions/postActions";
import { useCommentActions } from "../actions/commentActions";
import { useCommentContext } from "../context/commentContext";
import CommentSection from "../components/CommentSection";
//import ReplySection from "../components/ReplySection";
import RelatedPost from "../components/RelatedPost";
import { useParams } from "react-router";
import draftToHtml from "draftjs-to-html";
//import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import {
  FaRegHeart,
  FaRegEdit,
  FaRegTrashAlt,
  FaRegBookmark,
  // FaHeart,
} from "react-icons/fa";
import SocialIcon from "../components/SocialIcon";
//import { convertFromRaw } from "draft-js";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Post = (props) => {
  //const id = props.match.params.id;
  const [comment, setComment] = useState("");

  const { state } = useGlobalContext();
  const { state: commentState } = useCommentContext();
  const { createdComment, createdReply, commentLiked, replyLiked, updated } =
    commentState;
  const { post, posts } = state;
  const { id } = useParams();
  const {
    getPostDetails,
    likePost,
    deletePost,
    getPosts,
    changePostStatus,
    bookmarkPost,
  } = usePostActions();
  const { createComment } = useCommentActions();

  useEffect(() => {
    getPostDetails(id);
    getPosts({ limit: 5 });
    //console.log(id);
  }, [createdComment, updated, createdReply, replyLiked, commentLiked, id]);
  //console.log(post);
  const convertFromJSONToHTML = (text) => {
    try {
      return { __html: draftToHtml(text) };
    } catch (exp) {
      console.log(exp);
      return { __html: "Error" };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createComment(id, { comment });
    setComment("");
  };

  return (
    <div>
      {post && (
        <>
          <section className="single-post">
            <h2>{post.title}</h2>
            <div className="author-info">
              <div className="author-avatar">
                <img
                  src={post?.author?.image?.url}
                  alt={post?.author?.username}
                />
              </div>
              <div className="post-author">
                <em>Written by</em>
                <p>{post?.author?.username}</p>
              </div>
              <div className="post-date">
                <em>Posted on</em>
                <p>{post?.createdAt?.substring(0, 10)}</p>
              </div>
            </div>
            <div className="post-img">
              <img
                src={post && post.image ? post.image.url : ""}
                alt={post.title}
              />
            </div>
            <div className="post-options">
              {post?.isDraft ? (
                <>
                  <button
                    className="btn btn=primary"
                    onClick={() => props.history.push(`/editpost/${post?._id}`)}
                  >
                    Continue Writing
                  </button>
                  <button
                    className="btn btn=primary"
                    onClick={() =>
                      changePostStatus({ id: post?._id, isDraft: false })
                    }
                  >
                    Publish
                  </button>
                </>
              ) : (
                <>
                  <p>{post.likes?.counts}</p>
                  <div className="post-options-icon">
                    <FaRegHeart onClick={() => likePost(post._id)} />
                  </div>
                  <div className="post-options-icon">
                    <FaRegBookmark onClick={() => bookmarkPost(post._id)} />
                  </div>
                  <div className="post-options-icon">
                    <FaRegEdit
                      onClick={() =>
                        props.history.push(`/editpost/${post?._id}`)
                      }
                    />
                  </div>
                </>
              )}
              <div className="post-options-icon">
                <FaRegTrashAlt onClick={() => deletePost(post._id)} />
              </div>
            </div>
            <div className="tags">
              <p>Tags:</p>
              {post?.tags?.map((tag, i) => (
                <em key={`${tag}${i}`}>#{tag} </em>
              ))}
            </div>
            <div className="single-post-info">
              <div
                dangerouslySetInnerHTML={convertFromJSONToHTML(
                  post.description
                )}
              ></div>
            </div>
          </section>
        </>
      )}
      <section>
        <section className="section-center">
          <h3 style={{ textAlign: "center" }}>share your thoughts</h3>
          <form className="form-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <textarea
                type="text "
                className="form-input"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              comment
            </button>
          </form>
        </section>
      </section>
      <section>
        {post.comments && post.comments.length > 0 && (
          <>
            <h3 style={{ textAlign: "center", marginTop: "20px" }}>
              Discussions
            </h3>

            <section className="comments">
              {post?.comments?.map((comment) => (
                <div key={comment._id} className="comment-center">
                  <CommentSection comment={comment} />
                </div>
              ))}
            </section>
          </>
        )}
      </section>
      <h3 style={{ textAlign: "center" }}>About the Author</h3>
      <div className="author-section">
        <div className="author-img">
          <img src={post?.author?.image?.url} alt={post?.author?.username} />
        </div>

        <div className="author-details">
          <p>{post?.author?.username}</p>
          <SocialIcon {...post?.author?.socials} />
          <p>{post?.author?.bio}</p>
        </div>
      </div>
      <div className="related-post-container">
        <h3>You might also like:</h3>
        <RelatedPost posts={posts?.posts} />
      </div>
    </div>
  );
};

export default Post;
