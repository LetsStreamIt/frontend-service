<script setup>
import CollapsableNavbar from './CollapsableNavbar.vue'
import NavbarContainer from './NavbarContainer.vue'
</script>

<template>
  <div class="d-none d-lg-block row px-2">
    <NavbarContainer />
  </div>
  <div class="d-lg-none">
    <CollapsableNavbar />
  </div>
</template>
