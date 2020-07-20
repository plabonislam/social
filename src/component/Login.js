import React,{useEffect,useState,useContext} from "react";
import {Link,useHistory} from "react-router-dom"
import axios from "axios";
import {userContext} from "../App";

const Login=()=> {


const{state,dispatch}=useContext(userContext);

  
  let[email,setEmail]=useState("");
  let[password,setPassword]=useState("");
  const history=useHistory();


    const handleSubmit = () => {
  
      email = email.trim();
      password = password.trim();
      

      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        alert("Invalid Email");
        return;
      }

      console.log(email, password);
      axios
        .post("http://127.0.0.1:3000/users/signin", {
          email,
          password,
        })
        .then((response) => {
          console.log(response);
          localStorage.setItem("auth",response.data.token);
          let st = JSON.stringify(response.data.UserInfo);
          console.log(st);
          localStorage.setItem(
            "UserInfo",
            st
          );
          alert("GO");
          dispatch({ type: "USER", payload: response.data.UserInfo });
          history.push("/");
        })
        .catch((err) => {
          alert("login Failed!! ")
        });
    };


  return (
    <div className="card  log">
      <div className="card-content ">
        <div className="card-title">Instagram</div>
        <div className="inputField">
          <input
            id="email_inline"
            type="email"
            className="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inputField">
          <input
            id="password"
            type="password"
            className="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
      </div>
      <div className="card-action">
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
          onClick={handleSubmit}
        >
          Log In
        </button>
        <h6>
          <Link to="/signup">Create Account?</Link>
        </h6>
      </div>
    </div>
  );
}

export default Login;