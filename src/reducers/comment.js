import {
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAIL,
  LIKE_COMMENT_REQUEST,
  LIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_FAIL,
  LIKE_COMMENT_RESET,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  CREATE_REPLY_REQUEST,
  CREATE_REPLY_SUCCESS,
  CREATE_REPLY_FAIL,
  UPDATE_REPLY_REQUEST,
  UPDATE_REPLY_SUCCESS,
  UPDATE_REPLY_FAIL,
  LIKE_REPLY_REQUEST,
  LIKE_REPLY_SUCCESS,
  LIKE_REPLY_FAIL,
  LIKE_REPLY_RESET,
  DELETE_REPLY_REQUEST,
  DELETE_REPLY_SUCCESS,
  DELETE_REPLY_FAIL,
} from "../constants/comment";

export const commentReducer = (state, action) => {
  switch (action.type) {
    case CREATE_COMMENT_REQUEST:
      return { loading: true };
    case CREATE_COMMENT_SUCCESS:
      return {
        loading: false,
        createdComment: action.payload,
        success: true,
      };

    case CREATE_COMMENT_FAIL:
      return { loading: false, error: action.payload };

    //Repliess
    case CREATE_REPLY_REQUEST:
      return { loading: true };
    case CREATE_REPLY_SUCCESS:
      return {
        loading: false,
        createdReply: action.payload,
        success: true,
      };
    case CREATE_REPLY_FAIL:
      return { loading: false, error: action.payload };

    //Update Comment
    case UPDATE_COMMENT_REQUEST:
      return { loading: true };
    case UPDATE_COMMENT_SUCCESS:
      return {
        loading: false,
        updatedComment: action.payload,
        commentUpdated: true,
      };
    case UPDATE_COMMENT_FAIL:
      return { loading: false, error: action.payload };

    //Update Reply
    case UPDATE_REPLY_REQUEST:
      return { loading: true };
    case UPDATE_REPLY_SUCCESS:
      return {
        loading: false,
        updatedReply: action.payload,
        replyUpdated: true,
      };
    case UPDATE_REPLY_FAIL:
      return { loading: false, error: action.payload };

    // Delete Repliess
    case DELETE_REPLY_REQUEST:
      return { loading: true };
    case DELETE_REPLY_SUCCESS:
      return {
        loading: false,
        deletedReply: action.payload,
        replyDeleted: true,
      };
    case DELETE_REPLY_FAIL:
      return { loading: false, error: action.payload };

    // Delete Comment
    case DELETE_COMMENT_REQUEST:
      return { loading: true };
    case DELETE_COMMENT_SUCCESS:
      return {
        loading: false,
        deletedComment: action.payload,
        commentDeleted: true,
      };
    case DELETE_COMMENT_FAIL:
      return { loading: false, error: action.payload };

    // Like Repliess
    case LIKE_REPLY_REQUEST:
      return { loading: true };
    case LIKE_REPLY_SUCCESS:
      return {
        loading: false,
        likedReply: action.payload,
        replyLiked: true,
      };
    case LIKE_REPLY_FAIL:
      return { loading: false, error: action.payload };
    case LIKE_REPLY_RESET:
      return { replyLiked: false };

    // Like Comment
    case LIKE_COMMENT_REQUEST:
      return { loading: true };
    case LIKE_COMMENT_SUCCESS:
      return {
        loading: false,
        likedComment: action.payload,
        commentLiked: true,
      };
    case LIKE_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    case LIKE_COMMENT_RESET:
      console.log("reset");
      return { commentLiked: false };

    default:
      return state;
  }
};
