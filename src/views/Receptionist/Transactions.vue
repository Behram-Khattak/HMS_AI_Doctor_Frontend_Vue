<template>
    <div>
        <navbar></navbar>
    <div style="margin-top: 5rem !important;" class="container mt-5">
      <h2>Transactions</h2>
      <div class="mb-3 d-flex align-items-center ">
      <label for="transactionDate" class="form-label w-25 text-dark">Select Date</label>
      <input v-model="selectedDate" type="date" class="form-control mx-2" id="transactionDate" required>
      <button @click="fetchTransactions" class="btn btn-small btn-primary">Fetch</button>
    </div>
    <div class="d-flex flex-column flex-sm-row text-dark align-items-center gap-3">
    <div class="mb-3 ">
      <label for="filterPatientName" class="form-label">Filter by Patient Name</label>
      <input v-model="filter.patientName" type="text" class="form-control" id="filterPatientName">
    </div>
    <div class="mb-3">
      <label for="filterPatientId" class="form-label">Filter by Patient ID</label>
      <input v-model="filter.patientId" type="text" class="form-control" id="filterPatientId">
    </div>
    <div class="mb-3">
      <label for="filterStatus" class="form-label">Filter by Status</label>
      <select v-model="filter.status" class="form-select" id="filterStatus">
        <option value="">All</option>
        <option value="Valid">Valid</option>
        <option value="Paid">Paid</option>
        <option value="refunded">Refunded</option>
      </select>
    </div>
    <div class="d-flex gap-2 align-self-bottom">
    <button @click="filterTransactions" class="btn btn-small btn-primary">Filter</button>
    <button @click="resetTransactions" class="btn btn-small btn-danger">Reset</button>
</div>
</div>
    <div class="table-responsive">
      <table class="table table-dark table-striped table-sm table-bordered">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Patient ID</th>
            <th>Patient Name</th>
            <th>For</th>
            <th>Record ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction.id">
            <td>{{ transaction.id }}</td>
            <td>{{ transaction.patient.id }}</td>
            <td>{{ transaction.patient.fullName }}</td>
            <td>{{ transaction.transactionOf }}</td>
            <td>{{ transaction.recordId }}</td>
            <td>{{ transaction.amount }}</td>
            <td>{{ transaction.status }}</td>
            <td>
              <button v-if="transaction.status === 'valid'" @click="markAsPaid(transaction.id)" class="btn btn-danger">Pay Now</button>
              <button v-else disabled class="btn btn-success">Paid</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</div>
</div>
  </template>
  
  <script>
    import navbar from '@/components/Receptionist/Header.vue';
    import axios from 'axios';  
    export default {
    components: {
      navbar,
    },
    data() {
      return {
        selectedDate: null,
       data: [],
        transactions: [],
    filter: {
        patientName: '',
        patientId: '',
        status: '',
      },
      };
    },
    methods: {
      async fetchTransactions() {
        if(this.selectedDate === null)
        {
          alert('Please select a date');
          return;
        }
        const response = await axios.get(`http://localhost:8080/api/transaction/${this.selectedDate}`);
        this.transactions = response.data;
        console.log(this.transactions);
        this.data = response.data;
      },
      async markAsPaid(id) {
    // Find the transaction by id
    const transaction = this.transactions.find((t) => t.id === id);
    if (transaction) {
        const response = await axios.put(`http://localhost:8080/api/transaction/change-status/${transaction.id}/paid`);
        console.log('Transaction marked as paid:', id);
        transaction.status = 'Paid';
          } else {
              console.error('Transaction not found:', id);
          }
      },
      resetTransactions() {
        this.filter = {
          patientName: '',
          patientId: '',
          status: '',
        }
        this.transactions = this.data;
      },
      filterTransactions() {
      let filteredTransactions = this.data;

      if (this.filter.patientName) {
        filteredTransactions = filteredTransactions.filter(transaction =>
          transaction.patient.fullName.toLowerCase().includes(this.filter.patientName.toLowerCase())
        );
      }

      if (this.filter.patientId) {
        filteredTransactions = filteredTransactions.filter(transaction =>
          String(transaction.patient.id).includes(this.filter.patientId)
        );
      }

      if (this.filter.status) {
        filteredTransactions = filteredTransactions.filter(transaction =>
          transaction.status.toLowerCase() === this.filter.status.toLowerCase()
        );
      }

      this.transactions = filteredTransactions;
    },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  