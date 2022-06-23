import { observer } from "mobx-react-lite"
import React, { useContext, useState } from "react"
import { useEffect } from "react"
import { Container, Row } from "react-bootstrap"
import { Context } from "../index"
import { search } from "../http/fanAPI"
import { Card } from "react-bootstrap"
import SearchItem from "../components/SearchItem"
import EpisodeItem from "../components/EpisodeItem"
import CharacterItem from "../components/CharacterItem"
import LocationItem from "../components/LocationItem"
import FacultyItem from "../components/FacultyItem"

const Findresult = observer(() => {
  const { serial } = useContext(Context)
  const [result, setResult] = useState({})
  useEffect(() => {
    const searchQuery = serial.search
    search(searchQuery).then((data) => {
      setResult(data)
    })
  }, [serial.search])

  return (
    <Container>
      <Row className='mt-2'></Row>

      {Object.getOwnPropertyNames(result).map((title) => (
        <div>
          {result[`${title}`].length != 0 && (
            <div>
              {title === "characters" ? (
                <Container style={{ paddingTop: "2rem" }}>
                  <Card className='p-2' style={{ width: "8rem" }}>
                    <Card.Title className='text-black-50'>Персонажи</Card.Title>
                  </Card>
                </Container>
              ) : null}
              {title === "episodes" ? (
                <Container style={{ paddingTop: "2rem" }}>
                  <Card className='p-2' style={{ width: "7rem" }}>
                    <Card.Title className='text-black-50'>Эпизоды</Card.Title>
                  </Card>
                </Container>
              ) : null}
              {title === "locations" ? (
                <Container style={{ paddingTop: "2rem" }}>
                  <Card className='p-2' style={{ width: "7rem" }}>
                    <Card.Title className='text-black-50'>Локации</Card.Title>
                  </Card>
                </Container>
              ) : null}
              {title === "faculties" ? (
                <Container style={{ paddingTop: "2rem" }}>
                  <Card className='p-2' style={{ width: "8rem" }}>
                    <Card.Title className='text-black-50'>
                      Факультеты
                    </Card.Title>
                  </Card>
                </Container>
              ) : null}
              <Row>
                {result[`${title}`].map((element) => {
                  if (title === "characters")
                    return <CharacterItem character={element} />
                  if (title === "episodes")
                    return <EpisodeItem episode={element} />
                  if (title === "locations")
                    return <LocationItem location={element} />
                  if (title === "faculties")
                    return <FacultyItem faculty={element} />
                })}
              </Row>
            </div>
          )}
        </div>
      ))}
    </Container>
  )
})
export default Findresult
