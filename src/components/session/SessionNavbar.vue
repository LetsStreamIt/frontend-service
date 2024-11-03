<script setup>
/**
 * @file SessionNavbar.vue
 * @module SessionNavbar
 * Session Navbar Component
 */
import NavbarContainer from '@/components/common/navbar/NavbarContainer.vue'
import CollapsableNavbar from '@/components/common/navbar/CollapsableNavbar.vue'
</script>

<template>
  <div class="container-fluid">
    <div clas="row">
      <div class="d-none d-lg-block">
        <NavbarContainer />
      </div>
    </div>
    <div class="row">
      <div class="d-lg-none">
        <CollapsableNavbar />
      </div>
    </div>
  </div>
</template>
