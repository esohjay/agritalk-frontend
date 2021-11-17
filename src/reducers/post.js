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
  POST_STATUS_RESET,
} from "../constants/post";
export const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return { ...state, loading: true };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        createdPost: action.payload,
        success: true,
      };
    case CREATE_POST_FAIL:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_POST_REQUEST:
      return { ...state, loading: true };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        editedPost: action.payload,
        success: true,
      };
    case UPDATE_POST_FAIL:
      return { ...state, loading: false, error: action.payload };

    case ALL_POSTS_REQUEST:
      return { ...state, loading: true };
    case ALL_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        success: true,
      };
    case ALL_POSTS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER_POSTS_REQUEST:
      return { ...state, loading: true };
    case USER_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        userPosts: action.payload,
        //posts: action.payload,
        userPostsSuccess: true,
      };
    case USER_POSTS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case POST_DETAILS_REQUEST:
      return { ...state, loading: true };
    case POST_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload,
        success: true,
      };
    case POST_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case LIKE_POST_REQUEST:
      return { ...state, loading: true };
    case LIKE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        like: action.payload,
        success: true,
      };

    case LIKE_POST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case POST_STATUS_REQUEST:
      return { ...state, loading: true };
    case POST_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        editedPost: action.payload,
        changedStatus: true,
      };
    case POST_STATUS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case POST_STATUS_RESET:
      return { ...state, changedStatus: false };

    case BOOKMARK_POST_REQUEST:
      return { ...state, loading: true };
    case BOOKMARK_POST_SUCCESS:
      return {
        ...state,
        loading: false,

        bookmarked: true,
      };
    case BOOKMARK_POST_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
