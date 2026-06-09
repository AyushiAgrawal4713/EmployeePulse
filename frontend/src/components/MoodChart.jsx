import {
  Pie
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import {
  useEffect,
  useState
} from "react";

import api from "../api/api";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function MoodChart() {

  const [analytics,
  setAnalytics] =
  useState({

    happy: 0,
    neutral: 0,
    stressed: 0

  });

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics =
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

        `/mood/analytics/${user.id}`

      );

      setAnalytics(
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  const data = {

    labels: [

      "Happy",
      "Neutral",
      "Stressed"

    ],

    datasets: [

      {

        data: [

          analytics.happy,

          analytics.neutral,

          analytics.stressed

        ]

      }

    ]

  };

  return (

    <div
    style={{
      width:"400px"
    }}
    >

      <h3>
        Mood Analytics
      </h3>

      <Pie data={data} />

    </div>

  );

}

export default MoodChart;