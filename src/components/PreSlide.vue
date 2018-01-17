<template>
    <swiper :options="swiperOption" style="height:100%">
        <swiper-slide  v-for = "(item,index) in tempDom" v-html = "item.innerHTML" :key="index">          
        </swiper-slide>
    </swiper>
</template>


<script>
import Vue from "vue";
import store from "../store";
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
        slidesPerView: 5,
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
        console.log("prpochange", newval, ovval);
        var loadDom = [];
        var imageUrl = [];
        if (this.slidepreImgs.length > 0) {
            var parentWidth =document.getElementsByClassName("prelist")[0].clientWidth / 5;
            var parentHeight = document.getElementsByClassName("prelist")[0].clientHeight;
            for (var i = this.currentNumber; i < this.currentNumber + 5; i++) {
                imageUrl[i] = this.slidepreImgs[ Math.abs(i) % this.slidepreImgs.length];
            }
            var self = this;           
            imageUrl.map((url, index)=> {
                var ImageObj = new Image();
                ImageObj.src = url;
                ImageObj.setAttribute("class", "animated slideInRight");
                ImageObj.style.position = "absolute";
                ImageObj.style.zIndex = "1000000000";

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
                    newDiv.appendChild(ImageObj);
                    loadDom.push(newDiv);
                }
            });
            this.tempDom = loadDom
            
            // return loadDom
            // document.getElementsByClassName('prelist')[0].style.width = preslide.clientWidth + (2 * preslide.clientWidth/6) + 'px';
            // document.getElementsByClassName('prelist')[0].style.left = -1 * preslide.clientWidth/6 + 'px';
            // document.getElementsByClassName('prelist')[0].style.left = -1 * parentWidth + 'px';

            // })
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
          result.width = targetwidth;
          result.height = srcheight * targetwidth / srcwidth;
        }
      }
      result.targetleft = (targetwidth - result.width) / 2;
      result.targettop = (targetheight - result.height) / 2;
      return result;
    }
  },
  beforeCreate() {
    store.subscribe(() => {
      let photoData = store.getState().jsonStore.photoData;
      if (Object.keys(photoData).length > 0) {
        this.slidepreImgs = photoData;
        console.log("imageslidesFrom stor", this.slidepreImgs);
      }
    });
  },
  mounted() {
    console.log(this.currentNumber);
  }
};
</script>