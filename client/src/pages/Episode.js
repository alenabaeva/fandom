import { observer } from "mobx-react-lite"
import React from "react"
import { Container, Row, Card } from "react-bootstrap"
import EpisodeList from "../components/EpisodeList"
import NumberSeasonBar from "../components/NumberSeasonBar"
import { fetchEpisode } from "../http/fanAPI"
import { useContext } from "react"
import { Context } from ".."
import { useEffect } from "react"

const Episode = observer(() => {
  const { serial } = useContext(Context)
  useEffect(() => {
    fetchEpisode().then((data) => {
      serial.setEpisodes(data.rows)
      serial.setEpisodeCount(data.count)
    })
  }, [])

  return (
    <Container>
      <Row className='mt-2'>
        <NumberSeasonBar />
        <EpisodeList />
      </Row>
    </Container>
  )
})

export default Episode
