import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Row } from "react-bootstrap";
import {Context} from "../index";
import LocationItem from "./LocationItem"

const LocationList = observer(() => {
    const {serial} = useContext(Context)
    return(
        <Row className="d-flex">
            {serial.locations.map(location =>
                <LocationItem key={location.id} location={location}/>
            )}
        </Row>
    );
});

export default LocationList;