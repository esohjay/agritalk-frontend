import Axios from "axios";
import { useUserContext } from "../context/userContext";
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
} from "../constants/user";

export const useUserActions = () => {
  const { dispatch } = useUserContext();
  const createUser = async (info) => {
    dispatch({ type: USER_REGISTER_REQUEST });
    try {
      const { data } = await Axios.post(`/api/users/`, info);
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: USER_REGISTER_FAIL, payload: message });
    }
  };
  const signinUser = async (info) => {
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
      const { data } = await Axios.post(`/api/users/signin`, info);
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      console.log("dispatch");
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: USER_SIGNIN_FAIL, payload: message });
    }
  };

  const getUserDetails = async (id) => {
    dispatch({ type: USER_DETAILS_REQUEST });
    try {
      const { data } = await Axios.get(`/api/users/${id}`);
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_DETAILS_FAIL, payload: message });
    }
  };

  const updateUser = async (info) => {
    dispatch({ type: USER_UPDATE_REQUEST });
    try {
      const { data } = await Axios.put(`/api/users/${info.id}`, info);
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: USER_UPDATE_FAIL, payload: message });
    }
  };
  const updatePassword = async (info) => {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    try {
      const { data } = await Axios.put(`/api/users/password/${info.id}`, info);
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: UPDATE_PASSWORD_FAIL, payload: message });
    }
  };

  const signout = () => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_SIGNOUT });
    document.location.href = "/signin";
  };

  return {
    createUser,
    signinUser,
    signout,
    updateUser,
    getUserDetails,
    updatePassword,
  };
};
