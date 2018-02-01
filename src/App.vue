<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { connect } from "redux-vue";
import axios from "axios";
import { getPhotoJson as addPhotoJsonAction } from "./actions/todos";
import { getTipJson as addTipJsonAction } from "./actions/todos";
export default {
  name: "app",
  data() {
    return {
    };
  },
  created() {
    // routerObj = this; 
    // if(this.$route.params.id == "admin") {
    //    location.href = "http://"+window.location.hostname + "/manage/";returnk
    // }   
    this.addTipstorJson();
    this.addStoreJson();
  },
  methods: {
    addStoreJson() {
      var self = this;
      var param = this.$route.params.id;
      //get new latest photojson and save preImageStore
      axios
        // .get("http://159.89.180.81/app/ajax.php?method=getjson&param=" + param)
        .get("/app/ajax.php?method=getjson&param=" + param)
        .then(response => {
          if (response.data != "noStream") {
            this.$store.dispatch(addPhotoJsonAction(response.data));
          } else {
            // location.href = "http://"+window.location.hostname + "/error.html";
            setTimeout(this.addStoreJson, 10000);
          }
        })
        .catch(e => {
          console.log("PhotoStreamError", e);
        });
      setTimeout(this.addStoreJson, 100000);
    },

    addTipstorJson() {
      var param = this.$route.params.id;
      var self = this;
      axios
        // .get("http://159.89.180.81/app/ajax.php?method=tipjson&param=" + param)
        .get("/app/ajax.php?method=tipjson&param=" + param)
        .then(response => {
          if (response.data != "noConfig") {
            this.$store.dispatch(addTipJsonAction(response.data));
          } else {
            location.href = "http://"+window.location.hostname + "/error.html";
          }
        })
        .catch(e => {
          console.log("TipContenterror", e);
        });
    }
  },
  checkparam: function() {
    if (Object.keys(this.$route.params).length > 0) {
      var param = this.$route.params.id;
    } else {
      var param = "nokey";
    }
    return param;
  },
  redirectRouter: function(obj) {
    
  }
};
</script>

<style>
#app {
  width: 100%;
  margin: auto;
}
</style>
