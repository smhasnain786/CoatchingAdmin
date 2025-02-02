import React,{useState} from 'react';
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody, Input } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import AuthLogo from "../../layouts/logo/AuthLogo";
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';
import { AdminLogin } from "../../services/user.service";
import { HotToaster } from "../../utils/Toaster"

// import { ProfileContext } from "../../components/contextProvider";
const LoginFormik = () => {
  const navigate = useNavigate();
  // const [profileState, updateProfileState] = useContext(ProfileContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (event) => {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
    }
  }
  const handleLogin = async () => {
    const data = {
      emailId:email,
      password
  };
  
    let result
    try {
      result = await AdminLogin(data)
      console.log("errorororo", result)
      // HotToaster(result?.status, result.message)
      if (result.status) {
        localStorage.setItem("token", result.data.token)
        // updateProfileState(result.data);
        navigate('/dashboards/minimal');
        console.log("resultresult======>>>>", result)
      }
    }
    catch (err) {
      console.log("err", err, result)
      // HotToaster(false, err)

    }
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  return (
    <div className="loginBox">
      <LeftBg className="position-absolute left bottom-0" />
      <RightBg className="position-absolute end-0 top" />
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="loginContainer">
            <AuthLogo />
            <Card>
              <CardBody className="p-4 m-1">
                <h5 className="mb-0">Login</h5>
                <small className="pb-4 d-block">
                  Do not have an account? <Link to="/auth/registerformik">Sign Up</Link>
                </small>
                <Formik
                  initialValues={[email,password]}
                  validationSchema={validationSchema}
                  onSubmit={() => {
                    // eslint-disable-next-line no-alert
                    HotToaster(true, 'Login Succesful')
                    navigate('/');
                  }}
                  render={({ errors, touched }) => (
                    <Form>
                      <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Field
                          name="email"
                          type="text"
                          className={`form-control${errors.email && touched.email ? ' is-invalid' : ''
                            }`}
                            value={email} onChange={handleInputChange}
                        />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Field
                          name="password"
                          type="password"
                          className={`form-control${errors.password && touched.password ? ' is-invalid' : ''
                            }`}
                            value={password} onChange={handleInputChange}
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup className="form-check d-flex" inline>
                        <Label check>
                          <Input type="checkbox" />
                          Remember me
                        </Label>
                        <Link className="ms-auto text-decoration-none" to="/auth/forgotPwd">
                          <small>Forgot Pwd?</small>
                        </Link>
                      </FormGroup>
                      <FormGroup>
                        <Button type="submit" color="primary" className="me-2"  onClick={() => handleLogin(email, password)}>
                          Login
                        </Button>
                      </FormGroup>
                    </Form>
                  )}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginFormik;
