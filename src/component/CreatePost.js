import React, { useEffect, useState } from "react";
import axios from "axios";
import {useHistory} from "react-router-dom"



const CreatePost = () => {
  let [title, setTitle] = useState("");
  let [body, setBody] = useState("");
  let [file, setFile] = useState("");
  
const history = useHistory();

  const handle = async () => {
  let p= await upload (); 
    await pp(p);
  };
const upload=async ()=>{
   const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "dyblyklrx");

    try {
      let response = await fetch(
        "https://api.cloudinary.com/v1_1/dyblyklrx/image/upload",
        {
          method: "post",
          body: data,
        }
      );

      response = await response.json();
  
      console.log(response);
     
      return response.url;

    } catch (e) {
      console.log(e);
    }
}
const pp=(p)=>{
  console.log(p,"OOOOOOO");
let auth=localStorage.getItem("auth");
console.log(auth);
  axios
    .post(
      "http://localhost:3000/posts",
      {
        title,
        body,
        image: p,
      },
      {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      }
    )
    .then((respo) => {
      console.log(respo);
      history.push("/profile");

    })
    .catch((err) => {
      if (err.response.statusText === "Unauthorized")
        console.log(err.response.statusText);
      history.push("/login");
    });
}
  return (
    <div className="card  post">
      <div className="card-content ">
        <div className="card-title">Instagram Post</div>
        <div className="inputField">
          <input
            id="email_inline"
            type="text"
            className="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="inputField">
          <input
            id="message"
            type="text"
            className="message"
            placeholder="message"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              type="text"
              placeholder="Upload your image"
            />
          </div>
        </div>
      </div>
      <div className="card-action">
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
          onClick={handle}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
