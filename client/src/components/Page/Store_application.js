import React from 'react'
import {Form,Label,FormGroup,Input,Button,Container,Row,Col,Alert} from 'reactstrap';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate }  from 'react-router-dom'
import {AddTmpStore} from "../features/tmp/tmpStoreSlice"
import UstNabvar from '../navbars&footer/UstNabvar';
import AltFooter from '../navbars&footer/AltFooter';
import store from "../Image/store.png"
import { useFormik } from 'formik';
import Validations from '../control/Validations';
import { toast } from "react-toastify";

function Store_application() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    var user = JSON.parse(localStorage.getItem("token"))
    var user_id = user.user.id

    const {handleSubmit,handleChange,values,errors,touched,handleBlur} = useFormik({
        initialValues:{
            name:"",
            email:"",
            adres:"",
            tel:""
        },
        validationSchema:Validations.storeApplication,
        onSubmit: (values)=>  {
            const item = {
            email: values.email,
            name:values.name,
            adres:values.adres,
            tel:values.tel,
            user_id:user_id
        }
        dispatch(AddTmpStore(item))
        .unwrap()
        .then(()=>{
            navigate("/");
        })
        .catch((err)=>{
            toast.error("You have an application, please wait for it to be approved")
        })
        },
      })

  return (
    <>
    <UstNabvar/>
    <div className='page'>
        <Row className='justify-content-center'>
            <Col md={6} className="mt-5">
            <div className='d-flex'>
                <img style={{width:"35px",height:"35px"}} src={store}/>
                <h2 className='ms-1'>Store Application</h2>
            </div>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Store Name</Label>
                    <Input id="name" name="name" placeholder="Store Name" type="text" value={values.name} onChange={handleChange} onBlur={handleBlur} />
                    {errors.name && touched.name && <Alert color="danger">{errors.name}</Alert>}
                </FormGroup>
                <FormGroup>
                    <Label for="email">Store Email</Label>
                    <Input id="email" name="email" placeholder="Store Email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                    {errors.email && touched.email && <Alert color="danger">{errors.email}</Alert>}
                </FormGroup>
                <FormGroup>
                    <Label for="adres">Store Adress</Label>
                    <Input id="adres" name="adres" placeholder="Store Adress" type="text" value={values.adres} onChange={handleChange} onBlur={handleBlur} />
                    {errors.adres && touched.adres && <Alert color="danger">{errors.adres}</Alert>}
                </FormGroup>
                <FormGroup>
                    <Label for="tel">Store Phone Number</Label>
                    <Input id="tel" name="tel" placeholder="Store Phone Number" type="text" value={values.tel} onChange={handleChange} onBlur={handleBlur} />
                    {errors.tel && touched.tel && <Alert color="danger">{errors.tel}</Alert>}
                </FormGroup>
                <FormGroup>
                    <Button color='success' type="submit">Mağaza Başvurusu Yap</Button>
                </FormGroup>
            </Form>
            </Col>
        </Row>
    </div>
    <AltFooter/>
    </>
  )
}

export default Store_application