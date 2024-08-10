<script>
import NavbarComponent from '@/components/common/default/NavbarComponent.vue';
import AppFooter from '@/components/common/default/AppFooter.vue';

export default {
    components: {
        NavbarComponent,
        AppFooter
    }
};

</script>


<template>
    <header>
        <NavbarComponent />
    </header>

    <main role="main" class="container my-5">
        <RouterView />
    </main>

    <AppFooter />
</template>

<style>
/* Sticky footer styles
-------------------------------------------------- */
html {
    position: relative;
    min-height: 100%;
}

body {
    /* Margin bottom by footer height */
    margin-bottom: 60px;
}

.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    /* Set the fixed height of the footer here */
    height: 60px;
    line-height: 60px;
    /* Vertically center the text there */
    background-color: #f5f5f5;
}


/* Custom page CSS
-------------------------------------------------- */
/* Not required for template or sticky footer method. */

body>.container {
    padding: 60px 15px 0;
}

.footer>.container {
    padding-right: 15px;
    padding-left: 15px;
}

code {
    font-size: 80%;
}
</style>