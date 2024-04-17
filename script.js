let MEscorescript = document.currentScript;
(function () {
    window.cricapi = window.cricapi || {};
    let c = document.createElement("div");
    window.cricapi_widget_paused = false;
    c.innerHTML = `<style>
#cricapi_widget_score * {box-sizing: content-box; font-family: Arial, sans-serif;line-height:1.2;user-select:none;}
#cricapi_widget_score h6 {font-size: 1.2em;margin:0px;}
#cricapi_widget_score TABLE { margin:0px; }
#cricapi_widget_score TH,#cricapi_widget_score TD { padding:1px; border-bottom:1px solid #e5e5e5; border-top: 0;border-left: 0;text-align:left;border-right: 0; }
#cricapi_widget_score HR { clear: both;height: 1px;min-height: 0;border-top: 1px solid #e5e5e5; border-right: 0;border-bottom: 0;border-left: 0;padding:0px;margin:0px;  background: transparent;}

#cricapi_widget_score.slideholder {
margin:auto;
box-sizing: content-box;
background: #fff;
outline: 1px #777 solid;
max-width: 300px;
min-height: 300px;
max-height: 300px;
font-size: 10pt;
width: 100%;
overflow: hidden;
scroll-behavior: smooth;
line-height:1.2;
}

#cricapi_widget_score .slide { display: flex;flex-wrap: nowrap; width: 100%;height: 100%; }

#cricapi_widget_score .slab {position: relative;vertical-align: top;height: 100%;border: 2px #070 solid;padding:8px;}

#cricapi_widget_score .slab > * {
width: inherit;height: inherit;
background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.7)),
url('https://cdorg.b-cdn.net/img/doodul.png');
}

#cricapi_widget_score .slab DIV {display: block;position: relative;vertical-align: top;}

#cricapi_widget_score .criclogo {
    display:block !important;
    max-width:100%; width:48px !important;
    height:auto; margin:auto auto 5px auto !important; border-radius:24px !important;
}

#cricapi_modal {
    position:fixed;
    top:0px;left:0px;right:0px;bottom:0px;
    background:#fff;
    z-index:9999999999;
}
#cricapi_modal IFRAME {
    width:100%;
    height:100%;
    max-width:100%;
    max-height:100%;
}
</style>
<div class="slideholder" id="cricapi_widget_score" onmouseover="cricapi_widget_paused=true;" onmouseout="cricapi_widget_paused=false;">
    <div class="slide">
        <div class="slab loading"><div>
  <a href="https://cricketdata.org/widgets" title="Get Cricket API widgets for your website" style="text-decoration:none;padding:0;margin:0;border:0;">
<img alt='Use CricketData for awesome API and Widgets' style="width:100% !important;height:100% !important;" src="https://cdorg.b-cdn.net/img/widgetbg.webp" />
  </a>
</div></div>
    </div>
    <img alt='Grab your free Widget from CricketData' src="https://cdorg.b-cdn.net/img/doodul.png" onload="cricket_widget_score()" style="width: 1px; height: 1px;" />
</div>

<div id='cricapi_modal' style='display:none;'>
<div style="position:absolute;top:0px;right:0px;">
<a href='javascript:;' style='font-size:2em;background:#fff;color:#080;text-decoration:none;padding:5px 0.6em;' 
onclick="cricapi.reloadFrame();">&#8635;</a>
<a href='javascript:;' style='font-size:2em;background:#080;color:#fff;text-decoration:none;padding:5px 0.6em;' 
onclick="document.getElementById('cricapi_modal').style.display='none';document.getElementById('cricapi_details_modal_frame').srcdoc='...';">&times;</a>
</div>
<iframe id='cricapi_details_modal_frame' onload='this.removeAttribute("srcdoc");' frameborder=0 src='https://cdorg.b-cdn.net/img/widgetbg.webp'></iframe></div>
`;

    var last_iframe_URL = "";
    window.cricapi.showModal = function (x) {
        last_iframe_URL = x;

        document.getElementById('cricapi_details_modal_frame').srcdoc = "<center><br/><br><h1 style='font-family:sans-serif,sans;'>Loading...</h1><br><progress></progress></center>";
        document.getElementById('cricapi_modal').style.display = 'block';
        document.getElementById('cricapi_details_modal_frame').src = x;
    }

    window.cricapi.reloadFrame = function (x) {
        cricapi.showModal(last_iframe_URL);
    }

    if (!document.querySelector("#cric_data_live_score"))
        MEscorescript.after(c)
    else
        document.querySelector("#cric_data_live_score").append(c);

    setTimeout(() => {
        let x = document.getElementById("cricapi_modal");
        document.getElementById("cricapi_modal").remove();
        document.body.appendChild(x);
    }, 200);

    let cricapi_widget_scoreData = null;
    window.cricket_widget_score = function cricket_widget_score() {
        let box = document.getElementById("cricapi_widget_score");
        let widgetWidth = box.clientWidth;
        let widgetHeight = box.clientHeight;
        box.scrollLeft = 0;

        function stylize() {
            widgetWidth = box.clientWidth;
            widgetHeight = box.clientHeight;
            Array.from(document.querySelectorAll("#cricapi_widget_score .slab"))
                .forEach(x => {
                    x.style.width = (widgetWidth - 20) + "px";
                    x.style.height = (widgetHeight - 20) + "px";
                });
        }

        function prepScores() {
            console.log(box.scrollLeft, box.scrollWidth);
//            if (box.scrollLeft % 300 != 0) {
  //              console.log("weird", box.scrollLeft, "should be", Math.ceil(box.scrollLeft/300));
    //        }
            if (cricapi_widget_scoreData) {
//                console.log("refresh");
                box.style.scrollBehavior = "auto";
                document.querySelectorAll(".slab:not(.loading)").forEach(x => x.remove());
                $slideholder = document.querySelector("#cricapi_widget_score .slide");

                let d = document.createElement("div");
                d.innerHTML = cricapi_widget_scoreData;
                Array.from(d.childNodes)
                    .forEach(x => $slideholder.appendChild(x));

                stylize();
                cricapi_widget_scoreData = null;
                box.scrollLeft = widgetWidth * cricapi.slideNo;
//                console.log("dun refresh", box.scrollLeft);
                box.style.scrollBehavior = "smooth";
            }

      //      if (box.scrollLeft % 300 != 0) {
        //        console.log("weird", box.scrollLeft, "should be", Math.ceil(box.scrollLeft / 300));
          //  }

            if (!cricapi_widget_paused) {
                if ((box.scrollLeft + widgetWidth) >= box.scrollWidth) {
                    console.log("back to 0");
                    box.style.scrollBehavior = "auto";
                    box.scrollLeft = 0;
                    cricapi.slideNo = 0;
                    box.style.scrollBehavior = "smooth";
                }

//                console.log("slide +1");
                cricapi_setSlide(1);
            }
        }
        window.cricapi_setSlide = function setSlide(relativeSlide) {
//            console.log("<")
            // relativeSlide = +1 for next or -1 for prev
            cricapi.slideNo += relativeSlide;
            if (cricapi.slideNo == 0 && relativeSlide < 0) {
                return;
            }
            box.scrollLeft = widgetWidth * cricapi.slideNo;
//            console.log(">")
        }

        cricapi.slideNo = 0;
        loadDta();
         setInterval(loadDta, 8000);
         setInterval(prepScores, 3000);
        //setTimeout(prepScores, 3000);
        stylize();

        function loadDta() {
            fetch("https://cricketdata.org/apis/prepscores.aspx?k=" + Math.floor(new Date().getTime() / 5000) + "&r=" + encodeURIComponent(location.href))
                .then(x => x.text()).then(function (data) {
                    cricapi_widget_scoreData = data;
                });
        }
    }
})();
