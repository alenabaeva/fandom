import { observer } from "mobx-react-lite"
import React, { useContext, useState, useEffect } from "react"
import { Context } from ".."
import { Container, Col, Row, Nav } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import { Card, Button, Image, Table } from "react-bootstrap"
import edit from "../pics/edit2.png"
import { fetchOneCharacter } from "../http/fanAPI"
import UpdateCharacter from "../components/modals/UpdateCharacter"
import { EPISODE_ROUTE, FACULTY_ROUTE } from "../utils/consts"

const CharacterPage = observer(() => {
  const { serial } = useContext(Context)
  const [character, setCharacter] = useState([])
  const [characterVisible, setCharacterVisible] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    fetchOneCharacter(id).then((data) => setCharacter(data))
  }, [])

  return (
    <Container>
      <Row>
        <Col md={8}>
          <UpdateCharacter
            show={characterVisible}
            onHide={() => setCharacterVisible(false)}
          />
          <Button
            className='mt-5 p-2'
            variant='outline-light'
            onClick={() => setCharacterVisible(true)}
          >
            <Image width={40} height={40} src={edit} />
          </Button>
          <Card
            style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
            border={"light"}
          >
            <Card.Body>
              {character.description ? (
                <div>
                  <Card.Title>Описание</Card.Title>
                  <Card.Text>{character.description}</Card.Text>
                </div>
              ) : null}
              {character.appearance ? (
                <div className='mt-5'>
                  <Card.Title>Внешность</Card.Title>
                  <Card.Text>{character.appearance}</Card.Text>
                </div>
              ) : null}
              {character.personality ? (
                <div className='mt-5'>
                  <Card.Title>Личность</Card.Title>
                  <Card.Text>{character.personality}</Card.Text>
                </div>
              ) : null}
              {character.facts ? (
                <div className='mt-5'>
                  <Card.Title>Факты</Card.Title>
                  <Card.Text>{character.facts}</Card.Text>
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
            <Card style={{ width: "18rem" }}>
              <Card.Img
                style={{
                  objectFit: "contain",
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                }}
                height={650}
                variant='top'
                src={process.env.REACT_APP_API_URL + character.img}
              />
              <Card.Body>
                <Table>
                  <tbody>
                    {character.character_name ? (
                      <tr>
                        <td>Полное имя:</td>
                        <td>{character.character_name}</td>
                      </tr>
                    ) : null}
                    {character.occupation ? (
                      <tr>
                        <td>Род занятий:</td>
                        <td>{character.occupation}</td>
                      </tr>
                    ) : null}
                    {character.place_recidence ? (
                      <tr>
                        <td>Место проживания:</td>
                        <td>{character.place_recidence}</td>
                      </tr>
                    ) : null}
                    {character.genus ? (
                      <tr>
                        <td>Пол:</td>
                        <td>{character.genus}</td>
                      </tr>
                    ) : null}
                    {character.kind ? (
                      <tr>
                        <td>Вид:</td>
                        <td>{character.kind}</td>
                      </tr>
                    ) : null}
                    {character.age ? (
                      <tr>
                        <td>Возраст:</td>
                        <td>{character.age}</td>
                      </tr>
                    ) : null}
                    {character.orientation ? (
                      <tr>
                        <td>Ориентация:</td>
                        <td>{character.orientation}</td>
                      </tr>
                    ) : null}
                    {character.capabilities ? (
                      <tr>
                        <td>Способности:</td>
                        <td>{character.capabilities}</td>
                      </tr>
                    ) : null}
                    {character.faculty?.id ? (
                      <tr>
                        <td>Факультет:</td>
                        <td>
                          <Nav.Link
                            onClick={() =>
                              navigate(
                                FACULTY_ROUTE + "/" + character.faculty.id
                              )
                            }
                          >
                            {character.faculty.faculty_name}
                          </Nav.Link>
                        </td>
                      </tr>
                    ) : null}
                    {character.episodes ? (
                      <tr>
                        <td>Появления в сериях:</td>
                        <td>
                          {character.episodes.map((episode) => (
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
                    {character.goals ? (
                      <tr>
                        <td>Цели:</td>
                        <td>{character.goals}</td>
                      </tr>
                    ) : null}
                    {character.compound ? (
                      <tr>
                        <td>Я не помню что это:</td>
                        <td>{character.compound}</td>
                      </tr>
                    ) : null}
                    {character.voice_actor ? (
                      <tr>
                        <td>Актёр озвучки:</td>
                        <td>{character.voice_actor}</td>
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

export default CharacterPage
