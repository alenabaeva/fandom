import React, { useContext } from "react";
import {Row, Card, Container} from "react-bootstrap";

const NumberSeasonBar =() => {
    return(
        <Row className="d-flex">
            <Container style={{paddingTop: '2rem'}}>
                <Card className="p-2" style={{ width: '6rem' }}>
                    1 сезон
                </Card>
            </Container> 
        </Row>
    );
};

export default NumberSeasonBar;