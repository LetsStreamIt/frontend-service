<script setup>
import { RouterLink } from 'vue-router'
import NavbarContainer from './NavbarContainer.vue'
import CollapsableNavbar from './CollapsableNavbar.vue'
</script>

<template>
  <div class="row">
    <nav class="navbar navbar-expand-md navbar-dark">
      <NavbarContainer></NavbarContainer>
    </nav>
  </div>
  <CollapsableNavbar></CollapsableNavbar>
</template>

<style>
.nav-item-collapse:hover {
  border-radius: 8px;
  background-color: #23262d;
}
</style>
