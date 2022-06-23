import React from "react"
import { Card, Col, Nav } from "react-bootstrap"
import { Image } from "react-bootstrap"
import { CHARACTER_ROUTE } from "../utils/consts"
import { useNavigate } from "react-router-dom"
import characters from "../pics/characters.jpg"

const CharacterItem = ({ character }) => {
  const navigate = useNavigate()
  return (
    <Col md={2} onClick={() => navigate(CHARACTER_ROUTE + "/" + character.id)}>
      <Card
        style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
        border={"light"}
      >
        <Nav.Link style={{ color: "black" }}>
          <Card style={{ width: "11rem" }}>
            {character?.img && (
              <Card.Img
                height={450}
                variant='top'
                style={{ objectFit: "contain" }}
                src={process.env.REACT_APP_API_URL + character.img}
              />
            )}

            <Card.Body>
              <Card.Title>{character.character_name}</Card.Title>
            </Card.Body>
          </Card>
        </Nav.Link>
      </Card>
    </Col>
  )
}

export default CharacterItem
