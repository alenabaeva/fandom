import React, { useContext } from "react"
import { Context } from "../index"
import { Container, Row, Col, Card, Nav } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
//import { observer } from "mobx-react-lite";
import episode from "../pics/episode.png"
import character from "../pics/character.jpg"
import location from "../pics/location.webp"
import faculty from "../pics/faculty.webp"
import {
  LOCATION_ROUTE,
  FACULTY_ROUTE,
  CHARACTER_ROUTE,
  EPISODE_ROUTE,
} from "../utils/consts"

const Navigate = () => {
  const { user } = useContext(Context)
  const navigate = useNavigate()
  return (
    <Container style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
      <Row>
        <Col md={3} onClick={() => navigate(EPISODE_ROUTE)}>
          <Nav.Link style={{ color: "black" }} to={EPISODE_ROUTE}>
            <Card style={{ width: "17rem" }}>
              <Card.Img height={160} variant='top' src={episode} />
              <Card.Body>
                <Card.Title>Эпизоды</Card.Title>
              </Card.Body>
            </Card>
          </Nav.Link>
        </Col>
        <Col md={3} onClick={() => navigate(CHARACTER_ROUTE)}>
          <Nav.Link style={{ color: "black" }} to={CHARACTER_ROUTE}>
            <Card style={{ width: "17rem" }}>
              <Card.Img height={160} variant='top' src={character} />
              <Card.Body>
                <Card.Title>Персонажи</Card.Title>
              </Card.Body>
            </Card>
          </Nav.Link>
        </Col>
        <Col md={3} onClick={() => navigate(LOCATION_ROUTE)}>
          <Nav.Link style={{ color: "black" }} to={LOCATION_ROUTE}>
            <Card style={{ width: "17rem" }}>
              <Card.Img height={160} variant='top' src={location} />
              <Card.Body>
                <Card.Title>Локации</Card.Title>
              </Card.Body>
            </Card>
          </Nav.Link>
        </Col>
        <Col md={3} onClick={() => navigate(FACULTY_ROUTE)}>
          <Nav.Link style={{ color: "black" }} to={FACULTY_ROUTE}>
            <Card style={{ width: "17rem" }}>
              <Card.Img height={160} variant='top' src={faculty} />
              <Card.Body>
                <Card.Title>Факультеты</Card.Title>
              </Card.Body>
            </Card>
          </Nav.Link>
        </Col>
      </Row>
    </Container>
  )
}

export default Navigate
