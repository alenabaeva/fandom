import React from "react"
import { Card, Col, Nav } from "react-bootstrap"
import { FACULTY_ROUTE } from "../utils/consts"
import { useNavigate } from "react-router-dom"
import faculties from "../pics/faculties.jpg"

const FacultyItem = ({ faculty }) => {
  const navigate = useNavigate()
  return (
    <Col md={2} onClick={() => navigate(FACULTY_ROUTE + "/" + faculty.id)}>
      <Card
        style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
        border={"light"}
      >
        <Nav.Link style={{ color: "black" }}>
          <Card style={{ width: "11rem" }}>
            {faculty?.img && (
              <Card.Img
                height={240}
                variant='top'
                style={{
                  paddingTop: "2rem",
                  paddingBottom: "1rem",
                  objectFit: "contain",
                }}
                src={process.env.REACT_APP_API_URL + faculty.img}
              />
            )}
            <Card.Body>
              <Card.Title className='text-black-70'>
                {faculty.faculty_name}
              </Card.Title>
            </Card.Body>
          </Card>
        </Nav.Link>
      </Card>
    </Col>
  )
}

export default FacultyItem
