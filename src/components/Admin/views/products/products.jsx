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
      saveProducts(res.data);
      setProducts((res && res.data) || []);
  }

  const saveProducts = (data) => {
    let productList = [];
    if(data.length > 0) {
      data.map((product) => {
        let productTemp = {
          id: product.id,
          name: product.name,
          price: product.price.formatted_with_symbol,
          brand: product.categories[0].name,
          quantity: product.inventory.available,
        }
        productList.push(productTemp);
        setProducts2(productList);
      })
    }
  }

  // Function update product quantity

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
                      sorter
                      pagination
                    />
                  </CCard>
              </CCardBody>
          </CCard>
      </CCol>
    </>
  )
}

export default Products;
