import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView=({ user, token, setUser, movies, onLogout }) => {
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.BirthDate);
    const [showModal, setModal] = useState(false);
    const favoriteMovies = movies.filter((movie) => {
        return user.FavoriteMovies.includes(movie.id)
    });

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            BirthDate: birthday
        };

        fetch(`https://myflixapiapp-f802ff9592b6.herokuapp.com/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                alert("Update failed.")
            }
        }).then((data) => {
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
        })
    };

    const handleDeleteUser = () => {
        fetch(`https://myflixapiapp-f802ff9592b6.herokuapp.com/${user.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                onLogout();
            } else {
                alert("Something went wrong")
            }
        })
    }
    
    return (
        <>
        <h1 className="text-white">Profile</h1>
        <Row>
            <Col className="text-white">
                <h3 className="text-white">Your profile details</h3>
                <div>Username: {user.Username}</div>
                <div>Email: {user.Email}</div>
            </Col>
            <Col>
                <h3 className="text-white">Update your profile information here.</h3>
                <Form onSubmit={handleSubmit} className="text-white">
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength="3"
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="8"
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Col>
        </Row>
        <Row className="text-white">
            <h3>Favorite movies:</h3>
            {favoriteMovies.map((movie) => (
                <Col className="mb-5" key={movie.id} md={4}>
                    <MovieCard movie={movie}></MovieCard>
                </Col>
            ))}
        </Row>
        <Button variant="primary" onClick={handleShowModal}>
            Delete my account
        </Button>
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Delete account</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete your account permanently?</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleDeleteUser}>Yes</Button>
                <Button variant="secondary" onClick={handleCloseModal}>No</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}