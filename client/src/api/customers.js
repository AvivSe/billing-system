import axios from 'axios';

const CUSTOMER_URL = "http://localhost:8080/api/customer";

export function getCustomers() {
  return axios.get(CUSTOMER_URL).then(res => res.data);
}

export function createCustomer(customer) {
  return axios.post(CUSTOMER_URL, customer).then(res => res.data);
}

export function updateCustomer(customer) {
  return axios.put(CUSTOMER_URL, customer).then(res => res.data);
}

export function deleteCustomer(id) {
  return axios.delete(`${CUSTOMER_URL}/${id}`)
}
