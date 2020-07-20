import React, { useContext } from "react";
import { Link ,useHistory} from "react-router-dom";
import { userContext } from "../App";
const Navbar = () => {
  const { state, dispatch } = useContext(userContext);
  const history=useHistory();
  const handle=()=>{
    
            localStorage.clear();
            dispatch({type:"CLEAR"});
            history.push("/login");
          
  }

  const show = () => {
    if (state) {
      return [
        <li>
          <Link to="/profile">Profile</Link>
        </li>,
        <li>
          <Link to="/createPost">Create Post</Link>
        </li>,

        <li>
          <Link onClick={handle}>Logout</Link>
        </li>,
      ];
    } else {
      return [
        <li>
          <Link to="/login">Log In</Link>
        </li>,
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>,
      ];
    }
  };
  return (
    <div>
      <nav style={{width:"100% !important"}}>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo left">
            pagla
          </a>
          <ul id="nav-mobile" className="right ">
            {show()}
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
