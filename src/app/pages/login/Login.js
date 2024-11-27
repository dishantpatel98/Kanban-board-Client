import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import api from "../../api/api";
import { redirect, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const backgroundImage = "/bg-2.jpg";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({ email: "", password: "" });

    // Validation
    let formIsValid = true;
    const updatedErrors = {};

    if (!credentials.email) {
      updatedErrors.email = "Email is required";
      formIsValid = false;
    }

    if (!credentials.password) {
      updatedErrors.password = "Password is required";
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(updatedErrors);
      return;
    }

    // Handle login logic here
    try {
      const response = await api.post("/user/login", credentials); // Replace 'api' with your API utility
      login(response?.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <Grid
          textAlign="center"
          style={{
            height: "100vh",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundAttachment: "fixed",
            position: "relative",
            padding: "20px",
          }}
          verticalAlign="middle"
      >

      <Grid.Column style={{
        maxWidth: 550,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      }}>
        <Header as="h2" style={{ color: "#004d4d", textAlign: "center",marginBottom: "1.5rem" }}>
          LOGIN TO YOUR ACCOUNT
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              error={errors.email ? true : false}
              style={{ marginBottom: "1.5rem" }}
            />
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email}</span>
            )}

            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              error={errors.password ? true : false}
              style={{ marginBottom: "1.5rem" }}
            />
            {errors.password && (
              <span style={{ color: "red", fontSize: "0.8rem" }}>{errors.password}</span>
            )}

            <Button type="submit"
                    style={{
                    color: "white",
                    backgroundColor: "#cc96e3",
                    textAlign: "center",
                    marginBottom: "0.5rem",
                    borderRadius: "4px",
                    padding: "10px 20px",
                    fontSize: "1.5rem",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}>
              Login
            </Button>
          </Segment>
        </Form>
        <Message style={{ fontSize: "1.4rem" }}>
          New to us ? <a href="/register"> Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
