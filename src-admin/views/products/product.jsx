import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow,
  CButton,
  CCardFooter,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import usersData from './UsersData'

const User = ({match}) => {
  const user = usersData.find( user => user.id.toString() === match.params.id)
  const userDetails = user ? Object.entries(user) : 
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            User id: {match.params.id}
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    userDetails.map(([key, value], index) => {
                      return (
                        <tr key={index.toString()}>
                          <td>{`${key}:`}</td>
                          <td><strong>{value}</strong></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol lg={6}>
        <CCard>
            <CCardHeader>
              Update User Info
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">Name</CLabel>
                    <CInput id="name" placeholder="Name" required />
                  </CFormGroup>
                  
                  <CFormGroup>
                    <CLabel htmlFor="name">Email</CLabel>
                    <CInput id="name" type="email" placeholder="Email" required />
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="name">Password</CLabel>
                    <CInput id="name" placeholder="Password" required />
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="name">Password</CLabel>
                    <CInput id="name" placeholder="Password" required />
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="name">Name</CLabel>
                    <CInput id="name" placeholder="Name" required />
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="ccyear">Role</CLabel>
                    <CSelect custom name="ccyear" id="ccyear">
                      <option>Admin</option>
                      <option>User</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter align="right">
              <CButton type="submit" size="md" color="primary"> Update</CButton>
              {/* <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton> */}
            </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User;
