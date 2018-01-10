
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
    import ImageSlide from './ImageSlide'
    import TipSlide from './TipSlide'

    import {connect} from 'redux-vue'
    import axios from 'axios'
    // var json_data = require('../assets/photoStream.json');

    function imageSlideRenderList(h,slideImages) {
        return (
            slideImages.loadDom.map((image, index)=>            
                <ImageSlide 
                slide = {image}
                animate={slideImages.animates[Math.abs((index>2)?slideImages.currentNumber:index) % slideImages.animates.length]}
                zIndex ={(index>2)?slideImages.currentNumber:index}
                /> 
            ) 
        )   
    }

    function tipSlideRenderList(h, slideTips) {
        return (
            slideTips.items.map((item, index)=> 
            <div>
                          
                <TipSlide item = {item} /> 
                </div>
            ) 
        ) 
    }

    function addStoreJson() {

        //get new latest photojson and save preImageStore
        axios.get('http://107.170.197.24/app/ajax.php?method=photojson&crm=LL')
            .then(response => {
                console.log("imageslidlkdflidfasdf",response.data)
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
                console.log("tipdatasadfasdfasdf",response.data)
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
          innerWidth: 0,
          singleWidth: 0

        }
      }
    },

    props : {
        itemsPerSlide: {
            type:null,
            default:1
        }
    },
    attached() {
        alert()
       
        let singleWidth = this.$el.clientWidth/this.itemsPerSlide
        this.$set('singleWidth', singleWidth)
        this.$set('innerWidth', singleWidth * this.slideTips.items.length)
         console.log("singleWidth",singleWidth)
    },
  
    render (h) {
      return (
        <main class="main">
            <section class="section" style="padding:0;margin:0">
                <div class="container" style="padding:0;margin:0">
                    <div class="row">
                        <div class="col-xs-10">
                            <div class="slide"  >
                              <div>
                                {imageSlideRenderList(h,this.slideImages)}                                                                                     
                              </div>  
                            </div>                    
                        </div>
                        <div class="col-xs-2">
                       
                          <div style="background-color: #081025;
                              height: 100%;
                              margin-left: -30px;
                              font-color:white">
                                {tipSlideRenderList(h, this.slideTips)}
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
        console.log("mounted",store.getState())      
        let preReduxStore = store.getState()
        this.slideImages.preimages = preReduxStore.jsonStore.photoData
        this.slideTips.items = preReduxStore.jsonStore.tipData
        // console.log("tipdata", preReduxStore.jsonStore.tipData.items )
        if(!this.slideImages.start) {
          this.startAnimation();
        }        
      })
      
    },

    beforeDestroy (){
     
    },

    methods: {
        
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
           
        }
    }
   
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    @import '../scss/main.scss';

</style>
