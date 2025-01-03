import "./signin.css"
import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";

function Signin() {
    const [listOfUsers, setListOfUsers] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:3000/Users").then((response) => {
        setListOfUsers(response.data);
      })
     }, []);


  return (
    <div>
    {listOfUsers.map((value, key) => {
        return (
          <div className="user">
            <div className="firstName"> {value.firstName} </div>
            <div className="firstName"> {value.lastName} </div>
            <div className="firstName"> {value.username} </div>
            <div className="firstName"> {value.email} </div>
            <div className="firstName"> {value.password} </div>
          </div>
        );
      })}
    </div>
  )
}

export default Signin