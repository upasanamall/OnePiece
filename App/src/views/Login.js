import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../images/one-piece-dashboard-logo.png';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  FormInput,
  FormFeedback,
  Button,
} from 'shards-react';
const Login = () => {
  console.log('Am i here');
  const [inputText, setInputText] = useState({ email: '', password: '' });
  const [weMail, setWeMail] = useState(false);
  const [wpassword, setWpassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputEvent = (event) => {
    setErrorMessage('');
    const name = event.target.name;
    const value = event.target.value;
    console.log('name', name);
    setInputText((lastValue) => {
      return {
        ...lastValue,
        [name]: value,
      };
    });
  };
  const [navigate, setNavigate] = useState(false);
  const [isSocialMediaPageVisible, setIsSocialMediaPageVisible] =
    useState(false);
  const submitForm = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (inputText.email === '' && inputText.password === '') {
      setErrorMessage('Email and password are required');
      return;
    } else if (inputText.email === '') {
      setErrorMessage('Email is required');
      return;
    } else if (inputText.password === '') {
      setErrorMessage('Password is required');
      return;
      // } else {
      //   console.log('formvalue', inputText);
      // //   const makeApi = dbConnection(
      // //     Method_TYPE.POST,
      // //     API_URL.LOGIN,
      // //     { ...inputtext },
      // //     {}
      // //   );
      // //   makeAPI
      // //     .then((dataVal) => {
      // //       if (dataVal?.status === 200) {
      // //         console.log('data', dataVal.data);
      // //         const data = {
      // //           token: dataVal.data.token,
      // //           time: newData().getTime,
      // //           userId: dataVal.data.userId,
      // //         };
      // //         localStorage.setItem('UserTokenTime', JSON.stringify(data));
      // //         if (!dataVal?.data?.userDetails?.toekns) {
      // //           setIsSocialMediaPageVisible(true);
      // //           setNavigate(true);
      // //           return;
      // //         }
      // //         setNavigate(true);
      // //       }
      // //     })
      // //     .catch((err) => {
      // //       setErrorMessage('Email or password are not correct');
      // //       console.log('error', err);
      // //     });
    }
    console.log('formData', e, inputText);
  };
  if (navigate) {
    if (isSocialMediaPageVisible) {
      return <Redirect to='/social-media' push={true} />;
    }
    return <Redirect to='/dashboard' push={true} />;
  }

  return (
    <Container fluid classNAme='main-content-container h-100 px-4'>
      <Row noGutters classname='h-100'>
        <Col lg='4' md='5' className='auth-form mx-auto my-auto'>
          <Card>
            <CardBody>
              <img
                className='auth-form__logo d-table mx-auto mb-3'
                src={logo}
                alt={'dashboard login template'}
              />
              <h5>Access your account</h5>
              <Form onSubmit={submitForm} noValidate>
                <FormGroup>
                  <label htmlFor='exampleInputEmail1'>Email Address</label>
                  <FormInput
                    type='email'
                    if='exampleInputEmail1'
                    placeHolder='Enter Email'
                    aurocomplet='email'
                    name='email'
                    value={inputText.email}
                    onChange={inputEvent}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor='exampleInputPassword1'>Email Address</label>
                  <FormInput
                    type='password'
                    if='exampleInputPassword1'
                    placeHolder='Enter Password'
                    aurocomplet='password'
                    name='password'
                    value={inputText.password}
                    onChange={inputEvent}
                  />
                  <FormFeedback>The userName is taken.</FormFeedback>
                </FormGroup>
                <Button>Access Account</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
