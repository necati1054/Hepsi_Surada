import{ React,useEffect,useState }from 'react'
import UstNabvar from '../navbars&footer/UstNabvar'
import { useSelector,useDispatch } from 'react-redux';
import { Container, Row, Col, Accordion, AccordionBody, AccordionHeader, AccordionItem, Table,Button, Modal, ModalHeader, ModalBody, ModalFooter,Form,FormGroup,Input,Label,FormText,Toast,ToastHeader,ToastBody } from 'reactstrap';
import {AllStoreInfo,StoreProductUpdate,StoreProductDelete,StoreProductAdd,StoreİnfoUpdate,StoreLogoUpdate,StoreCoverUpdate} from "../features/store/storeSlice"
import Worker_add from "../features/tmp/tmpWorkerSlice"

import {AllCategory} from "../features/category/categorySlice"
import {AllSubCategory} from"../features/subCategory/subCategorySlice"
import {AllProductt} from "../features/product/ProductSlice"
import { toast } from 'react-toastify';
import axios from 'axios';

function Store() {
  var data = JSON.parse(localStorage.getItem("token"))
  var owner = data.user.store_id
  var user_level = data.user.user_level
  var id = data.user.id
  const dispatch = useDispatch();

  const { store_info,store_product,person } = useSelector((state)=>state.store)
  const { category } = useSelector((state)=>state.category)
  const { subCategory } = useSelector((state)=>state.subCategory)
  const { product } = useSelector((state)=>state.product)

  const [inputFields, setInputFields] = useState([
    {category_id:0,subCategory_id:0, product_id: 0, stock: 0, price:0, store_id:owner }
  ])

  const addFields = () => {
    let newfield = {
      category_id:0,
      subCategory_id:0,
      product_id: 0, 
       stock: 0,
       price:0, 
        store_id:owner }

    setInputFields([...inputFields, newfield])
}

const handleFormChange = (index, event) => {
  let data = [...inputFields];
  data[index][event.target.name] = event.target.value;
  setInputFields(data);
}

const removeFields = (index) => {
  let data = [...inputFields];
  data.splice(index, 1)
  setInputFields(data)
}

  useEffect(() => {
    if(Object.keys(store_info).length ===0){
      dispatch(AllStoreInfo({store_id:owner}))
    }
    if(Object.keys(category).length === 0)
    {
        dispatch(AllCategory());
    }
    if(Object.keys(subCategory).length === 0)
    {
      dispatch(AllSubCategory())
    }
    if(Object.keys(product).length === 0)
    {
      dispatch(AllProductt())
    }
  }, [])

  //accordion open and closing
  const [open, setOpen] = useState('');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const [modal, setModal] = useState(false);
  const UpdateModal = () => setModal(!modal);

  const [modalll, setModalll] = useState(false);
  const PostWorker = () => setModalll(!modalll);

  const [logoStateOnay, setlogoStateOnay] = useState(false);
  const LogoOnay = () => setlogoStateOnay(!logoStateOnay);

  const [CoverStateOnay, setCoverStateOnay] = useState(false);
  const CoverOnay = () => setCoverStateOnay(!CoverStateOnay);
  
  const [selectStoreProduct, setSelectStoreProduct] = useState("");
  const select = (e) =>{
    setSelectStoreProduct("");
    setSelectStoreProduct(e);
  }

  function update(e){
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const item = {
      store_product_id: selectStoreProduct,
      price:data.get("NewPrice"),
      stock:data.get("NewStock")
    }
    dispatch(StoreProductUpdate(item))
  }

  function remove(e){
    dispatch(StoreProductDelete({store_product_id:e}))
  }


  function Add(e){
    var hatalı = ""
    e.preventDefault();
    console.log(inputFields);
    inputFields.forEach((element,index)=>{
      if(!(element.category_id>0 && element.price >0 && element.product_id >0  && element.stock >0 && element.subCategory_id >0)){
        if(!hatalı){
          hatalı+=(index+1);
        }else{
          hatalı+=","+(index+1);
        }
      }
    })

    console.log(hatalı);

    if(hatalı){
      console.log("hatalı");
      toast.error("these lines are wrong = "+hatalı)
      console.log(hatalı);
    }else{
    console.log(inputFields);
    dispatch(StoreProductAdd(inputFields))
    .unwrap()
    .then(()=>{
      setInputFields([{
      category_id:0,
      subCategory_id:0,
      product_id: '', 
       stock: 0,
       price:0,
        store_id:owner }])})
    .catch(()=>{})
    }
  }
  
  
  function workerAdd(e){
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const item = {
      mail:data.get("email"),
      manager_id:id
    }
    dispatch(Worker_add(item))
    .then((res)=>{console.log(res);
      if(res.payload.status == 401){
        toast.warn("error = "+ res.payload.message)
      }else if(res.payload.status == 402){
        toast.warn("error = "+ res.payload.message)
      }else if(res.payload.status == 201){
        toast.success(res.payload.message)
      }else if(res.payload.status == 422){
        toast.error("error = wrong parameter")
      }else if(res.payload.status == 202){
        toast.success(res.payload.message)
      }else if(res.payload.status == 403){
        toast.error("error = "+res.payload.message)
      }
    })
  }   

  function StoreInfoUpdate(e){
    var NewStoreName =  document.getElementById("NewStoreName")
    var NewStoreEmail =  document.getElementById("NewStoreEmail")
    var NewStoreAdres =  document.getElementById("NewStoreAdres")
    var NewStoreTel =  document.getElementById("NewStoreTel")
    const item = {
      store_id: owner,
      name:NewStoreName.value,
      email:NewStoreEmail.value,
      adres:NewStoreAdres.value,
      tel:NewStoreTel.value
    }
    dispatch(StoreİnfoUpdate(item))
  }

  var StoreLogo = store_info.photos ? store_info.photos[1].type == "0" ? store_info.photos[1].path : store_info.photos[0].path : "Default_Logo.png"
  var StoreCover = store_info.photos ? store_info.photos[0].type == "1" ? store_info.photos[0].path : store_info.photos[1].path : "Default_Cover.png"

  const [selectNewLogo,setSelectNewLogo] = useState({file:[]});
  const [selectNewCover,setSelectNewCover] = useState({file:[]});

  const StoreLogoUpdatee = (e) =>{
    var data = new FormData();
    data.append("store_id",owner)
    data.append("logo",selectNewLogo.file[0])
    console.log(data);
    dispatch(StoreLogoUpdate(data))
  }

  const StoreCoverUpdatee = (e) =>{
    var data = new FormData();
    data.append("store_id",owner)
    data.append("cover",selectNewCover.file[0])
    console.log(data);
    dispatch(StoreCoverUpdate(data))
  }

  return (
    <>
    <UstNabvar/>
    <Container>
        <Row className='mt-3'>
            <Label for='cover'>
            <Col style={{backgroundImage:"url(http://localhost:8000/Image/"+StoreCover+")",backgroundRepeat:" no-repeat",height:"100px",backgroundSize:"cover"}}>
              <Label for='logo'>
              <img src={"http://localhost:8000/Image/"+StoreLogo} alt="logo" className='mt-4' style={{width:"70px"}} /><span className='ms-2' style={{color:"white"}}>{store_info.name}</span>
              </Label>
            </Col>
            </Label>
            {
              user_level != 2 &&
              <>
              <Input type='file' id="cover" name='cover' accept='Image/png,Image/jpeg' style={{display:"none",visibility:"none"}} onChange={(e)=>{setSelectNewCover({file:e.target.files});CoverOnay()}}/>
              <Input type='file' id="logo" name='logo' accept='Image/png ,Image/jpeg' style={{display:"none",visibility:"none"}} onChange={(e)=>{setSelectNewLogo({file:e.target.files});LogoOnay()}}/>
              </>
            }
        </Row>
        <Row className='mt-5'>
        <Accordion open={open} toggle={toggle}>
        <AccordionItem>
          <AccordionHeader targetId="1">Store Product Management</AccordionHeader>
          <AccordionBody accordionId="1">
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stok</th>
                  <th>button</th>
                </tr>
              </thead>
              <tbody>
                {
                  store_product.map((item,i)=>(
                  <tr key={i}>
                    <td>{item.product.name}</td>
                    <td>{item.price}</td>
                    <td>{item.stock}</td>
                    <td><Button id={item.id} onClick={(e)=>{UpdateModal();select(e.target.id)}}>Update/Delete</Button></td>
                  </tr>
                  ))
                }
              </tbody>
            </Table>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="4">Store Product Add</AccordionHeader>
          <AccordionBody accordionId="4">
              {
                inputFields.length == 0 && <strong className='btn' onClick={()=>addFields()}>+</strong>
              }
            <form onSubmit={Add}>
              {inputFields.map((input,index)=>( 
              <Row key={index}>
                <Col md={2}>
                <FormGroup>
                <span><strong>{(index+1)}</strong></span> <Label htmlFor="category">category</Label>
                    <Input required id="category" name="category_id" type="select" value={input.category_id} onChange={event => handleFormChange(index, event)}>
                    <option value={0}>Select Category</option>
                      {
                        category.map((item)=>(<option key={item.id} value={item.id} >{item.name}</option>))
                      }
                    </Input>
                </FormGroup>
                </Col>
                {
                  input.category_id !=0 && (
                      <Col md={2}>
                        <FormGroup>
                        <Label>SubCategory</Label>
                            <Input required id="subCategory" name="subCategory_id" type="select" value={input.subCategory_id} onChange={event => handleFormChange(index, event)}>
                            <option value={0}>Select Sub Category</option>
                            {
                              subCategory.map((item)=>item.main_category_id == input.category_id ? <option key={item.id} value={item.id}>{item.name}</option> : null)
                            }
                          </Input>
                      </FormGroup>
                      </Col>
                  )
                }
                {
                  input.subCategory_id !=0 && input.category_id !=0 && (
                      <Col md={2}>
                      <FormGroup>
                      <Label htmlFor="product">Product</Label>
                          <Input required id="product" name="product_id" type="select" value={input.product_id} onChange={event => handleFormChange(index, event)}>
                          <option value={0}>Select Product</option>
                          {
                            product.map((item)=>item.sub_category_id == input.subCategory_id ? <option key={item.id} value={item.id} >{item.name}</option> : null)
                          }
                        </Input>
                    </FormGroup>
                  </Col>
                    )
                }
                <Col md={2}>
                  <FormGroup>
                    <Label htmlFor="stock">Stock</Label>
                    <Input required min={1} id="stock" name="stock" placeholder="stock" type="number" value={input.stock} onChange={event => handleFormChange(index, event)}/>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label htmlFor="price">Price</Label>
                    <Input required min={1.01} id="price" step=".01" name="price" placeholder="price" type="number" value={input.price} onChange={event => handleFormChange(index, event)}/>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup row>
                      <Label htmlFor='remove'></Label>
                      {
                        input.category_id>0 && input.price>0 && input.product_id>0 && input.subCategory_id>0 && input.stock>0 && (                      
                        <Col>
                          <Button className='mt-4 w-100' color="success" onClick={()=>addFields()}>+</Button>
                        </Col>
                        )
                      }
                      <Col>
                        <Button className='mt-4 w-100' id="remove" color="danger" onClick={() => removeFields(index)}>-</Button>
                      </Col>
                  </FormGroup>
                </Col>
              </Row>))}
              <Button type='submit' color='success'>Add Store Product</Button>
            </form>
          </AccordionBody>
        </AccordionItem>
        {
          user_level != 2 &&
          <AccordionItem>
          <AccordionHeader targetId="2">Store Worker Management</AccordionHeader>
          <AccordionBody accordionId="2">
            <strong className='btn' onClick={PostWorker}> Add Store Worker </strong>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>email</th>
                  <th>level</th>
                </tr>
              </thead>
              <tbody>
                  {
                    person.map((item,i)=>(
                    <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.user_level == 1 ? "Boss" : "Worker"}</td>
                      </tr>
                    ))
                  }
              </tbody>
            </Table>
          </AccordionBody>
        </AccordionItem>
        }
        {
          user_level != 2 &&
          <AccordionItem>
          <AccordionHeader targetId="3"> Store Info Management </AccordionHeader>
          <AccordionBody accordionId="3">
            <strong> Store İnfo Management </strong>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>email</th>
                  <th>adres</th>
                  <th>tel</th>
                  <th>button</th>
                </tr>
              </thead>
              <tbody>
                  {
                    <tr>
                      <td> <Input id="NewStoreName" type='text' defaultValue={store_info.name}/></td>
                      <td> <Input id="NewStoreEmail" type='emial' defaultValue={store_info.email}/></td>
                      <td> <Input id="NewStoreAdres" type='text' defaultValue={store_info.adres}/></td>
                      <td> <Input id="NewStoreTel"type='text' defaultValue={store_info.tel}/></td>
                      <td> <Button color='success' onClick={StoreInfoUpdate} >Update</Button> </td>
                    </tr>
                  }
              </tbody>
            </Table>
          </AccordionBody>
        </AccordionItem>
        }
      </Accordion>
      </Row>
    </Container>

    {/* modal */}
    <div>
      <Modal isOpen={modal} toggle={UpdateModal}>
        <ModalHeader toggle={UpdateModal}>Store Product Update</ModalHeader>
        <ModalBody>
          <Form onSubmit={update}>
            <FormGroup row>
              <Label for="NewProductName" sm={5}>Product Name = </Label>
              <Col sm={7}>
                <Input id="NewProductName" name="NewProductName" placeholder="NewProductName" type="text" disabled defaultValue={store_product?.find((item)=>item.id == selectStoreProduct)?.product.name}/>
            </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="NewPrice" sm={5}>Price = </Label>
              <Col sm={7}>
                <Input id="NewPrice" name="NewPrice" placeholder="NewPrice" type="text" defaultValue={store_product?.find((item)=>item.id == selectStoreProduct)?.price}/>
            </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="NewStock" sm={5}>Stock = </Label>
              <Col sm={7}>
                <Input id="NewStock" name="NewStock" placeholder="NewStock" type="text" defaultValue={store_product?.find((item)=>item.id == selectStoreProduct)?.stock}/>
            </Col>
            </FormGroup>
            <FormGroup className='d-flex justify-content-center'>
              <Button color="success" type='submit' onClick={UpdateModal}>
                Update
              </Button>
              <Button className='ms-2' color="danger" onClick={()=>{UpdateModal();remove(selectStoreProduct)}}>
              delete
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={UpdateModal}>
            cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
    {/* modal */}

    <div>
      <Modal isOpen={modalll} toggle={PostWorker} >
        <ModalHeader toggle={PostWorker}>Add Worker</ModalHeader>
        <ModalBody>
          <Form onSubmit={workerAdd}>
            <FormGroup row>
              <Label for="email" sm={3}>email = </Label>
              <Col sm={9}>
                <Input id="email" name="email" placeholder="email" type="email"/>
                <FormText>Worker Email</FormText>
            </Col>
            </FormGroup>
            <FormGroup>
              <Button color="success" type='submit' onClick={PostWorker}>
                Add Store Worker
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={PostWorker}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>

    {/* modal */}
    <div>
      <Modal isOpen={logoStateOnay} toggle={LogoOnay} >
        <ModalHeader toggle={LogoOnay}>Logo Onay</ModalHeader>
        <ModalFooter>
          <Button color="success" onClick={()=>{StoreLogoUpdatee();LogoOnay()}}>
            Success
          </Button>
          <Button color="danger" onClick={()=>LogoOnay()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>

    {/* modal */}
    <div>
      <Modal isOpen={CoverStateOnay} toggle={CoverOnay} >
        <ModalHeader toggle={CoverOnay}>Cover Onay</ModalHeader>
        <ModalFooter>
          <Button color="success" onClick={()=>{StoreCoverUpdatee();CoverOnay()}}>
            Success
          </Button>
          <Button color="danger" onClick={()=>CoverOnay()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>

    </>
  )
}

export default Store