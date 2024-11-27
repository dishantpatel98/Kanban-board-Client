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
import { useNavigate } from "react-router-dom";


const backgroundImage = "/bg-2.jpg";

const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [alertMessage, setAlertMessage] = useState({
    message: "",
    type: "",
    show: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async () => {
    // Reset errors
    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    let formIsValid = true;
    let finalErrors = {};

    for (const key in user) {
      if (user[key] === "") {
        finalErrors = {
          ...finalErrors,
          [key]: `${key.charAt(0).toUpperCase() + key.slice(1)} is required`,
        };
        setErrors({
          ...errors,
          [key]: `${key.charAt(0).toUpperCase() + key.slice(1)} is required`,
        });
        formIsValid = false;
      }
    }

    if (user.password !== user.confirmPassword) {
      finalErrors = {
        ...finalErrors,
        confirmPassword: "Passwords do not match",
      };
    }

    setErrors({ ...finalErrors });

    if (formIsValid) {
      try {
        await api.post("/user", user);
        setAlertMessage({
          type: "success",
          message: "Registration successful",
          show: true,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (err) {
        const message = err?.response?.data.message;
        setAlertMessage({
          type: "error",
          message: message ? message : err?.message,
          show: true,
        });
        console.log(err);
      }
    }
  };

  return (
    <div>
      <Grid textAlign="center" verticalAlign="middle" textAlign="center"
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

          {alertMessage.show && (
            <Message
              success={alertMessage.type === "success"}
              negative={alertMessage.type === "error"}
              header={alertMessage.message}
              style={{
                width: "100%",
                textAlign: "center",
                marginBottom: "20px",
              }}
            />
          )}
          <Header as="h2" style={{ color: "#004d4d", textAlign: "center" }}>
            CREATE AN ACCOUNT
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="First Name"
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                style={{ marginBottom: "1.5rem" }}
              />
              {errors.firstName && (
                <p style={{ color: "red" }}>{errors.firstName}</p>
              )}

              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Last Name"
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                style={{ marginBottom: "1.5rem" }}
              />
              {errors.lastName && (
                <p style={{ color: "red" }}>{errors.lastName}</p>
              )}

              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                style={{ marginBottom: "1.5rem" }}
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                style={{ marginBottom: "1.5rem" }}
              />
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}

              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
                style={{ marginBottom: "1.5rem" }}
              />
              {errors.confirmPassword && (
                <p style={{ color: "red" }}>{errors.confirmPassword}</p>
              )}

              <Button
                  type="submit"
                  style={{
                    color: "white",
                    backgroundColor: "#004d4d",
                    textAlign: "center",
                    marginBottom: "0.5rem",
                    borderRadius: "4px",
                    padding: "10px 20px",
                    fontSize: "1.5rem",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
              >
                Register
              </Button>
            </Segment>
          </Form>
          <Message>
            Already have an account? <a href="/login">Log In</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Register;
