import { useState } from "react";
import api from "../api/api";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");

  const registerUser = async () => {

    try {

      const response =
      await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
          department
        }
      );

      alert(
        response.data.message
      );

    } catch (error) {

      alert(
        error.response.data.message
      );

    }

  };

  return (

    <div>

      <h1>Register</h1>

      <input
        placeholder="Name"
        onChange={(e)=>
        setName(
        e.target.value
        )}
      />

      <br /><br />

      <input
        placeholder="Email"
        onChange={(e)=>
        setEmail(
        e.target.value
        )}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>
        setPassword(
        e.target.value
        )}
      />

      <br /><br />

      <input
        placeholder="Department"
        onChange={(e)=>
        setDepartment(
        e.target.value
        )}
      />

      <br /><br />

      <button
      onClick=
      {registerUser}
      >
        Register
      </button>

    </div>

  );

}

export default Register;