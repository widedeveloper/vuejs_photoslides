
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
                <div class="image-container">
                    <div class="slideToparea">
                        <img src={slideTips.imgUrl} alt={slideTips.sidebarTitle} />
                        <div class="title">{slideTips.sidebarTitle}</div>
                        <div class="subtitle">{slideTips.sidebarSubTitle}</div>
                    </div>
                </div>
                           
                <div class="teaser">
                    <div class= "tipConarea">
                        <div class="Tiptitle">Tips</div>
                        <div class="tipcontent">                         
                            <TipSlide items = {slideTips.tipcontents} /> 
                        </div>
                    </div>
                </div>
            </article>           
        ) 
    }

    function addStoreJson() {

        //get new latest photojson and save preImageStore
        axios.get('http://159.89.180.81/app/ajax.php?method=photojson')
            .then(response => {
                store.dispatch(addPhotoJsonAction(response.data))
            })
            .catch(e =>{
                console.log("Error",e)
            })
            setTimeout(addStoreJson, 10000)
    }

    function addTipstorJson() {
        axios.get('http://159.89.180.81/app/ajax.php?method=tipjson')
            .then(response => { 
                store.dispatch(addTipJsonAction(response.data))
            })
            .catch(e =>{
                console.log("Error",e)
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
            tipcontents: [],
            sidebarTitle:'',
            sidebarSubTitle:'',
            imgUrl:'',            
            sidebarStatus: '',
            sidebarMode: '',
            slidesIn: 0,
            stays:0
        },
        logoInfo: {
            logoStatus : '',
            logoUrl : ''
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
                            <div id="tiparea" style="width: 300px;
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

                    <div class="logo" >
                        <img class="logoImage" src={this.logoInfo.logoUrl} />
                    </div>
                </section>
            </main>
        )
    },

    beforeCreate(){
        addStoreJson();
        addTipstorJson();  

        store.subscribe(()=>{
            let preReduxStore = store.getState()
            let photoData = preReduxStore.jsonStore.photoData
            if(Object.keys(photoData).length>0) {
                this.slideImages.preimages = photoData
            }
            let tipData = preReduxStore.jsonStore.tipData
            
            if(Object.keys(tipData).length>0) {
                //sidebar setting
                this.slideTips.tipcontents = tipData.tipcontents
                this.slideTips.sidebarTitle=tipData.sidebarTitle
                this.slideTips.sidebarSubTitle=tipData.sidebarSubTitle
                this.slideTips.imgUrl=tipData.imgUrl
                this.slideTips.sidebarStatus= tipData.sidebarSetting.sideStatus
                this.slideTips.sidebarMode= tipData.sidebarSetting.mode
                this.slideTips.slidesIn= tipData.sidebarSetting.slidesIn
                this.slideTips.stays= tipData.sidebarSetting.stays
                //logo Setting
                this.logoInfo.logoStatus= tipData.logoSetting.logoStatus
                this.logoInfo.logoUrl= tipData.logoSetting.logoUrl

            }          
            

            if(!this.slideImages.start) {
                this.startAnimation();
            }        
        })  
    },

    created() {
         
      
    },

    mounted () {
       
    },
    updated (){
       
    },

    beforeDestroy (){
     
    },

    methods: {     

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
        }
    }   
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import '../scss/main.scss';
    .logo {
        position:fixed;
        bottom : 50px;
        left: 50px;
        background: white;
        padding: 5px;
        opacity:0.7;
        border-radius: 10px;
        box-shadow: 1px 1px 1px 1px #decbcb;
        .logoImage {
            width:80px;
            height:80px;
        }
    }
</style>
