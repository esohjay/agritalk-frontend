import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context/store";
import { useUserActions } from "../actions/userActions";
import { useHistory } from "react-router-dom";
function AddPost(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const { state } = useGlobalContext();
  const { loading, success, userInfo } = state;
  const history = useHistory();
  const { createUser, signout } = useUserActions();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("password don't match");
    } else {
      createUser({ password, fullname, username, email });
    }
  };
  useEffect(() => {
    if (userInfo) {
      history.goBack();
    }
  }, [history, userInfo]);
  console.log(userInfo);
  const hist = (e) => {
    signout();
  };
  return (
    <section className="section-center">
      <h3>Add Post</h3>
      {loading && <h3>...Loading</h3>}
      {success && <h3>...Posted</h3>}
      <form className="lorem-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="fullname">Full Name</label>
        <input
          type="text"
          name="fullname"
          id="fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="confirm-password">Password</label>
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="btn">Add Post</button>
      </form>
      <button onClick={hist}>back</button>
    </section>
  );
}

export default AddPost;
