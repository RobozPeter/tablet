
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Menu(){
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Kezdolap">Home</Nav.Link>
            <Nav.Link as={Link} to="/TabletFelvetel">Tablet Felvétel</Nav.Link>
            <Nav.Link as={Link} to="/TabletTorles">Tablet Törlés</Nav.Link>
            <Nav.Link as={Link} to="/">Tabletek Listája</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

