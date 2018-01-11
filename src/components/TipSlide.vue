
    
<script>
    import { Swipe, SwipeItem} from 'vue-swipe'
    export default {
        components: {
            Swipe,
            SwipeItem
        },
        data() {
            return {
                swipeOption:{
                    startSlide: 0,
                    speed:1000,
                    auto:4000
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
        props: ['items'],

        mounted() {           
            this.getFullHeight()
            window.addEventListener('resize', this.getFullHeight)     
        },

        methods: {
            getFullHeight() {
               
                var windowHeight = window.innerHeight
                var TipObj = document.getElementsByClassName('mint-swipe')[0];
                var ImageContentObj = document.getElementsByClassName('image-container')[0];
                var TiptitleObj = document.getElementsByClassName('Tiptitle')[0]

                
                //document.getElementsByClassName('teaser').style.height = (windowHeight - ImageContentObj.clientHeight) + 'px'                
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
       
        color:#fff;
        background:#3a5375; 
       
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
        background-color:#ffffff;  
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

    .image-container .title{
        padding-top:20px;
        color : #c62033;
        font-size:25px;
       
        font-family: "SF-Pro-Text-bold"
    }
    .image-container .subtitle{
        padding-top:14px;
        color : #617185;
        
        font-size:25px;
        font-family: "SF-Pro-Text-regular"
    }



    .mint-swipe{overflow:hidden;position:relative;height:0px;margin-top: 30px; }
    .mint-swipe-items-wrap{-webkit-transform:translateZ(0);transform:translateZ(0)}
    .mint-swipe-items-wrap>div{position:absolute;-webkit-transform:translateX(-100%);
    transform:translateX(-100%);width:100%;height:100%;display:none}
    .mint-swipe-items-wrap>div.is-active{display:block;-webkit-transform:none;transform:none}
    .mint-swipe-indicators{position:absolute;bottom:10px;left:50%;-webkit-transform:translateX(-50%);
    transform:translateX(-50%)}.mint-swipe-indicator{width:8px;height:8px;display:inline-block;border-radius:100%;
    background:#000;opacity:.2;margin:0 3px}.mint-swipe-indicator.is-active{background:#fff}
</style>