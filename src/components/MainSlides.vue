
<!--template>
    <main class="main">
        <section class="section">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <h2 class="section__title"><strong>Photo Slide</strong> </h2>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12">
                        <div class="slide"  >
                          <div  v-for="number in [slideImages.currentNumber]" >
                            <Slide v-bind:slide = "slideImages.images[Math.abs(slideImages.currentNumber) % slideImages.images.length]" 
                              v-bind:animate="slideImages.amimates[Math.abs(slideImages.currentNumber) % slideImages.images.length]"
                               v-bind:zIndex = "slideImages.currentNumber"
                            />                                                       
                          </div>  
                        </div>                    
                    </div>
                </div>             
            </div>
        </section>
    </main>   
</template-->

    <script>
    import store from '../store'
    import {getPhotoJson as addPhotoJsonAction } from '../actions/todos'
    import {getTipJson as addTipJsonAction } from '../actions/todos'
    import PhotoSlide from './ImageSlide'
    import TipSlide from './TipSlide'

    import {connect} from 'redux-vue'
    import axios from 'axios'
    // var json_data = require('../assets/photoStream.json');

    function imageSlideRenderList(h,slideImages) {
        return (
            slideImages.loadDom.map((image, index)=> 
                    
                <PhotoSlide 
                slide = {image}
                animate={slideImages.animates[Math.abs((index>2)?slideImages.currentNumber:index) % slideImages.animates.length]}
                zIndex ={(index>2)?slideImages.currentNumber:index}
                /> 
           
            ) 
        )   
    }

    function tipSlideRenderList(h, slideTips) {
        
        return (           
            <article class="tipslide">                          
                <TipSlide items = {slideTips.items} /> 
            </article>           
        ) 
    }

    function addStoreJson() {

        //get new latest photojson and save preImageStore
        axios.get('http://107.170.197.24/app/ajax.php?method=photojson&crm=LL')
            .then(response => {
                store.dispatch(addPhotoJsonAction(response.data))
            })
            .catch(e =>{
                console.log("DFSFA",e)
            })
            setTimeout(addStoreJson, 10000)
    }

    function addTipstorJson() {
        axios.get('http://107.170.197.24/app/ajax.php?method=tipjson&crm=LL')
            .then(response => {               
                // var _response = JSON.parse(response)
                store.dispatch(addTipJsonAction(response.data))
            })
            .catch(e =>{
                console.log("DFSFA",e)
            })
    }
  
  export default {

    data () {
      return {
         slideImages: {
            images: [],
            preimages:[],
            loadingFlag: false,
            start:false,
            currentNumber: 0,
            timer: null,            
            animates: [             
             'animated tada',
             'animated rollIn ',
             'animated rotateInUpLeft',
             'animated slideInLeft',
             'animated pulse',
             'animated zoomInDown',
             'animated zoomInLeft',
             'animated zoomInUp',
             'animated slideInUp',
             'animated rotateInDownLeft',
             'animated pulse',
            ],
            loadDom: []
        },
        slideTips: {
            items: [],
            sidebarStatus: '',
            sidebarMode: '',
            slidesIn: 0,
            stays:0
        }
      }
    },
  
    render (h) {      
       
        return (
            <main class="main">
                <section class="section" >
                    <div class="container" >
                        <div class="row">
                            <div id="photoarea" style="width:100%;">
                                <div class="slide"  >
                                <div>
                                    {imageSlideRenderList(h,this.slideImages)}                                                                                     
                                </div>  
                                </div>                    
                            </div>
                            <div id="tiparea" style="    width: 300px;
                                position: absolute;
                                right: 0;
                                z-index: 10000;">                       
                                            <div id="slider">                                  
                                    <div id="slides">
                                        <div id="overflow">
                                            <div class="inner">           
                                                {tipSlideRenderList(h, this.slideTips)} 
                                            </div> 
                                        </div>                                    
                                    </div>
                                </div>      
                            </div>
                        </div>             
                    </div>
                </section>
            </main>
        )
    },

    beforeCreate(){
      // axios.post('./app/ajax.php?method=new_prospect&crm=LL', qs.stringify(send_data))
        addStoreJson();
        addTipstorJson();  
    },

    created() {
      store.subscribe(()=>{
        let preReduxStore = store.getState()
        let photoData = preReduxStore.jsonStore.photoData
        if(Object.keys(photoData).length>0) {
            this.slideImages.preimages = photoData
        }
        let tipData = preReduxStore.jsonStore.tipData

        //sidebar setting
        if(Object.keys(tipData).length>0) {
            this.slideTips.items = tipData.items
            this.slideTips.sidebarStatus= tipData.sidebarSetting.sideStatus
            this.slideTips.sidebarMode= tipData.sidebarSetting.mode
            this.slideTips.slidesIn= tipData.sidebarSetting.slideIn
            this.slideTips.stays= tipData.sidebarSetting.stays
        }
        
        //logo Setting

        if(!this.slideImages.start) {
          this.startAnimation();
        }        
      })

     
      
    },

    mounted () {
       
        // Windows resize listener
        // window.addEventListener('resize', this.getImageHeight)       
              
    },
    updated (){
        var self = this
        self.getWidth()  
        // this.getImageHeight()
    },

    beforeDestroy (){
     
    },

    methods: {
        //----------------initial get width-------------------//
        getWidth () {
            // if(this.slideTips.items.length!=0){
            //     var innerwidth = 100 * this.slideTips.items.length + '%' 
            //     document.getElementsByClassName('inner')[0].style.width = innerwidth;
            //     var articles =   document.getElementsByClassName('tipslide')
            //     for (var i = 0; i<articles.length; i++){
            //         articles[i].style.width = 100 / this.slideTips.items.length + '%'
            //     }
          
        },
        getImageHeight() {
                // .mint-swipe
                var windowHeight = window.innerHeight
                var windowWidth = window.innerWidth
                var ImageObj = document.getElementsByClassName('animated');
                
               for(var i =0; i<ImageObj.length; i++) {
                    //console.log("imageheight",ImageObj[i].clientHeight)
                    var ImageOrgHeight = ImageObj[i].naturalHeight
                    var ImageOrgWidth = ImageObj[i].naturalWidth
                    console.log(ImageOrgHeight,ImageOrgWidth)
                    console.log("----------")
                    
                    // if(ImageOrgWidth>ImageOrgHeight){ //landscape
                    //     // if((ImageOrgWidth/ImageOrgHeight) >( windowWidth/windowHeight)){
                    //     //     ImageObj[i].style.height = (windowHeight - 50) + 'px'; 
                    //     //     ImageObj[i].style.width = (ImageOrgWidth/ImageOrgHeight)*windowWidth + 'px'
                    //     // }else{
                    //     //     ImageObj[i].style.width = windowWidth + 'px'; 
                    //     //     ImageObj[i].style.height = (windowHeight - 50) + 'px';
                    //     // }
                    //     var newWidth = ImageObj[i].style.width = windowWidth + 'px'; 
                    //      var newHeight = ImageObj[i].style.height = (windowWidth/ImageOrgWidth)*ImageOrgHeight + 'px'
                         
                    // }else{ //portraite
                        var newHeight = ImageObj[i].style.height = (windowHeight) + 'px'; 
                        var newWidth = ImageObj[i].style.width = ((windowHeight)/ImageOrgHeight)*ImageOrgWidth + 'px'
                    // }
                    console.log(newHeight,newWidth)
                    
                }

               
                //ImageObj.style.height = (windowHeight - 50) + 'px'; 
                //document.getElementById('photoarea').style.height = (windowHeight - 50) + 'px';

            },
        //----------------initial get width-------------------//


        //------------photo slide animation and transition----------------//
        startAnimation: function() {
            this.replacePhotos()
            console.log("start",this.slideImages.images)
            this.slideImages.start = true;
            this.slideImages.timer = this.addTimer()
        },

        addTimer: function() {
          this.nextAnimation()
          setTimeout(this.addTimer, 3000)
        },

        replacePhotos: function (){
            this.slideImages.images = this.slideImages.preimages
            console.log("newJson",this.slideImages.images)
        },

        nextAnimation: function() {
            
            //if ImageDomCount > 3, remove before dom object
            if(this.slideImages.loadDom.length>3){
              this.slideImages.loadDom.splice(0,1)
            }            
            //after finish current image loading, get new latest json photos
            if(this.slideImages.currentNumber % this.slideImages.images.length == 0){
                this.slideImages.currentNumber += 1                            
                this.replacePhotos();
            }else{
              this.slideImages.currentNumber += 1
            }
            this.slideImages.loadDom.push(this.slideImages.images[Math.abs(this.slideImages.currentNumber) % this.slideImages.images.length]);
           
        },
        //-------------------photo animation and transition--------------------//


        getImageSize: function () {
            //photo image width
            let containerWidth = document.getElementsByClassName('container')[0].clientWidth
            let photoWidth = document.getElementById('photoarea').clientWidth
            let tipWidth = document.getElementById('tiparea').clientWidth

            let SliderHeight = document.getElementById('slider').clientHeight
            let windowHeight = window.innerHeight           

            console.log(SliderHeight,windowHeight)
        }
    }   
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    @import '../scss/main.scss';

</style>
