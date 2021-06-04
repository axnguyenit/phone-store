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
    _style: { width: '5%' }
  },
  {
    key: 'show_details',
    label: 'Action',
    _style: { width: '20%' },
    filter: false
  }
]

const Users = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [isUpdate, setUpdate] = useState(false);
  const [isLock, setLock] = useState(false);
  const [isUnlock, setIsUnlock] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const [role, setRole] = useState();

  const accessToken = localStorage.getItem('accessToken');
  // Function fetch users from JSon Server
  const fetchUsers = async() => {
    axios.get(API_USERS_URL).then( res => {
      setUsers(res.data);
    }) 
  }

  // Function update user info
  const updateUser = () => {
    if(role) {
      user.role = role;
      axios.put(API_USERS_URL + "/" + user.id, user).then(() => {
        setIsRender(!isRender);
      })
    }
    setUpdate(!isUpdate);
  }

  const cancelUpdate = () => {
    setUser({});
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
      setUser(userTerm);
      setLock(!isLock);
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
                              {
                                accessToken === 'manager' ?
                                <CButton
                                  color="primary"
                                  shape="square"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleUpdate(userTerm)}
                                >
                                  Update
                                </CButton> 
                                : ''
                              }
                                &nbsp;
                                &nbsp;
                                {
                                  // if role === manager show all lock
                                  accessToken === 'manager' ?
                                    userTerm.active ? 
                                      userTerm.role === 'manager' ? '' :
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
                  <CModalTitle>Update Role</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <CRow>
                    {
                      accessToken === 'manager' ?
                      <CCol xs="12">
                        <CFormGroup>
                          <CLabel htmlFor="ccmonth">Role</CLabel>
                          <CSelect custom name="ccmonth" name="ccmonth" onChange={(e) => {setRole(e.target.value)}}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
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