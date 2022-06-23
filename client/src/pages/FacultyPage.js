import { observer } from "mobx-react-lite"
import React, { useContext, useState, useEffect } from "react"
import { Context } from ".."
import { Container, Col, Row, Nav, Button, Card, Image } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import person from "../pics/person.webp"
import UpdateFaculty from "../components/modals/UpdateFaculty"
import { Table } from "react-bootstrap"
import edit from "../pics/edit2.png"
import { fetchOneFaculty } from "../http/fanAPI"
import { CHARACTER_ROUTE } from "../utils/consts"

const FacultyPage = observer(() => {
  const { serial } = useContext(Context)
  const [faculty, setFaculty] = useState([])
  const [facultyVisible, setFacultyVisible] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    fetchOneFaculty(id).then((data) => setFaculty(data))
  }, [])

  return (
    <div>
      <Container className='d-flex flex-column'>
        <Row>
          <Col md={8}>
            <UpdateFaculty
              show={facultyVisible}
              onHide={() => setFacultyVisible(false)}
            />
            <Button
              className='mt-5 p-2'
              variant='outline-light'
              onClick={() => setFacultyVisible(true)}
            >
              <Image width={40} height={40} src={edit} />
            </Button>
            <Card
              style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
              border={"light"}
            >
              <Card.Body>
                {faculty.description ? (
                  <div>
                    <Card.Title>Описание</Card.Title>
                    <Card.Text>{faculty.description}</Card.Text>
                  </div>
                ) : null}
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              style={{
                paddingLeft: "5rem",
                paddingTop: "3rem",
                paddingBottom: "3rem",
              }}
              border={"light"}
            >
              <Card style={{ width: "15rem" }}>
                <Card.Img
                  style={{ objectFit: "contain" }}
                  height={300}
                  variant='top'
                  src={process.env.REACT_APP_API_URL + faculty.img}
                />
                <Card.Body>
                  <Table>
                    <tbody>
                      {faculty.faculty_name ? (
                        <tr>
                          <td>Название:</td>
                          <td>{faculty.faculty_name}</td>
                        </tr>
                      ) : null}
                      {faculty.color ? (
                        <tr>
                          <td>Цвет:</td>
                          <td>{faculty.color}</td>
                        </tr>
                      ) : null}
                      {faculty.characters ? (
                        <tr>
                          <td>Участники:</td>
                          <td>
                            {faculty.characters.map((character) => (
                              <Nav.Link
                                onClick={() =>
                                  navigate(CHARACTER_ROUTE + "/" + character.id)
                                }
                                key={character.id}
                              >
                                {character.character_name}
                              </Nav.Link>
                            ))}
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
})

export default FacultyPage
