import Axios from "axios";
import { useGlobalContext } from "../context/store";
import {
  POST_STATUS_REQUEST,
  POST_STATUS_SUCCESS,
  POST_STATUS_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAIL,
  ALL_POSTS_REQUEST,
  ALL_POSTS_SUCCESS,
  ALL_POSTS_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  USER_POSTS_REQUEST,
  USER_POSTS_SUCCESS,
  USER_POSTS_FAIL,
  BOOKMARK_POST_REQUEST,
  BOOKMARK_POST_SUCCESS,
  BOOKMARK_POST_FAIL,
} from "../constants/post";
export const usePostActions = () => {
  const { dispatch } = useGlobalContext();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const header = {
    headers: { Authorization: `Bearer ${userInfo?.token}` },
  };
  const createPost = async (info) => {
    dispatch({ type: CREATE_POST_REQUEST });
    console.log(userInfo);
    try {
      const { data } = await Axios.post(`/api/posts`, info, header);
      dispatch({ type: CREATE_POST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: CREATE_POST_FAIL, payload: message });
    }
  };

  const getPosts = async ({ page = 1, limit = 10 }) => {
    dispatch({ type: ALL_POSTS_REQUEST });
    try {
      const { data } = await Axios.get(
        `/api/posts?page=${page}&limit=${limit}`
      );
      dispatch({ type: ALL_POSTS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ALL_POSTS_FAIL, payload: message });
    }
  };

  const getPostDetails = async (id) => {
    dispatch({ type: POST_DETAILS_REQUEST });
    try {
      const { data } = await Axios.get(`/api/posts/${id}`);
      dispatch({ type: POST_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: POST_DETAILS_FAIL, payload: message });
    }
  };

  const getUserPosts = async () => {
    dispatch({ type: USER_POSTS_REQUEST });
    try {
      const { data } = await Axios.get(`/api/posts/user`, header);
      dispatch({ type: USER_POSTS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_POSTS_FAIL, payload: message });
    }
  };

  const likePost = async (id) => {
    dispatch({ type: LIKE_POST_REQUEST });

    try {
      const { data } = await Axios.put(`/api/posts/like/${id}`, {}, header);

      dispatch({ type: LIKE_POST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: LIKE_POST_FAIL, payload: message });
    }
  };
  const changePostStatus = async (info) => {
    dispatch({ type: POST_STATUS_REQUEST });

    try {
      const { data } = await Axios.put(
        `/api/posts/status/${info.id}`,
        info,
        header
      );

      dispatch({ type: POST_STATUS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: POST_STATUS_FAIL, payload: message });
    }
  };

  const editPost = async (info) => {
    dispatch({ type: UPDATE_POST_REQUEST });
    console.log(userInfo.token);
    try {
      const { data } = await Axios.put(`/api/posts/${info.id}`, info, header);

      dispatch({ type: UPDATE_POST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: UPDATE_POST_FAIL, payload: message });
    }
  };
  const bookmarkPost = async (id) => {
    dispatch({ type: BOOKMARK_POST_REQUEST });
    try {
      const { data } = await Axios.put(
        `/api/users/bookmark-posts/${id}`,
        {},
        header
      );
      dispatch({ type: BOOKMARK_POST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: BOOKMARK_POST_FAIL, payload: message });
    }
  };

  const deletePost = async (id) => {
    dispatch({ type: DELETE_POST_REQUEST });

    try {
      const { data } = await Axios.delete(`/api/posts/${id}`, header);

      dispatch({ type: DELETE_POST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: DELETE_POST_FAIL, payload: message });
    }
  };
  return {
    createPost,
    getPosts,
    getPostDetails,
    likePost,
    editPost,
    deletePost,
    changePostStatus,
    getUserPosts,
    bookmarkPost,
  };
};
