import { observer } from "mobx-react-lite"
import React, { useContext, useState, useEffect } from "react"
import { Modal, Nav, Form } from "react-bootstrap"
import { Context } from "../.."
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { createCharacter, fetchEpisode, fetchFaculty } from "../../http/fanAPI"

const animatedComponents = makeAnimated()

const CreateCharacter = observer(({ show, onHide }) => {
  const { serial } = useContext(Context)
  let options
  let options1
  options = serial.episodes.map((episode) => {
    return {
      value: episode.id,
      label: episode.series_name,
    }
  })
  options1 = serial.faculties.map((faculty) => {
    return {
      value: faculty.id,
      label: faculty.faculty_name,
    }
  })

  const [name, setName] = useState("")
  const [occupation, setOccupation] = useState("")
  const [place_recidence, setPlace_recidence] = useState("")
  const [genus, setGenus] = useState("")
  const [kind, setKind] = useState("")
  const [age, setAge] = useState("")
  const [orientation, setOrientation] = useState("")
  const [capabilities, setCapabilities] = useState("")
  const [goals, setGoals] = useState("")
  const [compound, setCompound] = useState("")
  const [voice_actor, setVoice_actor] = useState("")
  const [description, setDescription] = useState("")
  const [appearance, setAppearance] = useState("")
  const [personality, setPersonality] = useState("")
  const [facts, setFacts] = useState("")
  const [episodes, setEpisodes] = useState([])
  const [faculties, setFaculties] = useState([])
  const [file, setFile] = useState(null)

  useEffect(() => {
    fetchFaculty().then((data) => serial.setFaculties(data.rows))
  }, [])

  useEffect(() => {
    fetchEpisode().then((data) => serial.setEpisodes(data.rows))
  }, [])
  const selectFile = (e) => {
    setFile(e.target.files[0])
    console.log(e.target.files)
  }

  const addCharacter = () => {
    const formData = new FormData()
    let episodeIds = episodes.map((episode) => episode.value)
    let facultyIds = faculties.map((faculty) => faculty.value)
    formData.append("character_name", name)
    formData.append("occupation", occupation)
    formData.append("place_recidence", place_recidence)
    formData.append("genus", genus)
    formData.append("kind", kind)
    formData.append("age", age)
    formData.append("orientation", orientation)
    formData.append("capabilities", capabilities)
    formData.append("goals", goals)
    formData.append("compound", compound)
    formData.append("voice_actor", voice_actor)
    formData.append("description", description)
    formData.append("appearance", appearance)
    formData.append("personality", personality)
    formData.append("facts", facts)
    formData.append("img", file)
    formData.append("facultyIds", JSON.stringify(facultyIds))
    formData.append("episodeIds", JSON.stringify(episodeIds))
    createCharacter(formData).then((data) => onHide())
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить персонажа</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Имя:</Form.Label>
            <Form.Control
              className='mb-3'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Label>Род занятий:</Form.Label>
            <Form.Control
              className='mb-3'
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />
            <Form.Label>Место проживания:</Form.Label>
            <Form.Control
              className='mb-3'
              value={place_recidence}
              onChange={(e) => setPlace_recidence(e.target.value)}
            />
            <Form.Label>Пол:</Form.Label>
            <Form.Control
              className='mb-3'
              value={genus}
              onChange={(e) => setGenus(e.target.value)}
            />
            <Form.Label>Вид:</Form.Label>
            <Form.Control
              className='mb-3'
              value={kind}
              onChange={(e) => setKind(e.target.value)}
            />
            <Form.Label>Возраст:</Form.Label>
            <Form.Control
              className='mb-3'
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <Form.Label>Ориентация:</Form.Label>
            <Form.Control
              className='mb-3'
              value={orientation}
              onChange={(e) => setOrientation(e.target.value)}
            />
            <Form.Label>Способности:</Form.Label>
            <Form.Control
              className='mb-3'
              value={capabilities}
              onChange={(e) => setCapabilities(e.target.value)}
            />
            <Form.Label>Цели:</Form.Label>
            <Form.Control
              className='mb-3'
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
            />
            {/* <Form.Label>Не помню что это:</Form.Label>
            <Form.Control
              className='mb-3'
              value={compound}
              onChange={(e) => setCompound(e.target.value)}
            /> */}
            <Form.Label>Актёр озвучки:</Form.Label>
            <Form.Control
              className='mb-3'
              value={voice_actor}
              onChange={(e) => setVoice_actor(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-4'>
            <Form.Label>Описание:</Form.Label>
            <Form.Control
              as='textarea'
              rows={2}
              className='mb-3'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Form.Label>Внешний вид:</Form.Label>
            <Form.Control
              as='textarea'
              rows={2}
              className='mb-3'
              value={appearance}
              onChange={(e) => setAppearance(e.target.value)}
            />
            <Form.Label>Личность:</Form.Label>
            <Form.Control
              as='textarea'
              rows={2}
              className='mb-3'
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
            />
            <Form.Label>Факты:</Form.Label>
            <Form.Control
              as='textarea'
              rows={2}
              value={facts}
              onChange={(e) => setFacts(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Select
              placeholder={"Выберите эпизоды"}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              value={episodes}
              onChange={(selectedOptions) => setEpisodes(selectedOptions)}
              options={options}
            />
          </Form.Group>

          <Form.Group>
            <Select
              placeholder={"Выберите факультет"}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              value={faculties}
              onChange={(selectedOptions) => setFaculties(selectedOptions)}
              options={options1}
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
        <Nav.Link onClick={addCharacter}>Создать</Nav.Link>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateCharacter
