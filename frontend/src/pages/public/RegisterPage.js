// /pages/RegisterPage.js
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../../services/ApiService';
import { AuthService } from '../../services/AuthService';

const RegisterPage = () => {
  const { error, user, login } = useAuth();
  const [userData, setUserData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (userData.password !== userData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
  
    try {
      const response = await userRegister(userData);
      console.log("response", response);
      if (response.status === 201) {
        login(response.data.user);
        AuthService.setToken(response.data.token);
        navigate('/');
      } else {
        setFormError(response.message);
      }
    } catch (error) {
      console.log("error", error);
  
      // error.response kontrolü ekleniyor
      if (error.response) {
        setFormError(error.response.data.message);
      } else {
        setFormError('An unexpected error occurred. Please try again later.');
      }
    }
  };
  
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={userData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        {formError && <p style={{ color: 'red' }}>{formError}</p>}
        {error && <p style={{ color: 'red' }}>{error.message}</p>}
        <div>
          <button type="submit">
            {'Register'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
