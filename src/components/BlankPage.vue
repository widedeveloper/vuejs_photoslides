 
 <template>    
      <div id="wrap" v-bind:style="{'width':winsize.width+'px', 'height':winsize.height + 'px'}">
        <!-- PhotoButler Logo -->
        <img id="branding" src="/assets/photobutler-logo.png">
        <!-- /PhotoButler Logo -->
      </div>
 </template>
 <script>
export default {
  data() {
    return {};
  },
  props: ["sidebarStatus", "sidebarMode",'length'],

  computed: {
    winsize() {
      if(this.lenght == 0){
        var sidebarWidth = document.getElementById('tiparea').clientWidth;
      }else{
         var sidebarWidth = 300;
      }
     
      if (this.sidebarStatus == "on") {
        if (this.sidebarMode == "static") {

          var windowHeight = window.innerHeight;
          if(window.innerWidth>441){
            var windowWidth = window.innerWidth - sidebarWidth;
          }else{
            var windowWidth = window.innerWidth ;
          }
          
        } else {
          var windowHeight = window.innerHeight;
          var windowWidth = window.innerWidth;
        }
      } else {
        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;
      }
      return { width: windowWidth, height: windowHeight };
    }
  },
  updated() {}
};
</script>
 
  <style>
/*--- Main Styles ---*/

#wrap {
  background: #2babe2;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  margin: 0;
}

#branding {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
}
</style>


