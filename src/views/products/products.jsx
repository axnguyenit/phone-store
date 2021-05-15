import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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
import commerce from '../../lib/commerce';

const fields = [
  'name',
  {
    key: 'price',
    _style: { width: '20%' }
  },
  {
    key: 'brand',
    _style: { width: '20%' }
  },
  {
    key: 'quantity',
    _style: { width: '10%' }
},
  {
    key: 'show_details',
    label: 'Action',
    _style: { width: '15%' },
    filter: false
  }
]


const Products = () => {
  const [products, setProducts] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [isUpdate, setUpdate] = useState(false);
  const [quantity, setQuantity] = useState(0);
  

  const fetchProducts = async() => {
    const res = await commerce.products.list();
    console.log(res.data);
    saveProducts(res.data);
    setProducts((res && res.data) || []);
  }

  let productList = [];
  const saveProducts = (data) => {
    if(data.length > 0) {
      data.map((product) => {
        console.log();
        let productTemp = {
          id: product.id,
          name: product.name,
          price: product.price.formatted_with_symbol,
          brand: product.categories[0].name,
          quantity: 50,
        }
        productList.push(productTemp);
        setProducts2(productList);
      })
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdate = () => {
    setUpdate(!isUpdate);
  }

  const handleUpdateOnChange = (e) => {
    console.log(e.target.value);
    setQuantity(e.target.value);
  }

  return (
    <>
      <CCol xs="12" md="12" className="mb-4">
          <CCard>
              <CCardBody>
                  <CCard>
                    <CDataTable
                      items={products2}
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
                                  Update Quantity
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

export default Products;
