import React, { useState, useEffect } from 'react';
import {
  CRow,
  CBadge, 
  CCard, 
  CCardBody, 
  CCol, 
  CDataTable,
  CCollapse, 
  CButton,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CSelect
} from '@coreui/react';
import axios from 'axios';

// API URL
const API_USERS_URL = `http://localhost:4000/api/users`;

const fields = [
  {
    key: 'name',
    _style: { width: '25%' }
  },
  {
    key: 'email',
    _style: { width: '30%' }
  },
  {
    key: 'phone',
    _style: { width: '15%' }
  },
  {
    key: 'address',
    _style: { width: '10%' }
  },
  {
    key: 'role',
    _style: { width: '7%' }
  },

  {
    key: 'show_details',
    label: 'Action',
    _style: { width: '18%' },
    filter: false
  }
]

const Users = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [isUpdate, setUpdate] = useState(false);
  const [isLock, setLock] = useState(false);
  const [isUnlock, setIsUnlock] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [validEmail, setValidEmail] = useState(false);
  const [validPhone, setValidPhone] = useState(false);

  const accessToken = localStorage.getItem('accessToken');
  // Function fetch users from JSon Server
  const fetchUsers = async() => {
    axios.get(API_USERS_URL).then( res => {
      setUsers(res.data);
    }) 
  }

  // const fetchAccessToken = () => {
  //   console.log(users);
  //   if(localStorage.getItem('accessToken')) {
  //     let userID = JSON.parse(localStorage.getItem('accessToken'));
  //     let accessTokenUser = users.find(user => user.id === userID);
  //     console.log(accessTokenUser);
  //     setAccessToken(accessTokenUser);
  //   }
  // }

  // fetchAccessToken();

  // Function update user info
  const updateUser = () => {
    if(name || address || email || phone || password || role) {
      let nameTerm = '';
      let addressTerm = '';
      let emailTerm = '';
      let phoneTerm = '';
      let passwordTerm = '';
      let roleTerm = '';
      if(name) {
        nameTerm = name;
      } else {
        nameTerm = user.name;
      }

      if(address) {
        addressTerm = address;
      } else {
        addressTerm = user.address;
      }

      if(email) {
        emailTerm = email;
      } else {
        emailTerm = user.email;
      }

      if(phone) {
        phoneTerm = phone;
      } else {
        phoneTerm = user.phone;
      }

      if(password) {
        passwordTerm = password;
      } else {
        passwordTerm = user.password;
      }

      if(role) {
        roleTerm = role;
      } else {
        roleTerm = user.role;
      }

      const userTerm = {
        id: user.id,
        name: nameTerm,
        email: emailTerm,
        password: passwordTerm,
        phone: phoneTerm,
        role: roleTerm,
        address: addressTerm,
      }

      axios.put(API_USERS_URL + "/" + user.id, userTerm).then( res => {
        let usersTerm = users;
        let index = usersTerm.indexOf(user);
        usersTerm[index] = userTerm;
        setUsers(usersTerm);
      })
    }
    setUpdate(!isUpdate);
  }

  const cancelUpdate = () => {
    setUser({});
    setName("");
    setAddress("");
    setEmail("");
    setPhone("");
    setPassword("");
    setRole("");
    setUpdate(!isUpdate);
  }

  const lockUser = () => {
    user.active = false;
    axios.put(API_USERS_URL + '/' + user.id, user).then(() => {
      setLock(!isLock);
    })
  }

  const cancelLock = () => {
    setUser({});
    setLock(!isLock);
  }

  const unlockUser = () => {
    user.active = true;
    axios.put(API_USERS_URL + '/' + user.id, user).then(() => {
      setIsUnlock(!isUnlock);
    })
  }

  const cancelUnlockUser = () => {
    setUser({});
    setIsUnlock(!isUnlock);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdate = (userTerm) => {
    setUser(userTerm);
    setUpdate(!isUpdate);
  }

  const handleLock = (userTerm) => {
    // if(userTerm.role === 'admin') {
    //   setIsInvalid(!isInvalid);
    // }
    // else {
      setUser(userTerm);
      setLock(!isLock);
    // }
  }

  const handleUnlock = (userTerm) => {
    setUser(userTerm);
    setIsUnlock(!isUnlock);
  }
  
  return (
    <>
      <CCol xs="12" md="12" className="mb-4">
          <CCard>
              <CCardBody>
                  <CCard>
                    <CDataTable
                      items={users}
                      fields={fields}
                      columnFilter
                      itemsPerPage={6}
                      hover
                      sorter
                      pagination
                      scopedSlots = {{
                        'show_details':
                          (userTerm, index)=>{
                            return (
                              <td key={index} className="py-2">
                                <CButton
                                  color="primary"
                                  shape="square"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleUpdate(userTerm)}
                                >
                                  Update
                                </CButton>
                                &nbsp;
                                &nbsp;
                                {
                                  // if role === manager show all lock
                                  accessToken === 'manager' ?
                                    userTerm.active ? 
                                      <CButton
                                        color="primary"
                                        shape="square"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleLock(userTerm)}
                                      >
                                        Lock
                                      </CButton> 
                                    :
                                      <CButton
                                        color="primary"
                                        shape="square"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleUnlock(userTerm)}
                                      >
                                        Unlock
                                      </CButton> 
                                  :
                                  // if role != manager hide lock admin user 
                                    (userTerm.role === 'admin' || userTerm.role === 'manager') ? "" :
                                      userTerm.active ?
                                        <CButton
                                          color="primary"
                                          shape="square"
                                          variant="outline"
                                          size="sm"
                                          onClick={() => handleLock(userTerm)}
                                        >
                                          Lock
                                        </CButton>
                                      :
                                        <CButton
                                          color="primary"
                                          shape="square"
                                          variant="outline"
                                          size="sm"
                                          onClick={() => handleUnlock(userTerm)}
                                        >
                                          Unlock
                                        </CButton>
                                }
                              </td>
                              )
                          }
                      }}
                    />
                  </CCard>
              </CCardBody>

              {/* modal update user info */}
              <CModal 
                show={isUpdate}
                onClose={() => setUpdate(!isUpdate)}
                color="primary"
              >
                <CModalHeader closeButton>
                  <CModalTitle>Update Info User</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <CRow>
                    <CCol xs="6">
                      <CFormGroup>
                        <CLabel htmlFor="name">Name</CLabel>
                        <CInput name="name" placeholder="Fullname" defaultValue={user.name} onChange={(e) => {setName(e.target.value)}} required />
                      </CFormGroup>
                    </CCol>
                    <CCol xs="6">
                      <CFormGroup>
                        <CLabel htmlFor="name">Address</CLabel>
                        <CInput name="address" placeholder="Address" defaultValue={user.address} onChange={(e) => {setAddress(e.target.value)}} required />
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="12">
                      <CFormGroup>
                        <CLabel htmlFor="ccnumber">Email</CLabel>
                        <CInput name="email" type="email" placeholder="Email address" defaultValue={user.email} onChange={(e) => {setEmail(e.target.value)}} required />
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs={accessToken === 'manager' ? '4' : '6'}>
                      <CFormGroup>
                        <CLabel htmlFor="cvv">Phone</CLabel>
                        <CInput name="phone" placeholder="phone" defaultValue={user.phone} onChange={(e) => {setPhone(e.target.value)}} required/>
                      </CFormGroup>
                    </CCol>
                    <CCol xs={accessToken === 'manager' ? '4' : '6'}>
                      <CFormGroup>
                        <CLabel htmlFor="cvv">Password</CLabel>
                        <CInput name="password" type="password" defaultValue={user.password} placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} required/>
                      </CFormGroup>
                    </CCol>
                    {
                      accessToken === 'manager' ?
                      <CCol xs="4">
                        <CFormGroup>
                          <CLabel htmlFor="ccmonth">Role</CLabel>
                          <CSelect custom name="ccmonth" name="ccmonth" onChange={(e) => {setRole(e.target.value)}}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </CSelect>
                        </CFormGroup>
                      </CCol> : ''
                    }
                  </CRow>
                </CModalBody>
                <CModalFooter>
                  <CButton color="success" onClick={() => updateUser()}>Update</CButton>
                  <CButton color="danger" onClick={() => cancelUpdate()}>Cancel</CButton>
                </CModalFooter>
              </CModal>

              {/* modal confirm lock user account */}
              <CModal 
                show={isLock}
                onClose={() => setLock(!isLock)}
                color="danger"
              >
                <CModalHeader closeButton>
                  <CModalTitle>Confirm Lock User Account</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <CRow>
                    <CCol xs="12">
                    Are you sure to lock {user.name}'s account?
                    </CCol>
                  </CRow>
                </CModalBody>
                <CModalFooter>
                  <CButton color="success" onClick={() => lockUser()}>Lock</CButton>
                  <CButton color="danger" onClick={() => cancelLock()}>Cancel</CButton>
                </CModalFooter>
              </CModal>

              {/* modal confirm unlock user account */}
              <CModal 
                show={isUnlock}
                onClose={() => setIsUnlock(!isUnlock)}
                color="primary"
              >
                <CModalHeader closeButton>
                  <CModalTitle>Confirm Unlock User Account</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <CRow>
                    <CCol xs="12">
                    Are you sure to unlock {user.name}'s account?
                    </CCol>
                  </CRow>
                </CModalBody>
                <CModalFooter>
                  <CButton color="success" onClick={() => unlockUser()}>Unlock</CButton>
                  <CButton color="danger" onClick={() => cancelUnlockUser()}>Cancel</CButton>
                </CModalFooter>
              </CModal>
          </CCard>
      </CCol>
    </>
  )
}

export default Users;