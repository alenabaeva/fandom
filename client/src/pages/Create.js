import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateCharacter from '../components/modals/CreateCharacter';
import CreateEpisode from '../components/modals/CreateEpisode';
import CreateLocation from '../components/modals/CreateLocation';
import CreateFaculty from '../components/modals/CreateFaculty';


const Create = () => {
  const [episodeVisible, setEpisodeVisible] = useState(false)
  const [characterVisible, setCharacterVisible] = useState(false)
  const [locationVisible, setLocationVisible] = useState(false)
  const [facultyVisible, setFacultyVisible] = useState(false)
  
  return (
      <Container className="d-flex flex-column">
        <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setEpisodeVisible(true)}
        >
          Добавить эпизод
        </Button>
        <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setCharacterVisible(true)}
        >
          Добавить персонажа
        </Button>
        <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setLocationVisible(true)}
        >
          Добавить локацию
        </Button>
        <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setFacultyVisible(true)}
        >
          Добавить факультет
        </Button>
        
        <CreateCharacter show={characterVisible} onHide={() => setCharacterVisible(false)}/>
        <CreateEpisode show={episodeVisible} onHide={() => setEpisodeVisible(false)}/>
        <CreateLocation show={locationVisible} onHide={() => setLocationVisible(false)}/>
        <CreateFaculty show={facultyVisible} onHide={() => setFacultyVisible(false)}/>      
      </Container>
  );
};
export default Create;