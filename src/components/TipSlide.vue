
    
<script>
    import { Swipe, SwipeItem} from './Swipe'
    export default {
       
        data() {
            return {
                swipeOption:{
                    startSlide: 0,
                    auto:6000,
                    speed:700
                }
            }
        },

        render () {
            return (
                <Swipe class="my-swipe" speed={this.swipeOption.speed} auto={this.swipeOption.auto}>
                {                    
                    this.items.map((item, index)=> 
                        <SwipeItem class="tipItem">
                            {item}
                        </SwipeItem>
                    )                
                }
                </Swipe>
            )       
        },       
        props: ['items','status'],

        mounted() {  
            
            this.getFullHeight()
            window.addEventListener('resize', this.getFullHeight)           
        },
      
        methods: {
            getFullHeight() {
                console.log("resizing")
               
                var windowHeight = window.innerHeight
                var windowWidth = window.innerWidth
                 var sidebarWidth = document.getElementById('tiparea').clientWidth;
                var TipObj = document.getElementsByClassName('mint-swipe')[0];
                var ImageContentObj = document.getElementsByClassName('image-container')[0];
                var TiptitleObj = document.getElementsByClassName('Tiptitle')[0]
                // var bottomTitleObj = document.getElementsByClassName('bottomtitle')[0]
                // var bottomImgObj = document.getElementsByClassName('bottomImageDiv')[0]
                // bottomTitleObj.style.width = (windowWidth - bottomImgObj.clientWidth) + 'px'    
                document.getElementById('photoarea').style.height = (windowHeight) + 'px';
                document.getElementById('tiparea').style.height = (windowHeight) + 'px';
                // document.getElementById('wrap').style.width = windowWidth - sidebarWidth +'px;'
                // document.getElementById('wrap').style.height = windowHeight +'px;'
                var logoImage = document.getElementsByClassName('logoImage')[0];
                if(windowWidth<441){
                    // logoImage.style.width = logoImage.naturalWidth/2 + 'px';
                     TipObj.style.height = (windowHeight - ImageContentObj.clientHeight - TiptitleObj.clientHeight-30) + 'px'; 
                }else if(windowWidth>=441 && windowWidth<768){
                    //  logoImage.style.width = logoImage.naturalWidth/2 + 'px';
                    TipObj.style.height = (windowHeight - ImageContentObj.clientHeight - TiptitleObj.clientHeight-20) + 'px'; 
                }else if(windowWidth>=768 && windowWidth<=1920){
                    TipObj.style.height = (windowHeight - ImageContentObj.clientHeight - TiptitleObj.clientHeight-70) + 'px'; 
                }else{
                    TipObj.style.height = (windowHeight - ImageContentObj.clientHeight - TiptitleObj.clientHeight-70) + 'px'; 
                }
               
            }
        }       
    }
    
</script>

<style>
   
</style>