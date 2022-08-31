import React from 'react'
import {Navbar,NavbarBrand} from 'reactstrap';
  

function AltFooter() {
  return (
        <Navbar fixed='bottom' color="dark" dark expand="md">
            <NavbarBrand href="/">
            <img alt="logo" src="http://localhost:8000/Image/HepsiSurada.png" style={{ height: 40, width: 40 }}/>
            <span className='ms-2'>Hepsi Şurada</span>
          </NavbarBrand>
          <NavbarBrand className='m-auto'>
          © 2022 Copyright <span>Hepsi Şurada</span>
          </NavbarBrand>
        </Navbar>

  )
}

export default React.memo(AltFooter)