<template>
    <div>
      <navbar></navbar>
      <div style="margin-top: 5rem !important;" class="container mt-5">
        <h2>Appointments</h2>
        <div class="mb-3 d-flex align-items-center">
          <label for="appointmentDate" class="form-label w-25 text-dark">Select Date</label>
          <input v-model="selectedDate" type="date" class="form-control mx-2" id="appointmentDate" required>
          <button @click="fetchAppointments" class="btn btn-small btn-primary">Search</button>
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
              <option :value="null" disabled></option>
              <option value="Scheduled">Scheduled</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div class="d-flex gap-2 align-self-bottom">
            <button @click="filterAppointments" class="btn btn-small btn-primary">Filter</button>
            <button @click="restApp" class="btn btn-small btn-danger">Reset</button>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-dark table-striped table-bordered table-sm">
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Token</th> 
                <th>Department</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="appointment in appointments" :key="appointment.id">
                <td>{{ appointment.id }}</td>
                <td>{{ appointment.patient.id }}</td>
                <td>{{ appointment.patient.fullName }}</td>
                <td>{{ appointment.token }}</td>
                <td>{{ appointment.department }}</td>
                <td>{{ appointment.doctor.name }}</td>
                <td>{{ appointment.date }}</td>
                <td>{{ appointment.status }}</td>
                <td>
                  <button v-if="appointment.status === 'scheduled'" @click="cancelAppointment(appointment.id)" class="btn btn-small btn-danger">Cancel</button>
                  <button v-else-if="appointment.status === 'in-progress'" @click="refundAppointment(appointment.id)"  class="btn btn-small btn-success">Refund</button>
                  <button v-else disabled class="btn btn-small btn-info tewt-light">Completed</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  <script>
  import axios from 'axios';
  import navbar from "@/components/Receptionist/Header.vue";
  
  export default {
    components: {
      navbar,
    },
    data() {
      return {
        selectedDate: null,
        data: null,
        appointments: [],
        filter: {
          patientName: '',
          patientId: '',
          status: '',
        },
      };
    },
    methods: {
      restApp(){
        this.filter = {
          patientName: '',
          patientId: '',
          status: '',
        }
        this.appointments = this.data;
      },
      async fetchAppointments() {
        try {
          if (!this.selectedDate) {
            alert('Please select a date.');
            return;
          }
          const response = await axios.get(`http://localhost:8080/api/appointment/get-by-date/${this.selectedDate}`);
          this.data = response.data;
          this.appointments = this.data; // Save the response in both data and appointments
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      },
      async cancelAppointment(id) {
        try {
           console.log(id);
          const appointment = this.appointments.find((a) => a.id ===  id);
          // Make a POST API call to cancel the appointment
          // Handle the successful response
          if (appointment) {
          const response = await axios.put(`http://localhost:8080/api/appointment/change-status/${id}/cancelled`);          
          appointment.status = 'cancelled';
          alert('Appointment Cancelled successfully!');
        } else {
          console.error('Appointment not found:', id);
          alert('An error occurred. Please try again.');
        }
      } catch (error) {
        // Handle errors (e.g., network issues, server errors)
        console.error('Error cancelling the appointment:', error);
        alert('An error occurred while cancelling the appointment. Please try again.');
      }
    },
      async refundAppointment(id) {
      try {
        const appointment = this.appointments.find((a) => a.id === id);
        if (appointment) {
          const response = await axios.put(`http://localhost:8080/api/appointment/change-status/${id}/refunded`);
          appointment.status = 'refunded';
          alert('Appointment refunded successfully!');
        } else {
          console.error('Appointment not found:', id);
          alert('An error occurred. Please try again.');
        }
      } catch (error) {
        // Handle errors (e.g., network issues, server errors)
        console.error('Error refunding appointment:', error);
        alert('An error occurred while refunding the appointment. Please try again.');
      }
    },
      filterAppointments() {
        let filteredAppointments = this.data;
  
        if (this.filter.patientName) {
          filteredAppointments = filteredAppointments.filter(appointment =>
            appointment.patient.fullName.toLowerCase().includes(this.filter.patientName.toLowerCase())
          );
        }
  
        if (this.filter.patientId) {
          filteredAppointments = filteredAppointments.filter(appointment =>
            String(appointment.patient.id).includes(this.filter.patientId)
          );
        }
  
        if (this.filter.status) {
          filteredAppointments = filteredAppointments.filter(appointment =>
            appointment.status.toLowerCase() === this.filter.status.toLowerCase()
          );
        }
  
        this.appointments = filteredAppointments;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  