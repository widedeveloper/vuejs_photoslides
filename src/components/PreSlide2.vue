<template>
    <div id="domlist" style="height:100%;
    float: left;
    width: 100%;
    display: inline-flex;
    overflow: hidden">
      
    </div>
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

  props: ["currentNumber","images"],
  watch: {
    currentNumber: function(newval, ovval) {
        console.log("prpochange", newval, ovval);
        var loadDom = [];
        var imageUrl = [];
       


        
            var parentWidth =document.getElementsByClassName("prelist")[0].clientWidth / 9;
            var parentHeight = document.getElementsByClassName("prelist")[0].clientHeight;
            if(this.currentNumber == 1){
                imageUrl = this.images.slice(0,9)
            }else{
                imageUrl[0] = this.images[ Math.abs(this.currentNumber+8) % this.images.length];               
            }
             console.log("SDFSADF",imageUrl,imageUrl.length)
            var self = this;           

            imageUrl.map((url, index)=> {
                var ImageObj = new Image();
                ImageObj.src = url;               
                ImageObj.style.position = "absolute";
                ImageObj.style.zIndex = "10000";            
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
                newDiv.setAttribute('class','animated slideInRight')
                newDiv.style.width = parentWidth -5+ 'px'
                newDiv.style.height = parentHeight + 'px'

                
                ImageObj.style.marginLeft = '5px'
                ImageObj.style.marginRight = '5px'                   
                newDiv.appendChild(ImageObj);

                document.getElementById('domlist').appendChild(newDiv)                  
               
                var Divs =  document.getElementById('domlist').childNodes
                if(Divs.length>9){
                    var loadImageDom = document.getElementById('domlist').childNodes
                    if(loadImageDom.length>0) {
                        for(var k = 0; k<loadImageDom.length;k++){
                            
                            removeClass(loadImageDom[k],'slideInRight')
                            addClass(loadImageDom[k],'slideInRight')
                        }
                    }
                    Divs[0].parentNode.removeChild(Divs[0])
                }

             

            });
            console.log("ffff",loadDom)
            this.tempDom = loadDom
            
            // return loadDom
            // document.getElementsByClassName('prelist')[0].style.width = preslide.clientWidth + (2 * preslide.clientWidth/6) + 'px';
            // document.getElementsByClassName('prelist')[0].style.left = -1 * preslide.clientWidth/6 + 'px';
            // document.getElementsByClassName('prelist')[0].style.left = -1 * parentWidth + 'px';

            // })
      
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

<style>
.swiper-slide{
    /* background: #000000;
    position: relative; */
}
</style>