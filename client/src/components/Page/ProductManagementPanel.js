import { React, useEffect,useState } from 'react'
import UstNabvar from '../navbars&footer/UstNabvar'
import AdminNavbar from '../navbars&footer/AdminNavbar'
import { Container,Row,Col,Form,FormGroup,Label,Input, Button, FormText,Table} from 'reactstrap'
import {AddProductt,AllProductt,DeleteProductt,UpdateProductt,ProductImageUpdate} from "../features/product/ProductSlice"
import { useNavigate }  from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { AllSubCategory} from '../features/subCategory/subCategorySlice';
import {AllCategory} from "../features/category/categorySlice"


function ProductManagementPanel() {
  const [selectImage, setSelectImage] = useState([])
  const [selectProduct, setSelectProduct] = useState("")
  const [selectProductImage, setSelectProductImage] = useState("")
  const [selectMainPhoto, setSelectMainPhoto] = useState("0")
  const [obj,setObj] = useState({})
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { subCategory } = useSelector((state)=>state.subCategory)
  const { category } = useSelector((state)=>state.category)
  const { product } = useSelector((state)=>state.product)

  useEffect(() => {
    if(Object.keys(subCategory).length === 0)
    {
      dispatch(AllSubCategory())
    }
    if(Object.keys(product).length === 0)
    {
      dispatch(AllProductt())
    }
    if(Object.keys(category).length === 0)
    {
      dispatch(AllCategory())
    }
  }, [])

  const [selectMultiImage, setSelectMultiImage] = useState()

  const imageHundleChange = (e) => {
    setSelectImage([])
    if(selectMultiImage){
      const fileArray = Array.from(selectMultiImage).map((file)=>URL.createObjectURL(file))
      if(fileArray.length != 3){
        alert("Lütfen 3 adet fotoğraf seçiniz")
        return "a";
      }
      setSelectImage((prevImages)=>prevImages.concat(fileArray))
      Array.from(selectMultiImage).map((file) => URL.revokeObjectURL(file))
    }
    setObj(Object.assign({},selectMultiImage))
  }

  useEffect(() => {
    imageHundleChange()
  }, [selectMultiImage])

  const siraDegistir = (e) =>{
    const data = selectMultiImage.filter((veri,i)=>i == e && veri)
    const data2 = selectMultiImage.filter((veri,i)=>i != e && veri)
    const data3 = data.concat(data2)
    setSelectMultiImage(data3)
    setObj(Object.assign({},selectMultiImage))
  }

  const RenderPhoto = (source) => {
    return source.map((photo,i)=>{
        return <Col key={i}><img src={photo} style={{width:"140px", height:"140px"}} id={i} onClick={(e)=>{siraDegistir(e.target.id)}} /></Col>
    })
  };

  const UpdateProductId = (e)=>{
    setSelectProduct("");
    setSelectProduct(e.target.value);
  }

  const mainPhotoİd = (e) => {
    setSelectMainPhoto("");
    setSelectMainPhoto(e.target.id)
  }

  function add(e){
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.delete("images[]");
    data.append("images[0]",obj[0])
    data.append("images[1]",obj[1])
    data.append("images[2]",obj[2])
    dispatch(AddProductt(data))
  }

  function remove(e){
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const item = {
      product_id: data.get("delete_product_id")
    }
    dispatch(DeleteProductt(item))
  }

  function update(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const item = {
      product_id: data.get("updata_product_id"),
      name: data.get("newName"),
      description: data.get("newDescription"),
      sub_category_id:data.get("new_sub_category_id"),
      images_id: selectMainPhoto
    }
    console.log(item);
    dispatch(UpdateProductt(item))
  }

  function productImageUpdate(e){
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    var a1 = document.getElementById("product_image_file_1").getAttribute("image_id")
    var a2 = document.getElementById("product_image_file_2").getAttribute("image_id")
    var a3 = document.getElementById("product_image_file_3").getAttribute("image_id")
    data.append("product_image_id_1",a1)
    data.append("product_image_id_2",a2)
    data.append("product_image_id_3",a3)
    dispatch(ProductImageUpdate(data))
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
                <Col md={6} className="border">
                  <h4>Add product</h4>
                  <hr/>
                  <Form onSubmit={add} encType="multipart/form-data">
                    <FormGroup row>
                      <Label md={2} for="name"> name = </Label> 
                      <Col md={10}>
                          <Input id="name" name="name" placeholder="Product Name" type="text" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label md={3} for="description"> description = </Label>
                      <Col md={9}>
                          <Input id="description" name="description" placeholder="description" type="textarea" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label md={4} for="sub_category_id"> SubCategory Id = </Label> 
                      <Col md={8}>
                          <Input id="sub_category_id" name="sub_category_id" placeholder="subCategory_Id" type="select">
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
                      <Label for="images" sm={2}> File = </Label>
                      <Col sm={10}>
                        <Input id="images" name="images[]" type="file" accept='image/png,image/jpeg' multiple onChange={(e)=>{setSelectMultiImage(Object.values(e.target.files))}}/>
                        {/* <FormText>Lütfen main fotoğrafı en son seçiniz</FormText> */}
                        {/* <FormText>Please select the main photo last option</FormText> */}
                        <FormText>Please Select 3 Photo</FormText>
                      </Col>
                  </FormGroup>
                  <Row>
                    {RenderPhoto(selectImage)}
                  </Row>
                  <FormGroup className='mt-3'>
                    <Button color='success' type='submit'>Add Product</Button>
                  </FormGroup>
                  </Form>
                </Col>
                <Col md={6} className="border p-3">
                  <h4>Delete Product</h4>
                  <hr/>
                  <Form onSubmit={remove}>
                  <FormGroup row>
                      <Label md={4} for="delete_product_id"> Product Name = </Label> 
                      <Col md={8}>
                          <Input id="delete_product_id" name="delete_product_id" placeholder="Product Name" type="select">
                          <option>Select Product Name</option>
                          {
                              product.map((pro) => (
                                  <option value={pro.id} key={pro.id}>{pro.name}</option>
                              ))
                          }
                          </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Button color='danger' type='submit'>Delete Product</Button>
                    </FormGroup>
                  </Form>
                </Col>
              </Row>
              {/* update */}
              <Row className='mt-3'>
                <Form className='p-0' onSubmit={update}>
                  <Row>
                  <h5>Product Upload</h5>
                  <Col md={6}>
                  <FormGroup row>
                  <Label md={4} for="updata_product_id"> Product Name = </Label> 
                      <Col md={8}>
                          <Input id="updata_product_id" name="updata_product_id" placeholder="Product Name" type="select" onChange={UpdateProductId}>
                          <option value={0}>Select Product Name</option>
                          {
                              product.map((pro) => (
                                  <option value={pro.id} key={pro.id}>{pro.name}</option>
                              ))
                          }
                          </Input>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                      <Label md={3} for="newName"> name = </Label>
                      <Col md={9}>
                          <Input id="newName" name="newName" placeholder="newName" type="text" defaultValue={selectProduct !=0 ? product.find((pro)=>pro.id == selectProduct).name : ""}/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                      <Label md={4} for="newDescription"> newDescription = </Label>
                      <Col md={8}>  
                          <Input id="newDescription" name="newDescription" placeholder="newDescription" type="textarea" defaultValue={selectProduct !=0 ? product.find((pro)=>pro.id == selectProduct).description :""} />
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                      <Label md={5} for="new_sub_category_id"> New SubCategory Id = </Label> 
                      <Col md={7}>
                          <Input id="new_sub_category_id" name="new_sub_category_id" placeholder="new_sub_category_id" type="select">
                          <option value={0}>Select SubCategory</option>
                          {
                            selectProduct !=0 && subCategory.map((subcate)=>(subcate.id == product.find((pro)=>pro.id == selectProduct).sub_category_id) ? <option value={subcate.id} selected key={subcate.id}>{subcate.name}</option> :<option value={subcate.id} key={subcate.id}>{subcate.name}</option>)
                          }
                          </Input>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    {
                      product.map((pro)=>pro.id == selectProduct ? pro.photos.map((photo,i)=>(<img key={i} id={photo.id} className='ms-3' src={"http://localhost:8000/Image/"+photo.path} style={{width:"140px",height:"140px"}} onClick={(e)=>{mainPhotoİd(e);console.log(e)}} />)) : "")
                    }
                    <p>Main Photo İçin Üstüne Tıklayınız</p>
                    <FormGroup>
                      <Button color='success' type='submit'>Update Product</Button>
                    </FormGroup>
                  </Col>
                  </Row>
                </Form>
              </Row>
              <Row>
                <Form className='p-0' onSubmit={productImageUpdate}>
                  <Row className="border">
                  <h5>Product Image Upload</h5>
                  <Col md={6}>
                  <FormGroup row>
                  <Label md={4} for="UpdateImageProductId"> Product Name = </Label> 
                      <Col md={8}>
                          <Input id="UpdateImageProductId" name="UpdateImageProductId" placeholder="Product Name" type="select" onChange={(e)=>setSelectProductImage(e.target.value)}>
                          <option value={0}>Select Product Name</option>
                          {
                              product.map((pro) => (
                                  <option value={pro.id} key={pro.id}>{pro.name}</option>
                              ))
                          }
                          </Input>
                          <FormText>Select Product Name</FormText>
                      </Col>
                  </FormGroup>
                  </Col>
                  <Col md={6}>
                  {
                      product.map((pro)=>pro.id == selectProductImage ? pro.photos.map((photo,i)=>(<label htmlFor={"product_image_file_"+(i+1)}><img key={i} id={photo.id} className='ms-3 border' src={"http://localhost:8000/Image/"+photo.path} style={{width:"140px",height:"140px"}}/><Input type='file' image_id={photo.id} id={"product_image_file_"+(i+1)} name={"product_image_file_"+(i+1)} accept='Image/png,Image/jpeg' style={{display:"none",visibility:"none"}} onChange={(e)=>console.log(e.target.files)}/></label>)): "")
                  }
                  </Col>
                  <FormGroup>
                    <Button type='Submit'>Product Image Güncelle</Button>
                  </FormGroup>
                  </Row>
                </Form>
              </Row>
              <Row>
              <Table striped className='mt-4'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Category Name</th>
                    <th>SubCategory Name</th>
                    <th>Product Name</th>
                    <th>İmage 1</th>
                    <th>İmage 2</th>
                    <th>İmage 3</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    category.map((cate)=>
                      subCategory.map((subcate)=>
                        product.map((pro,i)=>(
                          pro.sub_category_id == subcate.id && subcate.main_category_id == cate.id ? (
                            <tr key={i}>
                              <th>{i+1}</th>
                              <th>{cate.name}</th>
                              <th>{subcate.name}</th>
                              <th>{pro.name}</th>
                              {
                                pro.photos.map((image,i)=>(
                                  image.type == 0 ? <th key={i}><img className='border border-primary' src={"http://localhost:8000/Image/"+image.path} style={{width:"140px",height:"140px"}}/></th> : <th key={i}><img src={"http://localhost:8000/Image/"+image.path} style={{width:"140px",height:"140px"}}/></th>
                                ))
                              }
                            </tr>) : null
                        ))
                      )
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

export default ProductManagementPanel