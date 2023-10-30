import { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { PostImage } from "../components/PostImage";
import "./PostedBlogDetails.css";
import "./PostCreate.css";
import { FaRegWindowClose } from "react-icons/fa";

export default function PostCreate() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  //id generator copied from react router tutorial
  let id = Math.random().toString(36).substring(2, 9);

  const handleImageSuccess = (imageUrl) => {
    setUrl(imageUrl);
  };

  //buttons function to clickable from unclickable
  let buttonStatus;

  if (text === "" || title === "" || url === "") {
    buttonStatus = "post inactive";
  } else {
    buttonStatus = "post";
  }
  //this is from moment.js
  let datetime = new Date();
  datetime = moment(datetime).format("YYYY-MM-DD");

  const resetField = () => {
    setText("");
    setTitle("");
    setUrl("");
    setShowModal(false);
  };

  const postIt = () => {
    if (text !== "" && title !== "" && url !== "") {
      localStorage.setItem(
        id,
        JSON.stringify({
          id: id,
          title: title,
          text: text,
          author: "Anonymous_User",
          date: datetime,
          likes: 0,
          isLiked: false,
          ImageUrl: url,
          comments: [],
        })
      );
      alert("Your newly written blog has been posted!");
      resetField();
    } else {
      alert("Please fill up the title, text, and the image\nThanks!");
    }
  };
  window.localStorage.setItem(
    "track_changes",
    "last changes from add blog post"
  );

  return (
    <>
      <div className="single-blog">
        <Link to="/" className="link-back">
          {"< "}Blog
        </Link>
        <div className="flex-row newpost-container">
          <h2 className="n-label">New Post</h2>
          <div className="new-detail flex-row">
            <div className="single-blog-image">
              <figure className="add-image-background">
                {url === "" ||
                url ===
                  "https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg" ? (
                  <PostImage addImageSuccessful={handleImageSuccess} />
                ) : (
                  <img
                    src={url}
                    alt={`image of ${title}`}
                    className="image-preview"
                  />
                )}
              </figure>
            </div>
            <div className="add-portion">
              <h3 className="n-title">Add title*</h3>
              <form className="newpost-form">
                <textarea
                  className="newpost-title"
                  value={title}
                  placeholder="Type here your Blogs' title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </form>

              <h3 className="n-text">Add text*</h3>
              <form className="newpost-form">
                <textarea
                  className="newpost-text"
                  value={text}
                  placeholder="Type here your Blogs' content"
                  onChange={(e) => setText(e.target.value)}
                />
              </form>

              <button className={buttonStatus} onClick={postIt}>
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
