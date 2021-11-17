import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddPost from "./screens/AddPost";
import Dashboard from "./screens/Dashboard";
import EditPost from "./screens/EditPost";

import Homepage from "./screens/HomePage";
import Post from "./screens/Post";
import Register from "./screens/Register";
import UpdateUser from "./screens/UpdateUser";
import Signin from "./screens/Signin";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/addpost" component={AddPost}></Route>

      <Route path="/" exact component={Homepage}></Route>
      <Route path="/user/:id" exact component={Dashboard}></Route>
      <Route path="/signin" exact component={Signin}></Route>
      <Route path="/register" exact component={Register}></Route>
      <Route path="/post/:id" exact component={Post}></Route>
      <Route path="/editpost/:id" exact component={EditPost}></Route>
      <Route path="/updateprofile/:id" exact component={UpdateUser}></Route>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
