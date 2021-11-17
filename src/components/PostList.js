import React, { useEffect } from "react";
import { useGlobalContext } from "../context/store";
import { usePostActions } from "../actions/postActions";
import Pagination from "../components/Pagination";
import Post from "../components/Post";

export default function PostList() {
  const { state } = useGlobalContext();
  const { posts, loading } = state;
  const { getPosts } = usePostActions();
  useEffect(() => {
    getPosts({});
  }, []);
  if (loading) {
    return <h1>Loading..</h1>;
  }
  if (posts && posts.posts?.length < 1) {
    return (
      <h2 className="section-title">no posts matched your search criteria</h2>
    );
  }

  return (
    <section className="section">
      <h2 className="section-title">posts</h2>
      <div className="post-list-center">
        {posts.posts?.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
      </div>
      {posts && (
        <Pagination
          pageInfo={{
            hasNextPage: posts?.hasNextPage,
            hasPrevPage: posts?.hasPrevPage,
            nextPage: posts?.nextPage,
            prevPage: posts?.prevPage,
            totalPosts: posts?.totalPosts,
            totalPages: posts?.totalPages,
            page: posts?.page,
          }}
        />
      )}
    </section>
  );
}
