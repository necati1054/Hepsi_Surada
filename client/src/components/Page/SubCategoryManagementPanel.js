import {React,useEffect} from 'react'
import { Container,Row,Col,Form,FormGroup,Label,Input, Button, List,Table} from 'reactstrap'
import {AllCategory} from "../features/category/categorySlice"
import { AllSubCategory,AddSubCategory,DeleteSubCategory,UpdateSubCategory } from '../features/subCategory/subCategorySlice';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate }  from 'react-router-dom'
import UstNabvar from '../navbars&footer/UstNabvar'
import AdminNavbar from '../navbars&footer/AdminNavbar'

function SubCategoryManagementPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { category } = useSelector((state)=>state.category)
  const { subCategory } = useSelector((state)=>state.subCategory)

  useEffect(() => {
      if(Object.keys(category).length === 0)
      {
          dispatch(AllCategory());
      }
      if(Object.keys(subCategory).length === 0)
      {
        dispatch(AllSubCategory())
      }
  }, [])

  function add(e){
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const item = {
      name:data.get("name"),
      category_id:data.get("Category_Id"),
    }
    dispatch(AddSubCategory(item))
  }

  function remove(e){
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const item = {
      sub_category_id:data.get("Delete_subCategory_Id"),
    }
    dispatch(DeleteSubCategory(item))
  }

  function update(e){
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const item ={
      name : data.get("Updata_name"),
      category_id : data.get("Update_Category_Id"),
      sub_category_id : data.get("Update_subCategory_Id")
    }
    dispatch(UpdateSubCategory(item))
  }

  return (
    <>
      <UstNabvar/>
      <Container>
        <Row className='mt-3'>
          <Col md={3}>
            <AdminNavbar/>
          </Col>
          <Col md={9}>
            <Row>
              <Col md={6} className="border p-3">
                <h4>Add SubCategory</h4>
                <hr/>
                <Form onSubmit={add}>
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
                <FormGroup row>
                  <Label md={5} for="name"> SubCategory name = </Label>
                  <Col md={7}>
                      <Input id="name" name="name" placeholder="SubCategory Name" type="text" />
                  </Col>
                </FormGroup>
                <FormGroup>
                    <Button color='success' type='submit'>Add SubCategory</Button>
                </FormGroup>
                </Form>
              </Col>
              <Col md={6} className="border p-3">
                <h4>Delete SubCategory</h4>
                <hr/>
                <Form onSubmit={remove}>
                <FormGroup row>
                  <Label md={4} for="Delete_subCategory_Id"> SubCategory Id = </Label> 
                    <Col md={8}>
                        <Input id="Delete_subCategory_Id" name="Delete_subCategory_Id" placeholder="subCategory_Id" type="select">
                        <option>Select SubCategory</option>
                        {
                            subCategory.map((subcate) => (
                                <option value={subcate.id} key={subcate.id}>{subcate.name}</option>
                            ))
                        }
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Button color='danger' type='submit'>Delete SubCategory</Button>
                </FormGroup>
                </Form>
              </Col>
            </Row>
            {/* update */}
            <Row className='mt-5'>
              <Col className="border p-3">
                <h4>Update SubCategory</h4>
                <hr/>
                <Form onSubmit={update}>
                <FormGroup row>
                  <Label md={3} for="Update_Category_Id"> Category Id = </Label> 
                    <Col md={9}>
                        <Input id="Update_Category_Id" name="Update_Category_Id" placeholder="Category_Id" type="select">
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
                  <Label md={4} for="Update_subCategory_Id"> SubCategory Id = </Label> 
                    <Col md={8}>
                        <Input id="Update_subCategory_Id" name="Update_subCategory_Id" placeholder="subCategory_Id" type="select">
                        <option>Select SubCategory</option>
                        {
                            subCategory.map((subcate) => (
                                <option value={subcate.id} key={subcate.id}>{subcate.name}</option>
                            ))
                        }
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                  <Label md={5} for="Updata_name"> SubCategory Name= </Label>
                  <Col md={7}>
                      <Input id="Updata_name" name="Updata_name" placeholder="SubCategory Name" type="text" />
                  </Col>
                </FormGroup>
                <FormGroup>
                    <Button color='success' type='submit'>Update SubCategory</Button>
                </FormGroup>
                </Form>
              </Col>
            </Row>
            <Row className='mt-5'>
              <Table striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Category Name</th>
                    <th>SubCategory Name</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    category.map((cate)=>
                      subCategory.map((subcate,i)=>(
                        cate.id == subcate.main_category_id ? (
                        <tr key={i}>
                          <th>{i+1}</th>
                          <th>{cate.name}</th>
                          <th>{subcate.name}</th>
                        </tr>) : null
                      ))
                    )
                  }
                </tbody>
              </Table>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default SubCategoryManagementPanel