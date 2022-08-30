import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const userAuthetnticate = async () => {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: "http://localhost:5000/api/users/me",
      };
      const response = await fetch(options.url, options);
      const data = await response.json();

      if (data.id) {
        navigate("/");
      } else {
        navigate("/login");
      }
    };
    userAuthetnticate();
  }, [navigate]);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div>
        Dashboard
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
}

export default Dashboard;
