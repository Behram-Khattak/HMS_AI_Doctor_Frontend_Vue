<template>
  <div>
    <navbar></navbar>
    <div style="margin-top: 5rem !important" class="container mt-5">
      <h2>Laboratory Dashboard</h2>
      <div class="mb-3 d-flex align-items-center">
        <label for="dispenseDate" class="form-label w-25 text-dark"
          >Select Date</label
        >
        <input
          v-model="selectedDate"
          type="date"
          class="form-control mx-2"
          id="dispenseDate"
          required
        />
        <button @click="fetchPrescriptions" class="btn btn-small btn-primary">
          Search
        </button>
      </div>
      <div class="table-responsive">
        <table class="table table-striped table-sm table-dark">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Test ID</th>
              <th>Test Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(prescription, index) in appointedTest" :key="index">
              <td>{{ prescription.appointment.id }}</td>
              <td>{{ prescription.appointment.patient.id }}</td>
              <td>{{ prescription.appointment.patient.fullName }}</td>
              <td>{{ prescription.test.id }}</td>
              <td>{{ prescription.test.name }}</td>
              <td>{{ prescription.status }}</td>
              <td class="d-flex gap-2">
                <button
                  v-if="prescription.status.toLowerCase() !== 'completed'"
                  type="button"
                  class="btn btn-small btn-primary"
                  @click="setId(prescription.id)"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Submit Result
                </button>
                <button
                  v-if="prescription.status.toLowerCase() === 'completed'"
                  type="button"
                  disabled
                  class="btn btn-small btn-danger"
                >
                  Submitted
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Submit Result</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitResult">
                <div
                  class="mb-3 d-flex justify-content-between align-items-center"
                >
                  <label for="desc" class="form-label w-25 text-dark"
                    >Result</label
                  >
                  <input
                    v-model="desc"
                    type="text"
                    class="form-control"
                    id="desc"
                    required
                  />
                </div>
                <button type="submit" class="btn btn-danger mx-2">
                  Submit
                </button>
                <button
                  type="button"
                  class="btn btn-secondary mx-2"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/Laboratory/Header.vue";
import axios from "axios";
export default {
  components: {
    navbar,
  },
  data() {
    return {
      selectedDate: null,
      appointedTest: [],
      id: "",
      desc: "",
      filter: {
        patientName: "",
        patientId: "",
        status: "",
        prescriptionStatus: "",
      },
    };
  },
  methods: {
    setId(id) {
      this.id = id;
    },
    async submitResult() {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/result/${this.id}`,
          { description: this.desc }
        );
        this.fetchPrescriptions();
        this.id = "";
        this.desc = "";
      } catch (error) {
        alert("Something went wrong");
        this.id = "";
        this.desc = "";
        console.error(error);
      }
    },
    async fetchPrescriptions() {
      if (!this.selectedDate) {
        alert("Please select a date");
        return;
      }
      try {
        const userDepartment = localStorage.getItem("userDepartment");
        const response = await axios.get(
          `http://localhost:8080/api/test/get-tests-by-date-and-department/${this.selectedDate}/${userDepartment}`
        );
        this.appointedTest = response.data;
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
