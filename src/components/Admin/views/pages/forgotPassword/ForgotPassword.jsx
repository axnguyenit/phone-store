import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react';
import axios from 'axios';
import CIcon from '@coreui/icons-react';

// API URL
const API_USERS_URL = `http://localhost:4000/api/users`;

const Login = (props) => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [errorText, setErrorText] = useState('');


  // Function fetch users from JSon Server
  const fetchUsers = async() => {
    axios.get(API_USERS_URL).then( res => {
      setUsers(res.data);
    })
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const login = (e) => {
    e.preventDefault();
    const user = users.find(user => user.email === email 
                                    && user.password === password 
                                    && (user.role === 'admin' 
                                        || user.role === 'manager'));

    console.log(user);
    if(user) {
      if(user.active) {
        localStorage.setItem('accessToken', user.role);
        history.replace('/dashboard');
      }
      else {
        setErrorText('Your account has been locked! Please contact management.')
      }
    }
    else {
      setErrorText('Email, password, or access are invalid!')
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8" lg="7" xl="6">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={login}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="email" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} autoComplete="username" required />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                      </CInputGroupPrepend>
                      <div style={{color: 'red'}}>{errorText}</div>
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton type="submit" color="primary" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login;