import React, { useContext, useState } from "react"
import { Context } from "../index"
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import {
  SERIAL_ROUTE,
  CHARACTER_ROUTE,
  FACULTY_ROUTE,
  LOCATION_ROUTE,
  EPISODE_ROUTE,
  CREATE_ROUTE,
} from "../utils/consts"
import { observer } from "mobx-react-lite"
import Findresult from "../pages/Findresult"

const NavBar = observer(() => {
  const { user, serial } = useContext(Context)
  const [searchName, setsearchName] = useState("")
  const navigate = useNavigate()

  function searchChangeHandler(e) {
    console.log(serial)
    setsearchName(e.target.value)
    serial.setSearch(e.target.value)
    navigate("/searchresult")
  }

  return (
    <Navbar bg='light' expand='lg'>
      <Container fluid>
        <Link
          style={{
            textDecoration: "none",
            color: "black",
            paddingLeft: 20,
            paddingRight: 40,
          }}
          to={SERIAL_ROUTE}
        >
          Owl House
        </Link>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                paddingLeft: 10,
                paddingRight: 10,
              }}
              to={SERIAL_ROUTE}
            >
              О сериале
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                paddingLeft: 10,
                paddingRight: 10,
              }}
              href='#action2'
              to={EPISODE_ROUTE}
            >
              Эпизоды
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                paddingLeft: 10,
                paddingRight: 10,
              }}
              href='#action3'
              to={CHARACTER_ROUTE}
            >
              Персонажи
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                paddingLeft: 10,
                paddingRight: 10,
              }}
              href='#action4'
              to={LOCATION_ROUTE}
            >
              Локации
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                paddingLeft: 10,
                paddingRight: 10,
              }}
              to={FACULTY_ROUTE}
            >
              Факультеты
            </Link>
          </Nav>
          <Form className='d-flex'>
            <Nav
              className='ml-auto'
              style={{
                textDecoration: "none",
                color: "black",
                paddingLeft: 10,
                paddingRight: 30,
              }}
            >
              <Button
                variant='outline-success'
                color='sky'
                onClick={() => navigate(CREATE_ROUTE)}
              >
                Создать
              </Button>
            </Nav>
            <FormControl
              value={searchName}
              onChange={(e) => searchChangeHandler(e)}
              type='search'
              placeholder='Поиск...'
              className='me-4'
              aria-label='Search'
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
})

export default NavBar
