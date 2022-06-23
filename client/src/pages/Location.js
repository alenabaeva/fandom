import React from "react"
import { observer } from "mobx-react-lite"
import { Container, Row } from "react-bootstrap"
import LocationList from "../components/LocationList"
import { fetchLocation } from "../http/fanAPI"
import { useContext } from "react"
import { Context } from ".."
import { useEffect } from "react"

const Location = observer(() => {
  const { serial } = useContext(Context)
  useEffect(() => {
    fetchLocation().then((data) => {
      serial.setLocations(data.rows)
      serial.setLocationCount(data.count)
    })
  }, [])

  return (
    <Container>
      <Row className='mt-2'>
        <LocationList />
      </Row>
    </Container>
  )
})

export default Location
