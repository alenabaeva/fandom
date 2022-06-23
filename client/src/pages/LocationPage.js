import { observer } from "mobx-react-lite"
import React, { useContext, useState, useEffect } from "react"
import { Context } from ".."
import { Container, Col, Row, Nav } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import person from "../pics/person.webp"
import { Card, Button, Image } from "react-bootstrap"
import { Table } from "react-bootstrap"
import edit from "../pics/edit2.png"
import { fetchOneLocation } from "../http/fanAPI"
import UpdateLocation from "../components/modals/UpdateLocation"
import { EPISODE_ROUTE } from "../utils/consts"

const LocationPage = observer(() => {
  const { serial } = useContext(Context)
  const [location, setLocation] = useState([])
  const [locationVisible, setLocationVisible] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    fetchOneLocation(id).then((data) => setLocation(data))
  }, [])

  return (
    <div>
      <Container className='d-flex flex-column'>
        <Row>
          <Col md={8}>
            <UpdateLocation
              show={locationVisible}
              onHide={() => setLocationVisible(false)}
            />
            <Button
              className='mt-5 p-2'
              variant='outline-light'
              onClick={() => setLocationVisible(true)}
            >
              <Image width={40} height={40} src={edit} />
            </Button>
            <Card
              style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
              border={"light"}
            >
              <Card.Body>
                {location.description ? (
                  <div>
                    <Card.Title>Описание</Card.Title>
                    <Card.Text>{location.description}</Card.Text>
                  </div>
                ) : null}
                {location.facts ? (
                  <div className='mt-5 p-2'>
                    <Card.Title>Факты</Card.Title>
                    <Card.Text>{location.facts}</Card.Text>
                  </div>
                ) : null}
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
              border={"light"}
            >
              <Card style={{ width: "24rem" }}>
                <Card.Img
                  height={240}
                  variant='top'
                  src={process.env.REACT_APP_API_URL + location.img}
                />
                <Card.Body>
                  <Table>
                    <tbody>
                      {location.location_name ? (
                        <tr>
                          <td>Название локации:</td>
                          <td>{location.location_name}</td>
                        </tr>
                      ) : null}
                      {location.episodes ? (
                        <tr>
                          <td>Появления в сериях:</td>
                          <td>
                            {location.episodes.map((episode) => (
                              <Nav.Link
                                onClick={() =>
                                  navigate(EPISODE_ROUTE + "/" + episode.id)
                                }
                                key={episode.id}
                              >
                                {episode.se_number}
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

export default LocationPage
