import React ,{createContext,useReducer,useEffect,useContext}from "react";
import Navbar from "./component/Navbar.js";
import { BrowserRouter as Router, Route, Link, Switch, useHistory } from "react-router-dom";
import SignUp from "./component/SignUp.js";
import Login from "./component/Login.js";

import "./App.css";
import Profile from "./component/Profile.js";
import Home from "./component/Home.js";
import CreatePost from "./component/CreatePost.js";

import {reducer,initialState}from "./reducers/userReducer";

export const userContext=createContext();


const Routing=()=>{
const history=useHistory(); 
  const {state,dispatch}=useContext(userContext);

  useEffect(() => {
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo"));

  console.log(UserInfo, "evailllllll");
  if (UserInfo) {
    dispatch({ type: "USER", payload: UserInfo });
  } else {
    history.push("/login");
  }
  
  }, []);
return(<Switch>
  <Route path="/" exact>
    <Home />
  </Route>
  <Route path="/login" exact>
    <Login />
  </Route>
  <Route path="/signup" exact>
    <SignUp />
  </Route>

  <Route path="/profile" exact>
    <Profile />
  </Route>

  <Route path="/createPost" exact>
    <CreatePost />
  </Route>
</Switch>);

}



function App() {

const [state,dispatch]=useReducer(reducer,initialState);

  return (
    <userContext.Provider value={{state,dispatch}}>
      <Router>
        <Navbar />
        
        <Routing />
      </Router>
    </userContext.Provider>
  );
}

export default App;
