import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useGlobalContext } from "../context/store";
import { usePostActions } from "../actions/postActions";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
function AddPost(props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  // const [isPublished, setIsPublished] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState(EditorState.createEmpty());
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [imageUploaded, setImageUploaded] = useState({});
  const [image, setImage] = useState({});
  const [errorUpload, setErrorUpload] = useState("");
  const { state } = useGlobalContext();
  const { loading, success, createdPost } = state;

  const { createPost } = usePostActions();

  const uploadedImages = [];

  const uploadFileHandler = async (e) => {
    const files = e.target.files[0];

    const bodyFormData = new FormData();

    bodyFormData.append("file", files);
    console.log(...bodyFormData);
    console.log(files);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post(`/api/posts/upload`, bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      uploadedImages.push(data);
      setLoadingUpload(false);
      setImageUploaded(uploadedImages);
      setImage(data);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  useEffect(() => {
    if (createdPost) {
      props.history.push(`/post/${createdPost._id}`);
    }
  });
  const uploadCallback = async (file) => {
    const bodyFormData = new FormData();

    bodyFormData.append("file", file);

    setLoadingUpload(true);
    try {
      const { data } = await Axios.post(`/api/posts/upload`, bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      uploadedImages.push(data);
      setLoadingUpload(false);
      setImageUploaded(uploadedImages);
      return { data: { link: data.url } };
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createPost({
      title,
      tags,
      category,
      image,
      isDraft,
      //isPublished,
      postImages: imageUploaded,
      description: convertToRaw(description.getCurrentContent()),
    });
  };

  return (
    <section className="section">
      <section className="section-center">
        <div className="form-section">
          <h3>Add Post</h3>
          {loading && <h3>...Loading</h3>}
          {success && <h3>...Posted</h3>}
          <form className="form-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                name="category"
                id="category"
                className="form-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                name="tags"
                id="tags"
                className="form-input"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <em>Separate each tag with space</em>
            </div>
            <div className="form-control">
              <label htmlFor="image">Display Image</label>
              <input
                color="blue.700"
                type="file"
                placeholder="Upload Image"
                className="form-input"
                onChange={uploadFileHandler}
              />
            </div>
            <div className="form-control">
              <label htmlFor="post">Write Post</label>
              <Editor
                editorState={description}
                onEditorStateChange={(editorState) =>
                  setDescription(editorState)
                }
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                wrapperStyle={{
                  border: "2px solid green",
                  marginBottom: "20px",
                }}
                editorStyle={{ height: "300px", padding: "10px" }}
                toolbar={{
                  image: {
                    uploadCallback,
                    previewImage: true,
                    defaultSize: {
                      height: "150px",
                      width: "150px",
                    },
                  },
                }}
                placeholder="Compose your post"
              />
            </div>
            <button onClick={() => setIsDraft(true)} className="btn-block btn">
              Save
            </button>
            <button className="btn-block btn">Publish</button>
          </form>
        </div>
      </section>
    </section>
  );
}

export default AddPost;
