import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useReducer,
} from "react";
import axios from "axios";
import { reducer, posts } from "../reducers/userReducer";
import { userContext } from "../App";
export const LikeContext = createContext();

const Item = ({ _id, title, body, likes, image, postedBy: { name } }) => {
  const { state, dispatch } = useContext(userContext);
  const { state2, dispatch2, posts } = useContext(LikeContext);
  console.log(state, "faltttttttttttttttt");

  const likePost = (id) => {
    code("like", id);
  };

  const dislikePost = (id) => {
    code("dislike", id);
  };

  const code = (url, id) => {
    let auth = localStorage.getItem("auth");
    axios
      .put(
        `http://localhost:3000/posts/${url}`,
        { postId: id },
        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.likes);
        const all = posts.map((item) => {
          if (id == item._id) {
            console.log("i am groot");
            return response.data;
          } else {
            return item;
          }
        });
        dispatch2({ type: "POST", payload: all });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="card home" >
      <h5>{name}</h5>
      <div className="card-image hcard">
        <img src={image} />
        <span className="card-title">{title}</span>
      </div>

      <div className="card-content">
        <p>
          <i className="material-icons">favorite_border</i>
          {likes.includes(state._id) ? (
            <i
              className="material-icons"
              onClick={() => {
                dislikePost(_id);
              }}
            >
              thumb_down
            </i>
          ) : (
            <i
              className="material-icons"
              onClick={() => {
                likePost(_id);
              }}
            >
              thumb_up
            </i>
          )}
        </p>
        <p>{likes.length} likes </p>
        <p>{body}</p>
      </div>
      <div className="card-action">
        <input id="last_name" type="text" className="validate" />
      </div>
    </div>
  );
};

export default function Home() {
  // const [get, set] = useState([]);

  const [state2, dispatch2] = useReducer(reducer, posts);

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts/all")
      .then((response) => {
        // set(response.data.doc);
        // dispatch({ type: "USER", payload: auth });

        dispatch2({ type: "POST", payload: response.data.doc });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <LikeContext.Provider value={{ state2, dispatch2, posts }}>
      {posts.map((item, k) => {
        return <Item key={k} {...item} />;
      })}
    </LikeContext.Provider>
  );
}
