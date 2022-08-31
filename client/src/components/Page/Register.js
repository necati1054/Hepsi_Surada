import React from 'react'
import {Form,Label,FormGroup,Input,Button,Container,Row,Col,Alert} from 'reactstrap';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate }  from 'react-router-dom'
import { register } from '../features/auth/authSlice'
import UstNabvar from '../navbars&footer/UstNabvar';
import AltFooter from '../navbars&footer/AltFooter';
import { useFormik } from 'formik';
import Validations from '../control/Validations';


function Register() {
  var location = document.URL
  var NewLocation = new URL(location)
  var urll = NewLocation.searchParams.get("url")

  const {handleSubmit,handleChange,values,errors,touched,handleBlur,} = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      passwordConfirm:"",
      url: urll
    },
    validationSchema:Validations.Register,
    onSubmit: (values)=>  {
      const item = {
      name: values.name,
      email: values.email,
      password:values.password,
      url: urll,
      format:"register"
    }
    dispatch(register(item))
    .then(()=>{
      navigate("/");
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
            <img style={{width:"35px",height:"35px"}} src={"https://icons.veryicon.com/png/o/miscellaneous/esgcc-basic-icon-library/register-14.png"}/>
            <h2 className='ms-1'>Register</h2>
          </div>
          <Form onSubmit={handleSubmit}>
          <FormGroup>
                  <Label for="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="Full Name" type="text" value={values.name} onChange={handleChange} onBlur={handleBlur} />
                  {errors.name && touched.name && <Alert color="danger">{errors.name}</Alert>}
              </FormGroup>
              <FormGroup>
                  <Label for="e-mail">Email</Label>
                  <Input id="e-mail" name="email" placeholder="E-mail" autoComplete="off" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                  {errors.email && touched.email && <Alert color="danger">{errors.email}</Alert>}
              </FormGroup>
              <FormGroup>
                  <Label for="password">Password</Label>
                  <Input id="password" name="password" placeholder="password" autoComplete="off" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur}/>
                  {errors.password && touched.password && <Alert color="danger">{errors.password}</Alert>}
              </FormGroup>
              <FormGroup>
                  <Label for="password Confirm">passwordConfirm</Label>
                  <Input id="passwordConfirm" name="passwordConfirm" placeholder="passwordConfirm" autoComplete="off" type="password" value={values.passwordConfirm} onChange={handleChange} onBlur={handleBlur}/>
                  {errors.passwordConfirm && touched.passwordConfirm && <Alert color="danger">{errors.passwordConfirm}</Alert>}
              </FormGroup>
              <Button color='success' type="submit">Register</Button>
          </Form>
        </Col>
      </Row>
    </div>
    <AltFooter/>
    </>
  )
}

export default Register