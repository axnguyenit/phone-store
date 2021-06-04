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
import axios from 'axios';

const API_ORDERS_URL = `http://localhost:4000/api/orders`;
const API_USERS_URL = `http://localhost:4000/api/users`;

const fields = [
  {
    key: 'receiver',
    label: 'Test',
    _style: { width: '25%' }
  },
  {
    key: 'phone',
    _style: { width: '35%' }
  },
  {
    key: 'date',
    _style: { width: '25%' }
  },
  {
    key: 'quantity',
    _style: { width: '25%' }
  },
  {
    key: 'total',
    label: 'Total($)',
    _style: { width: '35%' }
  },
  {
    key: 'status',
    _style: { width: '15%' }
  },
  {
    key: 'action',
    _style: { width: '15%' },
    filter: false
  }
  // {
  //   key: 'address',
  //   _style: { width: '10%' }
  // },
  // {
  //   key: 'role',
  //   _style: { width: '10%' }
  // },

  // {
  //   key: 'show_details',
  //   label: 'Action',
  //   _style: { width: '1%' },
  //   filter: false
  // }
]


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  const fetchOrders = async() => {
    axios.get(API_ORDERS_URL).then( res => {
      let orders = res.data;
      let products;

      if(localStorage.getItem('products')) {
        products = JSON.parse(localStorage.getItem('products'));
      }

      let ordersTerm = [];

      orders.map(order =>{
        let orderTerm = order;
        let quantity = 0;
        let total = 0;

        order.details.map(item => {
          let product = products.find( product => item.prodId === product.id);
          
          quantity += item.quantity;
          if(product) {
            total += item.quantity * product.price.raw;
          }
        })

        orderTerm.quantity = quantity;
        orderTerm.total = total;
        orderTerm.date = new Intl.DateTimeFormat(['ban', 'id']).format(order.createdAt);
        ordersTerm.push(orderTerm);
      })
      setOrders(ordersTerm);
    })
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const [products, setProducts] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [isUpdate, setUpdate] = useState(false);
  const [quantity, setQuantity] = useState(0);

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
                      items={orders}
                      fields={fields}
                      columnFilter
                      itemsPerPage={7}
                      hover
                      pagination
                      onRowClick={(item) => history.push(`/orders/${item.id}`)}
                      scopedSlots = {{
                        'show_details':
                          (item, index)=>{
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

export default Orders;
