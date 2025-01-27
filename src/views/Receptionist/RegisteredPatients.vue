<template>
  <div>
    <navbar></navbar>
    <div style="margin-top: 5rem !important;" class="container mt-5">
      <form @submit.prevent="searchPatients">
        <div class="mb-3 d-flex justify-content-between align-items-center gap-2">
          <label for="name" class="form-label w-25 text-dark">Search ID</label>
          <input v-model="searchName" type="text" class="form-control" id="name" required>
          <button type="submit" class="btn btn-small btn-primary">Search</button>
          <button type="reset" @click="resetcall" class="btn btn-small btn-danger">Reset</button>
        </div>
      </form>
      <h2 class="text-dark text-bold">Registered Patients</h2>
      <table class="table table-dark table-striped table-sm table-bordered table-responsive">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="patient in patients" :key="patient.id">
            <td>{{ patient.id }}</td>
            <td>{{ patient.fullName }}</td>
            <td>{{ patient.dob }}</td>
            <td>{{ patient.gender }}</td>
            <td>{{ patient.phoneNumber }}</td>
            <td>{{ patient.emailAddress }}</td>
          </tr>
        </tbody>
      </table>
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
      searchName: '',
      patients: [],
      };
    },
    methods: {
      resetcall(){
        this.searchName = '';
        this.searchPatients();
      },
    async searchPatients() {
      const baseUrl = 'http://localhost:8080/api/patient';
      const apiUrl = this.searchName ? `${baseUrl}/${this.searchName}` : baseUrl;
      try {
        const response = await axios.get(apiUrl);
        this.patients = Array.isArray(response.data) ? response.data : [response.data];
      } catch (error) {
        this.patients = [];
        console.error('Error fetching patients:', error);
      }
    },
  },
  created() {
    // Fetch the list of patients when the component is created
    this.searchPatients();
  },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>