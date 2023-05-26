import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

import moment from "moment";

import "./PostedBlogDetails.css";
import "./PostedBlog.css";
import "../layouts/RouteLayout.css";

import commentIcon from "./comment-icon.svg";
import avatarIcon from "./avatar-icon.svg";

export default function PostedBlogDetails() {
  const blogPostDetails = useLoaderData();
  const [text, setText] = useState("");
  const [blogPost, setBlogPost] = useState(
    JSON.parse(localStorage.getItem(blogPostDetails))
  );
  const [ccount, setCcount] = useState(2);

  let buttonStatus;

  if (text === "") {
    buttonStatus = "post inactive";
  } else {
    buttonStatus = "post";
  }

  //Date format type 1
  let datetime = new Date();
  datetime = moment(datetime).format("YYYY-MM-DD");
  // Date format type 2
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let day = new Date(blogPost.date);

  //Function --- Adding comment
  function onClickHandlerAdd() {
    if (text !== "") {
      setBlogPost((data) => {
        let newComment = [
          ...data.comments,
          {
            text: text,
            author: "Anonymous_user",
            date: datetime,
            likes: 0,
            isLiked: false,
          },
        ];
        return {
          ...data,
          comments: newComment,
        };
      });
    }
    setCcount(() => blogPost.comments.length + 1);
    setText("");
    window.localStorage.setItem(blogPost.id, JSON.stringify(blogPost));
  }

  //Function -- clicking on love icon on the post blog
  function onClickFav(itemID) {
    setBlogPost((data) => {
      let newLike = itemID.isLiked === false ? true : false;
      let newCount =
        itemID.isLiked === false ? itemID.likes + 1 : itemID.likes - 1;
      return {
        ...data,
        isLiked: newLike,
        likes: newCount,
      };
    });
    window.localStorage.setItem(blogPost.id, JSON.stringify(blogPost));
  }

  //Function -- clicking on love icons on the post blog comments
  const onClickFav2 = (index) => {
    const newCommentSet = blogPost.comments.map((item, i) => {
      if (i === index) {
        let newcount = item.isLiked === false ? item.likes + 1 : item.likes - 1;
        let newLike = item.isLiked === false ? true : false;
        return {
          ...item,
          isLiked: newLike,
          likes: newcount,
        };
      } else {
        return item;
      }
    });

    setBlogPost((data) => {
      return {
        ...data,
        comments: newCommentSet,
      };
    });
    window.localStorage.setItem(
      blogPost.id,
      JSON.stringify({
        ...blogPost,
        comments: newCommentSet,
      })
    );
  };

  window.localStorage.setItem(blogPost.id, JSON.stringify(blogPost));
  window.localStorage.setItem("track_changes", "changes");

  return (
    <>
      <div className="single-blog">
        <div className="link-back">
          <div className="balancer"></div>
        </div>

        <div className="flex-row single-blog-post-container">
          <div className="single-blog-image">
            <figure className="s-image fixed-image">
              <img src={blogPost.ImageUrl} alt="img" className="s-image" />
            </figure>
          </div>
          <div className="single-blog-details">
            <Link to="/" className="balancer">
              {"< Blog"}
            </Link>
            <h2 className="s-title">{blogPost.title}</h2>

            <div className="flex-row s-author-box">
              <div className="flex-row">
                <img
                  src={avatarIcon}
                  alt="author"
                  className="icon-avatar"
                ></img>
                <p className="s-author">{blogPost.author}</p>
              </div>

              <p className="s-date">
                {day.toLocaleDateString("en-US", options)}
              </p>
            </div>
            <p className="s-description">{blogPost.text}</p>

            <div className="flex-row post-details">
              <div className="flex-row comment-favorite">
                <div className="flex-row comment-counts">
                  <img src={commentIcon} alt="icon-comment" className="icons" />
                  <p>{blogPost.comments.length}</p>
                </div>
                <div className="flex-row favorite-count">
                  <span
                    className="fav-icons"
                    onClick={() => {
                      onClickFav(blogPost);
                    }}
                  >
                    {blogPost.isLiked === true ? (
                      <span
                        style={{
                          color: "blue",
                        }}
                      >
                        ♥
                      </span>
                    ) : (
                      "♡"
                    )}{" "}
                  </span>
                  <p>{blogPost.likes}</p>
                </div>
              </div>
            </div>
            <p className="flex-column leave-comment">Leave a comment</p>
            <div className="form-comment">
              <textarea
                className="write-comment"
                value={text}
                placeholder="write your comment here"
                onChange={(e) => setText(e.target.value)}
              ></textarea>
              <button
                className={buttonStatus}
                onClick={() => {
                  onClickHandlerAdd(blogPost);
                }}
              >
                Send
              </button>
            </div>
            <hr />
            <p className="comments-label" id="comment">
              Comments:
            </p>

            <ul>
              <>
                {blogPost.comments.map((item, index) => (
                  <div key={index}>
                    {console.log(typeof index, typeof ccount)}
                    {index < ccount && (
                      <div
                        key={`${index}-${item.author}`}
                        className="flex-row comment-section"
                      >
                        <img
                          src={avatarIcon}
                          alt={`${item.author}-avatar`}
                          className="icon-avatar"
                        />
                        <div className="s-commenter-data">
                          <p className="commenter">
                            {`By: `}
                            {item.author}
                            {" on "}
                            {item.date}
                          </p>

                          <p className="his-her-comment">{item.text}</p>
                          <p className="s-date"></p>
                          <div className="flex-row post-details">
                            <div className="flex-row comment-favorite">
                              <div className="flex-row favorite-count">
                                <p
                                  className="fav-icons"
                                  onClick={() => {
                                    onClickFav2(index);
                                  }}
                                >
                                  {item.isLiked === true ? (
                                    <span
                                      style={{
                                        color: "blue",
                                      }}
                                    >
                                      ♥
                                    </span>
                                  ) : (
                                    "♡"
                                  )}{" "}
                                </p>
                                <p>{item.likes}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            </ul>
            {ccount < blogPost.comments.length && (
              <p className="hide-comments">
                ....
                {ccount + 1} out {blogPost.comments.length}....
              </p>
            )}
            <button className="show-more" onClick={() => setCcount(ccount + 2)}>
              {ccount < blogPost.comments.length
                ? "Show More"
                : "No more comment(s) to load"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

//export id to useloader()
export const blogPostDetailLoader = async ({ params }) => {
  const { id } = params;
  return id;
};
