import React, { useState, useEffect } from "react";

import { useUserContext } from "../context/userContext";

import { useUserActions } from "../actions/userActions";

import { useHistory } from "react-router-dom";
function AddPost() {
  const [info, setInfo] = useState("");

  const [password, setPassword] = useState("");

  const { state } = useUserContext();
  const { loading, success, userInfo } = state;
  const history = useHistory();
  const { signinUser } = useUserActions();

  const handleSubmit = (e) => {
    e.preventDefault();

    signinUser({ password, info });
  };
  useEffect(() => {
    if (userInfo) {
      history.goBack();
    }
  });
  console.log(state);
  //console.log(post);
  const hist = (e) => {
    history.goBack();
  };
  return (
    <section className="section">
      <section className="section-center">
        <div className="form-section">
          <h3>welcome back</h3>
          {loading && <h3>...Loading</h3>}
          {success && <h3>Signed in</h3>}
          <form className="form-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-block">login</button>
          </form>
          <button onClick={hist}>back</button>
        </div>
      </section>
    </section>
  );
}

export default AddPost;
