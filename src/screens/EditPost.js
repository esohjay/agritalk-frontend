import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useGlobalContext } from "../context/store";
import { usePostActions } from "../actions/postActions";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
//import draftToHtml from "draftjs-to-html";
function EditPost(props) {
  const id = props.match.params.id;
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [isDraft, setIsDraft] = useState(false);
  const [description, setDescription] = useState(EditorState.createEmpty());
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [imageUploaded, setImageUploaded] = useState({});
  const [image, setImage] = useState({});
  const [imageToDelete, setImageToDelete] = useState({});
  const [errorUpload, setErrorUpload] = useState("");
  const { state } = useGlobalContext();
  const { loading, post, editedPost } = state;

  const { editPost, getPostDetails } = usePostActions();

  const uploadedImages = [];

  useEffect(() => {
    getPostDetails(id);

    if (!id || !post || id !== post._id) {
      getPostDetails(id);
    } else {
      setCategory(post?.category);
      setTitle(post?.title);
      setImage(post?.image);
      setIsDraft(post?.isDraft);
      const contentState = convertFromRaw(post?.description);
      const editorState = EditorState.createWithContent(contentState);
      setDescription(editorState);
    }
  }, [editedPost]);
  useEffect(() => {
    if (!id || !post || id !== post._id) {
      getPostDetails(id);
    } else {
      setCategory(post?.category);
      setTitle(post?.title);
      setImage(post?.image);
      setIsDraft(post?.isDraft);
      const contentState = convertFromRaw(post?.description);
      const editorState = EditorState.createWithContent(contentState);
      setDescription(editorState);
    }
    console.log("refresh");
  }, [post, id]);
  if (editedPost) {
    props.history.push(`/post/${editedPost._id}`);
  }
  // console.log(post?.title.valueOf());
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
      setImageToDelete(post.image.filename);
      setImage(data);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  //console.log(post);
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

    editPost({
      id,
      title,
      category,
      image,
      isDraft,
      postImages: imageUploaded,
      description: convertToRaw(description.getCurrentContent()),
      imageToDelete,
    });
  };

  return (
    <section className="section">
      <section className="section-center">
        <div className="form-section">
          {isDraft ? (
            <>
              <h3>Continue Writing Post</h3>
            </>
          ) : (
            <>
              <h3>Edit Post</h3>
            </>
          )}

          {loading && <h3>...Loading</h3>}
          {editedPost && <h3>...Posted</h3>}

          {post && (
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
                <label htmlFor="image">Change Display Image</label>
                <input
                  color="blue.700"
                  type="file"
                  placeholder="Upload Image"
                  className="form-input"
                  onChange={uploadFileHandler}
                />
              </div>
              <div>
                <input type="checkbox" on />
                <div></div>
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
              <button
                onClick={() => setIsDraft(true)}
                className="btn-block btn"
              >
                Save
              </button>
              <button
                onClick={() => setIsDraft(false)}
                className="btn-block btn"
              >
                Publish
              </button>
            </form>
          )}
        </div>
      </section>
    </section>
  );
}

export default EditPost;
