import { observer } from "mobx-react-lite"
import React, { useContext, useState, useEffect } from "react"
import { Modal, Nav, Form, Card } from "react-bootstrap"
import { Context } from "../.."
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { useParams } from "react-router-dom"
import {
  fetchCharacter,
  fetchOneFaculty,
  updateFaculty,
} from "../../http/fanAPI"

const animatedComponents = makeAnimated()

const UpdateFaculty = observer(({ show, onHide }) => {
  const { serial } = useContext(Context)
  let options
  options = serial.characters.map((character) => {
    return {
      value: character.id,
      label: character.character_name,
    }
  })

  const [faculty, setFaculty] = useState("")
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(false)
  const [optionsSelected, setOptionsSelected] = useState([])
  const [file, setFile] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    fetchCharacter().then((data) => serial.setCharacters(data.rows))
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchOneFaculty(id).then((data) => {
      setFaculty(data)
      let selectedCharacters = data.characters.map((character) => {
        return {
          value: character.id,
          label: character.character_name,
        }
      })
      setOptionsSelected(selectedCharacters)
      setCharacters(selectedCharacters)
    })
    setLoading(false)
  }, [])

  const selectFile = (e) => {
    setFile(e.target.files[0])
    console.log(e.target.files)
  }

  const changeFaculty = () => {
    const formData = new FormData()
    let characterIds = characters.map((character) => character.value)
    if (faculty.id) {
      formData.append("faculty", JSON.stringify(faculty))
      formData.append("characterIds", JSON.stringify(characterIds))
      formData.append("img", file)
      updateFaculty(formData, id).then((data) => onHide())
    }
  }
  console.log(faculty.characters)
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Изменить факультет</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Название:</Form.Label>
            <Form.Control
              className='mb-3'
              value={faculty.faculty_name || ""}
              onChange={(e) =>
                setFaculty({ ...faculty, faculty_name: e.target.value })
              }
            />
            <Form.Label>Цвет:</Form.Label>
            <Form.Control
              className='mb-3'
              value={faculty.color || ""}
              onChange={(e) =>
                setFaculty({ ...faculty, color: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={faculty.description || ""}
              onChange={(e) =>
                setFaculty({ ...faculty, description: e.target.value })
              }
            />
          </Form.Group>

          <Select
            placeholder={"Выберите участников"}
            defaultValue={optionsSelected}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            onChange={(selectedOptions) => setCharacters(selectedOptions)}
            options={options}
          />

          <Form.Group className='mb-2'>
            <Form.Label className='mt-4'>Эмблема факультета:</Form.Label>
            <Form.Control
              className='mt-2'
              type='file'
              onChange={selectFile}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Nav.Link onClick={changeFaculty}>Изменить</Nav.Link>
      </Modal.Footer>
    </Modal>
  )
})

export default UpdateFaculty
