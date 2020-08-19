import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory,useParams } from "react-router-dom";

export default function UserProfile() {
  const [userProfile, setProfile] = useState(null);
  const history = useHistory();
  const { userId } = useParams();
  console.log(userId);
  useEffect(() => {
    let auth = localStorage.getItem("auth");
    console.log(auth);
    axios
      .get(
        `http://localhost:3000/users/${userId}`,

        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        }
      )
      .then((respo) => {
        console.log(respo.data);
        setProfile(respo.data);
        console.log(userProfile, "userProfile");
      })
      .catch((err) => {
        if (err.response.statusText === "Unauthorized")
          console.log(err.response.statusText);
        localStorage.clear();
        history.push("/login");
      });
  }, []);
  return (
    <>
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
            <div
              className="rightProfile"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h4>{userProfile !== null ? userProfile.user.name : null}</h4>
              <h5>
                {" "}
                Posts {userProfile !== null
                  ? userProfile.posts.length
                  : null}{" "}
              </h5>
            </div>
          </div>
        </div>

        {userProfile !== null ? (
          <div className="Gallery">
            {userProfile.posts.map((item, k) => {
              return (
                <img
                  key={k}
                  className="item"
                  src={item.image}
                  alt={item.title}
                />
              );
            })}
          </div>
        ) : (
          <h2>loading</h2>
        )}
      </div>
    </>
  );
}
