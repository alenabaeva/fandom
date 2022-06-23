import { observer } from "mobx-react-lite"
import React, { useContext, useState, useEffect } from "react"
import { Modal, Nav, Form } from "react-bootstrap"
import { Context } from "../.."
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { createFaculty, fetchCharacter } from "../../http/fanAPI"

const animatedComponents = makeAnimated()

const CreateFaculty = observer(({ show, onHide }) => {
  const { serial } = useContext(Context)
  let options
  options = serial.characters.map((character) => {
    return {
      value: character.id,
      label: character.character_name,
    }
  })
  const [char, addChar] = useState([])

  const [name, setName] = useState("")
  const [color, setColor] = useState("")
  const [description, setDescription] = useState("")
  const [characters, setCharacters] = useState([])
  const [file, setFile] = useState(null)

  useEffect(() => {
    fetchCharacter().then((data) => serial.setCharacters(data.rows))
  }, [])

  const selectFile = (e) => {
    setFile(e.target.files[0])
    console.log(e.target.files)
  }

  const addFaculty = () => {
    const formData = new FormData()
    let characterIds = characters.map((character) => character.value)
    formData.append("faculty_name", name)
    formData.append("color", color)
    formData.append("description", description)
    formData.append("img", file)
    formData.append("characterIds", JSON.stringify(characterIds))
    createFaculty(formData).then((data) => onHide())
  }

  const RemoveCharacter = (number) => {
    addChar(char.filter((i) => i.number !== number))
  }
  const changeCharacter = (key, value, number) => {
    addChar(char.map((i) => (i.number === number ? { ...i, [key]: value } : i)))
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить факультет</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Название:</Form.Label>
            <Form.Control
              className='mb-3'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Label>Цвет:</Form.Label>
            <Form.Control
              className='mb-3'
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Select
            placeholder={"Выберите участников"}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            value={characters}
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
        <Nav.Link onClick={addFaculty}>Создать</Nav.Link>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateFaculty
