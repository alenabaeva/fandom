import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Row } from "react-bootstrap";
import {Context} from "../index";
import FacultyItem from "./FacultyItem";

const FacultyList = observer(() => {
    const {serial} = useContext(Context)
    return(
        <Row className="d-flex">
            {serial.faculties.map(faculty =>
                <FacultyItem key={faculty.id} faculty={faculty}/>
            )}
        </Row>
    );
});

export default FacultyList;