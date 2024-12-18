import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../services/ApiService";
import { AuthService } from "../../services/AuthService";
import FormComponent from "../../components/Form/FormComponent";

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  React.useEffect(() => {
    if (user) {
      navigate("/");
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
      });
  };

  const fields = [
    {
      type: "text",
      name: "email",
      placeholder: "Email",
      value: credentials.email,
      onChange: (e) =>
        setCredentials({ ...credentials, email: e.target.value }),
      required: true,
    },
    {
      type: "password",
      name: "password",
      placeholder: "Password",
      value: credentials.password,
      onChange: (e) =>
        setCredentials({ ...credentials, password: e.target.value }),
      required: true,
    },
  ];

  return (
    <FormComponent
      title="Login"
      fields={fields}
      onSubmit={handleLogin}
      buttonText="Login"
      error={error}
    />
  );
};

export default LoginPage;
