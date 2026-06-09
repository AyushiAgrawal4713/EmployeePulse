import { Link } from "react-router-dom";

function Navbar() {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "15px",
        background: "#222",
      }}
    >
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/mood">Mood Check</Link>
<Link to="/admin">
 Admin
</Link>
      <Link to="/recognition">Recognition</Link>
<Link to="/profile">
 Profile
</Link>
      <Link to="/leaderboard">Leaderboard</Link>
 <Link to="/activity">
 Activity
</Link>
<Link to="/employees">
 Employees
</Link>
      <button onClick={logout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;