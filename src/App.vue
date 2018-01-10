<template>
  <div id="app">
    <MainSlides />
  </div>
</template>

<script>
import MainSlides from './components/MainSlides'



export default {
  name: 'app', 
   components: {
    MainSlides
  }
}
</script>

<style>
  #app {
    width:100%;
    margin:auto;
  }

</style>
