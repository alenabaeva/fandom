import { observer } from "mobx-react-lite"
import React, { useContext, useState, useEffect } from "react"
import { Modal, Nav, Form } from "react-bootstrap"
import { Context } from "../.."
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { createEpisode } from "../../http/fanAPI"
import { fetchCharacter, fetchLocation } from "../../http/fanAPI"

const animatedComponents = makeAnimated()

const CreateEpisode = observer(({ show, onHide }) => {
  const { serial } = useContext(Context)
  let options
  let options1
  options = serial.characters.map((character) => {
    return {
      value: character.id,
      label: character.character_name,
    }
  })
  options1 = serial.locations.map((location) => {
    return {
      value: location.id,
      label: location.location_name,
    }
  })

  const [season, setSeason] = useState("")
  const [name, setName] = useState("")
  const [se_number, setSE_number] = useState("")
  const [synopsis, setSynopsis] = useState("")
  const [plot, setPlot] = useState("")
  const [facts, setFacts] = useState("")
  const [characters, setCharacters] = useState([])
  const [locations, setLocations] = useState([])
  const [file, setFile] = useState(null)

  useEffect(() => {
    fetchCharacter().then((data) => serial.setCharacters(data.rows))
  }, [])

  useEffect(() => {
    fetchLocation().then((data) => serial.setLocations(data.rows))
  }, [])

  const selectFile = (e) => {
    setFile(e.target.files[0])
    console.log(e.target.files)
  }

  const addEpisode = () => {
    const formData = new FormData()
    let characterIds = characters.map((character) => character.value)
    let locationIds = locations.map((location) => location.value)
    formData.append("season_name", name)
    formData.append("season", season)
    formData.append("se_number", se_number)
    formData.append("synopsis", synopsis)
    formData.append("plot", plot)
    formData.append("facts", facts)
    formData.append("img", file)
    formData.append("characterIds", JSON.stringify(characterIds))
    formData.append("locationIds", JSON.stringify(locationIds))
    createEpisode(formData).then((data) => onHide())
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить серию</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Сезон:</Form.Label>
            <Form.Control
              className='mb-3'
              value={season}
              onChange={(e) => setSeason(e.target.value)}
            />
            <Form.Label>Сезон и серия:</Form.Label>
            <Form.Control
              placeholder='S01E01'
              className='mb-3'
              value={se_number}
              onChange={(e) => setSE_number(e.target.value)}
            />
            <Form.Label>Название:</Form.Label>
            <Form.Control
              className='mb-3'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-4'>
            <Form.Label>Синопсис:</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              className='mb-3'
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
            />
            <Form.Label>Сюжет:</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              className='mb-3'
              value={plot}
              onChange={(e) => setPlot(e.target.value)}
            />
            <Form.Label>Факты:</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={facts}
              onChange={(e) => setFacts(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Select
              placeholder={"Выберите персонажей"}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              value={characters}
              onChange={(selectedOptions) => setCharacters(selectedOptions)}
              options={options}
            />
          </Form.Group>

          <Form.Group>
            <Select
              placeholder={"Выберите локации"}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              value={locations}
              onChange={(selectedOptions) => setLocations(selectedOptions)}
              options={options1}
            />
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Label className='mt-4'>Кадр:</Form.Label>
            <Form.Control
              className='mt-2'
              type='file'
              onChange={selectFile}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Nav.Link onClick={addEpisode}>Создать</Nav.Link>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateEpisode
