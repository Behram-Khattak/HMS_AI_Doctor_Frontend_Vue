<template>
    <div>
      <navbar></navbar>
      <div style="margin-top: 5rem !important;" class="container mt-5">
        <h2>Doctor's Dashboard</h2>
        <!-- AI chatbot doctor -->
        <div class="ai-doctor-chatbot">
          <AiDoctorChatbot class="h-[600px]" />
        </div>
        <!--  -->
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
              <label for="filterDiagnosisStatus" class="form-label">Filter by Diagnosis Status</label>
                <select v-model="filter.diagnosisStatus" class="form-select" id="filterDiagnosisStatus">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
          <div class="mb-3">
            <label for="filterPatientId" class="form-label">Filter by Patient ID</label>
            <input v-model="filter.patientId" type="text" class="form-control" id="filterPatientId">
          </div>
          <div class="mb-3">
            <label for="filterStatus" class="form-label">Filter by Status</label>
            <select v-model="filter.status" class="form-select" id="filterStatus">
              <option value="In-Progress">In-Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div class="align-self-bottom">
            <button @click="filterAppointments" class="btn btn-small mx-2 btn-primary">Filter</button>
            <button @click="restFilter" class="btn btn-small mx-2 btn-danger">Reset</button>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-striped table-sm table-dark">
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Token Number</th>
                <th>Diagnosis Status</th>
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
                <td>{{ appointment.diagnosis?'Yes':'No' }}</td>
                <td>{{ appointment.status }}</td>
                <td>
                  <button @click="viewDetails(appointment.id,appointment.date)" class="btn btn-primary">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import navbar from "@/components/Doctor/Header.vue";
  import AiDoctorChatbot from "@/components/AiDoctorChatbot/AiDoctorChatbot.vue";
  import axios from "axios";
import AiDoctorChatbot from "@/components/AiDoctorChatbot/AiDoctorChatbot.vue";
  export default {
    components: {
      navbar,
    },
    data() {
      return {
        selectedDate: null,
        appointments: [],
        data:[],
        filter: {
          patientName: '',
          patientId: '',
          status: '',
          diagnosisStatus:'',
        },
      };
    },
    methods: {
      restFilter(){
        this.filter = {
          patientName: '',
          patientId: '',
          status: '',
          diagnosisStatus:'',
        }
        this.appointments = this.data;
      },
      viewDetails(id,date){
        this.$router.push({ name: 'Booking', params: { id: id,date:date } });
      },
      async viewPatient(id){
      let selectedPatient =[];
      selectedPatient = this.appointments.find(appointment => appointment.patient.id === id);
      this.$router.push({ name: 'AppointmentDetails', params: { id: id,data:selectedPatient } });
    },
    async fetchAppointments() {
      if(!this.selectedDate){
        alert("Please select a date");
        return;
      }
      const userId = localStorage.getItem('userId');;
      const response = await axios.get(`http://localhost:8080/api/appointment/${userId}/${this.selectedDate}`);
      let filteredData = response.data.filter(appointment => {
        const status = appointment.status.toLowerCase();
        return status !== 'refunded' && status !== 'cancelled'; 
      });
        this.data = filteredData;
        this.appointments = filteredData;
        console.log(filteredData);
      },
      filterAppointments() {
    let filteredResults = this.data;
    if (this.filter.patientName) {
        filteredResults = filteredResults.filter(appointment =>
        appointment.patient.fullName.toLowerCase().includes(this.filter.patientName.toLowerCase())
        );
    }
    if (this.filter.diagnosisStatus) {
        filteredResults = filteredResults.filter(appointment =>
            appointment.diagnosisStatus.toLowerCase().includes(this.filter.diagnosisStatus.toLowerCase())
        );
        }

    if (this.filter.patientId) {
        filteredResults = filteredResults.filter(appointment =>
        String(appointment.patient.id).includes(this.filter.patientId)
        );
    }

    if (this.filter.status) {
        filteredResults = filteredResults.filter(appointment =>
        appointment.status.toLowerCase() === this.filter.status.toLowerCase()
        );
    }
        this.appointments = filteredResults;
      },
    },
  };
  </script>

  
  </style>
  