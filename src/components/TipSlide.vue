<script>
    export default {
        data() {
            return {
                
            }
        },
        render () {
           
            return (
                <div class="tipItem">
                    <div class="image-container">
                        <img src={this.item.imageUrl} alt={this.item.title} />
                        <div class="title">{this.item.title}</div>
                    </div>
                    
                    <div class="teaser">{this.item.tipContents}</div>
                </div>
            )
        },       
        props: ['item'] 
    }
    
</script>

<style>
    .tipItem {
        height:100%;
        display:inline-block;
    }
    .teaser {
        padding:15px;
        color:#fff
    }
    .image-container {
        padding: 15px;
        background-color:#eaeaea;
      
    }
    .image-container img {        
        position:relative;
        width:100%;
        border-radius: 5px;
        -moz-box-shadow:     2px 2px 2px 2px #ccc;
        -webkit-box-shadow:  2px 2px 2px 2px #ccc;
        box-shadow:          2px 2px 2px 2px #ccc;
    }
</style>