import { observer } from "mobx-react-lite"
import React, { useContext, useState, useEffect } from "react"
import { Modal, Nav, Form, Card } from "react-bootstrap"
import { Context } from "../.."
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { useParams } from "react-router-dom"
import {
  fetchCharacter,
  fetchLocation,
  fetchOneEpisode,
  updateEpisode,
} from "../../http/fanAPI"

const animatedComponents = makeAnimated()

const UpdateEpisode = observer(({ show, onHide }) => {
  const { serial } = useContext(Context)
  let options_char, options_loc
  options_char = serial.characters.map((character) => {
    return {
      value: character.id,
      label: character.character_name,
    }
  })
  options_loc = serial.locations.map((location) => {
    return {
      value: location.id,
      label: location.location_name,
    }
  })

  const [episode, setEpisode] = useState("")
  const [characters, setCharacters] = useState([])
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(false)
  const [characterSelected, setCharacterSelected] = useState([])
  const [locationSelected, setLocationSelected] = useState([])
  const [file, setFile] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    fetchCharacter().then((data) => serial.setCharacters(data.rows))
    fetchLocation().then((data) => serial.setLocations(data.rows))
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchOneEpisode(id).then((data) => {
      setEpisode(data)
      let selectedCharacters = data.characters.map((character) => {
        return {
          value: character.id,
          label: character.character_name,
        }
      })
      setCharacterSelected(selectedCharacters)
      setCharacters(selectedCharacters)

      let selectedLocations = data.locations.map((location) => {
        return {
          value: location.id,
          label: location.location_name,
        }
      })
      setLocationSelected(selectedLocations)
      setLocations(selectedLocations)
    })
    setLoading(false)
  }, [])

  const selectFile = (e) => {
    setFile(e.target.files[0])
    console.log(e.target.files)
  }

  const changeEpisode = () => {
    const formData = new FormData()
    let characterIds = characters.map((character) => character.value)
    let locationIds = locations.map((location) => location.value)
    if (episode.id) {
      formData.append("episode", JSON.stringify(episode))
      formData.append("characterIds", JSON.stringify(characterIds))
      formData.append("locationIds", JSON.stringify(locationIds))
      formData.append("img", file)
      updateEpisode(formData, id).then((data) => onHide())
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Изменить эпизод</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Название:</Form.Label>
            <Form.Control
              className='mb-3'
              value={episode.series_name || ""}
              onChange={(e) =>
                setEpisode({ ...episode, series_name: e.target.value })
              }
            />
            <Form.Label>SE серии:</Form.Label>
            <Form.Control
              className='mb-3'
              value={episode.se_number || ""}
              onChange={(e) =>
                setEpisode({ ...episode, se_number: e.target.value })
              }
            />
            <Form.Label>Сезон:</Form.Label>
            <Form.Control
              className='mb-3'
              value={episode.season || ""}
              onChange={(e) =>
                setEpisode({ ...episode, season: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Синопсис</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={episode.synopsis || ""}
              onChange={(e) =>
                setEpisode({ ...episode, synopsis: e.target.value })
              }
            />
            <Form.Label>Сюжет</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={episode.plot || ""}
              onChange={(e) => setEpisode({ ...episode, plot: e.target.value })}
            />
            <Form.Label>Факты</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={episode.facts || ""}
              onChange={(e) =>
                setEpisode({ ...episode, facts: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Select
              placeholder={"Выберите участников"}
              defaultValue={characterSelected}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              onChange={(selectedOptions) => setCharacters(selectedOptions)}
              options={options_char}
            />
          </Form.Group>
          <Form.Group>
            <Select
              placeholder={"Выберите локации"}
              defaultValue={locationSelected}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              onChange={(selectedOptions) => setLocations(selectedOptions)}
              options={options_loc}
            />
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Label className='mt-4'>Раскадровка:</Form.Label>
            <Form.Control
              className='mt-2'
              type='file'
              onChange={selectFile}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Nav.Link onClick={changeEpisode}>Изменить</Nav.Link>
      </Modal.Footer>
    </Modal>
  )
})

export default UpdateEpisode
