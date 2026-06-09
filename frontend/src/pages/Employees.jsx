import { useEffect, useState } from "react";
import api from "../api/api";

function Employees() {

  const [users, setUsers] =
  useState([]);

  useEffect(() => {

    loadUsers();

  }, []);

  const loadUsers =
  async () => {

    const res =
    await api.get(
      "/users/all"
    );

    setUsers(
      res.data
    );

  };

  const deleteUser =
  async (id) => {

    await api.delete(
      `/users/${id}`
    );

    loadUsers();

  };

  return (

    <div style={{
      padding:"20px"
    }}>

      <h1>
        Employee Management
      </h1>

      <table
      border="1"
      cellPadding="10"
      >

        <thead>

          <tr>

            <th>Name</th>

            <th>Email</th>

            <th>Department</th>

            <th>Points</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

        {
          users.map(user => (

            <tr
            key={user._id}
            >

              <td>
                {user.name}
              </td>

              <td>
                {user.email}
              </td>

              <td>
                {user.department}
              </td>

              <td>
                {user.points}
              </td>

              <td>

                <button
                onClick={() =>
                deleteUser(
                user._id
                )}
                >

                Delete

                </button>

              </td>

            </tr>

          ))
        }

        </tbody>

      </table>

    </div>

  );

}

export default Employees;