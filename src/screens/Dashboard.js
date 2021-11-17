import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";
import { useGlobalContext } from "../context/store";
import { useUserActions } from "../actions/userActions";
import { usePostActions } from "../actions/postActions";
import { useParams } from "react-router";
import { MdLocationPin, MdVisibilityOff, MdVisibility } from "react-icons/md";
import {
  FaRegEdit,
  FaRegTrashAlt,

  // FaHeart,
} from "react-icons/fa";
import SocialIcon from "../components/SocialIcon";
import { USER_UPDATE_RESET } from "../constants/user";
import { POST_STATUS_RESET } from "../constants/post";
import { Link } from "react-router-dom";
function Dashboard(props) {
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [openPassword, setOpenPassword] = useState(false);
  const { getUserDetails, updatePassword } = useUserActions();
  const { state, dispatch } = useUserContext();
  const { user, updatedPassword } = state;
  const { getUserPosts, deletePost, changePostStatus } = usePostActions();
  const { state: userPostsList, dispatch: postDispatch } = useGlobalContext();
  const { userPosts, changedStatus } = userPostsList;
  useEffect(() => {
    getUserDetails(id);
    //getPosts(id);
    getUserPosts();
    dispatch({ type: USER_UPDATE_RESET });
    if (changedStatus) {
      postDispatch({ type: POST_STATUS_RESET });
    }

    if (updatedPassword) {
      setConfirmPassword("");
      setPassword("");
      setCurrentPassword("");
      setOpenPassword(false);
    }
  }, [updatedPassword, changedStatus]);
  const editPage = () => {
    props.history.push(`/updateprofile/${id}`);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      window.alert("password do not match");
    } else {
      updatePassword({
        id,
        currentPassword,
        password,
      });
    }
  };

  console.log(userPostsList);
  return (
    <div>
      <section className="section-center">
        <article className="card">
          <img src={user?.image?.url} alt={user?.fullname} />
          <h4>{user?.fullname}</h4>
          <p> @{user?.username} </p>

          <h4>{user?.email}</h4>
          <p>
            <MdLocationPin /> {user?.location}
          </p>
          <SocialIcon {...user?.socials} />
          <button className="btn btn-primary" onClick={editPage}>
            Edit profile
          </button>
        </article>
      </section>
      <div className="section-center">
        <div className="card-center">
          <h4>Bio</h4>
          <p>{user?.bio}</p>
        </div>
      </div>
      <div className="section-center">
        <div className="card-center">
          <h4>Manage Posts</h4>

          {userPosts?.map((post) => (
            <div key={post._id}>
              {!post.isDraft && (
                <div className="post-mgt-list">
                  <p>
                    <Link to={`/post/${post._id}`}>{post.title}</Link>
                  </p>

                  <div className="post-options">
                    <div className="post-options-icon">
                      <MdVisibilityOff
                        onClick={() =>
                          changePostStatus({ id: post._id, isDraft: true })
                        }
                      />
                    </div>
                    <div className="post-options-icon">
                      <FaRegTrashAlt onClick={() => deletePost(post._id)} />
                    </div>
                    <div className="post-options-icon">
                      <FaRegEdit
                        onClick={() =>
                          props.history.push(`/editpost/${post?._id}`)
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="section-center">
        <div className="card-center">
          <h4>Drafted Posts</h4>
          {userPosts?.map((post) => (
            <div key={post._id}>
              {post.isDraft && (
                <div className="post-mgt-list">
                  <p>
                    <Link to={`/post/${post._id}`}>{post.title}</Link>
                  </p>
                  <div className="post-options">
                    <div className="post-options-icon">
                      <MdVisibility
                        onClick={() =>
                          changePostStatus({ id: post._id, isDraft: false })
                        }
                      />
                    </div>
                    <div className="post-options-icon">
                      <FaRegTrashAlt onClick={() => deletePost(post._id)} />
                    </div>
                    <div className="post-options-icon">
                      <FaRegEdit
                        onClick={() =>
                          props.history.push(`/editpost/${post?._id}`)
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="section-center">
        <div className="card-center">
          <h4>Reading List</h4>
          {user?.bookmarkedPosts?.map((post) => (
            <div key={post._id}>
              {!post.isDraft && (
                <p>
                  <Link to={`/post/${post._id}`}>{post.title}</Link>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="change-pw">
        <button
          className="btn btn-primary"
          onClick={() => setOpenPassword(!openPassword)}
        >
          Change Password
        </button>
      </div>

      {openPassword && (
        <div className="section-center">
          <div className="card-center">
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label htmlFor="password"> Current Password</label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  className="form-input"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label htmlFor="password"> New Password</label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label htmlFor="ConfirmPassword">Confirm Password</label>
                <input
                  type="text"
                  name="ConfirmPassword"
                  id="ConfirmPassword"
                  className="form-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button className="btn-block btn">Change Password</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
