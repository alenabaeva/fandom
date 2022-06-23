import { observer } from "mobx-react-lite"
import React, { useContext, useState, useEffect } from "react"
import { Modal, Nav, Form, Card } from "react-bootstrap"
import { Context } from "../.."
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { useParams } from "react-router-dom"
import {
  fetchFaculty,
  fetchEpisode,
  fetchOneCharacter,
  updateCharacter,
} from "../../http/fanAPI"

const animatedComponents = makeAnimated()

const UpdateCharacter = observer(({ show, onHide }) => {
  const { serial } = useContext(Context)
  let options_fac, options_ep
  options_fac = serial.faculties.map((faculty) => {
    return {
      value: faculty.id,
      label: faculty.faculty_name,
    }
  })
  options_ep = serial.episodes.map((episode) => {
    return {
      value: episode.id,
      label: episode.se_number,
    }
  })
  const [character, setCharacter] = useState("")
  const [faculties, setFaculties] = useState([])
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(false)
  const [episodeSelected, setEpisodeSelected] = useState([])
  const [facultySelected, setFacultySelected] = useState([])
  const [file, setFile] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    fetchFaculty().then((data) => {
      serial.setFaculties(data.rows)
    })
    fetchEpisode().then((data) => serial.setEpisodes(data.rows))
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchOneCharacter(id).then((data) => {
      setCharacter(data)

      let selectedEpisodes = data.episodes.map((episode) => {
        return {
          value: episode.id,
          label: episode.se_number,
        }
      })
      setEpisodeSelected(selectedEpisodes)
      setEpisodes(selectedEpisodes)

      // if (data?.faculty?.id != null) {
      //   setFacultySelected({
      //     value: data.faculty.id,
      //     label: data.faculty.faculty_name,
      //   })
      // }

      if (data?.faculty?.id != null) {
        let selectedF = {
          value: data.faculty.id,
          label: data.faculty.faculty_name,
        }
        setFacultySelected(selectedF)
        setFaculties(selectedF)
      }

      console.log("dataModal", data)
    })
    setLoading(false)
  }, [])

  const selectFile = (e) => {
    setFile(e.target.files[0])
    console.log(e.target.files)
  }

  const changeCharacter = () => {
    const formData = new FormData()
    let episodeIds = episodes.map((episode) => episode.value)
    let facultyId
    Object.keys(facultySelected).length == 0
      ? (facultyId = null)
      : (facultyId = facultySelected.value)
    if (character.id) {
      formData.append("character", JSON.stringify(character))
      formData.append("episodeIds", JSON.stringify(episodeIds))
      formData.append("facultyId", facultyId)
      formData.append("img", file)
      updateCharacter(formData, id).then((data) => onHide())
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Изменить персонажа</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Имя:</Form.Label>
            <Form.Control
              className='mb-3'
              value={character.character_name || ""}
              onChange={(e) =>
                setCharacter({ ...character, character_name: e.target.value })
              }
            />
            <Form.Label>Род занятий:</Form.Label>
            <Form.Control
              className='mb-3'
              value={character.occupation || ""}
              onChange={(e) =>
                setCharacter({ ...character, occupation: e.target.value })
              }
            />
            <Form.Label>Место рождения:</Form.Label>
            <Form.Control
              className='mb-3'
              value={character.place_recidence || ""}
              onChange={(e) =>
                setCharacter({ ...character, place_recidence: e.target.value })
              }
            />
            <Form.Label>Пол:</Form.Label>
            <Form.Control
              className='mb-3'
              value={character.genus || ""}
              onChange={(e) =>
                setCharacter({ ...character, genus: e.target.value })
              }
            />
            <Form.Label>Вид:</Form.Label>
            <Form.Control
              className='mb-3'
              value={character.kind || ""}
              onChange={(e) =>
                setCharacter({ ...character, kind: e.target.value })
              }
            />
            <Form.Label>Возраст:</Form.Label>
            <Form.Control
              className='mb-3'
              value={character.age || ""}
              onChange={(e) =>
                setCharacter({ ...character, age: e.target.value })
              }
            />
            <Form.Label>Ориентация:</Form.Label>
            <Form.Control
              className='mb-3'
              value={character.orientation || ""}
              onChange={(e) =>
                setCharacter({ ...character, orientation: e.target.value })
              }
            />
            <Form.Label>Способности:</Form.Label>
            <Form.Control
              className='mb-3'
              value={character.capabilities || ""}
              onChange={(e) =>
                setCharacter({ ...character, capabilities: e.target.value })
              }
            />
            <Form.Label>Цели:</Form.Label>
            <Form.Control
              className='mb-3'
              value={character.goals || ""}
              onChange={(e) =>
                setCharacter({ ...character, goals: e.target.value })
              }
            />
            {/* <Form.Label>Я не помню что это:</Form.Label>
            <Form.Control
              className='mb-3'
              value={character.compound || ""}
              onChange={(e) =>
                setCharacter({ ...character, compound: e.target.value })
              }
            /> */}
            <Form.Label>Актёр озвучки:</Form.Label>
            <Form.Control
              className='mb-3'
              value={character.voice_actor || ""}
              onChange={(e) =>
                setCharacter({ ...character, voice_actor: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={character.description || ""}
              onChange={(e) =>
                setCharacter({ ...character, description: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Внешность</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={character.appearance || ""}
              onChange={(e) =>
                setCharacter({ ...character, appearance: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Личность</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={character.personality || ""}
              onChange={(e) =>
                setCharacter({ ...character, personality: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Факты</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={character.facts || ""}
              onChange={(e) =>
                setCharacter({ ...character, facts: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Select
              placeholder={"Выберите эпизоды"}
              defaultValue={episodeSelected}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              onChange={(selectedOptions) => setEpisodes(selectedOptions)}
              options={options_ep}
            />
          </Form.Group>
          <Form.Group>
            <Select
              placeholder={"Выберите факультет"}
              defaultValue={facultySelected}
              closeMenuOnSelect={false}
              components={animatedComponents}
              onChange={(selectedOptions) =>
                setFacultySelected(selectedOptions)
              }
              options={options_fac}
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label className='mt-4'>Картинка персонажа:</Form.Label>
            <Form.Control
              className='mt-2'
              type='file'
              onChange={selectFile}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Nav.Link onClick={changeCharacter}>Изменить</Nav.Link>
      </Modal.Footer>
    </Modal>
  )
})

export default UpdateCharacter
