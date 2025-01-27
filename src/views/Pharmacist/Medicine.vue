<template>
    <div>
        <navbar></navbar>
      <div class="container" style="margin-top: 5rem !important;">
        
        <h3 class="text-dark text large text-bold">All Medicines</h3>
        <div  class="d-flex align-items-center justify-content-end">
      <button type="button" class="btn btn-small  btn-primary mb-3" @click="openAddModal" data-toggle="modal" data-target="#exampleModal">
                Add New Medicine
            </button>
        </div>
        <div class="d-flex flex-column flex-sm-row text-dark align-items-center gap-3">
          <div class="mb-3 ">
            <label for="filterMedicineName" class="form-label">Filter by Medicine Name</label>
            <input v-model="filter.medicineName" type="text" class="form-control" id="filterMedicineName">
          </div>
          <div class="mb-3">
            <label for="filterQuantity" class="form-label">Filter by Quantity</label>
            <input v-model="filter.stock" type="number" class="form-control" id="filterQuantity">
          </div>
          <div class="align-self-bottom">
            <button @click="filterMedicines" class="btn btn-small btn-primary">Filter</button>
          </div>
        </div>
      <!-- Medicine Table -->
      <div class="table-responsive">
      <table class="table table-striped table-sm table-dark">
        <thead>
          <tr>
            <th>Medicine ID</th>
            <th>Name</th>
            <th>Power</th>
            <th>Quantity</th>
            <th>Price Per Unit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="medicine in medicines" :key="medicine.id">
            <td>{{ medicine.id }}</td>
            <td>{{ medicine.name }}</td>
            <td>{{ medicine.power }}</td>
            <td>{{ medicine.stock }}</td>
            <td>{{ medicine.pricePerUnit }}</td>
            <td>
              <!-- Button to update medicine -->
              <button type="button" class="btn btn-small btn-success" @click="openUpdateModal(medicine)" data-toggle="modal" data-target="#exampleModal">
                Update
            </button>
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
        <h5 class="modal-title" id="exampleModalLabel">{{ modalTitle }}</h5>
        <button type="button" class="close btn-close btn-danger btn-small" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div style="background-color:#c4c4c4;" class="modal-body">
        <form @submit.prevent="submitForm">
                <div class="form-group ">
                  <label for="name">Name</label>
                  <input type="text" class="form-control" id="name" v-model="formData.name" required>
                </div>
                <div class="form-group">
                  <label for="power">Power</label>
                  <input type="text" class="form-control" id="power" v-model="formData.power" required>
                </div>
                <div class="form-group">
                  <label for="quantity">Quantity</label>
                  <input type="number" class="form-control" id="quantity" v-model="formData.stock" required>
                </div>
                <div class="form-group mb-3">
                  <label for="pricePerUnit">Price Per Unit</label>
                  <input type="number" class="form-control" id="pricePerUnit" v-model="formData.pricePerUnit" required>
                </div>
                <div class="d-flex gap-2 justify-content-center align-items-center">
                  <button type="submit" class="btn btn-primary" >{{ modalAction }}</button>
                  <button type="submit" class="btn btn-danger" data-dismiss="modal" aria-label="Close" >Close</button>
                </div>
                </form>
      </div>
    </div>
  </div>
</div>
    </div>
</div>
  </template>
  
  <script>
    import navbar from "@/components/Pharmacist/Header.vue";
    import axios from "axios";
  export default {
    components: {
      navbar,
    },
    data() {
      return {
        medicines: [], // Array to store medicines
        formData: {
          name: '',
          power: '',
          stock: '',
          pricePerUnit: '',
        },
        id:'',
        data:[],
        modalTitle: '',
        modalAction: '',
        filter: {
          medicineName: '',
          stock: null,
        },
      };
    },
    mounted() {
      // Fetch all medicines when the component is mounted
      this.fetchMedicines();
    },
    methods: {
        filterMedicines() {
        let filteredResults = this.data;
        //add logic for filter
        if (this.filter.medicineName) {
          filteredResults = filteredResults.filter(medicine =>
            medicine.name.toLowerCase().includes(this.filter.medicineName.toLowerCase()),
          );
        }
        if (this.filter.stock) {
          filteredResults = filteredResults.filter(medicine =>
            medicine.stock <= this.filter.stock,
          );
        }
        this.medicines = filteredResults;
        },   
      async fetchMedicines() {
        try {
        const response = await axios.get(`http://localhost:8080/api/medicine`);
        this.medicines = response.data;
        this.data = response.data;
        } catch (error) {
        console.error('Error fetching data:', error);
      } 
      },
      openAddModal() {
        this.modalTitle = 'Add New Medicine';
        this.modalAction = 'Add';
        this.formData = {
          name: '',
          power: '',
          stock: '',
          pricePerUnit: '',
        };
      },
      openUpdateModal(medicine) {
        this.modalTitle = 'Update Medicine';
        this.modalAction = 'Update';
        this.id=medicine.id;
        this.formData = { ...medicine };
      },
      async submitForm() {
        if (this.modalAction === 'Add') {
          try {
        const response = await axios.post(`http://localhost:8080/api/medicine`,this.formData);
        this.fetchMedicines();
        this.formData = {
          name: '',
          power: '',
          stock: '',
          pricePerUnit: '',
        };
        } catch (error) {
          alert("An error occured while adding medicine");
        console.error('Error fetching data:', error);
      }         
        } else if (this.modalAction === 'Update') {
          try {
        const response = await axios.put(`http://localhost:8080/api/medicine/${this.id}`,this.formData);
        this.fetchMedicines();
        this.formData = {
          name: '',
          power: '',
          stock: '',
          pricePerUnit: '',
        };
        this.id='';
        } catch (error) {
          alert("An error occured while adding medicine");
        console.error('Error fetching data:', error);
      }   
        }
      },
        },
  };
  </script>
  