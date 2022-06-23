import { observer } from "mobx-react-lite"
import React, { useContext, useState, useEffect } from "react"
import { Modal, Nav, Form } from "react-bootstrap"
import { Context } from "../.."
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { createLocation, fetchEpisode } from "../../http/fanAPI"

const animatedComponents = makeAnimated()

const CreateLocation = observer(({ show, onHide }) => {
  const { serial } = useContext(Context)
  let options
  options = serial.episodes.map((episode) => {
    return {
      value: episode.id,
      label: episode.se_number,
    }
  })

  const [name, setName] = useState("")
  const [facts, setFacts] = useState("")
  const [description, setDescription] = useState("")
  const [episodes, setEpisodes] = useState([])
  const [file, setFile] = useState(null)

  useEffect(() => {
    fetchEpisode().then((data) => serial.setEpisodes(data.rows))
  }, [])

  const selectFile = (e) => {
    setFile(e.target.files[0])
    console.log(e.target.files)
  }

  const addLocation = () => {
    const formData = new FormData()
    let episodeIds = episodes.map((episode) => episode.value)
    formData.append("location_name", name)
    formData.append("description", description)
    formData.append("facts", facts)
    formData.append("img", file)
    formData.append("episodeIds", JSON.stringify(episodeIds))
    createLocation(formData).then((data) => onHide())
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить локацию</Modal.Title>
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
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Описание:</Form.Label>
            <Form.Control
              as='textarea'
              rows={2}
              className='mb-3'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Form.Label>Факты:</Form.Label>
            <Form.Control
              as='textarea'
              rows={2}
              value={facts}
              onChange={(e) => setFacts(e.target.value)}
            />
          </Form.Group>

          <Select
            placeholder={"Выберите эпизоды"}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            value={episodes}
            onChange={(selectedOptions) => setEpisodes(selectedOptions)}
            options={options}
          />

          <Form.Group className='mb-2'>
            <Form.Label className='mt-4'>Картинка локации:</Form.Label>
            <Form.Control
              className='mt-2'
              type='file'
              onChange={selectFile}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Nav.Link onClick={addLocation}>Создать</Nav.Link>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateLocation
