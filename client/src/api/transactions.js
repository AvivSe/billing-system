import axios from 'axios';

const TRANSACTION_URL = "http://localhost:8080/api/transaction";

export function getTransactions() {
  return axios.get(TRANSACTION_URL).then(res => res.data);
}

export function createTransaction(transaction) {
  return axios.post(TRANSACTION_URL, transaction).then(res => res.data);
}

export function updateTransaction(transaction) {
  return axios.put(TRANSACTION_URL, transaction).then(res => res.data);
}

export function deleteTransaction(id) {
  return axios.delete(`${TRANSACTION_URL}/${id}`)
}
