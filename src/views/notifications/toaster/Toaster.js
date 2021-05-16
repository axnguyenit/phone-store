import React, { useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
  CForm,
  CInput,
  CInputCheckbox,
  CButton,
  CContainer,
  CRow,
  CCol,
  CFormGroup,
  CLabel
} from '@coreui/react';

const Toaster = () => {

  const positions = [
    'bottom-left',
  ]

  const [toasts, setToasts] = useState([
    { position: 'static'},
    { position: 'static'},
    { position: 'top-right', autohide: 3000 }
  ])

  // const [position, setPosition] = useState('bottom-left')
  const [autohide, setAutohide] = useState(true)
  const [autohideValue, setAutohideValue] = useState(5000)

  const addToast = () => {
    setToasts([
      ...toasts, 
      { position: "bottom-left", autohide: true && 5000, closeButton: true, fade: true }
    ])
  }


  const toasters = (()=>{
    return toasts.reduce((toasters, toast) => {
      toasters[toast.position] = toasters[toast.position] || []
      toasters[toast.position].push(toast)
      return toasters
    }, {})
  })()


  return (
    <CCard>
      <CCardHeader>
        Toasts
      </CCardHeader>
      <CCardBody>
        <CContainer>
          <CRow>
            <CCol sm="12" lg="6">
              <CForm>
                <h5>Add toast with following props:</h5>

                {/* <CFormGroup variant="custom-checkbox" className="my-2 mt-4">
                  <CInputCheckbox
                    id="autohide"
                    checked={autohide}
                    onChange={e => { setAutohide(e.target.checked) }}
                    custom
                  />
                  <CLabel variant="custom-checkbox" htmlFor="autohide">
                    Autohide of the toast
                  </CLabel>
                </CFormGroup> */}
                {
                  autohide &&
                  <CFormGroup className="my-2">
                    <CLabel htmlFor="ccyear">Time to autohide</CLabel>
                    <CInput
                      type="number"
                      value={autohideValue}
                      onChange={e => {
                        setAutohideValue(Number(e.target.value))
                      }}
                    />
                  </CFormGroup>
                }

                <CButton
                  className="mr-1 w-25"
                  color="success"
                  onClick={addToast}
                >
                  Add toast
                </CButton>

              </CForm>
            </CCol>
            <CCol sm="12" lg="6">
              {Object.keys(toasters).map((toasterKey) => (
                <CToaster
                position={toasterKey}
                key={'toaster' + toasterKey}
                >
                  {
                    toasters[toasterKey].map((toast, key)=>{
                      console.log(toasterKey);
                      // console.log(toast.fade);
                    return(
                      <CToast
                        key={'toast' + key}
                        show={true}
                        autohide={5000}
                        fade={true}
                      >
                        <CToastHeader closeButton={true}>
                          Toast title
                        </CToastHeader>
                        <CToastBody>
                          {`This is a toast in message positioned toaster number Kha.`}
                        </CToastBody>
                      </CToast>
                    )
                  })
                  }
                </CToaster>
              ))}
            </CCol>
          </CRow>
        </CContainer>
      </CCardBody>
    </CCard>
  )
}

export default Toaster
