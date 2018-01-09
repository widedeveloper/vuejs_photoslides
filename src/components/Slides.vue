
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
  import {getPhotoJson as addJsonAction } from '../actions/todos'
  import Slide from './Slide'
  import {connect} from 'redux-vue'
  import axios from 'axios'
  // var json_data = require('../assets/photoStream.json');

  function slideRenderList(h,slideImages) {
      return (
        slideImages.loadDom.map((image, index)=>
            
              <Slide 
                slide = {image}
                animate={slideImages.animates[Math.abs((index>2)?slideImages.currentNumber:index) % slideImages.animates.length]}
                zIndex ={(index>2)?slideImages.currentNumber:index}
              /> 
        ) 
      )   
  }

  function addStoreJson() {
    console.log("addstore")
      axios.get('http://localhost/app/ajax.php?method=photojson&crm=LL')
        .then(response => {
          console.log(response.data)
          store.dispatch(addJsonAction(response.data))
        })
        .catch(e =>{
          console.log("DFSFA",e)
        })
        setTimeout(addStoreJson, 10000)
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
             'animated rotateIn',
             'animated fadeIn',
             'animated slideInLeft',
             'animated pulse'
            ],
            loadDom: []
        }
      }
    },
  
    render (h) {
      return (
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
                              <div>
                                {slideRenderList(h,this.slideImages)}                                                                                     
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
        
        // store.dispatch(addJsonAction(json_data))
    },

    created() {
      store.subscribe(()=>{
        console.log("mounted",store.getState())      
        let preReduxStore = store.getState()
        this.slideImages.preimages = preReduxStore.jsonStore.photoData
        if(!this.slideImages.start) {
          this.startRotation();
        }        
      })
      
    },

    beforeDestroy (){
      console.log("asdasd")
    },

    methods: {
        
        startRotation: function() {
            this.replacePhotos()
            console.log("start",this.slideImages.images)
            this.slideImages.start = true;
            this.slideImages.timer = setInterval(this.next, 3000);
        },

        replacePhotos: function (){
            this.slideImages.images = this.slideImages.preimages
            console.log("newJson",this.slideImages.images)
        },

        next: function() {
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
            
            //check latest json
            console.log("next",this.slideImages.currentNumber)
        }
    }
   
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss"> 
   
</style>
