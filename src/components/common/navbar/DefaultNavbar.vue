<script setup>
import CollapsableNavbar from './CollapsableNavbar.vue'
import NavbarContainer from './NavbarContainer.vue'
</script>

<template>
  <div class="row px-2">
    <div class="d-none d-lg-block">
      <NavbarContainer />
    </div>
  </div>
  <div class="d-lg-none">
    <CollapsableNavbar />
  </div>
</template>
