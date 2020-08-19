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
import {Link} from "react-router-dom";
export const LikeContext = createContext();

const Item = ({
  _id,
  title,
  body,
  favourite,
  likes,
  image,
  comments,
  postedBy: { name,_id :pid},
}) => {
  const { state, dispatch } = useContext(userContext);
  const { state2, dispatch2, posts } = useContext(LikeContext);
  const [mess, setMess] = useState("");
  console.log(state);
  const likePost = (id) => {
    code("like", id, "PUT");
  };

  const dislikePost = (id) => {
    code("dislike", id, "PUT");
  };
  const fav = (id) => {
    code("fav", id, "PUT");
  };

  const unfav = (id) => {
    code("unfav", id, "PUT");
  };

  const del = (id) => {
    code("del", id, "delete");
  };


  const handle = (id) => {
  console.log("JJJJJJJJJJJ")
    code("comment", id, "PUT");
  };
const clearState = () => {
  setMess("");
};
  const code = (url, id, method) => {
    let auth = localStorage.getItem("auth");
    console.log("SHOW ME ", mess);
    
    axios({
      method: method,
      url: `http://localhost:3000/posts/${url}`,
      data: { postId: id,  text:mess },

      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
      .then((response) => {
        console.log(response)
        let all = posts;
        console.log(method);
        if (method === "delete") {
          alert(response.data.mess);
          if ("Not An Author" !== response.data.mess)
            all = posts.filter((word) => word._id != id);
        } else {
          all = posts.map((item) => {
            if (id == item._id) {
              console.log("i am groot");
              //   continue;
              return response.data;
            } else {
              return item;
            }
          });
        }
        dispatch2({ type: "POST", payload: all });
      
      })
      .catch((err) => console.log(err));
      clearState();
  };

  return (
    <div className="card home">
      <h5>
        <Link to={pid === state._id ? "/profile": `/profile/${pid}`}> {name} </Link>
        <span style={{ float: "right" }}>
          {pid === state._id && (
            <i
              className="material-icons"
              onClick={() => {
                del(_id);
              }}
            >
              delete_forever
            </i>
          )}
        </span>
      </h5>
      <div className="card-image hcard">
        <img src={image} />
        <span className="card-title">{title}</span>
      </div>

      <div className="card-content">
        <p>
          {favourite.includes(state._id) ? (
            <i
              className="material-icons"
              onClick={() => {
                unfav(_id);
              }}
            >
              favorite
            </i>
          ) : (
            <i
              className="material-icons"
              onClick={() => {
                fav(_id);
              }}
            >
              favorite_border
            </i>
          )}
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
        <p>Comment--</p>
        {comments.map((it, k) => {
          return (
            <p key={k}>
              <strong>{it.name}</strong>

              <small>{it.text}</small>
            </p>
          );
        })}
      </div>

      <div className="card-action">
        <input
          id="last_name"
          type="text"
          onChange={(e) => setMess(e.target.value)}
          value={mess}
          className="validate"
        />

        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
          onClick={() => {
            handle(_id);
          }}
        >
          comment
        </button>
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
