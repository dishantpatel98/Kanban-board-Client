import React from "react";
import { Sidebar, Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
    return (
        <div style={{ top: "50px" }}>
            <Sidebar
                as={Menu}
                animation="overlay"
                icon="labeled"
                inverted
                vertical
                visible={true}
                width="thin"
                style={{
                    position: "fixed",
                    bottom: 0,
                    top: "62px",
                    height: "calc(100vh - 60px)",
                    background: "linear-gradient(180deg, #654ea3, #eaafc8)", // Gradient background
                    borderRight: "1px solid rgba(255, 255, 255, 0.1)", // Subtle border
                    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.2)", // Add shadow for depth
                }}
            >
                {/* Boards Menu Item */}
                <Menu.Item
                    as={Link}
                    to="/boards"
                    style={{
                        padding: "25px 10px",
                        fontSize: "1.5rem",
                        color: "white", // Text color
                        transition: "background 0.3s ease",
                    }}
                >
                    <Icon name="list" style={{ marginBottom: "0.5rem", color: "#ffffff" }} /> {/* Icon color */}
                    BOARDS
                </Menu.Item>

                {/* Profile Menu Item */}
                <Menu.Item
                    as={Link}
                    to="/profile"
                    style={{
                        padding: "25px 10px",
                        fontSize: "1.5rem",
                        color: "white",
                        transition: "background 0.3s ease",
                    }}
                >
                    <Icon name="user" style={{ marginBottom: "0.5rem", color: "#ffffff" }} />
                    PROFILE
                </Menu.Item>
            </Sidebar>
        </div>
    );
};

export default LeftSidebar;
