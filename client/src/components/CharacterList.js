import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Row } from "react-bootstrap";
import {Context} from "../index";
import CharacterItem from "./CharacterItem";

const CharacterList = observer(() => {
    const {serial} = useContext(Context)
    return(
        <Row className="d-flex">
            {serial.characters.map(character =>
                <CharacterItem key={character.id} character={character}/>
            )}
        </Row>
    );
});

export default CharacterList;