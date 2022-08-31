import { object, string, number, date, InferType, ref } from 'yup';

const Register = object({
  name: string().min(3).required(),
  email: string().email().required(),
  password: string().min(8).required(),
  passwordConfirm: string().oneOf([ref("password")]).required(),
});

const login = object({
  email: string().email().required(),
  password: string().min(8).required(),
});

const storeApplication = object({
  email: string().email().required(),
  name: string().min(3).required(),
  adres: string().required(),
  tel: string().min(10).max(10).required()
})


const Validations = {
  Register,
  login,
  storeApplication
}
export default Validations