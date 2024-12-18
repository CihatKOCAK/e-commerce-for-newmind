import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../services/ApiService";
import { AuthService } from "../../services/AuthService";
import FormComponent from "../../components/Form/FormComponent";

const RegisterPage = () => {
  const { user, login } = useAuth();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    try {
      const response = await userRegister(userData);
      if (response.status === 201) {
        login(response.data.user);
        AuthService.setToken(response.data.token);
        navigate("/");
      } else {
        setFormError(response.message);
      }
    } catch (error) {
      if (error.response) {
        setFormError(error.response.data.message);
      } else {
        setFormError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const fields = [
    {
      type: "text",
      name: "name",
      placeholder: "Name",
      value: userData.name,
      onChange: (e) => setUserData({ ...userData, name: e.target.value }),
      required: true,
    },
    {
      type: "text",
      name: "email",
      placeholder: "Email",
      value: userData.email,
      onChange: (e) => setUserData({ ...userData, email: e.target.value }),
      required: true,
    },
    {
      type: "password",
      name: "password",
      placeholder: "Password",
      value: userData.password,
      onChange: (e) => setUserData({ ...userData, password: e.target.value }),
      required: true,
    },
    {
      type: "password",
      name: "confirmPassword",
      placeholder: "Confirm Password",
      value: userData.confirmPassword,
      onChange: (e) =>
        setUserData({ ...userData, confirmPassword: e.target.value }),
      required: true,
    },
  ]

  return (
    <FormComponent
      title="Register"
      fields={fields}
      onSubmit={handleSubmit}
      buttonText="Register"
      error={formError}
    />
  );
};

export default RegisterPage;
