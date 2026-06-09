import { useEffect, useState } from "react";
import api from "../api/api";

import MoodChart from "../components/MoodChart";
import DepartmentChart from "../components/DepartmentChart";

function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [dashboardData,
    setDashboardData] =
    useState(null);

  const [engagement,
    setEngagement] =
    useState(null);

  const [recommendation,
    setRecommendation] =
    useState("");

  const stats = {
    employees: 25,
    moods: 18,
    recognitions: 12,
    topPerformer: "Rahul"
  };

  useEffect(() => {

    fetchDashboard();

    loadAI();

  }, []);

  const fetchDashboard =
    async () => {

      try {

        const res =
          await api.get(
            `/users/dashboard/${user.id}`
          );

        setDashboardData(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  const loadAI =
    async () => {

      try {

        const score =
          await api.get(
            "/users/engagement"
          );

        const rec =
          await api.get(
            "/users/recommendation"
          );

        setEngagement(
          score.data
        );

        setRecommendation(
          rec.data.recommendation
        );

      } catch (error) {

        console.log(error);

      }

    };

  if (!dashboardData)
    return <h2>Loading...</h2>;

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-4">
        Employee Dashboard
      </h1>

      <div className="bg-white rounded-lg shadow-lg p-4 mb-6">

        <h2 className="text-xl font-semibold">

          Welcome {dashboardData.name}

        </h2>

        <p className="mt-2">
          Department:
          {" "}
          {dashboardData.department}
        </p>

        <p>
          Points:
          {" "}
          {dashboardData.points}
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">

        <div className="bg-white shadow-lg rounded-lg p-6 text-center">

          <h3 className="font-semibold">
            Total Employees
          </h3>

          <h1 className="text-3xl font-bold">
            {stats.employees}
          </h1>

        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center">

          <h3 className="font-semibold">
            Today's Moods
          </h3>

          <h1 className="text-3xl font-bold">
            {stats.moods}
          </h1>

        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center">

          <h3 className="font-semibold">
            Recognitions
          </h3>

          <h1 className="text-3xl font-bold">
            {stats.recognitions}
          </h1>

        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center">

          <h3 className="font-semibold">
            Top Performer
          </h3>

          <h1 className="text-2xl font-bold">
            {stats.topPerformer}
          </h1>

        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center">

          <h3 className="font-semibold">
            Engagement Score
          </h3>

          <h1 className="text-3xl font-bold text-blue-600">

            {
              engagement
                ?.engagement_score || 0
            }%

          </h1>

        </div>

      </div>

      <div className="flex flex-col lg:flex-row gap-10 mt-10">

        <div className="bg-white p-5 rounded-lg shadow-lg">

          <MoodChart />

        </div>

        <div className="bg-white p-5 rounded-lg shadow-lg">

          <DepartmentChart />

        </div>

      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mt-10">

        <h2 className="text-2xl font-bold mb-3">

          AI Recommendation

        </h2>

        <p className="text-lg">

          {recommendation}

        </p>

      </div>

    </div>

  );

}

export default Dashboard;