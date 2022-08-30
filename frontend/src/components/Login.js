import { useState } from "react";
import "./css/Register.css";
import qs from "qs";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: qs.stringify({
        email,
        password,
      }),
      url: "http://localhost:5000/api/users/login",
    };

    const response = await fetch(options.url, options);

    const data = await response.json();

    if (data._id) {
      localStorage.setItem("token", data.token);
      alert("Login Successful");
      window.location.href = "/";
    } else {
      alert("Login Failed");
    }
  };

  return (
    <>
      <div className="mainDiv">
        <h1>Login</h1>
        <div id="formDiv">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
