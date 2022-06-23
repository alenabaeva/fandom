import React from "react"
import { Container, Row } from "react-bootstrap"
import FacultyList from "../components/FacultyList"
import { fetchFaculty } from "../http/fanAPI"
import { useContext } from "react"
import { Context } from ".."
import { useEffect } from "react"
import { observer } from "mobx-react-lite"

const Faculty = observer(() => {
  const { serial } = useContext(Context)
  useEffect(() => {
    fetchFaculty().then((data) => {
      serial.setFaculties(data.rows)
      serial.setFacultyCount(data.count)
    })
  }, [])

  return (
    <Container>
      <Row className='mt-2'>
        <FacultyList />
      </Row>
    </Container>
  )
})

export default Faculty
