<script setup>
import { RouterLink } from 'vue-router'
import NavbarContainer from '../common/navbar/NavbarContainer.vue'
import CollapsableNavbar from '../common/navbar/CollapsableNavbar.vue'
</script>

<template>
  <div class="container-fluid">
    <div clas="row">
      <nav class="navbar navbar-expand-md navbar-dark w-100 px-3">
        <NavbarContainer></NavbarContainer>
      </nav>
    </div>
    <div class="row">
      <CollapsableNavbar></CollapsableNavbar>
    </div>
  </div>
</template>

<style>
.nav-item-collapse:hover {
  border-radius: 8px;
  background-color: #23262d;
}
</style>
