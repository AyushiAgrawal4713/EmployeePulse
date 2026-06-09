import { useEffect, useState } from "react";
import api from "../api/api";

function Leaderboard() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetchLeaderboard();

  }, []);

  const fetchLeaderboard = async () => {

    try {

      const res =
      await api.get(
        "/users/leaderboard"
      );

      setUsers(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>
        Employee Leaderboard
      </h1>

      <table
  style={{
    width: "100%",
    borderCollapse: "collapse"
  }}
>

        <thead>

          <tr>

            <th>Rank</th>

            <th>Name</th>

            <th>Department</th>

            <th>Points</th>

          </tr>

        </thead>

        <tbody>

          {
            users.map(
              (user, index) => (

              <tr
  key={user._id}
  style={{
    textAlign: "center"
  }}
>

                <td>
                  {index + 1}
                </td>

                <td>
                  {user.name}
                </td>

                <td>
                  {user.department}
                </td>

                <td>
                  {user.points}
                </td>

              </tr>

            ))
          }

        </tbody>

      </table>

    </div>

  );

}

export default Leaderboard;