import React from "react"
import { Card, Col } from "react-bootstrap"
import { Image } from "react-bootstrap"
import { EPISODE_ROUTE } from "../utils/consts"
import { useNavigate } from "react-router-dom"
import { Nav } from "react-bootstrap"

const SearchItem = ({ episode }) => {
  const navigate = useNavigate()
  return (
    <Col md={3} onClick={() => navigate(EPISODE_ROUTE + "/" + episode.id)}>
      <Card
        style={{ paddingTop: "1rem", paddingBottom: "3rem" }}
        border={"light"}
      >
        <Nav.Link style={{ color: "black" }} to={EPISODE_ROUTE}>
          <Card style={{ width: "17rem" }}>
            <Card.Img
              height={160}
              variant='top'
              src={process.env.REACT_APP_API_URL + episode.img}
            />
            <Card.Body>
              <Card.Title className='text-black-50'>
                {episode.se_number}
              </Card.Title>
              <Card.Text>{episode.series_name}</Card.Text>
            </Card.Body>
          </Card>
        </Nav.Link>
      </Card>
    </Col>
  )
}

export default SearchItem
