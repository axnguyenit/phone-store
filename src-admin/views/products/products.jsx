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
import axios from 'axios';

// API URL
const API_PRODUCTS_URL = `http://localhost:4000/api/products`;

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
  const [product, setProduct] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [isUpdate, setUpdate] = useState(false);
  const [quantity, setQuantity] = useState(0);
  
  // Function fetch products from Commerce & JSon Server
  const fetchProducts = async() => {
    const res = await commerce.products.list();
    axios.get(API_PRODUCTS_URL).then( response => {
      saveProducts(res.data, response.data);
      setProducts((res && res.data) || []);
    })
  }

  const saveProducts = (data, data2) => {
    let productList = [];
    if(data.length > 0) {
      data.map((product) => {
        const prod = data2.find(prod => prod.id.toString() === product.id);
        let productTemp = {
          id: product.id,
          name: product.name,
          price: product.price.formatted_with_symbol,
          brand: product.categories[0].name,
          quantity: prod.quantity,
        }
        productList.push(productTemp);
        setProducts2(productList);
      })
    }
  }

  // Function update product quantity
  const updateProduct = (item) => {
    if(quantity > 0 && quantity != item.quantity) {
      const prodTerm = {
        id: product.id,
        quantity: quantity,
      }

      const prodTerm2 = {
        id: product.id,
        name: product.name,
        price: product.price,
        brand: product.brand,
        quantity: quantity,
      }

      axios.put(API_PRODUCTS_URL + "/" + product.id, prodTerm).then( res => {
        let productsTerm = products2;
        let index = productsTerm.indexOf(item);
        productsTerm[index] = prodTerm2;
        setProducts2(productsTerm);
        setProduct({});
      })
      setUpdate(!isUpdate);
    }
  }


  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdate = (item) => {
    setProduct(item);
    setQuantity(item.quantity)
    setUpdate(!isUpdate);
  }

  const handleUpdateOnChange = (e) => {
    e.preventDefault();
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
                            return (
                              <td className="py-2">
                                <CButton
                                  color="primary"
                                  shape="square"
                                  size="sm"
                                  onClick={()=>{handleUpdate(item)}}
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
                <CInput size="sm" type="number" defaultValue={product.quantity} onChange={handleUpdateOnChange}/>
              </CModalBody>
              <CModalFooter>
                <CButton color="success" onClick={() => {updateProduct(product)}}>Update</CButton>
                <CButton color="danger" onClick={() => setUpdate(!isUpdate)}>Cancel</CButton>
              </CModalFooter>
            </CModal>
          </CCard>
      </CCol>
    </>
  )
}

export default Products;
