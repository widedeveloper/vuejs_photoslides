<script>
    export default {
        data() {
            return {}
        },
        render () {
           
            return (
                <div>                   
                    <img src={this.slide} class={this.animate} style={{'z-index':this.zIndex}}/>                    
               </div>
            )
        },       
        props: ['slide','animate','zIndex']        
    }
    
</script>

<style>
    .slide {
        height: 500px;
        overflow: hidden;
        position: relative;
    } 
    img {        
        position:absolute;
        top:0; left:0;
        width:100%;

    }
</style>