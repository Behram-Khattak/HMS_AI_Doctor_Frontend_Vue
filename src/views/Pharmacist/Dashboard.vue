<template>
    <div>
      <navbar></navbar>
      <div style="margin-top: 5rem !important;" class="container mt-5">
        <h2>Pharmacist's Dashboard</h2>
        <div class="mb-3 d-flex align-items-center">
          <label for="dispenseDate" class="form-label w-25 text-dark">Select Date</label>
          <input v-model="selectedDate" type="date" class="form-control mx-2" id="dispenseDate" required>
          <button @click="fetchPrescriptions" class="btn btn-small btn-primary">Search</button>
        </div>
        <div class="table-responsive">
          <table class="table table-striped table-sm table-dark">
            <thead>
              <tr>
                <th>Prescription ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(prescription, index) in prescriptions" :key="prescription.id">
                <td>{{ prescription.id }}</td>
                <td>{{ prescription.date }}</td>
                <td>{{ prescription.amount }}</td>
                <td>{{ prescription.status }}</td>
                <td class="d-flex gap-2">
                    <button type="button" class="btn btn-small btn-primary" @click="showMedicines(index)" data-toggle="modal" data-target="#exampleModal">
                View
            </button>
            <button v-if="prescription.status.toLowerCase()!== 'completed'" type="button" @click="markCompleted(prescription.id)" class="btn btn-small btn-danger">Completed</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Medicines</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="table-responsive">
          <table class="table table-striped table-sm table-dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Power</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="prescription in medicines" :key="prescription.id">
                <td>{{ prescription.medicine.id }}</td>
                <td>{{ prescription.medicine.name }}</td>
                <td>{{ prescription.medicine.power }}</td>
                <td>{{ prescription.quantity }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  </template>
  
  <script>
  import navbar from "@/components/Pharmacist/Header.vue";
  import axios from 'axios'
  export default {
    components: {
      navbar,
    },
    data() {
      return {
        selectedDate: null,
        prescriptions: [
          // Sample data for prescriptions
          ],
          medicines:[],
          // index:0,
        filter: {
          patientName: '',
          patientId: '',
          status: '',
          prescriptionStatus: '',
        },
      };
    },
    methods: {
      showMedicines(index){
        this.medicines=this.prescriptions[index].prescriptionMedicines;
      },
     async fetchPrescriptions() {
        if (!this.selectedDate) {
          alert('Please select a date');
          return;
        }
        try {
          const response = await axios.get(`http://localhost:8080/api/prescription/get-prescriptions/${this.selectedDate}`);
          this.prescriptions = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      async markCompleted(id){
        try {
          const response = await axios.put(`http://localhost:8080/api/prescription/change-status/${id}/completed`);
          this.fetchPrescriptions();
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  