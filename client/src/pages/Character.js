import { observer } from "mobx-react-lite"
import React from "react"
import { Container, Row } from "react-bootstrap"
import CharacterList from "../components/CharacterList"
import { fetchCharacter } from "../http/fanAPI"
import { useContext } from "react"
import { Context } from ".."
import { useEffect } from "react"

const Character = observer(() => {
  const { serial } = useContext(Context)
  useEffect(() => {
    fetchCharacter().then((data) => {
      serial.setCharacters(data.rows)
      serial.setCharacterCount(data.count)
    })
  }, [])

  return (
    <Container>
      <Row className='mt-2'>
        <CharacterList />
      </Row>
    </Container>
  )
})
export default Character
