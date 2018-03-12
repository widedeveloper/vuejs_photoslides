<template>
    <div id="bottomarea" class="initbottomOut">
        <div class="bottomImageDiv" :style="{'background-color':  bottomInfo.imgBackgroundColor }">
            <img class="btmImage" :src="bottomInfo.bottomImageUrl" />
        </div>
        <div
            class="bottomtitle"
            :style="{'background-color': bottomInfo.backgroundColor }"
        >
            <div
            class="bottitle"
            :style="{'color':  bottomInfo.titleColor }"
            >
                <div class="bottitle_text" >
                   EVENT SPONSORS:                    
                </div> 
                <img class="bottitle_img" src="/assets/png1.png" 
                    />
            </div>
            <div
            class="subtitle"
            :style="{'color':  bottomInfo.subColor }"
            >
                <div class="subtitle_text" >
                   EVENT PARTNER: 
                </div>
                 <img class="subtitle_img" src="/assets/png2.png" 
                   />
            </div>
        </div>
        </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["slideTips", "bottomInfo"],
  updated() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
$scaleW: 1636;
$scaleH: 845;

#bottomarea .bottomImageDiv {
  // background:white;
  width: calc(100vh/#{$scaleH} * 180);
  position: relative;
  height: calc(1*100vh/#{$scaleH} * 100);
  float: left;
}

#bottomarea .bottomImageDiv img {
  //width: 100%;
  height: calc(1*100vh/#{$scaleH} * 100);
  // margin-left:calc(1*100vw/#{$scaleW} * 20);
  z-index: 100000;
}

.bottomtitle {
  
  float: right;
  position: relative;
  width: calc(100vw - calc(100vh/#{$scaleH} * 180));
  height: calc(1*100vh/#{$scaleH} * 100);
  z-index: 100000; // background: #3a5375;
}

.bottomtitle .bottitle {
  display: table;
  float: left;
  height: 100% !important; // color: white;
  //   line-height: calc(1*100vh/#{$scaleH} * 100) !important;
  font-size: calc(1*100vw/#{$scaleW} * 35) !important;
  font-family: "SF-Pro-Text-bold";
  margin-left: calc(1*100vw/#{$scaleW} * 25);
  z-index: 1000003;
}
///////////
.bottomtitle .bottitle .bottitle_text {
  display: table-cell;
  vertical-align: middle;
  width: calc(1*100vw/#{$scaleW} * 160);
  font-size: calc(1*100vw/#{$scaleW} * 20) !important;
  font-family: arial;
}
.bottomtitle .bottitle .bottitle_img {
  height: calc(1*100vh/#{$scaleH} * 100);
}

.bottomtitle .subtitle {
  display: table;
  float: right;
  height: 100%; // color: #ccc;
  //   line-height: calc(1*100vh/#{$scaleH} * 100);
  font-size: calc(100vh/27);
  font-family: "SF-Pro-Text-regular";
  margin-right: calc(1*100vw/#{$scaleW} * 100);
  z-index: 1000003;
}
////////////
.bottomtitle .subtitle .subtitle_text {
  display: table-cell;
  vertical-align: middle;
  width: calc(1*100vw/#{$scaleW} * 160);
  font-size: calc(1*100vw/#{$scaleW} * 20) !important;
  font-family: arial;
}
.bottomtitle .subtitle .subtitle_img {
  height: calc(1*100vh/#{$scaleH} * 100);
}

@media (max-width: 441px) {
  .bottomtitle .bottitle {
    float: left;
    height: 100% !important; // color: white;
    // line-height: calc(100vh/#{$scaleH} * 100) !important;
    font-size: 13px !important;
    font-family: "SF-Pro-Text-bold";
    margin-left: calc(100vw/#{$scaleW} * 25);
    z-index: 1000003;
  }
  .bottomtitle .bottitle .bottitle_text {
    display: table-cell;
    vertical-align: middle;
    width: calc(1*100vw/#{$scaleW} * 160);
    font-size: 10px !important;
    font-family: arial;
  }
  .bottomtitle .bottitle .bottitle_img {
    height: 48px;
    line-height: 100px;
    margin: calc((100vh/#{$scaleH}*100 - 48px)/2) 5px;
  }

  .bottomtitle .bottitle {
    // animation-name: bottitleFade;
    // animation-duration: 1s;
    // animation-iteration-count: infinite;
    bottom: 0;
    animation:bottitleFade 20s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    // opacity: 0;
  }
  @keyframes bottitleFade {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    40% {
      opacity: 1;
    }
    50%{
         opacity: 0;
    }   
    100% {
       opacity: 0;
    }
  }

  .bottomtitle .subtitle {
    float: right;
    height: 100%; // color: #ccc;
    // line-height: calc(100vh/#{$scaleH} * 100);
    font-size: 13px;
    font-family: "SF-Pro-Text-regular";
    margin-right: calc(100vw/#{$scaleW} * 35);
  }
  
  .bottomtitle .subtitle .subtitle_text {
    display: table-cell;
    vertical-align: middle;
    width: calc(1*100vw/#{$scaleW} * 160);
    font-size: 13px !important;
    font-family: arial;
  }

  .bottomtitle .subtitle .subtitle_img {
    height: 70px;
    line-height: 100px;
    margin: calc((100vh/#{$scaleH}*100 - 70px)/2) 20px;
  
  }

//    .bottomtitle .subtitle {
//     animation-name: subtitleFade;
//     animation-duration: 1s;
//     animation-iteration-count: infinite;
//     bottom: calc(1*100vh/#{$scaleH} * 100);

  .bottomtitle .subtitle {
    bottom: calc(1*100vh/#{$scaleH} * 100);
    animation: subtitleFade 20s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
  }
  @keyframes subtitleFade {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 0;
    }
    60% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

}
</style>
