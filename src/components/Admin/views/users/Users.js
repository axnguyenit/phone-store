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
    _style: { width: '35%' }
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
    _style: { width: '10%' }
  },

  {
    key: 'show_details',
    label: 'Action',
    _style: { width: '1%' },
    filter: false
  }
]

const Users = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [isUpdate, setUpdate] = useState(false);
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [validEmail, setValidEmail] = useState(false);
  const [validPhone, setValidPhone] = useState(false);

  // Function fetch users from JSon Server
  const fetchUsers = async() => {
    axios.get(API_USERS_URL).then( res => {
      setUsers(res.data);
    })
  }

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
    setUser({});
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

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdate = (userTerm) => {
    setUser(userTerm);
    setUpdate(!isUpdate);
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
                              <td className="py-2">
                                <CButton
                                  color="primary"
                                  shape="square"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleUpdate(userTerm)}
                                >
                                  Edit
                                </CButton>
                              </td>
                              )
                          }
                      }}
                    />
                  </CCard>
              </CCardBody>
              <CModal 
                show={isUpdate}
                onClose={() => setUpdate(!isUpdate)}
                color="primary"
              >
              <CModalHeader closeButton>
                <CModalTitle>Modal title</CModalTitle>
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
                  <CCol xs="4">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">Phone</CLabel>
                      <CInput name="phone" placeholder="phone" defaultValue={user.phone} onChange={(e) => {setPhone(e.target.value)}} required/>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="4">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">Password</CLabel>
                      <CInput name="password" type="password" defaultValue={user.password} placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} required/>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="4">
                    <CFormGroup>
                      <CLabel htmlFor="ccmonth">Role</CLabel>
                      <CSelect custom name="ccmonth" name="ccmonth" onChange={(e) => {setRole(e.target.value)}}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </CSelect>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CModalBody>
              <CModalFooter>
                <CButton color="success" onClick={() => updateUser()}>Update</CButton>
                <CButton color="danger" onClick={() => cancelUpdate()}>Cancel</CButton>
              </CModalFooter>
            </CModal>
          </CCard>
      </CCol>
    </>
  )
}

export default Users;