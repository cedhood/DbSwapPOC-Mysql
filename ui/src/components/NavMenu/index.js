import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import DbTypeService from '../../services/DbTypeService';

import {
  StyledNavbar,
  StyledText,
} from './styles';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assets/logo.png';

import AuthService from '../../services/AuthService';
import AuthContext from '../../contexts/AuthContext';
import DbTypeContext from '../../contexts/DbTypeContext';

const NavMenu = () => {

  const history = useHistory();
  const { setLoggedIn } = useContext(AuthContext);
  const { setCurrentDbType: contextSetCurrentDbType } = useContext(DbTypeContext);
  const [databaseType, setDatabaseType] = useState('SQL_SERVER');

  const handleChangeDatabaseType = async (dbType) => {
    if (window.confirm(`Change database to ${dbType}?`)) {
      await DbTypeService.setDatabaseType(dbType);
      setDatabaseType(dbType);
      contextSetCurrentDbType(dbType);
    }
  }

  const handleLogout = () => {
    AuthService.logout();
    setLoggedIn(false);
    history.push('/');
  }

  const textColor = '#ddd';

  return (
    <StyledNavbar expand="lg">
      <Navbar.Brand href="/" style={{ color: textColor }}>
        <img src={logo} height="35" />
        <span style={{ marginLeft: 10 }}>DB Migration</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav pull-right">
        <Nav className="mr-auto">
          <Nav.Link 
            onClick={() => history.push('/departments')}
            style={{ color: textColor }}>Departments</Nav.Link>
          <Nav.Link 
            onClick={() => history.push('/employees')}
            style={{ color: textColor }}>Employees</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title={<StyledText>Databases</StyledText>} id="basic-nav-dropdown">
            <NavDropdown.Item 
              active={databaseType === 'SQL_SERVER'} 
              href="#" 
              onClick={() => handleChangeDatabaseType('SQL_SERVER')}>
                SQL Server
            </NavDropdown.Item>
            <NavDropdown.Item 
              href="#" 
              active={databaseType === 'POSTGRES'}
              onClick={() => handleChangeDatabaseType('POSTGRES')}>
                PostgreSQL
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <NavDropdown title={<StyledText>Menu</StyledText>} id="basic-nav-dropdown">
            <NavDropdown.Item href="#" onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </StyledNavbar>
  )
}

export default NavMenu;