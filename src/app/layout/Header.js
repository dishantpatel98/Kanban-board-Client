import React from "react";
import { Container, Image, Menu, Segment } from "semantic-ui-react";
import LogoImage from "../images/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Segment inverted secondary
             style={{
                 background: "linear-gradient(90deg, #004d4d, #007a7a)",
                 borderBottom: "5px solid #004040",
                 boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
             }}
    >
      <Menu fixed="top" inverted style={{ background: "linear-gradient(90deg, #654ea3, #eaafc8)" }}>
          <Menu.Item
              as={Link}
              to={isAuthenticated() ? "/boards" : "/login"}
              header
              style={{
                  border: "none",
                  display: "flex",
                  alignItems: "center",
              }}
          >
              <Image
                  size="mini"
                  src={LogoImage}
                  style={{
                      marginRight: "1.8em",
                      filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.4))", // Shadow for logo
                  }}
              />
              <span
                  style={{
                      fontSize: "2rem",
                      fontWeight: "700",
                      letterSpacing: "1.2px",
                      color: "#ffffff",
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Bold text shadow
                      textTransform: "uppercase",
                  }}
              >
                  Kanban Board - Project Management System</span>
          </Menu.Item>
          <Menu.Menu position="right" style={{ display: "flex", alignItems: "center" }}>
              {isAuthenticated() ? (
                  <>
                      <Menu.Item
                          as={Link}
                          to="/logout"
                          style={{
                              marginRight: "20px",
                              fontSize: "1.2rem",
                              fontWeight: "600",
                              letterSpacing: "0.8px",
                              color: "#ffffff",
                              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
                              textTransform: "uppercase",
                              transition: "all 0.3s ease", // Smooth hover animation
                          }}
                          onMouseOver={(e) => (e.target.style.color = "#00cccc")}
                          onMouseOut={(e) => (e.target.style.color = "#ffffff")}
                      >
                          Logout
                      </Menu.Item>
                  </>
              ) : (
                  <>
                      <Menu.Item
                          as={Link}
                          to="/register"
                          style={{
                              marginRight: "20px",
                              fontSize: "1.2rem",
                              fontWeight: "600",
                              letterSpacing: "0.8px",
                              color: "#ffffff",
                              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
                              textTransform: "uppercase",
                              transition: "all 0.3s ease", // Smooth hover animation
                          }}
                          onMouseOver={(e) => (e.target.style.color = "#00cccc")}
                          onMouseOut={(e) => (e.target.style.color = "#ffffff")}
                      >
                          Register
                      </Menu.Item>
                      <Menu.Item
                          as={Link}
                          to="/login"
                          style={{
                              marginRight: "20px",
                              fontSize: "1.2rem",
                              fontWeight: "600",
                              letterSpacing: "0.8px",
                              color: "#ffffff",
                              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
                              textTransform: "uppercase",
                              transition: "all 0.3s ease", // Smooth hover animation
                          }}
                          onMouseOver={(e) => (e.target.style.color = "#00cccc")}
                          onMouseOut={(e) => (e.target.style.color = "#ffffff")}
                      >
                          Login
                      </Menu.Item>
                  </>
              )}
          </Menu.Menu>
      </Menu>
    </Segment>
  );
};

export default Header;
