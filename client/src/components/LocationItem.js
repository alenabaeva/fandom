import React from "react"
import { Card, Col, Nav } from "react-bootstrap"
import { LOCATION_ROUTE } from "../utils/consts"
import { useNavigate } from "react-router-dom"
import locations from "../pics/locations.jpg"

const LocationItem = ({ location }) => {
  const navigate = useNavigate()
  return (
    <Col md={3} onClick={() => navigate(LOCATION_ROUTE + "/" + location.id)}>
      <Card
        style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
        border={"light"}
      >
        <Nav.Link style={{ color: "black" }}>
          <Card style={{ width: "17rem" }}>
            {location?.img && (
              <Card.Img
                height={160}
                variant='top'
                src={process.env.REACT_APP_API_URL + location.img}
              />
            )}

            <Card.Body>
              <Card.Title className='text-black-70'>
                {location.location_name}
              </Card.Title>
            </Card.Body>
          </Card>
        </Nav.Link>
      </Card>
    </Col>
  )
}

export default LocationItem
