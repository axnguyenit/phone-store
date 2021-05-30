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
    _style: { width: '25%' }
  },
  {
    key: 'phone',
    _style: { width: '15%' }
  },
  {
    key: 'date',
    _style: { width: '15%' }
  },
  {
    key: 'quantity',
    _style: { width: '10%' }
  },
  {
    key: 'total',
    label: 'Total($)',
    _style: { width: '10%' }
  },
  {
    key: 'status',
    _style: { width: '10%' }
  },
  {
    key: 'show_details',
    label: 'Action',
    _style: { width: '15%' },
    filter: false
  }
]


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [orders1, setOrders1] = useState([]);
  const history = useHistory();

  const fetchOrders = async() => {
    axios.get(API_ORDERS_URL).then(res => {
      setOrders1(res.data);
      let orders = new Array(res.data);
      let products;
      if(localStorage.getItem('products')) {
        products = JSON.parse(localStorage.getItem('products'));
      }

      let ordersTerm = [];

      orders[0].map(order => {
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

  const handleApproveOrder = (item) => {
    if(orders1) {
      let order = orders1.find(order => item.id === order.id);
      if(order) {
        order.status = "approved";
        delete order.date;
        delete order.quantity;
        delete order.total;

        axios.put(API_ORDERS_URL + '/' + order.id, order).then(res => {
          console.log(res.data);
        })
      }
    }
    
  }

  const handleCancelOrder = (item) => {
    console.log(orders);
    if(orders) {
      const order = orders.find(order => item.id === order.id);
      if(order) {
        console.log(order);
      }
    }
  }

  const getBadge = (status)=>{
    switch (status) {
      case 'approved': return 'success'
      case 'Inactive': return 'secondary'
      case 'pending': return 'warning'
      case 'cancel': return 'secondary'
      default: return 'primary'
    }
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
                      sorter
                      pagination
                      onRowClick={(item) => history.push(`/orders/${item.id}`)}
                      scopedSlots = {{
                        'status':
                        (item)=>(
                          <td>
                            <CBadge color={getBadge(item.status)}>
                              {item.status}
                            </CBadge>
                          </td>
                        ),
                        'show_details':
                          (item, index) => {
                              return (
                                <td key={index} className="py-2">
                                  {
                                    item.status === "pending" ?
                                      <CButton
                                        color="primary"
                                        variant="outline"
                                        shape="square"
                                        size="sm"
                                        onClick={() => handleApproveOrder(item)}
                                        >
                                        Approve
                                      </CButton> : ""
                                  } 
                                    &nbsp;
                                    &nbsp;
                                  {
                                    item.status === "pending" ?
                                      <CButton
                                        color="primary"
                                        variant="outline"
                                        shape="square"
                                        size="sm"
                                        onClick={() => handleCancelOrder(item)}
                                        >
                                        Cancel
                                      </CButton> : ""
                                  }
                              </td>
                              )
                          }
                      }}
                    />
                  </CCard>
              </CCardBody>
          </CCard>
      </CCol>
    </>
  )
}

export default Orders;
