import { observer } from "mobx-react-lite"
import React, { useContext, useState, useEffect } from "react"
import { Context } from ".."
import { Container, Col, Row, Nav } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import { Card, Button, Image } from "react-bootstrap"
import { Table } from "react-bootstrap"
import edit from "../pics/edit2.png"
import { fetchOneEpisode } from "../http/fanAPI"
import UpdateEpisode from "../components/modals/UpdateEpisode"
import { CHARACTER_ROUTE, LOCATION_ROUTE } from "../utils/consts"

const EpisodePage = observer(() => {
  const { serial } = useContext(Context)
  const [episode, setEpisode] = useState([])
  const [episodeVisible, setEpisodeVisible] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    fetchOneEpisode(id).then((data) => setEpisode(data))
  }, [])

  return (
    <Container>
      <Row>
        {console.log(episode.characters)}
        {console.log(episode.series_name)}
        <Col md={8}>
          <UpdateEpisode
            show={episodeVisible}
            onHide={() => setEpisodeVisible(false)}
          />
          <Button
            className='mt-5 p-2'
            variant='outline-light'
            onClick={() => setEpisodeVisible(true)}
          >
            <Image width={40} height={40} src={edit} />
          </Button>
          <Card
            style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
            border={"light"}
          >
            <Card.Body>
              {episode.synopsis ? (
                <div className='mt-5'>
                  <Card.Title>Синопсис</Card.Title>
                  <Card.Text>{episode.synopsis}</Card.Text>
                </div>
              ) : null}
              {episode.plot ? (
                <div className='mt-5'>
                  <Card.Title>Сюжет</Card.Title>
                  <Card.Text>{episode.plot}</Card.Text>
                </div>
              ) : null}
              {episode.facts ? (
                <div className='mt-5'>
                  <Card.Title>Факты</Card.Title>
                  <Card.Text>{episode.facts}</Card.Text>
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
            <Card style={{ width: "25rem" }}>
              <Card.Img
                height={220}
                variant='top'
                src={process.env.REACT_APP_API_URL + episode.img}
              />
              <Card.Body>
                <Table>
                  <tbody>
                    {episode.series_name ? (
                      <tr>
                        <td>Название серии:</td>
                        <td>{episode.series_name}</td>
                      </tr>
                    ) : null}
                    {episode.se_number ? (
                      <tr>
                        <td>Номер серии:</td>
                        <td>{episode.se_number}</td>
                      </tr>
                    ) : null}
                    {episode.season ? (
                      <tr>
                        <td>Сезон:</td>
                        <td>{episode.season}</td>
                      </tr>
                    ) : null}
                    {episode.characters ? (
                      <tr>
                        <td>Персонажи в серии:</td>
                        <td>
                          {episode.characters.map((character) => (
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
                    {episode.locations ? (
                      <tr>
                        <td>Локации в серии:</td>
                        <td>
                          {episode.locations.map((location) => (
                            <Nav.Link
                              onClick={() =>
                                navigate(LOCATION_ROUTE + "/" + location.id)
                              }
                              key={location.id}
                            >
                              {location.location_name}
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
  )
})

export default EpisodePage
