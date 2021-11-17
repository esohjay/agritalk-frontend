import React from "react";
//import { useGlobalContext } from "../context/store";
//import { usePostActions } from "../actions/postActions";
import { Link } from "react-router-dom";

export default function RelatedPost({ posts }) {
  const relatedPost = [];
  if (posts && posts.length) {
    posts.forEach((post, i) => {
      if (i <= 4) {
        relatedPost.push(post);
      }
    });
  }

  return (
    <div className="related-post">
      {relatedPost?.map((post) => {
        return (
          <ul key={post._id}>
            <li>
              <Link to={`/post/${post._id}`}>{post.title}</Link>
            </li>
          </ul>
        );
      })}
    </div>
  );
}
