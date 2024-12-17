import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../services/ApiService";
import { AuthService } from "../../services/AuthService";

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);


  const [error, setError] = React.useState(""); 

  const handleLogin = () => {
    setError("");

    userLogin(credentials)
      .then((response) => {
        if (response.status === 200) {
          AuthService.setToken(response.data.token);
          login(response.data.user);
          navigate("/admin/dashboard");
        } else {
          setError(response.message);
        }
      })
      .catch((error) => {
        console.log("error", error);
        //setError(error); // Sunucu hatası durumunda mesaj
      });
  };

  return (
    <>
      <h1>Login</h1>
      <div>
        Name :{" "}
        <input
          type="text"
          name="name"
          placeholder="Email"
          required
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
      </div>
      <div>
        Password :{" "}
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>} 
      <button onClick={handleLogin}>Login</button>
    </>
  );
};

export default LoginPage;
