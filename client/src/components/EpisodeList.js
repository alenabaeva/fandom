import React, { useContext } from "react"
import { observer } from "mobx-react-lite"
import EpisodeItem from "./EpisodeItem"
import { Row } from "react-bootstrap"
import { Context } from "../index"
import { Card } from "react-bootstrap"

const EpisodeList = observer(() => {
  const { serial } = useContext(Context)

  return (
    <Row className='d-flex'>
      {serial.episodes.map((episode) => (
        <EpisodeItem key={episode.id} episode={episode} />
      ))}
    </Row>
  )
})

export default EpisodeList
