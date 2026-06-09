import { useEffect, useState } from "react";
import api from "../api/api";

function Recognition() {

  const [users, setUsers] =
  useState([]);

  const [toUser, setToUser] =
  useState("");

  const [message, setMessage] =
  useState("");

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers = async () => {

    const res =
    await api.get("/users");

    setUsers(res.data);

  };

  const sendRecognition =
  async () => {

    const currentUser =
    JSON.parse(
      localStorage.getItem("user")
    );

    await api.post(
      "/recognition",
      {

        fromUser:
        currentUser.id,

        toUser,

        message

      }
    );

    alert(
      "Recognition Sent Successfully"
    );

  };

  return (

    <div style={{ padding:"20px" }}>

      <h1>
        Employee Recognition
      </h1>

      <select
      onChange={(e)=>
      setToUser(
      e.target.value
      )}>

        <option>
          Select Employee
        </option>

        {
          users.map(user=>(

            <option
            key={user._id}
            value={user._id}
            >

              {user.name}

            </option>

          ))
        }

      </select>

      <br /><br />

      <textarea

      rows="5"

      cols="40"

      placeholder=
      "Write appreciation"

      onChange={(e)=>
      setMessage(
      e.target.value
      )}

      />

      <br /><br />

      <button
      onClick=
      {sendRecognition}
      >

      Send Recognition

      </button>

    </div>

  );

}

export default Recognition;