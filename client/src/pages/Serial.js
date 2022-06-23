import { observer } from "mobx-react-lite"
import React, { useContext, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Context } from ".."
import Navigate from "../components/Navigate"
import {
  fetchCharacter,
  fetchEpisode,
  fetchLocation,
  fetchFaculty,
} from "../http/fanAPI"

const Serial = observer(() => {
  const { serial } = useContext(Context)

  return (
    <div>
      <Container>
        <Row>
          <Navigate />
        </Row>
      </Container>
    </div>
  )
})

export default Serial
