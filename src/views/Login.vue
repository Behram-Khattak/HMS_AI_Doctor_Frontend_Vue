<template>
  <div class="login-container">
    <div class="login-banner d-none">
      <img :src="HMSImage" class="img-fluid" alt="HMSbanner" />
    </div>
    <div class="login-card">
      <h1 class="login-title">Neusoft Cloud HMS</h1>
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <input
            v-model="email"
            type="email"
            class="form-control"
            placeholder="Email"
            required
          />
        </div>
        <div class="form-group">
          <input
            v-model="password"
            type="password"
            class="form-control"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary btn-block">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HMSImage from "@/assets/images/hms.webp";
export default {
  data() {
    return {
      HMSImage,
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const emails = {
        doctor: "doctor@gmail.com",
        receptionist: "receptionist@gmail.com",
        pharmacist: "pharmacist@gmail.com",
        lab_technician: "lab_technician@gmail.com",
      };

      if (this.email === emails.doctor) {
        this.$router.push("/doctor");
      } else if (this.email === emails.receptionist) {
        this.$router.push("/reception");
      } else if (this.email === emails.pharmacist) {
        this.$router.push("/pharmacist");
      } else if (this.email === emails.lab_technician) {
        this.$router.push("/laboratory");
      }
      // try {
      //   const response = await axios.post(
      //     "http://localhost:8080/api/user/login",
      //     {
      //       email: this.email,
      //       password: this.password,
      //     }
      //   );
      //   console.log(response);
      //   if (!response) {
      //     alert("Wrong Email and password");
      //     return;
      //   }
      //   // Assuming the response contains user information
      //   const user = response.data;
      //   // Store relevant user information in local storage
      //   localStorage.setItem("userId", user.id);
      //   localStorage.setItem("userRole", user.role);
      //   localStorage.setItem("userDepartment", user.department);
      //   // Redirect to appropriate dashboard based on role
      //   this.redirectToDashboard(user.role);
      // } catch (error) {
      //   console.error("Login failed", error);
      //   // Handle login failure, show error message, etc.
      // }
    },
    redirectToDashboard(role) {
      // Redirect to appropriate dashboard based on user role
      // if (role === "doctor") {
      this.$router.push("/doctor");
      // } else if (role === "receptionist") {
      //   this.$router.push("/reception");
      // } else if (role === "pharmacist") {
      //   this.$router.push("/pharmacist");
      // } else if (role === "lab_technician") {
      //   this.$router.push("/laboratory");
      // }
    },
  },
};
</script>

<style scoped>
.login-container {
  padding: 1rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 10px;
  height: 100vh;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  /* background-image: url("../../neuu.webp"); */
  /* background-size: cover;
  background-position: center; */
  /* background-color: #fff; */
  background: linear-gradient(to bottom, #b0e0e6, #e6f0ff);
}

.login-banner > img {
  height: 100%;
  border-radius: 2rem;
}

.login-card {
  display: grid;
  place-self: center;
  width: 100%;
  /* width: 400px;
  background-color: rgba(
    255,
    255,
    255,
    0.8
  );
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 40px; */
}

.login-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: #0056b3;
}

.login-form .form-group {
  margin-bottom: 20px;
}

.login-form .btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.login-form .btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.login-form .btn-primary.btn-block {
  width: 100%;
}

/* Styles for screens larger than 600px (tablets and desktops) */
@media (max-width: 960px) {
  .login-container {
    display: grid;
    grid-template-columns: 1fr;
  }
}
@media (min-width: 960px) {
  .login-banner {
    display: block !important;
  }
}
</style>
