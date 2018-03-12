
    <script>
import PhotoSlide from "./ImageSlide";
import TipSlide from "./TipSlide";
import PreSlide from "./PreSlide";
import BlankPage from "./BlankPage";
import Bottom from "./BottomBar";

import { hasClass, addClass, removeClass } from "../libraries/lib";
var AnimateStart = null;

// function imageSlideRenderList(h,slideImages,slideTips) {
//      if(slideImages.images.length>0){
//          return (
//             <PhotoSlide
//                 slide = {slideImages.loadDom}
//                 animate={slideImages.animates[Math.abs(slideImages.currentNumber) % slideImages.animates.length]}
//                 zIndex ={slideImages.loadDom.length}
//                 sidebarMode = {slideTips.sidebarMode}
//             />
//         )
//      } else {
//          return (
//              <BlankPage />
//          )
//      }

// }

function tipSlideRenderList(h, slideTips) {
  return (
    <article class="tipslide">
      <div class="image-container">
        <div
          class="slideToparea"
          style={{ "background-color": slideTips.topBackColor }}
        >
          <div class="sidelogImage">
            <img
              src={slideTips.imgUrl}
              alt={slideTips.sidebarTitle}
              // style={{'width':slideTips.logoWidth +'%', 'margin':(100-slideTips.logoWidth)/2 + '%'}}/>
              style={{ width: slideTips.logoWidth + "%" }}
            />
          </div>
          <div class="sidetitle" style={{ color: slideTips.titleColor }}>
            {slideTips.sidebarTitle}
          </div>
          <div class="subtitle" style={{ color: slideTips.subColor }}>
            {slideTips.sidebarSubTitle}
          </div>
        </div>
      </div>

      <div
        class="teaser"
        style={{ "background-color": slideTips.bottomBackColor }}
      >
        <div class="tipConarea">
          <div class="Tiptitle" style={{ color: slideTips.tipColor }}>
            Tips
          </div>
          <div class="tipcontent" style={{ color: slideTips.tipColor }}>
            <TipSlide
              items={slideTips.tipcontents}
              status={slideTips.slideStatus}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function preBarRenderList(h, preImagebar, slideImages) {
  return (
    <div
      class="prelist"
      style={{ display: preImagebar.prebarStatus == "on" ? "block" : "none" }}
    >
      <PreSlide currentNumber={slideImages.currentNumber} />
    </div>
  );
}

export default {
  data() {
    return {
      slideImages: {
        images: [],
        preimages: [],
        loadingFlag: false,
        start: false,
        currentNumber: 0,
        timer: null,
        animates: [
          "animated lightSpeedIn",
          "animated fadeInLeft",
          "animated slideInDown",
          "animated zoomIn",
          "animated bounceInRight",
          "animated rotateInUpLeft",
          "animated rollIn ",
          "animated slideInLeft",
          "animated zoomInLeft",
          "animated flipInX",
          "animated slideInUp",
          "animated rotateInDownLeft",
          "animated fadeInRight",
          "animated zoomInDown"
        ],
        loadDom: "",
        preloadImages: []
      },
      slideTips: {
        tipcontents: [],
        sidebarTitle: "",
        sidebarSubTitle: "",
        imgUrl: "",
        sidebarStatus: "",
        sidebarMode: "",
        slidesIn: 0,
        stays: 0,
        slideOutTimer: null,
        slideInTimer: null,
        slideStatus: "in",
        flag: false,
        titleColor: "",
        subColor: "",
        tipColor: "",
        bottomBackColor: "",
        topBackColor: "",
        logoWidth: ""
      },
      logoInfo: {
        logoStatus: "",
        logoUrl: ""
      },
      bottomInfo: {
        bottombarStatus: "",
        bottomImageUrl: "",
        imgBackgroundColor: "",
        titleColor: "",
        subColor: "",
        backgroundColor: "",
        slideStatus: "in",
        flag: false
      },
      preImagebar: {
        prebarStatus: ""
      }
    };
  },

  render(h) {
    return (
      <main class="main">
        <section class="section">
          <div class="container">
            <div class="row">
              <div id="photoarea">
                <div class="photoslide">
                  {this.slideImages.preimages.length == 0 ? (
                    <BlankPage
                      sidebarStatus={this.slideTips.sidebarStatus}
                      sidebarMode={this.slideTips.sidebarMode}
                      lengh={this.slideImages.preimages.length}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div class="preslide">
                  {preBarRenderList(h, this.preImagebar, this.slideImages)}
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

              {this.$route.params.id == "8335" ? (
               
                <Bottom
                  slideTips={this.slideTips}
                  bottomInfo={this.bottomInfo}
                />
              ) : (
               
                <div id="bottomarea" class="initbottomOut">
                  <div
                    class="bottomImageDiv"
                    style={{
                      "background-color": this.bottomInfo.imgBackgroundColor
                    }}
                  >
                    <img
                      class="btmImage"
                      src={this.bottomInfo.bottomImageUrl}
                    />
                  </div>
                  <div
                    class="bottomtitle"
                    style={{
                      "background-color": this.bottomInfo.backgroundColor
                    }}
                  >
                    <div
                      class="bottitle"
                      style={{ color: this.bottomInfo.titleColor }}
                    >
                      <div style="display:table-cell;vertical-align:middle;">
                        {this.slideTips.sidebarTitle}
                      </div>
                    </div>
                    <div
                      class="subtitle"
                      style={{ color: this.bottomInfo.subColor }}
                    >
                      <div style="display:table-cell;vertical-align:middle;">
                        {this.slideTips.sidebarSubTitle}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            class="logo leftbottom logofadeIn"
            style={{
              width:
                window.innerWidth > 442
                  ? this.logoInfo.mainlogoImgWidth *
                      (window.innerWidth / 1636 * 160) /
                      100 +
                    "px"
                  : this.logoInfo.mainlogoImgWidth *
                      (window.innerWidth / 1636 * 350) /
                      100 +
                    "px"
            }}
          >
            <img class="logoImage" src={this.logoInfo.logoUrl} />
          </div>
        </section>
      </main>
    );
  },

  created() {
    this.$store.subscribe(() => {
      let preReduxStore = this.$store.getState();
      let photoData = preReduxStore.jsonStore.photoData;
      let tipData = preReduxStore.jsonStore.tipData;
      if (Object.keys(photoData).length > 0) {
        this.slideImages.preimages = photoData;
      }
      if (Object.keys(tipData).length > 0) {
        // this.slideImages.preimages = photoData
        //sidebar setting
        this.slideTips.tipcontents = tipData.tipcontents;

        this.slideTips.sidebarTitle = tipData.sidebarTitle;
        this.slideTips.sidebarSubTitle = tipData.sidebarSubTitle;
        this.slideTips.imgUrl = tipData.imgUrl;
        this.slideTips.sidebarStatus = tipData.sidebarSetting.sideStatus;
        this.slideTips.sidebarMode = tipData.sidebarSetting.mode;
        this.slideTips.slidesIn = tipData.sidebarSetting.slidesIn;
        this.slideTips.stays = tipData.sidebarSetting.stays;
        this.slideTips.titleColor = tipData.sidebarSetting.titleColor;
        this.slideTips.subColor = tipData.sidebarSetting.subColor;
        this.slideTips.tipColor = tipData.sidebarSetting.tipColor;
        this.slideTips.topBackColor = tipData.sidebarSetting.topBackColor;
        this.slideTips.logoWidth = tipData.sidebarSetting.logoWidth;
        this.slideTips.bottomBackColor = tipData.sidebarSetting.bottomBackColor;
        //logo Setting
        this.logoInfo.logoStatus = tipData.logoSetting.logoStatus;
        this.logoInfo.logoUrl = tipData.logoSetting.logoUrl;
        this.logoInfo.mainlogoImgWidth = tipData.logoSetting.mainlogoImgWidth;
        //bottombar Setting

        this.bottomInfo.bottombarStatus =
          tipData.bottombarSetting.bottombarStatus;
        this.bottomInfo.bottombarMode = tipData.bottombarSetting.bottombarMode;
        this.bottomInfo.bottomImageUrl = tipData.bottombarSetting.bottomUrl;
        this.bottomInfo.titleColor = tipData.bottombarSetting.titleColor;
        this.bottomInfo.subColor = tipData.bottombarSetting.subColor;
        this.bottomInfo.imgBackgroundColor =
          tipData.bottombarSetting.bottomlogoBackColor;
        this.bottomInfo.backgroundColor =
          tipData.bottombarSetting.backgroundColor;
        //prebar setting
        this.preImagebar.prebarStatus = tipData.prebarSetting.prebarStatus;
      }
    });
  },

  updated() {
    if (this.slideImages.preimages.length == 0) {
      this.$store.subscribe(() => {
        let preReduxStore = this.$store.getState();
        let photoData = preReduxStore.jsonStore.photoData;
        if (Object.keys(photoData).length > 0 && !this.slideImages.start) {
          this.slideImages.preimages = photoData;
          this.startAnimation();
        }
      });
    } else {
      if (!this.slideImages.start) {
        this.startAnimation();
      }
    }

    if (
      this.slideTips.sidebarStatus == "on" &&
      this.slideTips.sidebarMode == "static"
    ) {
      this.initSidebar();
    } else if (
      this.slideTips.sidebarStatus == "on" &&
      this.slideTips.sidebarMode == "dynamic"
    ) {
      this.initSidebar();
      if (this.slideTips.slideStatus == "in" && !this.slideTips.flag) {
        this.slideTips.flag = true;
        this.slideTips.slideOutTimer = setTimeout(
          this.SlideOutAnimation,
          this.slideTips.slidesIn * 1000
        );
      } else if (this.slideTips.slideStatus == "out" && this.slideTips.flag) {
        this.slideTips.flag = false;
        this.slideTips.slideInTimer = setTimeout(
          this.SlideInAnimation,
          this.slideTips.stays * 1000
        );
      }
    } else if (this.slideTips.sidebarStatus == "off") {
      if (this.bottomInfo.bottombarStatus == "off") {
        this.hiddenSidebar();
      } else if (
        this.bottomInfo.bottombarStatus == "on" &&
        this.bottomInfo.bottombarMode == "static"
      ) {
        this.initBottombar();
      } else if (
        this.bottomInfo.bottombarStatus == "on" &&
        this.bottomInfo.bottombarMode == "dynamic"
      ) {
        //console.log(this.bottomInfo.slideStatus,this.bottomInfo.flag,Date())
        this.dynmicOnlyBottom();
      }
    }
  },

  beforeDestroy() {},

  methods: {
    //------------photo slide animation and transition----------------//
    startAnimation: function() {
      this.replacePhotos();
      this.slideImages.start = true;
      this.slideImages.timer = this.addTimer();
    },

    addTimer: function() {
      this.nextAnimation();
      clearTimeout(AnimateStart);
      AnimateStart = setTimeout(this.addTimer, 3000);
    },

    replacePhotos: function() {
      console.log("newstart");
      this.slideImages.images = this.slideImages.preimages;
    },
    scaleImage(srcwidth, srcheight, targetwidth, targetheight) {
      var result = {
        width: 0,
        height: 0,
        targetleft: 0,
        targettop: 0,
        portrait: false
      };
      if (srcwidth / srcheight > targetwidth / targetheight) {
        result.width = srcwidth * targetheight / srcheight;
        result.height = targetheight;
      } else {
        if (srcwidth > srcheight) {
          result.width = targetwidth;
          result.height = srcheight * targetwidth / srcwidth;
        } else {
          result.width = srcwidth * (targetheight - 100) / srcheight;
          result.height = targetheight - 100;
          result.portrait = true;
        }
      }

      result.targetleft = (targetwidth - result.width) / 2;
      result.targettop = (targetheight - result.height) / 2;
      return result;
    },
    nextAnimation: function() {
      // console.log('nextanimati')
      //after finish current image loading, get new latest json photos
      if (
        this.slideImages.currentNumber % this.slideImages.images.length ==
        0
      ) {
        this.slideImages.currentNumber += 1;
        this.replacePhotos();
      } else {
        this.slideImages.currentNumber += 1;
      }

      var NImage = new Image();
      var image_source = this.slideImages.images[
        Math.abs(this.slideImages.currentNumber) %
          this.slideImages.images.length
      ];
      ///////////////
      console.log(this.imageExists(image_source), image_source);
      //////////////
      NImage.src = image_source;
      NImage.setAttribute(
        "class",
        this.slideImages.animates[
          Math.abs(this.slideImages.currentNumber) %
            this.slideImages.animates.length
        ]
      );
      NImage.style.position = "absolute";
      //this.slideImages.loadDom = NImage

      var content = document.getElementsByClassName("photoslide")[0];
      var sidebarWidth = document.getElementById("tiparea").clientWidth;
      var parentDiv = document.createElement("div");
      parentDiv.setAttribute("class", "parentdiv");
      parentDiv.appendChild(NImage);
      var self = this;

      NImage.onload = function() {
        var newImage = NImage;
        if (self.slideTips.sidebarStatus == "on") {
          if (self.slideTips.sidebarMode == "static") {
            var windowHeight = window.innerHeight;
            var windowWidth = window.innerWidth - sidebarWidth;
          } else {
            var windowHeight = window.innerHeight;
            var windowWidth = window.innerWidth;
          }
        } else {
          var windowHeight = window.innerHeight;
          var windowWidth = window.innerWidth;
        }

        var imageWidth = newImage.naturalWidth;
        var imageHeight = newImage.naturalHeight;

        var result = self.scaleImage(
          imageWidth,
          imageHeight,
          windowWidth,
          windowHeight
        );
        newImage.style.width = result.width + "px";
        newImage.style.height = result.height + "px";

        // var parentDiv = newImage.parentNode;
        parentDiv.style.position = "absolute";
        if (result.portrait) {
          parentDiv.style.width = windowWidth + "px";
          parentDiv.style.height = windowHeight + "px";
          parentDiv.style.background = "black";
        } else {
          parentDiv.style.width = "0px";
          parentDiv.style.height = "0px";
          parentDiv.style.background = "none";
        }
        newImage.style.top = result.targettop + "px";
        newImage.style.left = result.targetleft + "px";
        content.appendChild(parentDiv);
      };

      var parentDivs = document.getElementsByClassName("parentdiv");
      if (parentDivs.length > 5) {
        parentDivs[0].parentNode.removeChild(parentDivs[0]);
      }
    },
    //-------------------photo animation and transition--------------------//

    /////////////
    imageExists: function(url) {
      var http = new XMLHttpRequest();
      http.open("HEAD", url, false);
      http.send();

      return http.status;
    },
    /////////////////

    getImageSize: function() {
      //photo image width
      let containerWidth = document.getElementsByClassName("container")[0]
        .clientWidth;
      let photoWidth = document.getElementById("photoarea").clientWidth;
      let tipWidth = document.getElementById("tiparea").clientWidth;
      let SliderHeight = document.getElementById("slider").clientHeight;
      let windowHeight = window.innerHeight;
    },

    //-------------------SlideIn and SlideOut of Sidebar--------------------//
    initSidebar: function() {
      var SidebarObj = document.getElementById("tiparea");
      removeClass(SidebarObj, "slideInit");
    },
    hiddenSidebar: function() {
      var SidebarObj = document.getElementById("tiparea");
      addClass(SidebarObj, "slideInit");
    },
    initBottombar: function() {
      var BottombarObj = document.getElementById("bottomarea");
      var logoObj = document.getElementsByClassName("logo")[0];
      removeClass(BottombarObj, "bottomOut");
      removeClass(BottombarObj, "initbottomOut");
      addClass(BottombarObj, "bottomIn");
      removeClass(logoObj, "logofadeIn");
      // removeClass(logoObj, "leftbottom");
      // addClass(logoObj, "topright");
    },

    SlideOutAnimation: function() {
      var SidebarObj = document.getElementById("tiparea");
      removeClass(SidebarObj, "slideIn");
      addClass(SidebarObj, "slideOut");
      if (this.bottomInfo.bottombarStatus == "on") {
        setTimeout(this.BottomInAnimation, this.slideTips.stays * 1000);
      } else {
        this.slideTips.slideStatus = "out";
      }
    },

    SlideInAnimation: function() {
      var SidebarObj = document.getElementById("tiparea");
      setTimeout(() => {
        removeClass(SidebarObj, "slideOut");
        addClass(SidebarObj, "slideIn");
      }, 3000);
      this.slideTips.slideStatus = "in";
    },

    BottomInAnimation: function() {
      var BottombarObj = document.getElementById("bottomarea");
      var logoObj = document.getElementsByClassName("logo")[0];
      if (this.bottomInfo.bottombarStatus == "on") {
        removeClass(logoObj, "logofadeIn");
        addClass(logoObj, "logofadeOut");
      }

      setTimeout(() => {
        if (this.bottomInfo.bottombarStatus == "on") {
          removeClass(BottombarObj, "bottomOut");
          addClass(BottombarObj, "bottomIn");
          // removeClass(logoObj, "leftbottom");
          // addClass(logoObj, "topright");
          // removeClass(logoObj, "logofadeOut");
          // addClass(logoObj, "logofadeIn");
          setTimeout(this.BottomOutAnimation, this.slideTips.slidesIn * 1000);
        }
        removeClass(BottombarObj, "initbottomOut");
      }, 3000);
    },

    BottomOutAnimation: function() {
      var BottombarObj = document.getElementById("bottomarea");
      var logoObj = document.getElementsByClassName("logo")[0];
      if (this.bottomInfo.bottombarStatus == "on") {
        removeClass(logoObj, "logofadeIn");
        addClass(logoObj, "logofadeOut");
        addClass(BottombarObj, "bottomOut");
        removeClass(BottombarObj, "bottomIn");
      }
      setTimeout(() => {
        if (this.bottomInfo.bottombarStatus == "on") {
          removeClass(logoObj, "topright");
          addClass(logoObj, "leftbottom");
          removeClass(logoObj, "logofadeOut");
          addClass(logoObj, "logofadeIn");
        }
      }, 3000);
      // this.slideTips.slideStatus = "in";
      this.slideTips.slideStatus = "out";
    },

    dynmicOnlyBottom: function() {
      if (this.bottomInfo.slideStatus == "in" && !this.bottomInfo.flag) {
        this.initBottombar();
        this.bottomInfo.flag = true;
        setTimeout(() => {
          var BottombarObj = document.getElementById("bottomarea");
          var logoObj = document.getElementsByClassName("logo")[0];
          removeClass(logoObj, "logofadeOut");
          addClass(logoObj, "logofadeIn");
          removeClass(BottombarObj, "bottomIn");
          addClass(BottombarObj, "bottomOut");
          this.bottomInfo.slideStatus = "out";
        }, this.slideTips.slidesIn * 1000);
      } else if (this.bottomInfo.slideStatus == "out" && this.bottomInfo.flag) {
        this.bottomInfo.flag = false;
        setTimeout(() => {
          var BottombarObj = document.getElementById("bottomarea");
          var logoObj = document.getElementsByClassName("logo")[0];
          removeClass(logoObj, "logofadeIn");
          addClass(logoObj, "logofadeOut");
          removeClass(BottombarObj, "bottomOut");
          addClass(BottombarObj, "bottomIn");
          this.bottomInfo.slideStatus = "in";
        }, this.slideTips.stays * 1000);
      }
    }
    //-------------------SlideIn and SlideOut of Sidebar--------------------//
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

