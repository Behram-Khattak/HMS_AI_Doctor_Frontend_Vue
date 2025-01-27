<template>
    <div>
      <navbar></navbar>
      <div v-if="appointment">
        <div style="margin-top: 5rem !important" class="container mt-5">
          <div class="d-flex justify-content-between my-2 align-items-center">
            <h2>Appointment Details</h2>
            <button
              v-if="appointment.status.toLowerCase() !== 'completed'"
              @click="markComplete"
              class="btn btn-small btn-primary"
            >
              Mark as Complete
            </button>
          </div>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <th>Appointment ID</th>
                <td>{{ appointment.id }}</td>
              </tr>
              <tr>
                <th>Appointment Date</th>
                <td>{{ appointment.date }}</td>
              </tr>
              <tr>
                <th>Patient ID</th>
                <td>{{ appointment.patient.id }}</td>
              </tr>
              <tr>
                <th>Patient Name</th>
                <td>{{ appointment.patient.fullName }}</td>
              </tr>
              <tr>
                <th>Doctor ID</th>
                <td>{{ appointment.doctor.id }}</td>
              </tr>
              <tr>
                <th>Doctor Name</th>
                <td>{{ appointment.doctor.name }}</td>
              </tr>
              <tr>
                <th>Department</th>
                <td>{{ appointment.department }}</td>
              </tr>
            </tbody>
          </table>
  
          <!-- Medical Condition -->
          <div class="d-flex justify-content-between my-2 align-items-center">
            <h2>Medical Condition</h2>
            <button
              v-if="
                appointment.status.toLowerCase() !== 'completed' &&
                appointment.medicalCondition === null
              "
              class="btn btn-small btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Add medical condition
            </button>
            <button
              v-if="appointment.status.toLowerCase() !== 'completed' &&
                appointment.medicalCondition !== null
              "
              class="btn btn-small btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Edit medical condition
            </button>
          </div>
          <table v-if="appointment.medicalCondition" class="table table-bordered">
            <tbody>
              <tr>
                <th>Disease Name:</th>
                <td>{{ appointment.medicalCondition.name }}</td>
              </tr>
              <tr>
                <th>Disease Description:</th>
                <td>{{ appointment.medicalCondition.description }}</td>
              </tr>
              <tr>
                <th>Severity:</th>
                <td>{{ appointment.medicalCondition.severity }}</td>
              </tr>
            </tbody>
          </table>
          <!-- Modal -->
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
                  <h5 class="modal-title" id="exampleModalLabel">
                    {{ MDCvalues }}
                  </h5>
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
                  <form @submit.prevent="submitMedicalCondition">
                    <div
                      class="mb-3 d-flex justify-content-between align-items-center"
                    >
                      <label for="diseaseName" class="form-label"
                        >Disease Name</label
                      >
                      <input
                        v-model="medicalCondition.name"
                        type="text"
                        class="form-control"
                        id="diseaseName"
                        placeholder="Enter Disease Name"
                      />
                    </div>
                    <div
                      class="mb-3 d-flex justify-content-between align-items-center"
                    >
                      <label for="diseaseDescription" class="form-label"
                        >Disease Description</label
                      >
                      <input
                        v-model="medicalCondition.description"
                        type="text"
                        class="form-control"
                        id="diseaseDescription"
                        placeholder="Enter Disease Description"
                      />
                    </div>
                    <div
                      class="mb-3 d-flex justify-content-between align-items-center"
                    >
                      <label for="severity" class="form-label">Severity</label>
                      <input
                        v-model="medicalCondition.severity"
                        type="text"
                        class="form-control"
                        id="severity"
                        placeholder="Enter Severity"
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
  
          <!-- Testing -->
          <div class="d-flex justify-content-between my-2 align-items-center">
            <h2>Test Details</h2>
            <button
              v-if="appointment.status.toLowerCase() !== 'completed'"
              class="btn btn-small btn-primary"
              data-toggle="modal"
              data-target="#exampleModal1"
            >
              Add Test
            </button>
          </div>
          <table
            v-if="appointedTest.length > 0"
            class="table table-bordered"
          >
            <thead>
              <tr>
                <th>AppointTest ID</th>
                <th>Test Name</th>
                <th>Status</th>
                <th>Result</th>
                <!-- Add more columns as needed -->
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="appointment in appointedTest"
                :key="appointment.id"
              >
                <td>{{ appointment.id }}</td>
                <td>{{ appointment.test.name }}</td>
                <td>{{ appointment.status }}</td>
                <td>
                  <button
                    v-if="appointment.status.toLowerCase() === 'completed'"
                    type="button"
                    class="btn btn-small btn-primary"
                      @click="fetchresult(appointment.id)"
                  >
                    View
                  </button>
                  <button v-else disabled>View</button>
                </td>
                <!-- Add more columns as needed -->
              </tr>
            </tbody>
          </table>
          <!-- Modal -->
          <div
            class="modal fade"
            id="exampleModal1"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Assign New Test
                  </h5>
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
                  <form @submit.prevent="AssignTest">
                    <div class="mb-3">
                      <label for="department" class="form-label"
                        >Select Department</label
                      >
                      <select
                        v-model="selectedDepartment"
                        class="form-select"
                        id="department"
                        required
                        @change="fetchTests"
                      >
                        <option value="inspection">Inspection</option>
                        <option value="disposal">Disposal</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="testName" class="form-label"
                        >Select Test Name</label
                      >
                      <select
                        v-model="selectedTest"
                        class="form-select"
                        id="testName"
                        required
                      >
                        <option :value="null" disabled></option>
                        <option
                          v-for="test in tests"
                          :key="test.id"
                          :value="test.id"
                        >
                          {{ test.name }}
                        </option>
                      </select>
                    </div>
                    <button type="submit" class="btn btn-primary mx-3 mb-2">
                      Assign Test
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
        
          <!-- Prescription -->
          <div class="d-flex justify-content-between my-2 align-items-center">
            <h2>Prescription Details</h2>
            <button
              v-if="
                appointment.status.toLowerCase() !== 'completed' &&
                appointment.prescription === null
              "
              class="btn btn-small btn-primary"
              data-toggle="modal"
              data-target="#exampleModal2"
            >
              Assign Medicines
            </button>
          </div>
            <div v-if="prescriptionMedicines.length > 0" class="table-responsive">
            <table class="table table-striped table-sm table-dark">
            <thead>
              <tr>
                <th>Medicine ID</th>
                <th>Name</th>
                <th>Power</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="prescription in prescriptionMedicines" :key="prescription.id">
                <td>{{ prescription.medicine.id }}</td>
                <td>{{ prescription.medicine.name }}</td>
                <td>{{ prescription.medicine.power }}</td>
                <td>{{ prescription.quantity }}</td>
              </tr>
            </tbody>
          </table>
        </div>
            <!-- Modal -->
            <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitPrescription">
                    <div class="mb-3">
                    <label for="medicine" class="form-label">Select Medicine</label>
                    <select v-model="selectedMedicine" class="form-select" id="medicine">
                    <option :value="null" disabled></option>
                    <option v-for="medicine in medicines" :key="medicine.id" :value="{ id: medicine.id, name: medicine.name }">
                        {{ medicine.name }}
                    </option>
                    </select>
                    </div>
                    <div class="mb-3">
                        <label for="quantity" class="form-label">Quantity</label>
                        <input v-model="selectedQuantity" type="number" class="form-control" id="quantity" >
                    </div>

                    <button @click.prevent="addPrescriptionEntry" class="btn btn-small btn-success mx-3 my-2">Add Prescription</button>

                    <!-- Display added prescriptionMedicines -->
                    <div v-if="prescriptionEntry.length > 0">
                        <ul>
                            <li v-for="(prescription, index) in prescriptionEntry" :key="index">
                            Medicine Name: {{ prescriptionEntry[index].medicine.name }} Quantity: {{ prescription.quantity }}
                            </li>
                        </ul>
                    </div>

                    <button type="submit" class="btn btn-small btn-primary mx-3 my-2">Assign Prescriptions</button>
                </form>      
                </div>
                </div>
            </div>
            </div>


            <!-- Previous Appointments -->
            <div class="d-flex justify-content-between my-2 align-items-center">
            <h2>All Completed Appointments</h2>
            </div>
            <div v-if="prescriptionMedicines.length > 0" class="table-responsive">
            <table class="table table-striped table-sm table-dark">
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Dcotor Name</th>                
                <th>Date</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="appointment in previous" :key="appointment.id">
                <td>{{ appointment.id }}</td>
                <td>{{ appointment.patient.id }}</td>
                <td>{{ appointment.patient.fullName }}</td>
                <td>{{ appointment.doctor.name }}</td>
                <td>{{ appointment.date }}</td>
                <td>{{ appointment.department }}</td>
              </tr>
            </tbody>
          </table>
        </div>


        </div>
      </div>
      <div v-else>
        <h1>No Appointment Found</h1>
      </div>
    </div>
  </template>

<script>
//   const appointmentId = this.$route.params.appointmentId;
import navbar from "@/components/Doctor/Header.vue";
import axios from "axios";

export default {
  components: {
    navbar,
  },
  computed: {
    MDCvalues() {
      if (this.appointment.medicalCondition === null) {
        return "Add Medical Condition";
      } else {
        this.medicalCondition.name = this.appointment.medicalCondition.name;
        this.medicalCondition.description =
          this.appointment.medicalCondition.description;
        this.medicalCondition.severity =
          this.appointment.medicalCondition.severity;
        return "Edit Medical Condition";
      }
    },
  },
  data() {
    return {
    selectedDepartment: "",
    selectedTest: "",  
    selectedMedicine:null,
    selectedQuantity:null,
    prescriptionMedicines: [],
    prescriptionEntry:[],
    appointedTest: [],
    medicines: [],
    previous:[],
    appointment: null,
      tests: [],
      medicalCondition: {
        name: "",
        description: "",
        severity: "",
      },
    };
  },
  mounted() {
    this.fetchDetails1();
    //   this.fetchDetails2();
      this.fetchMedicines();
  },
  methods: {
    async fetchDetails1() {
      try {
        console.log(this.$route.params.id);
        console.log(this.$route.params.date);
        const userId = localStorage.getItem('userId');
        const response = await axios.get(
          `http://localhost:8080/api/appointment/${userId}/${this.$route.params.date}`
        );
        this.appointment = response.data.find(
          (appointment) =>
            appointment.id === this.$route.params.id &&
            appointment.status !== "refunded" &&
            appointment.status !== "cancelled"
        );
          this.getPrescription();
          this.fetchAppointedTest();
          this.fetchPreviousAppointments();
          console.log(this.appointment);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchAppointedTest(){
      try {
        if(!this.appointment.appointmentTests.length > 0)
        {
          return;
        }
        const id=this.appointment.id;
        console.log('APPOINTED TEST ID:',id);
        const response = await axios.get(`http://localhost:8080/api/test/get-appointed-test/${id}`);
        this.appointedTest=response.data;
        console.log('Appointed TEST',response.data);
      } catch (error) {
        
      }
    },
    async submitMedicalCondition() {
      try {
        if (
          this.medicalCondition.name === "" ||
          this.medicalCondition.description === "" ||
          this.medicalCondition.severity === ""
        ) {
          alert("Please fill all the fields");
          return;
        }
        if (this.appointment.medicalCondition === null) {
          const response = await axios.post(
            `http://localhost:8080/api/appointment/add-medical-condition/${this.$route.params.id}`,
            this.medicalCondition
          );
          this.fetchDetails1();
        } else {
          const response = await axios.put(
            `http://localhost:8080/api/appointment/update-medical-condition/${this.$route.params.id}`,
            this.medicalCondition
          );
          this.fetchDetails1();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async fetchTests() {
      // Fetch the list of tests based on the selected department
      // You should replace the following URL with your actual backend API endpoint
      try {
        const response = await axios.get(`http://localhost:8080/api/test`);
        this.tests = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async AssignTest()
    {
        try {
            const response = await axios.post(`http://localhost:8080/api/test/${this.selectedTest}/assign-to-appointment/${this.appointment.id}`);
            this.fetchDetails1();
            this.selectedDepartment = "";
            this.selectedTest = "";
        } catch (error) {
            alert("An error occured while assigning test");
            console.error("Error fetching data:", error);
        }
    },
    async fetchresult(id){
        try {
            const response = await axios.get(`http://localhost:8080/api/result/test/${id}`);
            alert(`Result : ${response.data.description}`);
        } catch (error) {
          console.error("Error fetching data:", error);   
        }
    },
    async markComplete() {
      try {
        const response = await axios.put(`http://localhost:8080/api/appointment/change-status/${this.appointment.id}/completed`);
        this.appointment.status = "completed";
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async fetchMedicines() {
      try {
        const response = await axios.get(`http://localhost:8080/api/medicine`);
        this.medicines = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async getPrescription() {
      try {
        if(this.appointment.prescription === null){
          return;
        }
        const id=this.appointment.prescription.id;
        const response = await axios.get(
          `http://localhost:8080/api/prescription/${id}`
        );
        this.prescriptionMedicines = response.data.prescription.prescriptionMedicines;
        console.log(response.data.prescription.prescriptionMedicines);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async submitPrescription() {
      try {
        if (this.prescriptionEntry.length === 0) {
          alert("Please add atleast one medicine");
          return;
        }
        const prescriptionsWithoutName = this.prescriptionEntry.map(prescription => ({
            ...prescription,
            medicine: { id: prescription.medicine.id }
        }));
          const response = await axios.post(
          `http://localhost:8080/api/prescription/${this.appointment.id}`,
          {
            prescriptionMedicines: prescriptionsWithoutName,
          }
        );
        this.fetchDetails1();
        this.prescriptionEntry = [];
        this.selectedMedicine = null;
        this.selectedQuantity = null;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    addPrescriptionEntry() {
      if (this.selectedMedicine === null || this.selectedQuantity === null) {
        alert("Please fill all the fields");
        return;
      }
      this.prescriptionEntry.push({
        medicine:{
            id:this.selectedMedicine.id,
            name:this.selectedMedicine.name,
        },
        quantity: this.selectedQuantity,
      });
      this.selectedMedicine = null;
      this.selectedQuantity = null;
    },
    async fetchPreviousAppointments(){
      try {
        const patientID=this.appointment.patient.id;
        const response=await axios.get(`http://localhost:8080/api/appointment/get-all-appointments-of-patient/${patientID}`);
        let filteredData = response.data.filter(appointment => {
          return appointment.status.toLowerCase() === 'completed';
        });
        this.previous=filteredData;
        console.log(filteredData);
      } catch (error) {
        console.error(error);
      }
    },
},
};

</script>
<style scoped>

</style>
