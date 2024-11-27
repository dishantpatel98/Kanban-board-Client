import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Header, Segment, Table } from "semantic-ui-react";
import api from "../../api/api";
import { useAuth } from "../../contexts/AuthContext";


const backgroundImage = "/bg-2.jpg";

const Profile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const { user: userDetails } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`/user/${userDetails?.userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile: ", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    try {
      await api.put(`/user/${userDetails?.userId}`, user);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user profile: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
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
      verticalAlign="top"
    >
      <Grid.Column style={{
        maxWidth: 550,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        marginTop:"1.5rem",
      }}>
        <Header as="h2" style={{ color: "#004d4d", textAlign: "center",marginBottom: "1.5rem", marginTop: "0.5rem" }}>
          USER PROFILE
        </Header>
        {isEditing ? (
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="First Name"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                style={{ marginBottom: "1.5rem" }}
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Last Name"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                style={{ marginBottom: "1.5rem" }}
              />
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail address"
                name="email"
                value={user.email}
                onChange={handleChange}
                style={{ marginBottom: "1.5rem" }}
              />
              <Button.Group fluid>
                <Button
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
                        onClick={handleSaveClick}>
                  Save
                </Button>
                <Button.Or />
                <Button onClick={handleCancelClick}>Cancel</Button>
              </Button.Group>
            </Segment>
          </Form>
        ) : (
          <Table definition>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={4} style={{ fontWeight: '600', color: '#555' }}>
                  First Name
                </Table.Cell>
                <Table.Cell style={{ fontSize: '1.2em', color: '#333' }}>
                  {user.firstName}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell style={{ fontWeight: '600', color: '#555' }}>Last Name</Table.Cell>
                <Table.Cell style={{ fontSize: '1.2em', color: '#333' }}>{user.lastName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell style={{ fontWeight: '600', color: '#555' }}>Email</Table.Cell>
                <Table.Cell style={{ fontSize: '1.2em', color: '#333' }}>{user.email}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        )}
        {!isEditing && (
          <Button style={{
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
                  onClick={handleEditClick}>
            Edit Profile
          </Button>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default Profile;
