import { useState, useEffect, createContext, useContext } from "react";
import { Link } from "react-router-dom";
//date formatter
import moment from "moment";

import PaginatedItems from "../components/Pagination";

import "./PostedBlog.css";
import commentIcon from "./comment-icon.svg";

const UserContext = createContext(); //as per instruction, and turn out to be the most appropriate solution since I used pagination

export default function PostedBlog() {
  const [favoriteOnly, setFavoriteOnly] = useState(false); //use for filtering favorite cards
  const [blogPosts, setBlogPosts] = useState([]); //container of the blog posts data

  //initiate extracting data from local storage and store to blogPosts
  useEffect(() => {
    let postData = [];
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) === "track_changes") {
        continue;
      }
      postData.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
    postData.shift();
    if (postData !== null) setBlogPosts(postData);
  }, []);

  //stores the sorted list based on date (latest to oldest)
  //this will ensure that new blog post will render on the first slot of the grid
  const sortedList = blogPosts.sort((x, y) => {
    (x = new Date(x.date)), (y = new Date(y.date));
    return y - x;
  });

  //toggle the favorite posts
  const filteredList =
    favoriteOnly === true
      ? sortedList.filter((item) => item.isLiked === true)
      : sortedList;
  //toggle the format of the button based on the selected button [Allpost || Favorites]
  const allPostFormat = !favoriteOnly ? "button-dynamic" : "-";
  const favoriteFormat = favoriteOnly ? "button-dynamic" : "-";

  //setter function - all post
  const allPost = () => {
    setFavoriteOnly(false);
  };
  //setter function - favorite
  const favoritesPost = () => {
    setFavoriteOnly(true);
  };

  //updater function to update the blog posts data - use for useContext
  const updateBlog = (blog) => {
    setBlogPosts(blog);
  };

  return (
    <div className="post-layout">
      <div className="flex-row post-buttons">
        <div className="flex-row post-filter">
          <button onClick={allPost} className={allPostFormat}>
            All posts
          </button>
          <button onClick={favoritesPost} className={favoriteFormat}>
            Favorites
          </button>
        </div>
        <Link to="/post/create">
          <button className="flex-row plus-button">
            <p className="plus-icon">+</p>&nbsp;
            <p className="plus-label">Add Post</p>
          </button>
        </Link>
      </div>
      <UserContext.Provider value={{ blogPosts, updateBlog }}>
        <PaginatedItems
          itemsPerPage={6}
          arrayObject={filteredList}
          blogPosts={blogPosts}
        />
      </UserContext.Provider>
    </div>
  );
}

export function Items({ currentItems }) {
  //consume the value of user context
  //blogpost data and updater function
  const passData = useContext(UserContext);

  //handle the selected ID so that the specific ID update in the UI the heart icon
  const selectIDhandler = (itemID) => {
    //determine the index
    let index = passData.blogPosts.findIndex((x) => itemID.id == x.id);
    //determine whether this ID.liked is true or false
    let liked = passData.blogPosts[index].isLiked;
    //give the corresponding response based on the status
    let newCount =
      liked === false
        ? (itemID.likes = itemID.likes + 1)
        : (itemID.likes = itemID.likes - 1);
    let newLike =
      liked === false ? (itemID.isLiked = true) : (itemID.isLiked = false);
    //update the specific ID
    let oneBlogUpdate = {
      ...passData.blogPosts[index],
      isLiked: newLike,
      likes: newCount,
    };
    //then update the whole data so that it will render in the UI
    let wholeBlogUpdate = passData.blogPosts.map((data) => {
      return {
        ...data,
        oneBlogUpdate,
      };
    });
    //consume the updater function
    passData.updateBlog(wholeBlogUpdate);
    //override the specific key on the local storage
    window.localStorage.setItem(
      oneBlogUpdate.id,
      JSON.stringify(oneBlogUpdate)
    );
    //this will ensure that the default setItem will not override the modified version of items in the localstorage
    window.localStorage.setItem(
      "track_changes",
      "last changes from clicking heart icon"
    );
  };

  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div className="post-card" key={item.id}>
            <Link to={`/post/${item.id}`}>
              <figure className="post-card-img">
                <img
                  src={item.ImageUrl}
                  alt={`${item.id}-img`}
                  className="post-card-img"
                ></img>
              </figure>
            </Link>

            <div className="card-info">
              <div className="title-description">
                <Link to={`/post/${item.id}`}>
                  <h3 className="post-card-title">{item.title}</h3>
                  <p className="post-card-text">{item.text}</p>
                </Link>
              </div>

              <hr className="divider" />
              <div className="flex-row post-details">
                <div className="date-author">
                  <p>{moment(item.date).format("MMMM D Y")}</p>
                  <p>&nbsp;</p>
                  <p>{item.author}</p>
                </div>
                <div className="flex-row comment-favorite">
                  <div className="flex-row comment-counts">
                    <Link to={`/post/${item.id}`}>
                      {" "}
                      <img
                        src={commentIcon}
                        alt="icon-comment"
                        className="icons"
                      />
                    </Link>

                    <p>{item.comments.length}</p>
                  </div>

                  <div className="flex-row favorite-count">
                    <p
                      className="fav-icons"
                      onClick={(e) => {
                        e.stopPropagation();
                        selectIDhandler(item);
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
                      )}
                    </p>
                    <p>&nbsp;</p>
                    <p>{item.likes}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
