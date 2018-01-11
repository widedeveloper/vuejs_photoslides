
<template>
    <div style="position:absolute" >                   
        <img :src="slide" :class="animate"  @load ="onload($event)"/>                    
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },       
        props: ['slide','animate','zIndex'],
        updated() {
            // this.onload()

        },
        methods:{
            onload(event) {
                console.log("event function")
                // console.log("miadaONloasding", document.getElementsByClassName('animated')[3].naturalWidth)
                // var DomImages =  document.getElementsByClassName('animated')
                // for(var i = DomImages.length-1; i >= 0  ; i--) {                   
                    var newImage = event.currentTarget
                    var windowHeight = window.innerHeight
                    var windowWidth = window.innerWidth

                    var imageWidth = newImage.naturalWidth
                    var imageHeight = newImage.naturalHeight

                    var result = this.scaleImage(imageWidth,imageHeight,windowWidth,windowHeight)
                    newImage.style.width = result.width + 'px'
                    newImage.style.height = result.height + 'px'
                    newImage.style.top = result.targettop + 'px'
                    newImage.style.left = result.targetleft + 'px'
                    console.log("portrait",result.portrait)
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

                
                result.targetleft = Math.floor((targetwidth - result.width) / 2);
                result.targettop = Math.floor((targetheight - result.height) / 2);    
                console.log('srcwidth, srcheight, targetwidth, targetheight',srcwidth, srcheight, targetwidth, targetheight);
                console.log('result',result);
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