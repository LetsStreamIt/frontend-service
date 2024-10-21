<template>
  <div class="container text-center mt-5">
    <h1 class="display-1">404</h1>
    <p class="lead">Oops! The page you're looking for doesn't exist.</p>
    <router-link to="/" class="btn btn-primary">Go Back Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.display-1 {
  font-size: 8rem;
  color: #dc3545; /* Bootstrap danger color */
}
.lead {
  font-size: 1.5rem;
}
</style>
