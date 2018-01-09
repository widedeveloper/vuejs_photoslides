<template>
  <div id="app">
    <Slides />
  </div>
</template>

<script>
import Slides from './components/Slides'



export default {
  name: 'app', 
   components: {
    Slides
  }
}
</script>

<style>
  #app {
    max-width:900px;
    margin:auto;
  }

</style>
