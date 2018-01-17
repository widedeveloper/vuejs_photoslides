
    
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
               
                var windowHeight = window.innerHeight
                var windowWidth = window.innerWidth
                var TipObj = document.getElementsByClassName('mint-swipe')[0];
                var ImageContentObj = document.getElementsByClassName('image-container')[0];
                var TiptitleObj = document.getElementsByClassName('Tiptitle')[0]
                var bottomTitleObj = document.getElementsByClassName('bottomtitle')[0]
                var bottomImgObj = document.getElementsByClassName('bottomImageDiv')[0]
                bottomTitleObj.style.width = (windowWidth - bottomImgObj.clientWidth) + 'px'    
                document.getElementById('photoarea').style.height = (windowHeight) + 'px';
                document.getElementById('tiparea').style.height = (windowHeight) + 'px';

                TipObj.style.height = (windowHeight - ImageContentObj.clientHeight - TiptitleObj.clientHeight -70) + 'px'; 
            }
        }       
    }
    
</script>

<style>
    .tipItem {    
        
        display:block;
    }
    .teaser {
       
        /* color:#fff; */
        /* background:#3a5375;  */
       
    }
    .teaser .tipConarea {
         padding:35px;
    }
    .teaser .Tiptitle{
       /* margin-bottom: 30px;*/
        font-size:25px;
        font-family: "SF-Pro-Text-bold"
    }
    .teaser .tipcontent {
        font-family: "SF-Pro-Text-Regular";
        font-size:20px;
    }
    .image-container {       
         
        height:380px; 
    }
    .image-container .slideToparea {
        padding: 35px;
        /* background-color:#ffffff;   */
        height:100%;
    }
    .image-container img {        
        position:relative;
      
        width:100%;

        border-radius: 8px;
        -moz-box-shadow:     0px 0px 8px 0px #ccc;
        -webkit-box-shadow:  0px 0px 8px 0px #ccc;
        box-shadow: 0px 0px 8px 0px #ccc;
    }

    .image-container .sidetitle{
        padding-top:20px;
        /* color : #c62033; */
        font-size:25px;
       
        font-family: "SF-Pro-Text-bold"
    }
    .image-container .subtitle{
        padding-top:14px;
        color : #617185;
        
        font-size:25px;
        font-family: "SF-Pro-Text-regular"
    }
</style>