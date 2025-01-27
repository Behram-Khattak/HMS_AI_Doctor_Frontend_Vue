<template>
  <div>
    <navbar></navbar>
    <div style="margin-top: 5rem !important;" class="container mt-5 text-dark">
      <h2>Patient Registration</h2>
      <form @submit.prevent="registerPatient">
        <div class="mb-3 d-flex justify-content-between align-items-center">
          <label for="id" class="form-label w-25 text-dark">ID</label>
          <input v-model="patient.id" type="text" class="form-control" id="id" required>
        </div>
        <div class="mb-3 d-flex justify-content-between align-items-center">
          <label for="fullName" class="form-label w-25 text-dark">Full Name</label>
          <input v-model="patient.fullName" type="text" class="form-control" id="fullName" required>
        </div>
        <div class="mb-3 d-flex justify-content-between align-items-center">
          <label for="dob" class="form-label w-25 text-dark">Date of Birth</label>
          <input v-model="patient.dob" type="date" class="form-control" id="dob" required>
        </div>
        <div class="mb-3 d-flex justify-content-between align-items-center">
          <label for="gender" class="form-label w-25 text-dark">Gender</label>
          <select v-model="patient.gender" class="form-select" id="gender" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <!-- Add more options if needed -->
          </select>
        </div>
        <div class="mb-3 d-flex justify-content-between align-items-center">
          <label for="address" class="form-label w-25 text-dark">Address</label>
          <textarea v-model="patient.address" class="form-control" id="address" required></textarea>
        </div>
        <div class="mb-3 d-flex justify-content-between align-items-center">
          <label for="phone" class="form-label w-25 text-dark">Phone Number</label>
          <input v-model="patient.phoneNumber" type="tel w-25 text-dark" class="form-control" id="phone" required>
        </div>
        <div class="mb-3 d-flex justify-content-between align-items-center">
          <label for="email" class="form-label w-25 text-dark">Email Address</label>
          <input v-model="patient.emailAddress" type="email" class="form-control" id="email" required>
        </div>
        <button type="submit" class="btn btn-danger">Register</button>
      </form>
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
      patient: {
        id: '',
        fullName: '',
        dob: '',
        gender: '',
        address: '',
        phoneNumber: '',
        emailAddress: '',
      },
    };
  },
  methods: {
    async registerPatient() {
      // Simple client-side validation
      if (!this.validateForm()) {
        alert('Please fill in all required fields.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:8080/api/patient', this.patient);
        alert('Patient registered successfully!');
        this.patient = {
          id: '',
          fullName: '',
          dob: '',
          gender: '',
          address: '',
          phoneNumber: '',
          emailAddress: '',
        };
      } catch (error) {
        console.error('Error registering patient:', error);
        alert('An error occurred while registering the patient. Please try again.');
      }
    },
    validateForm() {
      // Simple validation to ensure all required fields are filled
      return (
        this.patient.id &&
        this.patient.fullName &&
        this.patient.dob &&
        this.patient.gender &&
        this.patient.address &&
        this.patient.phoneNumber &&
        this.patient.emailAddress
      );
    },
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
