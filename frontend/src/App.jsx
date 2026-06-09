import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Mood from "./pages/Mood";
import Recognition from "./pages/Recognition";
import Leaderboard from "./pages/Leaderboard";
import Activity from "./pages/Activity";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Employees from "./pages/Employees";
function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />
<Route
 path="/admin"
 element={<Admin />}
/>
        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/mood"
          element={<Mood />}
        />
<Route
 path="/employees"
 element={<Employees />}
/>
        <Route
          path="/recognition"
          element={<Recognition />}
        />

        <Route
          path="/leaderboard"
          element={<Leaderboard />}
        />

        <Route
          path="/activity"
          element={<Activity />}
        />
        <Route
 path="/profile"
 element={<Profile />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;