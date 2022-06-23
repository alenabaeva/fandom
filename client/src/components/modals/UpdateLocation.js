import { observer } from "mobx-react-lite"
import React, { useContext, useState, useEffect } from "react"
import { Modal, Nav, Form, Card } from "react-bootstrap"
import { Context } from "../.."
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { useParams } from "react-router-dom"
import {
  fetchEpisode,
  fetchOneLocation,
  updateLocation,
} from "../../http/fanAPI"

const animatedComponents = makeAnimated()

const UpdateLocation = observer(({ show, onHide }) => {
  const { serial } = useContext(Context)
  let options
  options = serial.episodes.map((episode) => {
    return {
      value: episode.id,
      label: episode.se_number,
    }
  })

  const [location, setLocation] = useState("")
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(false)
  const [optionsSelected, setOptionsSelected] = useState([])
  const [file, setFile] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    fetchEpisode().then((data) => serial.setEpisodes(data.rows))
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchOneLocation(id).then((data) => {
      setLocation(data)
      let selectedEpisodes = data.episodes.map((episode) => {
        return {
          value: episode.id,
          label: episode.se_number,
        }
      })
      setOptionsSelected(selectedEpisodes)
      setEpisodes(selectedEpisodes)
    })
    setLoading(false)
  }, [])

  const selectFile = (e) => {
    setFile(e.target.files[0])
    console.log(e.target.files)
  }

  const changeLocation = () => {
    const formData = new FormData()
    let episodeIds = episodes.map((episode) => episode.value)
    if (location.id) {
      formData.append("location", JSON.stringify(location))
      formData.append("episodeIds", JSON.stringify(episodeIds))
      formData.append("img", file)
      updateLocation(formData, id).then((data) => onHide())
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Изменить локацию</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Название:</Form.Label>
            <Form.Control
              className='mb-3'
              value={location.location_name || ""}
              onChange={(e) =>
                setLocation({ ...location, location_name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={location.description || ""}
              onChange={(e) =>
                setLocation({ ...location, description: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Факты:</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={location.facts || ""}
              onChange={(e) =>
                setLocation({ ...location, facts: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Select
              placeholder={"Выберите серии:"}
              defaultValue={optionsSelected}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              onChange={(selectedOptions) => setEpisodes(selectedOptions)}
              options={options}
            />
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Label className='mt-4'>Картинки локации:</Form.Label>
            <Form.Control
              className='mt-2'
              type='file'
              onChange={selectFile}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Nav.Link onClick={changeLocation}>Изменить</Nav.Link>
      </Modal.Footer>
    </Modal>
  )
})

export default UpdateLocation
