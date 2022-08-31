import React from 'react'
import {Form,Label,FormGroup,Input,Button,Container,Row,Col,Alert} from 'reactstrap';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate }  from 'react-router-dom'
import { login } from '../features/auth/authSlice'
import UstNabvar from '../navbars&footer/UstNabvar';
import AltFooter from '../navbars&footer/AltFooter';
import { useFormik } from 'formik';
import Validations from '../control/Validations';
const token = JSON.parse(localStorage.getItem("token"));

function Login() {

  const {handleSubmit,handleChange,values,errors,touched,handleBlur} = useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    validationSchema:Validations.login,
    onSubmit: (values)=>  {
      const item = {
      email: values.email,
      password:values.password,
      format:"login"
    }
    dispatch(login(item))
    .unwrap()
    .then(()=>{
        navigate("/");
    })
    .catch((err)=>{
      // console.log("hata"); 
    })
    },
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <>
    <UstNabvar/>
    <div className='page'>
      <Row className='justify-content-center'>
        <Col md={6} className="mt-5">
        <div className='d-flex'>
          <img style={{width:"35px",height:"35px"}} src={"http://cdn.onlinewebfonts.com/svg/img_337531.png"}/>
          <h2 className='ms-1'>Login</h2>
        </div>
        <Form onSubmit={handleSubmit} style={{Width:"380px"}}>
        <FormGroup>
            <Label for="email">Email</Label>
            <Input id="email" name="email" placeholder="with a placeholder" value={values.email} type="email" onChange={handleChange} onBlur={handleBlur} />
            {errors.email && touched.email && <Alert color="danger">{errors.email}</Alert>}
        </FormGroup>
        <FormGroup>
            <Label for="password">Password</Label>
            <Input id="password" name="password" autoComplete='on' placeholder="password placeholder" value={values.password} type="password"onChange={handleChange} onBlur={handleBlur}  />
            {errors.password && touched.password && <Alert color="danger">{errors.password}</Alert>}
        </FormGroup>
        <Button color='success' type="submit">Login</Button>
        </Form>
        </Col>
      </Row>
    </div>
    <AltFooter/>
    </>
  )
}

export default Login