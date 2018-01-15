
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
    import {hasClass, addClass, removeClass} from '../libraries/lib'
    // var json_data = require('../assets/photoStream.json');

    function imageSlideRenderList(h,slideImages) {
        return (
            slideImages.loadDom.map((image, index)=>{ 
             
                return (              
                <PhotoSlide 
                slide = {image}
                animate={slideImages.animates[Math.abs((index>=2)?slideImages.currentNumber:index) % slideImages.animates.length]}
                zIndex ={(index>=2)?slideImages.loadDom.length:index}
                />           
                ) 
            }) 
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
                            <TipSlide items = {slideTips.tipcontents} status={slideTips.slideStatus}/> 
                        </div>
                    </div>
                </div>
            </article>           
        ) 
    }

    function addStoreJson(obj) {
        if(Object.keys(obj.$route.params).length>0){            
            var param = obj.$route.params.id
        }else{
            var param = 'default'
        }        
        //get new latest photojson and save preImageStore
        axios.get('http://159.89.180.81/app/ajax.php?method=photojson&param='+param)
            .then(response => {
                if(response.data != "noStream"){
                    store.dispatch(addPhotoJsonAction(response.data))
                }else{
                    obj.redirectRouter();
                }               
            })
            .catch(e =>{
                console.log("PhotoStreamError",e)
            })
            setTimeout(addStoreJson, 10000)
    }

    function addTipstorJson(obj) {
        axios.get('http://159.89.180.81/app/ajax.php?method=tipjson')
            .then(response => { 
                if(response.data != "noConfig"){
                    store.dispatch(addTipJsonAction(response.data))
                }
            })
            .catch(e =>{
                console.log("TipContenterror",e)
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

                'animated zoomInUp',
                'animated jello',
                'animated bounceInRight',
                'animated rotateInUpLeft',
                'animated filp',
                'animated rubberBand',
                'animated tada',
                'animated rollIn ',
                'animated slideInLeft',
                'animated flipInY',
                'animated pulse',
                'animated jackInTheBox',
                'animated zoomInLeft',
                'animated flipInX',
                'animated slideInUp',
                'animated lightSpeedIn',
                'animated rotateInDownLeft',
                'animated zoomInDown',
                'animated pulse'
             
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
            stays:0,
            slideOutTimer:null,
            slideInTimer:null,
            slideStatus: 'in',
            flag:false,
            
        },
        logoInfo: {
            logoStatus : '',
            logoUrl : ''
        },
        bottomInfo: {
            bottombarStatus: '',
            bottomImageUrl: ''
        }
      }
    },
  
    render (h) {      
       
        return (
            <main class="main">
                <section class="section" >
                    <div class="container" >
                        <div class="row">
                            <div id="photoarea" >
                                <div class="slide"  >
                                    <div>
                                        {imageSlideRenderList(h,this.slideImages)}                                                                                     
                                    </div>  
                                </div>                    
                            </div>
                            <div id="tiparea" class="slideInit">                       
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

                            <div id= "bottomarea" class="initbottomOut">
                                <div class="bottomImageDiv">
                                    <img class="btmImage" src={this.bottomInfo.bottomImageUrl} />
                                </div>
                                <div class="bottomtitle">
                                    <div class="title">{this.slideTips.sidebarTitle}</div>
                                    <div class = "subtitle">{this.slideTips.sidebarSubTitle}</div>
                                </div>
                            </div>
                        </div>             
                    </div>

                    <div class="logo leftbottom logofadeIn" >
                        <img class="logoImage" src={this.logoInfo.logoUrl} />
                    </div>
                </section>
            </main>
        )
    },

    beforeCreate(){
        addStoreJson(this);
        addTipstorJson(this);          
    },

    created() {
         store.subscribe(()=>{
            let preReduxStore = store.getState()
            let photoData = preReduxStore.jsonStore.photoData
            let tipData = preReduxStore.jsonStore.tipData
            if(Object.keys(photoData).length>0 && Object.keys(tipData).length>0) {
                this.slideImages.preimages = photoData
           
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
                //bottombar Setting
                this.bottomInfo.bottombarStatus = tipData.bottombarSetting.bottombarStatus             
                this.bottomInfo.bottomImageUrl = tipData.bottombarSetting.bottomUrl             
            }                                     
        })        
    },

    updated () {
        
        if(!this.slideImages.start ) {           
            this.startAnimation();           
        } 
        if (this.slideTips.sidebarStatus=='on'){
             this.initSidebar()
        }
        if (this.slideTips.sidebarStatus=='on' && this.slideTips.sidebarMode=='dynamic' ){            
            if(this.slideTips.slideStatus == 'in' && !this.slideTips.flag) {
                this.slideTips.flag =true;
                
                this.slideTips.slideOutTimer = setTimeout(this.SlideOutAnimation, this.slideTips.slidesIn  * 1000)                
            }else if(this.slideTips.slideStatus == 'out' && this.slideTips.flag){
                 
                this.slideTips.flag =false;
                this.slideTips.slideInTimer = setTimeout(this. SlideInAnimation, this.slideTips.stays  * 1000)
            }  
        } else if (this.slideTips.sidebarStatus=='off') {
            this.hiddenSidebar()
        }  
        
    },
   
    beforeDestroy (){
     
    },

    methods: {     
        // redirect error page
        redirectRouter: function(obj) {
            location.href = '/nodata'            
        },

        //------------photo slide animation and transition----------------//
        startAnimation: function() {
            this.replacePhotos()
            this.slideImages.start = true;
            this.slideImages.timer = this.addTimer()            
        },

        addTimer: function() {
          this.nextAnimation()
          setTimeout(this.addTimer, 3000)
        },

        replacePhotos: function (){
            this.slideImages.images = this.slideImages.preimages
        },

        nextAnimation: function() {            
            //after finish current image loading, get new latest json photos
            if(this.slideImages.currentNumber % this.slideImages.images.length == 0){
                this.slideImages.currentNumber += 1                            
                this.replacePhotos();
            }else{
              this.slideImages.currentNumber += 1
            }
              
            this.slideImages.loadDom.push(this.slideImages.images[Math.abs(this.slideImages.currentNumber) % this.slideImages.images.length]);
            if(this.slideImages.currentNumber>3){
                this.slideImages.loadDom.splice(0,1)
            } 
        },
        //-------------------photo animation and transition--------------------//

        getImageSize: function () {
            //photo image width
            let containerWidth = document.getElementsByClassName('container')[0].clientWidth
            let photoWidth = document.getElementById('photoarea').clientWidth
            let tipWidth = document.getElementById('tiparea').clientWidth
            let SliderHeight = document.getElementById('slider').clientHeight
            let windowHeight = window.innerHeight  
        },

        //-------------------SlideIn and SlideOut of Sidebar--------------------//
        initSidebar : function() {
            var SidebarObj = document.getElementById('tiparea')
            removeClass(SidebarObj, 'slideInit')
        },
        hiddenSidebar:function()  {
            var SidebarObj = document.getElementById('tiparea')
            addClass(SidebarObj, 'slideInit')
        },
        SlideOutAnimation: function() {
    
            var SidebarObj = document.getElementById('tiparea')
            var BottombarObj = document.getElementById('bottomarea')
            var logoObj = document.getElementsByClassName('logo')[0]
            
            removeClass(SidebarObj, 'slideIn')
            addClass(SidebarObj, 'slideOut') 
            removeClass(logoObj,'logofadeIn')
            addClass(logoObj,'logofadeOut')           
            
            setTimeout(()=>{
                if(this.bottomInfo.bottombarStatus == 'on'){
                    removeClass(BottombarObj, 'bottomOut')            
                    addClass(BottombarObj, 'bottomIn')  
                }     
                              
                removeClass(logoObj,'leftbottom')                          
                addClass(logoObj,'topright')
                removeClass(logoObj,'logofadeOut')  
                addClass(logoObj,'logofadeIn')          
               
                removeClass(BottombarObj, 'initbottomOut')  
            },3000)     

            this.slideTips.slideStatus = "out";
        },

        SlideInAnimation: function() {
           
            var SidebarObj = document.getElementById('tiparea')
            var BottombarObj = document.getElementById('bottomarea')
            var logoObj = document.getElementsByClassName('logo')[0]
            removeClass(logoObj,'logofadeIn') 
            addClass(logoObj,'logofadeOut')       
            
            if(this.bottomInfo.bottombarStatus == 'on'){
                addClass(BottombarObj, 'bottomOut')
                removeClass(BottombarObj, 'bottomIn')
            }           
            setTimeout(()=>{
                removeClass(SidebarObj, 'slideOut')
                addClass(SidebarObj, 'slideIn')
                removeClass(logoObj,'topright')
                addClass(logoObj,'leftbottom')
                removeClass(logoObj,'logofadeOut')
                addClass(logoObj,'logofadeIn') 
             
            },3000)
            this.slideTips.slideStatus = "in";
        }

        //-------------------SlideIn and SlideOut of Sidebar--------------------//
    }   
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import '../scss/main.scss';
    .logo {
        position:fixed;        
        background: white;
        padding: 5px;
        // opacity:0.7;
        opacity:0;
        border-radius: 10px;
        box-shadow: 1px 1px 1px 1px #decbcb;
        z-index:100000;
        .logoImage {
            // width:80px;
            // height:80px;
        }
    }
    //logo position by SlideIn and SlideOut
    .logo.leftbottom {
        bottom : 50px;
        left: 50px;        
    }

    .logo.topright{
        top : 50px;
        right: 50px;        
    }

    .logofadeIn {
        opacity: 0.7;
        animation-name: logoshow;
        animation-duration: 1s;
        @keyframes logoshow{
            0% {opacity: 0}
            100% {opacity:0.7}
        }
    }
    .logofadeOut{
        opacity: 0;
        animation-name: logohide;
        animation-duration: 1s;
        @keyframes logohide{
            0% {opacity: 0.7}
            to {opacity:0}
        }
    }

    #tiparea {       
        width: 300px;
        position: absolute;
        right: 0;
        z-index: 10000;
    }
    //sidebar slideOut and slideIn
    #tiparea.slideInit{
        visibility:hidden
    }
    #tiparea.slideOut{
        margin-right:-300px;
        animation-name: tipout;
        animation-duration: 3s
    }
    @keyframes tipout{
        from {margin-right: 0px}
        to {margin-right:-300px}
    }
    #tiparea.slideIn{
         margin-right:0px;
        animation-name: tipIn;
        animation-duration: 3s
    }
    @keyframes tipIn{
        from {margin-right: -300px}
        to {margin-right:-0px}
    }



    #photoarea {
        width:100%;
    }

    #bottomarea {
        width:100%;
        position:absolute;
        bottom:-100px;
    }
    
    //bottom bar SlideOut and SlideIn
     
    #bottomarea.bottomIn {
        bottom:0px;
        animation-name: bottomslideIn;
        animation-duration: 2s
    }
    @keyframes bottomslideIn{
        from { bottom:-100px}
        to { bottom:0px}
    }
    #bottomarea.initbottomOut {
         bottom:-100px;
    }
    #bottomarea.bottomOut {
        bottom:-100px;
        animation-name: bottomslideOut;
        animation-duration: 2s
    }
    @keyframes bottomslideOut{
        from { bottom:0px}
        to { bottom:-100px}
    }

    #bottomarea .bottomImageDiv { 
        width:180px;  
        position:relative;     
        height: 100px;
        float:  left;
    }
    
    #bottomarea .bottomImageDiv img{
        width:100%;  
        height: 100%;
        z-index: 100000;
    }

    .bottomtitle{        
        
        float:  right;
        position:  relative;
        height: 100px;
        z-index: 100000;
        background: #3a5375;
        
    }
    .bottomtitle::after {
        top: 0px;
        -webkit-transform: skewY(1.5deg);
        transform: skewX(-25.5deg);
        -webkit-transform-origin: 100% 0;
        transform-origin: 0% 100%;
        background: inherit;
        content: '';
        display: block;
        height: 100%;
        /* background: red; */
        left: -47px;
        position: absolute;
        right: 100px;
        z-index: 100001;
        -webkit-backface-visibility: hidden;
    }
    .bottomtitle .title{
        float: left;
        height: 100%;
        color: white;
        line-height: 100px;
        font-size: 35px;
        font-family: "SF-Pro-Text-bold";
        margin-left: 25px;
        z-index: 1000003;
    }
    .bottomtitle .subtitle {
        float: right;
        height: 100%;
        color: #ccc;
        line-height: 100px;
        font-size: 35px;
        font-family: "SF-Pro-Text-regular";
        margin-right: 15px;
        z-index: 1000003;
    }
</style>
