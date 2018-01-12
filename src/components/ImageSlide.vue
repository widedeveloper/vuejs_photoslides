
<template>
    <div style="position:absolute" >                   
        <img :src="slide" :class="animate"  @load ="onload($event,zIndex)" />                    
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },       
        props: ['slide','animate','zIndex'],
        updated() {

        },
        methods:{
            onload(event, zIndex) {  
                // if(zIndex!=1)   {                      
                    var newImage = event.currentTarget
                    var windowHeight = window.innerHeight
                    var windowWidth = window.innerWidth
                    var imageWidth = newImage.naturalWidth
                    var imageHeight = newImage.naturalHeight
                    // console.log("OrignWID============",newImage.src ,imageWidth, imageHeight)

                    var result = this.scaleImage(imageWidth,imageHeight,windowWidth,windowHeight)
                    newImage.style.width = result.width + 'px'
                    newImage.style.height = result.height + 'px'
                    newImage.style.top = result.targettop + 'px'
                    newImage.style.left = result.targetleft + 'px'

                    var parentDiv = newImage.parentNode;
                    if(result.portrait){                        
                        parentDiv.style.width = windowWidth + 'px'
                        parentDiv.style.height = windowHeight + 'px'
                        parentDiv.style.background = 'black'
                    }else{                   
                        parentDiv.style.width = '0px'
                        parentDiv.style.height =  '0px'
                        parentDiv.style.background = 'none'
                    }
                // }
            },

            scaleImage (srcwidth, srcheight, targetwidth, targetheight ) {
                var result = { width: 0, height: 0,targetleft:0,targettop:0, portrait: false };
                if(srcwidth / srcheight > targetwidth/targetheight){                    
                        result.width = srcwidth * targetheight / srcheight;
                        result.height = targetheight;                                    
                }else{
                    if(srcwidth>srcheight){
                        result.width = targetwidth;
                        result.height = srcheight * targetwidth / srcwidth;                       
                     }else{
                        result.width = srcwidth * (targetheight - 100) / srcheight;
                        result.height = targetheight - 100;
                        result.portrait = true;
                    }    
                }
                
                result.targetleft = ((targetwidth - result.width) / 2);
                result.targettop = ((targetheight - result.height) / 2);                
                return result;
            }
        }       
    }    
</script>

<style>
    #photoarea .slide {       
        overflow: hidden;
        position: relative;
    } 
    #photoarea .slide img {        
        position:absolute;        
    }
</style>