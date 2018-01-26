<template>
    <swiper :options="swiperOption" style="height:100%">
        <swiper-slide  v-for = "(item,index) in tempDom" v-html = "item.outerHTML" :key="index">          
        </swiper-slide>
    </swiper>
</template>


<script>
import Vue from "vue";
import { connect } from "redux-vue";
import VueAwesomeswiper from "vue-awesome-swiper";
import { hasClass, addClass, removeClass } from "../libraries/lib";
import async from "async";
Vue.use(VueAwesomeswiper);
// import 'swiper/dist/css/swiper.css'
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 9,
        spaceBetween: 20,
        loop: true,
        slidePerGroup: 1
        // autoplay:{
        //     delay:3000
        // }
      },
      slidepreImgs: [],
      tempDom: []
    };
  },

  props: ["currentNumber"],
  watch: {
    currentNumber: function(newval, ovval) {
        // console.log("prpochange", newval, ovval);
        var loadDom = [];
        var imageUrl = [];
        if (this.slidepreImgs.length > 0) {
            var parentWidth =document.getElementsByClassName("prelist")[0].clientWidth / 9;
            var parentHeight = document.getElementsByClassName("prelist")[0].clientHeight;
            for (var i = this.currentNumber+1; i < this.currentNumber + 10; i++) {
                imageUrl[i] = this.slidepreImgs[ Math.abs(i) % this.slidepreImgs.length];
            }
            var self = this;           

            imageUrl.map((url, index)=> {
                var ImageObj = new Image();
                ImageObj.src = url;               
                ImageObj.style.position = "absolute";
                ImageObj.style.zIndex = "10000";

                ImageObj.onload = function() {
                    var imageWidth = ImageObj.naturalWidth;
                    var imageHeight = ImageObj.naturalHeight;
                    
                    var result = self.scaleImage(
                        imageWidth,
                        imageHeight,
                        parentWidth,
                        parentHeight
                    );
                    ImageObj.style.width = result.width + 'px'
                    ImageObj.style.height = result.height + 'px'
                    ImageObj.style.top = result.targettop + 'px'
                    ImageObj.style.left = result.targetleft + 'px'                  
                    
                    var newDiv = document.createElement("div");
                    newDiv.style.background = "#000000"
                    newDiv.style.position = "relative"
                    newDiv.style.width = parentWidth -5+ 'px'
                    newDiv.style.height = parentHeight + 'px'

                    newDiv.setAttribute("class", "animated slideInRight");
                    newDiv.appendChild(ImageObj);
                    loadDom.push(newDiv);
                }
            });
            this.tempDom = loadDom
        }
    }
  },

  methods: {
    scaleImage(srcwidth, srcheight, targetwidth, targetheight) {
      var result = {
        width: 0,
        height: 0,
        targetleft: 0,
        targettop: 0,
        portrait: false
      };
      if (srcwidth / srcheight > targetwidth / targetheight) {
        result.width = srcwidth * targetheight / srcheight;
        result.height = targetheight;
      } else {
        if (srcwidth > srcheight) {
          result.width = targetwidth;
          result.height = srcheight * targetwidth / srcwidth;
        } else {
          result.width = srcwidth * (targetheight ) / srcheight;
          result.height = targetheight;
          result.portrait = true;
        }
      }
      result.targetleft = (targetwidth - result.width) / 2;
      result.targettop = (targetheight - result.height) / 2;
      return result;
    }
  },
  beforeCreate() {
    this.$store.subscribe(() => {
      let photoData = this.$store.getState().jsonStore.photoData;
      if (Object.keys(photoData).length > 0) {
        this.slidepreImgs = photoData;
      }
    });
  },
  mounted() {
    // console.log(this.currentNumber);
  }
};
</script>
