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

  const fetchUsers = async() => {
    axios.get(API_USERS_URL).then( res => {
      console.log(res.data);
      setUsers(res.data);
    })
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const [isUpdate, setUpdate] = useState(false);

  const handleUpdate = () => {
    setUpdate(!isUpdate);
  }

  const handleUpdateOnChange = (e) => {
    console.log(e.target.value);
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
                      pagination
                      scopedSlots = {{
                        'show_details':
                          (item, index)=>{
                            console.log(index);
                            return (
                              <td className="py-2">
                                <CButton
                                  color="primary"
                                  shape="square"
                                  size="sm"
                                  onClick={()=>{setUpdate(!isUpdate)}}
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
                <CLabel>Quantity</CLabel>
                <CInput size="sm" onChange={handleUpdateOnChange}/>
              </CModalBody>
              <CModalFooter>
                <CButton color="success" onClick={() => {handleUpdate()}}>Update</CButton>
                <CButton color="danger" onClick={() => setUpdate(!isUpdate)}>Cancel</CButton>
              </CModalFooter>
            </CModal>
          </CCard>
      </CCol>
    </>
  )
}

export default Users;
