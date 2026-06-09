import {
  Bar
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

import {
  useEffect,
  useState
} from "react";

import api from "../api/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function DepartmentChart() {

  const [stats,
  setStats] =
  useState({

    IT: 0,
    HR: 0,
    Sales: 0,
    Marketing: 0

  });

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats =
  async () => {

    const res =
    await api.get(
      "/users/department-stats"
    );

    setStats(
      res.data
    );

  };

  const data = {

    labels: [

      "IT",
      "HR",
      "Sales",
      "Marketing"

    ],

    datasets: [

      {

        label:
        "Employees",

        data: [

          stats.IT,

          stats.HR,

          stats.Sales,

          stats.Marketing

        ]

      }

    ]

  };

  return (

    <div
    style={{
      width:"500px"
    }}
    >

      <h3>
        Department Analytics
      </h3>

      <Bar data={data} />

    </div>

  );

}

export default DepartmentChart;