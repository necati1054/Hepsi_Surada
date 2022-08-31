import React from 'react'
import {ListGroup,ListGroupItem} from 'reactstrap'
import { NavLink } from 'react-router-dom'

function AdminNavbar() {
  return (
    <ListGroup>
        <NavLink to="/admin">
            <ListGroupItem>Dashbord</ListGroupItem>
        </NavLink>
        <NavLink to="/admin/category">
            <ListGroupItem>Category Management</ListGroupItem>
        </NavLink>
        <NavLink to="/admin/subcategory">
          <ListGroupItem>SubCategory Management</ListGroupItem>
        </NavLink>
        <NavLink to="/admin/product">
          <ListGroupItem>Product Management</ListGroupItem>
        </NavLink>
        <NavLink to="/admin/tmpstore">
          <ListGroupItem>TmpStore Management</ListGroupItem>
        </NavLink>
    </ListGroup>
  )
}

export default React.memo(AdminNavbar)