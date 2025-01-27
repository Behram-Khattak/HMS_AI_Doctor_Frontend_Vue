<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <div class="container">
    <router-link to="/doctor" class="navbar-brand">Hospital Management System</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
           <router-link to="/doctor" class="nav-link">Home</router-link>
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