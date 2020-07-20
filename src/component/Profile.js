import React,{useEffect,useState} from 'react'
import axios from "axios"
import {useHistory} from "react-router-dom"

export default function Profile() {
 const [get,set]=useState([]);
const history=useHistory();
  useEffect(()=>{
    let auth = localStorage.getItem("auth");
    console.log(auth);
    axios
      .get(
        "http://localhost:3000/posts/byuser",

        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        }
      )
      .then((respo) => {
        console.log(respo);
        set(respo.data.doc);
      })
      .catch((err) => {
        if (err.response.statusText === "Unauthorized")
          console.log(err.response.statusText);
          localStorage.clear();
          history.push('/login')
      });
  },[])
    return (
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div className="profile">
          <div style={{ width: "40%" }}>
            <img
              style={{ borderRadius: "80px", height: "160px" }}
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="Check"
            />
          </div>
          <div style={{ width: "35%" }}>
            <h4 style={{ textAlign: "center" }}></h4>
            <div className="rightProfile">
              <h6>{get.length} posts</h6>
            </div>
          </div>
        </div>

        <div className="Gallery">
          {get.map((item, k) => {
            return (
              <img key={k} className="item" src={item.image} alt={item.title} />
            );
          })}
        </div>
      </div>
    );
}
