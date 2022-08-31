import React, { useEffect } from 'react'
import UstNabvar from '../navbars&footer/UstNabvar'
import AdminNavbar from '../navbars&footer/AdminNavbar'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, List } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { AddCategory, AllCategory, DeleteCategory, UpdateCategory } from "../features/category/categorySlice"


function CategoryManagementPanel() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { category } = useSelector((state) => state.category)

    useEffect(() => {
        if (Object.keys(category).length === 0) {
            dispatch(AllCategory());
        }
    }, [])

    function add(e) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const item = {
            name: data.get("name"),
        }
        dispatch(AddCategory(item))
    }

    function remove(e) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const item = {
            category_id: data.get("Category_Id"),
        }
        dispatch(DeleteCategory(item))
    }

    function update(e) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const item = {
            category_id: data.get("Edit_Category_Id"),
            name: data.get("New_Category_Name")
        }
        dispatch(UpdateCategory(item))
    }

    return (
        <>
            <UstNabvar />
            <Container>
                <Row className='mt-3'>
                    <Col md={3}>
                        <AdminNavbar />
                    </Col>
                    <Col md={9}>
                        <Row>
                            <Col md={6} className="border p-3">
                                <h4>Add Category</h4>
                                <hr />
                                <Form onSubmit={add}>
                                    <FormGroup row>
                                        <Label md={2} for="name"> name = </Label>
                                        <Col md={10}>
                                            <Input id="name" name="name" placeholder="Category Name" type="text" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button color='success' type='submit'>Add New Category</Button>
                                    </FormGroup>
                                </Form>
                            </Col>
                            <Col md={6} className="border p-3">
                                <h4>Delete Category</h4>
                                <hr />
                                <Form onSubmit={remove}>
                                    <FormGroup row>
                                        <Label md={3} for="Category_Id"> Category Id = </Label>
                                        <Col md={9}>
                                            <Input id="Category_Id" name="Category_Id" placeholder="Category_Id" type="select">
                                                <option>Select Category</option>
                                                {
                                                    category.map((cate) => (
                                                        <option value={cate.id} key={cate.id}>{cate.name}</option>
                                                    ))
                                                }
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button color='danger' type='submit'>Delete Category</Button>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                        <Row className='mt-5'>
                            <Col md={6} className="border p-3">
                                <h4>Update Category</h4>
                                <hr />
                                <Form onSubmit={update}>
                                    <FormGroup row>
                                        <Label md={4} for="Edit_Category_Id">Edit Category Id = </Label>
                                        <Col md={6}>
                                            <Input id="Edit_Category_Id" name="Edit_Category_Id" placeholder="Edit_Category_Id" type="select">
                                                <option>Select Category</option>
                                                {
                                                    category.map((cate) => (
                                                        <option value={cate.id} key={cate.id}>{cate.name}</option>
                                                    ))
                                                }
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label md={4} for="New_Category_Name"> New Category Name = </Label>
                                        <Col md={8}>
                                            <Input id="New_Category_Name" name="New_Category_Name" placeholder="New_Category_Name" type="text" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button color='success' type='submit'>Update Category</Button>
                                    </FormGroup>
                                </Form>
                            </Col>
                            <Col md={6} className="border p-3">
                                <h4>All Category</h4>
                                <hr />
                                <List>
                                    {
                                        category.map((cate) => (
                                            <li key={cate.id}>{cate.name}</li>
                                        ))
                                    }
                                </List>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CategoryManagementPanel