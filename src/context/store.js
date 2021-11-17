import React, { useContext, useReducer } from "react";

import { reducer } from "../reducers/post";
//import { commentReducer } from "../reducers/comment";
//import { useCreatePost, useGetPosts } from "../actions/postActions";

const AppContext = React.createContext();

const initialState = {
  loading: false,
  posts: [],
  post: {},
  createdPost: undefined,
  editedPost: undefined,
  changedStatus: false,
  success: false,
  bookmarked: false,
  userPosts: [],
  userPostsSuccess: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
