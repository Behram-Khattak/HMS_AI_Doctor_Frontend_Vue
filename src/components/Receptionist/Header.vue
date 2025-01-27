<template>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <router-link to="/reception" class="navbar-brand">Hospital Management System</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/reception" class="nav-link">Register a Patient</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/registeredPatients" class="nav-link">View Patients</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/BookAppointment" class="nav-link">Book Appointment</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/ViewAppointments" class="nav-link">View Appointments</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/transactions" class="nav-link">Transactions</router-link>
            </li>
            <li class="nav-item">
          <button class="btn btn-small btn-outline-light" @click="logout">Logout</button>
          </li>
          </ul>
        </div>
      </div>
    </nav>
</template>


<script>
export default {
  methods: {
    logout() {
      // Clear user information from local storage
      console.log("Logout");
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userDepartment');
      this.$router.push('/');
    }
  }
};
</script>