import { useState, useEffect } from "react";
import api from "../api/api";

function Mood() {

  const [mood, setMood] = useState("");

  const [history, setHistory] = useState([]);

  useEffect(() => {

    fetchMoodHistory();

  }, []);

  const fetchMoodHistory = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await api.get(
        `/mood/${user.id}`
      );

      setHistory(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const submitMood = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await api.post(
        "/mood/add",
        {
          userId: user.id,
          mood: mood
        }
      );

      alert("Mood Submitted Successfully");

      setMood("");

      fetchMoodHistory();

    } catch (error) {

      console.log(error);

      alert("Failed to submit mood");

    }

  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Mood Tracker</h1>

      <select
        value={mood}
        onChange={(e) =>
          setMood(e.target.value)
        }
      >

        <option value="">
          Select Mood
        </option>
<option value="Happy">😊 Happy</option>

<option value="Excited">😄 Excited</option>

<option value="Calm">😌 Calm</option>

<option value="Neutral">😐 Neutral</option>

<option value="Sleepy">😴 Sleepy</option>

<option value="Confused">😕 Confused</option>

<option value="Frustrated">😫 Frustrated</option>

<option value="Angry">😠 Angry</option>

<option value="Sad">😔 Sad</option>

<option value="Stressed">😩 Stressed</option>

<option value="Overwhelmed">🤯 Overwhelmed</option>

<option value="Motivated">🚀 Motivated</option>
      </select>

      <br /><br />

      <button onClick={submitMood}>
        Submit Mood
      </button>

      <hr />

      <h2>Mood History</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          borderCollapse: "collapse",
          width: "100%"
        }}
      >

        <thead>

          <tr>

            <th>Mood</th>

            <th>Date</th>

          </tr>

        </thead>

        <tbody>

          {
            history.length > 0 ? (

              history.map((item) => (

                <tr key={item._id}>

                  <td>
                    {item.mood}
                  </td>

                  <td>
                    {
                      new Date(
                        item.date
                      ).toLocaleString()
                    }
                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td colSpan="2">
                  No Mood History Found
                </td>

              </tr>

            )
          }

        </tbody>

      </table>

    </div>

  );

}

export default Mood;