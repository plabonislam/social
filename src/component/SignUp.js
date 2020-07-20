import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const SignUp = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = () => {
    name = name.trim();
    email = email.trim();
    password = password.trim();
    if (name.length < 3 || password.length < 3) {
      return name.length < 3
        ? alert( " name length must be more than 3")
        : alert("password length  must be more than 3");
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        alert("Invalid Email")
      return;
    }

    console.log(name, email, password);
    axios
      .post("http://127.0.0.1:3000/users/signup", {
        name,
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        //alert("GO");
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
        alert("User Creation failed !!")
      });
  };

  return (
    <div>
      <div className="card  log">
        <div className="card-content">
          <div className="card-title">Sign Up</div>
          <div>
            <input
              id="name"
              type="text"
              className="name"
              placeholder="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
          </div>

          <div>
            <input
              id="email_inline"
              type="email"
              className="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
          <div>
            <input
              id="password"
              type="password"
              className="validate"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Submit
          </button>
          <h6>
            <Link to="/login">Already have an Account?</Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
