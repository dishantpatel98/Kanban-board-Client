import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  Form,
  Icon,
  Message,
  Modal,
} from "semantic-ui-react";
import api from "../../api/api";


const backgroundImage = "/bg-2.jpg";

const Boards = () => {
  const [boardsData, setBoardsData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newBoard, setNewBoard] = useState({
    boardId: null,
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({ title: "", description: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const resetForm = () => {
    setNewBoard({ boardId: null, title: "", description: "" });
    setErrors({ title: "", description: "" });
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await api.get("/boards");
        const data = response.data;
        setBoardsData(data);
      } catch (error) {
        console.error("Error fetching boards data: ", error);
      }
    };

    fetchBoards();
  }, []);

  const handleDeleteBoard = async (boardId) => {
    try {
      await api.delete(`/boards/${boardId}`);
      const updatedBoards = boardsData.filter(
        (board) => board.boardId !== boardId
      );
      setBoardsData(updatedBoards);
      setSuccessMessage("Board deleted successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        setOpenModal(false);
      }, 1000);
    } catch (error) {
      console.error("Error deleting board: ", error);
    }
  };

  const handleCreateBoard = async () => {
    const validationErrors = {};
    if (!newBoard.title) {
      validationErrors.title = "Board title is required.";
    }
    if (!newBoard.description) {
      validationErrors.description = "Board description is required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      let response;
      if (isEditing) {
        response = await api.put(`/boards/${newBoard.boardId}`, newBoard);
      } else {
        response = await api.post("/boards", newBoard);
      }

      const updatedBoard = response.data;
      let newBoardsList = [];
      if (isEditing) {
        newBoardsList = boardsData.map((board) =>
          board.boardId === updatedBoard.boardId ? updatedBoard : board
        );
      } else newBoardsList = [...boardsData, updatedBoard];

      setBoardsData([...newBoardsList]);

      setSuccessMessage(
        isEditing
          ? "Board updated successfully!"
          : "Board created successfully!"
      );
      setTimeout(() => {
        setSuccessMessage("");
        setOpenModal(false);
        resetForm();
      }, 1000);
    } catch (error) {
      console.error(
        `Error ${isEditing ? "updating" : "creating"} board: `,
        error
      );
    }
  };

  const handleEditBoard = (board) => {
    setIsEditing(true);
    setNewBoard({
      boardId: board.boardId,
      title: board.title,
      description: board.description,
    });
    setOpenModal(true);
  };


  return (

      <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
      >

        <Container style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white for content clarity
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          width: "90%",
          maxWidth: "1200px",
          zIndex: 2, // Ensure it stays above the background
        }}>
          <div style={{marginBottom: 24}}>
            <Button primary onClick={() => setOpenModal(true)} style={{fontSize: "1.2rem", background: "linear-gradient(90deg, #e66465, #9198e5)"}}>
              Create New Board
            </Button>
          </div>

          <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                justifyContent: "left",
              }}
          >
            {boardsData.map((board) => (
                <Link to={`/boards/${board.boardId}`} key={board.boardId}>
                  <Card
                      style={{
                        borderRadius: "12px",
                        width: "300px",
                        height: "160px",
                        overflow: "hidden",
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
                        cursor: "pointer",
                        padding: "16px",
                        backgroundColor: "#fdfdfd",
                        position: "relative",
                      }}
                  >
                    <Card.Content>
                      <Card.Header
                          style={{
                            marginBottom: "12px",
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            color: "#004d4d",
                          }}
                      >
                        {board.title}
                      </Card.Header>
                      <Card.Description
                          style={{
                            marginBottom: "12px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            color: "#555",
                          }}
                      >
                        {board.description}{" "}
                        <Icon
                            name="edit"
                            style={{
                              cursor: "pointer",
                              fontSize: "18px",
                              position: "absolute",
                              top: "8px",
                              right: "8px",
                              background: "#fff",
                              borderRadius: "50%",
                              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation(); // Prevent card click event
                              handleEditBoard(board);
                            }}
                        />
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Link>
            ))}
          </div>

          <Modal open={openModal} onClose={() => setOpenModal(false)} size="tiny">
            <Modal.Header>
              {isEditing ? "Edit Board" : "Create a New Board"}
            </Modal.Header>
            <Modal.Content>
              {successMessage && (
                  <Message positive>
                    <Message.Header>{successMessage}</Message.Header>
                  </Message>
              )}
              <Form>
                <Form.Field>
                  <label>Title</label>
                  <input
                      placeholder="Board Title"
                      value={newBoard.title}
                      onChange={(e) => {
                        setNewBoard({...newBoard, title: e.target.value});
                        setErrors({...errors, title: ""});
                      }}
                  />
                  {errors.title && (
                      <div style={{color: "red", marginTop: "5px"}}>
                        {errors.title}
                      </div>
                  )}
                </Form.Field>
                <Form.Field>
                  <label>Description</label>
                  <textarea
                      placeholder="Board Description"
                      value={newBoard.description}
                      onChange={(e) => {
                        setNewBoard({...newBoard, description: e.target.value});
                        setErrors({...errors, description: ""});
                      }}
                  />
                  {errors.description && (
                      <div style={{color: "red", marginTop: "5px"}}>
                        {errors.description}
                      </div>
                  )}
                </Form.Field>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              {isEditing && (
                  <Button
                      color="red"
                      style={{marginLeft: 0}}
                      onClick={() => handleDeleteBoard(newBoard.boardId)}
                  >
                    Delete Board
                  </Button>
              )}
              <Button onClick={() => setOpenModal(false)}>Cancel</Button>
              <Button primary onClick={handleCreateBoard}>
                {isEditing ? "Update" : "Create"}
              </Button>
            </Modal.Actions>
          </Modal>
        </Container></div>
  );
};

export default Boards;
