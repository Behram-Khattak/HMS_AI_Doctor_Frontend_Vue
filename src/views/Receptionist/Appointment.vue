<template>
  <div>
    <div>
      <navbar></navbar>
    </div>
    <div style="margin-top: 5rem !important;" class="container mt-5">
      <h2>Book Appointment</h2>
      <form @submit.prevent="bookAppointment">
        <div class="mb-3 d-flex justify-content-between align-items-center">
          <label for="id" class="form-label w-25 text-dark">ID</label>
          <input v-model="selectedPatient" type="text" class="form-control" id="id" required>
        </div>
        <div class="mb-3 d-flex justify-content-between align-items-center">
          <label for="department" class="form-label w-25 text-dark">Select Department</label>
          <select v-model="selectedDepartment" class="form-select" id="department" required @change="fetchDoctors">
          <option :value="null" disabled>Select Department</option>
          <option v-for="department in departments" :key="department" :value="department">{{ department }}</option>
        </select>
        </div>
        <div class="mb-3 d-flex justify-content-between align-items-center">
          <label for="doctor" class="form-label w-25 text-dark">Select Doctor</label>
          <select v-model="selectedDoctor" class="form-select" id="doctor" required>
            <option :value="null" disabled>Select Doctor</option>
            <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">{{ doctor.name }}</option>
          </select>
        </div>
        <div class="mb-3 d-flex justify-content-between align-items-center">
          <label for="date" class="form-label w-25 text-dark">Select Date</label>
          <input v-model="selectedDate" type="date" class="form-control" id="date" :min="today" required>
        </div>
        <div class="mb-3 d-flex justify-content-between align-items-center">
          <label for="diagnosis" class="form-label w-25 text-dark">Diagnosis</label>
          <select v-model="selectedDiagnosis" class="form-select" id="diagnosis" required>
            <option :value="null" disabled>Select Diagnosis</option>
            <option value="diagnosed">Diagnosed</option>
            <option value="undiagnosed">Undiagnosed</option>
          </select>
        </div>
        <div class="mb-3 d-flex justify-content-between align-items-center">
          <label for="charges" class="form-label w-25 text-dark">Enter Charges</label>
          <input v-model="charges" type="number" class="form-control" id="charges" required>
        </div>
        <button type="submit" class="btn btn-primary">Book Appointment</button>
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
      selectedPatient: '',
      selectedDiagnosis: null,
      charges: '',
      departments: [],
      selectedDepartment: null,
      doctors: [],
      selectedDoctor: null,
      selectedDate: null,
      today: new Date().toISOString().split('T')[0],  // Today's date
      patient:{
        id: '',
      },
      doctor:{
        id: '',
      },
    };
  },
  methods: {
    async fetchDepartments() {
      const response = await axios.get('http://localhost:8080/api/get-departments-by-role/doctor');
      this.departments = response.data;
    },
    async fetchDoctors() {
      const response = await axios.get(`http://localhost:8080/api/doctors/${this.selectedDepartment}`);
      this.doctors = response.data;
    },
    async bookAppointment() {
      if (!this.selectedDepartment || !this.selectedDoctor || !this.selectedDate) {
        alert('Please fill in all required fields.');
        return;
      }

      const appointmentData = {
        doctor:{
          id: this.selectedDoctor
        },
        patient:{
            id: this.selectedPatient
          },
        date: this.selectedDate,
        department: this.selectedDepartment,
        diagnosis: this.selectedDiagnosis === "diagnosed",
        charges: this.charges,
      };

      try {
        const response = await axios.post('http://localhost:8080/api/appointment', appointmentData);

        console.log('Appointment booked successfully:', response.data);
        this.selectedPatient = '';
        this.selectedDiagnosis = '';
        this.charges = '';
        this.selectedDepartment = null;
        this.selectedDoctor = null;
        this.selectedDate = null;
        alert('Appointment booked successfully!');
      } catch (error) {
        console.error('Error booking appointment:', error);
        alert('Patient Already Exists or Invalid Patient ID');
      }
    },
  },
  created() {
    // Fetch the list of departments when the component is created
    this.fetchDepartments();
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
