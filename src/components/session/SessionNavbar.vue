<script setup>
import NavbarContainer from '@/components/common/navbar/NavbarContainer.vue'
import CollapsableNavbar from '@/components/common/navbar/CollapsableNavbar.vue'
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
