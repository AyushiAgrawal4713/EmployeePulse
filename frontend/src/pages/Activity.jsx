import { useEffect, useState } from "react";
import api from "../api/api";

function Activity() {

  const [recognitions,
  setRecognitions] =
  useState([]);

  useEffect(() => {

    loadActivity();

  }, []);

  const loadActivity =
  async () => {

    try {

      const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

      const res =
      await api.get(

        `/recognition/${user.id}`

      );

      setRecognitions(
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div
    style={{
      padding:"20px"
    }}
    >

      <h1>
        Activity Timeline
      </h1>

      {
        recognitions.map(item => (

          <div
          key={item._id}
          style={cardStyle}
          >

            <h3>

              Recognition
              Received

            </h3>

            <p>

              From:
              {
                item.fromUser
                ?.name
              }

            </p>

            <p>

              {
                item.message
              }

            </p>

            <small>

              {
                new Date(
                  item.createdAt
                )
                .toLocaleString()
              }

            </small>

          </div>

        ))
      }

    </div>

  );

}

const cardStyle = {

  border:
  "1px solid #ddd",

  padding:
  "15px",

  marginBottom:
  "10px",

  borderRadius:
  "10px"

};

export default Activity;