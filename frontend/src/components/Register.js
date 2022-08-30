import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Register.css";
import qs from "qs";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

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
        name,
        email,
        password,
      }),
      url: "http://localhost:5000/api/users/",
    };
    const response = await fetch(options.url, options);

    const data = await response.json();

    if (data.error) {
      console.log(data.error);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="mainDiv">
        <h1>Register</h1>
        <div id="formDiv">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={handleChange}
            />
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

export default Register;
