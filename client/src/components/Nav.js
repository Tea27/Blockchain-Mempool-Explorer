import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MainNav({ expand }) {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (search) {
      navigate(`/transaction/${search}`);
      setSearch('');
    }
  };
  return (
    <>
      {
        <Navbar
          key={expand}
          expand={expand}
          className="bg-primary"
          data-bs-theme="dark"
        >
          <Container fluid>
            <Navbar.Brand as={Link} to="/">
              <img
                alt=""
                src="/images/mem.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              Mempool Viewer
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              data-bs-theme="dark"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Mempool
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/chart">
                    Chart
                  </Nav.Link>
                </Nav>
                <Form className="d-flex pt-3" onSubmit={handleSearchSubmit}>
                  <Form.Control
                    type="search"
                    placeholder="Search by TxID"
                    className="me-2"
                    aria-label="Search"
                    value={search}
                    onChange={handleSearchChange}
                  />
                  <Button variant="outline-primary" type="submit">
                    Search
                  </Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      }
    </>
  );
}

export default MainNav;
