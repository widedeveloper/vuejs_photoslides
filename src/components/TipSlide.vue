
    
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
                        <div class="image-container">
                            <img src={item.imageUrl} alt={item.title} />
                            <div class="title">{item.title}</div>
                            <div class="subtitle">{item.subtitle}</div>
                        </div>
                        
                        <div class="teaser">
                            <div class="Tiptitle">Tips</div>
                            <div class="tipcontent">
                                {item.tipContents}
                            </div>
                        </div>
                    </SwipeItem>
                 )                
                }
                </Swipe>
            )


            // return (
            //     <div class="TipDiv">
            //             <div class="image-container">
            //                 <img src={this.items.imageUrl} alt={this.items.title} />
            //                 <div class="title">{this.items.title}</div>
            //                 <div class="subtitle">{this.items.subtitle}</div>
            //             </div>
                        
            //             <div class="teaser">
            //                 <div class="Tiptitle">Tips</div>
            //                 <Swipe class="my-swipe" speed={this.swipeOption.speed} auto={this.swipeOption.auto}>
            //                     {                                    
            //                         this.items.tipContents.forEach(item=> {
            //                             return (
            //                             <SwipeItem class="tipItem">                                    
            //                                 <div class="tipcontent">
            //                                     {item}
            //                                 </div>                                        
            //                             </SwipeItem>
            //                             )
            //                         })                
            //                     }
            //                 </Swipe>
            //             </div>

            //     </div>
            // )
        },       
        props: ['items'] ,

        mounted() {
            this.getFullHeight()
             window.addEventListener('resize', this.getFullHeight)     
        },

        methods: {
            getFullHeight() {
                // .mint-swipe
                var windowHeight = window.innerHeight
                var TipObj = document.getElementsByClassName('mint-swipe')[0];

                console.log(windowHeight)
                TipObj.style.height = (windowHeight) + 'px'; 
                document.getElementById('photoarea').style.height = (windowHeight) + 'px';

            }
        }
       
    }
    
</script>

<style>
    .tipItem {    
        
        display:block;
    }
    .teaser {
        padding:35px;
        color:#fff;
       
       
    }
    .teaser .Tiptitle{
        margin-bottom: 40px;
        font-size:25px;
        font-family: "SF-Pro-Text-bold"
    }
    .teaser .tipcontent {
        font-family: "SF-Pro-Text-Regular";
        font-size:20px;
    }
    .image-container {       
        padding: 35px;
        background-color:#ffffff;      
    }
    .image-container img {        
        position:relative;
      
        width:100%;

        border-radius: 8px;
        -moz-box-shadow:     2px 2px 2px 2px #ccc;
        -webkit-box-shadow:  2px 2px 2px 2px #ccc;
        box-shadow:          2px 2px 2px 2px #ccc;
    }

    .image-container .title{
        padding-top:35px;
        color : red;
        font-size:25px;
        font-family: "SF-Pro-Text-bold"
    }
    .image-container .subtitle{
        padding-top:35px;
        color : #ccc;
        font-size:25px;
        font-family: "SF-Pro-Text-bold"
    }



        .mint-swipe{overflow:hidden;position:relative;  background:#3A5375; height:600px;}
        .mint-swipe-items-wrap{-webkit-transform:translateZ(0);transform:translateZ(0)}
        .mint-swipe-items-wrap>div{position:absolute;-webkit-transform:translateX(-100%);
        transform:translateX(-100%);width:100%;height:100%;display:none}
        .mint-swipe-items-wrap>div.is-active{display:block;-webkit-transform:none;transform:none}
        .mint-swipe-indicators{position:absolute;bottom:10px;left:50%;-webkit-transform:translateX(-50%);
        transform:translateX(-50%)}.mint-swipe-indicator{width:8px;height:8px;display:inline-block;border-radius:100%;
        background:#000;opacity:.2;margin:0 3px}.mint-swipe-indicator.is-active{background:#fff}
</style>