"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7559],{7559:(T,O,g)=>{g.r(O),g.d(O,{TopicModule:()=>I});var C=g(6895),P=g(7370),t=g(6738),m=g(4981);function b(o,i){1&o&&t._UZ(0,"img",41)}function y(o,i){if(1&o){const n=t.EpF();t.TgZ(0,"span",39),t.NdJ("click",function(){const c=t.CHM(n),r=c.index,l=c.$implicit,s=t.oxw().$implicit,d=t.oxw(2);return t.KtG(r<s.videoDetail.latestVideoCount?d.playVideo(l,s.topicId,r):d.lockedVideo())}),t.YNc(1,b,1,0,"img",40),t.qZA()}if(2&o){const n=i.index,e=t.oxw().$implicit;t.xp6(1),t.Q6J("ngIf",!(n<e.videoDetail.latestVideoCount))}}const p=function(o){return[o]};function f(o,i){if(1&o&&(t.TgZ(0,"div",35)(1,"h4",36),t._uU(2),t.qZA(),t.TgZ(3,"div",37),t.YNc(4,y,2,1,"span",38),t.qZA()()),2&o){const n=i.$implicit,e=i.index,c=t.oxw(2);t.xp6(1),t.s9C("id",e),t.uIk("data-target","#collapse"+t.VKq(8,p,e))("aria-controls","collapse"+t.VKq(10,p,e)),t.xp6(1),t.Oqu(n.topicName),t.xp6(1),t.s9C("id","collapse"+e),t.Q6J("ngClass",c.showCollapse(e)),t.uIk("aria-labelledby",t.VKq(12,p,e)),t.xp6(1),t.Q6J("ngForOf",n.videoList)}}function v(o,i){1&o&&t._UZ(0,"a",43),2&o&&t.Q6J("href",i.$implicit,t.LSH)}function h(o,i){if(1&o&&(t.TgZ(0,"div",35)(1,"h4",36),t._uU(2),t.qZA(),t.TgZ(3,"div",37),t.YNc(4,v,1,1,"a",42),t.qZA()()),2&o){const n=i.$implicit,e=i.index,c=t.oxw(2);t.xp6(1),t.s9C("id",e),t.uIk("data-target","#collapse"+t.VKq(8,p,e))("aria-controls","collapse"+t.VKq(10,p,e)),t.xp6(1),t.Oqu(n.topicName),t.xp6(1),t.s9C("id","collapse"+e),t.Q6J("ngClass",c.showCollapse(e)),t.uIk("aria-labelledby",t.VKq(12,p,e)),t.xp6(1),t.Q6J("ngForOf",n.documentList)}}function k(o,i){if(1&o){const n=t.EpF();t.TgZ(0,"div",28)(1,"div",29)(2,"button",30),t.NdJ("click",function(){t.CHM(n);const c=t.oxw();return t.KtG(c.toggler("L"))}),t._uU(3,"Lectures"),t.qZA(),t.TgZ(4,"button",31),t.NdJ("click",function(){t.CHM(n);const c=t.oxw();return t.KtG(c.toggler("N"))}),t._uU(5,"Notes"),t.qZA()(),t.TgZ(6,"div",32),t.YNc(7,f,5,14,"div",33),t.qZA(),t.TgZ(8,"div",34),t.YNc(9,h,5,14,"div",33),t.qZA()()}if(2&o){const n=t.oxw();t.xp6(7),t.Q6J("ngForOf",n.topicList.result),t.xp6(2),t.Q6J("ngForOf",n.topicList.result)}}const x=[{path:"",component:(()=>{class o{constructor(n,e){this.userService=n,this.activatedRoute=e,this.videoId="1iHQEKssgX8"}ngOnInit(){this.cName=this.activatedRoute.snapshot.paramMap.get("id"),this.subject=this.activatedRoute.snapshot.paramMap.get("topic"),this.getLmsCourseTopic(),this.reloadIfNecessary(),this.embedYt(this.videoId),this.fullscreen()}ngAfterViewInit(){const n=window.document;let e=n.createElement("script");e.type="text/javascript",e.id="playerScript",e.src="https://www.youtube.com/iframe_api",n.body.appendChild(e)}ngOnDestroy(){localStorage.removeItem("IsLoadedBefore")}getLmsCourseTopic(){this.userService.getLmsCourseTopic(this.cName,this.subject).subscribe(n=>{console.log(n),this.topicList=n})}playVideo(n,e,c){this.videoId=n,document.getElementById("topicId").value=e,document.getElementById("videoId").value=String(Number(c)+1),this.player.loadVideoById({videoId:this.videoId})}lockedVideo(){alert("Kindly finish the previous video to unlock this video")}embedYt(n){window.onYouTubeIframeAPIReady=()=>{this.player=new window.YT.Player("player",{videoId:n,height:"100%",width:"100%",events:{onReady:this.onPlayerReady,onStateChange:this.onPlayerStateChange.bind(this)},playerVars:{showinfo:0,modestbranding:1,rel:0,iv_load_policy:3,controls:0,vq:"tiny"}})},document.getElementById("player").style.position="absolute"}onPlayerReady(n){var e=document.getElementById("play-button"),c=document.getElementById("seek-forward-button"),r=document.getElementById("seek-backward-button"),l=document.getElementById("iframe-overlay"),s=document.getElementById("playback-rate-inc-button"),d=document.getElementById("playback-rate-dec-button"),_=document.getElementById("volume-inc-button"),u=document.getElementById("volume-dec-button");function M(){"play"===e.className?(n.target.playVideo(),e.className="pause"):(n.target.pauseVideo(),e.className="play")}n.target.playVideo(),e.addEventListener("click",function(){M()}),l.addEventListener("click",function(){M()}),c.addEventListener("click",function(){n.target.seekTo(n.target.getCurrentTime()+10,!0)}),r.addEventListener("click",function(){n.target.seekTo(n.target.getCurrentTime()+-10,!0)}),s.addEventListener("click",function(){var a=n.target.getPlaybackRate();a<2&&a>=.25?n.target.setPlaybackRate(a+.25):alert("Video is playing at maximum playback rate")}),d.addEventListener("click",function(){var a=n.target.getPlaybackRate();a<=2&&a>.25?n.target.setPlaybackRate(a-.25):alert("Video is playing at minimum playback rate")}),_.addEventListener("click",function(){var a=n.target.getVolume();a<100&&a>=0?n.target.setVolume(a+10):alert("Video is already playing at maximum volume.")}),u.addEventListener("click",function(){var a=n.target.getVolume();a<=100&&a>0?n.target.setVolume(a-10):alert("Video is already playing at minimum volume.")})}onPlayerStateChange(n){var l,e=document.getElementById("progress-bar"),c=document.getElementById("progress-juice"),r=0;if(n.data==YT.PlayerState.PLAYING?l=setInterval(function(){r=n.target.getDuration();let u=n.target.getCurrentTime()/r*100;c.style.width=`${u}%`,document.getElementById("playbackRate").setAttribute("data-before",n.target.getPlaybackRate()),document.getElementById("volume").setAttribute("data-before",n.target.getVolume())},1e3):(clearTimeout(l),r=0),n.data==YT.PlayerState.ENDED){var s=document.getElementById("videoId").value,d=document.getElementById("topicId").value;this.userService.updateUserTopic({topicId:d,latestVideoCount:s}).subscribe(_=>{console.log(_),this.reloadIfNecessary()})}e.addEventListener("click",_=>{const u=_.offsetX/e.offsetWidth*n.target.getDuration();n.target.seekTo(u)})}fullscreen(){document.getElementById("fullscreen-button").addEventListener("click",function(){document.getElementsByClassName("custom-video-player")[0].classList.toggle("fullscreen")})}reloadIfNecessary(){"true"!==localStorage.getItem("IsLoadedBefore")&&(localStorage.setItem("IsLoadedBefore","true"),location.reload())}toggler(n){let e=document.querySelector("#videos"),c=document.querySelector("#notes"),r=document.querySelector("#video-list"),l=document.querySelector("#note-list");"L"===n?(r.classList.remove("hidden"),l.classList.add("hidden"),e.classList.add("disabled"),c.classList.remove("disabled")):"N"===n&&(r.classList.add("hidden"),l.classList.remove("hidden"),e.classList.remove("disabled"),c.classList.add("disabled"))}showCollapse(n){return 0===n?"show":"collapse"}videoEnded(){var n=document.getElementById("videoId").value,e=document.getElementById("topicId").value;console.log(this),console.log(e),console.log(n),console.log("video ended")}openModal(){document.querySelector(".modal").classList.toggle("modalOpen")}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(m.K),t.Y36(P.gz))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-topic"]],decls:37,vars:4,consts:[[1,"main-bg"],[1,"topic"],[1,"top-bar","row"],[1,"col-lg-8","col-12"],[3,"href"],[1,"player-section"],[1,"row"],[1,"col-lg-8"],[1,"custom-video-player"],["id","player"],["id","iframe-overlay",1,"iframe-overlay"],[1,"controls"],["id","progress-bar"],["id","progress-juice"],[1,"buttons"],["id","play-button","aria-label","Play-pause"],["id","seek-backward-button","aria-label","<<10s"],["id","seek-forward-button","aria-label","10s>>"],["id","volume-dec-button"],["id","volume"],["id","volume-inc-button"],["id","playback-rate-dec-button"],["id","playbackRate"],["id","playback-rate-inc-button"],["id","fullscreen-button","aria-label","Fullscreen"],["type","hidden","id","videoId"],["type","hidden","id","topicId"],["class","col-lg-4",4,"ngIf"],[1,"col-lg-4"],[1,"toggle-bar"],["id","videos",1,"disabled",3,"click"],["id","notes",3,"click"],["id","video-list",1,"accordion"],["class","topic-name",4,"ngFor","ngForOf"],["id","note-list",1,"accordion","hidden"],[1,"topic-name"],["type","button","data-toggle","collapse","aria-expanded","false",3,"id"],["data-parent","#video-list",3,"ngClass","id"],[3,"click",4,"ngFor","ngForOf"],[3,"click"],["src","../../../../../../assets/images/Lock_icon.png","alt","Locked","data-toggle","tooltip","data-placement","top","title","Locked Video",4,"ngIf"],["src","../../../../../../assets/images/Lock_icon.png","alt","Locked","data-toggle","tooltip","data-placement","top","title","Locked Video"],["download","",3,"href",4,"ngFor","ngForOf"],["download","",3,"href"]],template:function(n,e){1&n&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"h6"),t._uU(5),t.qZA(),t.TgZ(6,"a",4)(7,"h6"),t._uU(8,"Change Subject"),t.qZA()()()(),t.TgZ(9,"h4"),t._uU(10),t.qZA(),t.TgZ(11,"div",5)(12,"div",6)(13,"div",7)(14,"div",8),t._UZ(15,"div",9)(16,"div",10),t.TgZ(17,"div",11)(18,"div",12),t._UZ(19,"div",13),t.qZA(),t.TgZ(20,"div",14)(21,"div"),t._UZ(22,"button",15)(23,"button",16)(24,"button",17),t.qZA(),t.TgZ(25,"div"),t._UZ(26,"button",18)(27,"span",19)(28,"button",20),t.qZA(),t.TgZ(29,"div"),t._UZ(30,"button",21)(31,"span",22)(32,"button",23),t.qZA(),t._UZ(33,"button",24),t.qZA()()(),t._UZ(34,"input",25)(35,"input",26),t.qZA(),t.YNc(36,k,10,2,"div",27),t.qZA()()()()),2&n&&(t.xp6(5),t.hij("Course : ",e.cName,""),t.xp6(1),t.MGl("href","video/",e.cName,"",t.LSH),t.xp6(4),t.hij("Subject : ",e.subject,""),t.xp6(26),t.Q6J("ngIf",e.topicList))},dependencies:[C.mk,C.sg,C.O5],styles:['.main-bg[_ngcontent-%COMP%]{min-height:100vh;min-width:100%;background:linear-gradient(135deg,rgba(0,0,255,.3),rgba(0,0,255,.45)),url(bg-2.a24ac65a08650bca.png);background-position:center;background-size:cover;background-attachment:fixed}.topic[_ngcontent-%COMP%]{padding:50px;width:100%}.topic[_ngcontent-%COMP%]   .top-bar[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.topic[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]{color:#fff;font-weight:700;display:inline-block;align-self:center;margin-bottom:0}.topic[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-block;margin-right:0;background:#ffc300;padding:10px;border-radius:4px}.topic[_ngcontent-%COMP%] > h4[_ngcontent-%COMP%]{font-size:30px;font-weight:700;color:#ffc300;font-weight:900;margin:30px 0}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]{position:unset}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;background:url(iframe-bg.70f75e9d948a865e.svg);background-position:center;background-size:cover;transition:all .3s}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   #player[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .iframe-overlay[_ngcontent-%COMP%]{position:absolute;inset:0;z-index:102}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .iframe-overlay[_ngcontent-%COMP%]:hover + .controls[_ngcontent-%COMP%]{bottom:0}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .iframe-overlay[_ngcontent-%COMP%]:hover + .controls[_ngcontent-%COMP%]   #progress-bar[_ngcontent-%COMP%]   #progress-juice[_ngcontent-%COMP%]{background:blue}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]{position:absolute;bottom:-55px;left:0;right:0;z-index:103;transition:all .3s;background:linear-gradient(transparent,rgba(0,0,0,.8))}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #progress-bar[_ngcontent-%COMP%]{height:10px;background:rgba(77,77,77,.5);margin-bottom:5px}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #progress-bar[_ngcontent-%COMP%]   #progress-juice[_ngcontent-%COMP%]{height:10px;background:rgba(0,0,255,.5);width:0}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background:none;padding:0;margin:0 10px 5px;outline:none;border:none;box-shadow:none}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #play-button[_ngcontent-%COMP%]:before{content:"";display:inline-block;background:url(play-btn.a2790d40d7f592e2.svg);height:35px;width:35px;background-repeat:no-repeat;background-size:contain;background-position:center;transition:all .2s}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #play-button.play[_ngcontent-%COMP%]:before{content:"";background:url(play-btn.a2790d40d7f592e2.svg);background-repeat:no-repeat;background-size:contain;background-position:center}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #play-button.pause[_ngcontent-%COMP%]:before{content:"";background:url(pause-btn.0197abff8c9bf173.svg);background-repeat:no-repeat;background-size:contain;background-position:center}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #seek-backward-button[_ngcontent-%COMP%]:before{content:"";display:inline-block;background:url(bkwd-ten.58d90e4b9e61238e.svg);height:35px;width:35px;background-repeat:no-repeat;background-size:contain;background-position:center}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #seek-forward-button[_ngcontent-%COMP%]:before{content:"";display:inline-block;background:url(frwd-ten.dd7881d528d2b3e0.svg);height:35px;width:35px;background-repeat:no-repeat;background-size:contain;background-position:center}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #fullscreen-button[_ngcontent-%COMP%]:before{content:"";display:inline-block;background:url(fullscreen.da831c2ea5ec1d0a.svg);height:35px;width:35px;background-repeat:no-repeat;background-size:contain;background-position:center}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #volume[_ngcontent-%COMP%]:before{content:attr(data-before);font-size:30px;font-weight:700;color:#00f;margin-bottom:8px;font-size:22px;vertical-align:top;margin-top:3px;display:inline-block}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #volume-dec-button[_ngcontent-%COMP%]:before{content:"";display:inline-block;background:url(volume-down.4fb93b2fa3f726ba.svg);height:30px;width:40px;background-repeat:no-repeat;background-size:contain;background-position:center;margin-top:5px}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #volume-inc-button[_ngcontent-%COMP%]:before{content:"";display:inline-block;background:url(volume-up.e2b3d3e993439c12.svg);height:30px;width:40px;background-repeat:no-repeat;background-size:contain;background-position:center;margin-top:5px}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #playbackRate[_ngcontent-%COMP%]:before{content:attr(data-before);font-size:30px;font-weight:700;color:#00f;margin-bottom:8px;font-size:22px;vertical-align:top;margin-top:3px;display:inline-block}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #playback-rate-dec-button[_ngcontent-%COMP%]:before{content:"";display:inline-block;background:url(playback-dec.c8c952093e306cc4.svg);height:30px;width:40px;background-repeat:no-repeat;background-size:contain;background-position:center;margin-top:5px}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #playback-rate-inc-button[_ngcontent-%COMP%]:before{content:"";display:inline-block;background:url(playback-inc.aab136e558fcf842.svg);height:30px;width:40px;background-repeat:no-repeat;background-size:contain;background-position:center;margin-top:5px}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]:hover{bottom:0}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .fullscreen[_ngcontent-%COMP%]{position:fixed;padding-bottom:49%;height:80%;width:100%;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:left;box-shadow:0 0 0 100px #000;transition:all .3s;z-index:101}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .toggle-bar[_ngcontent-%COMP%]{border-radius:4px;overflow:hidden;margin-bottom:10px}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .toggle-bar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{display:inline-block;width:50%;padding:10px;background:#0000ff;border:none;font-size:18px;font-weight:500;text-transform:uppercase;color:#fff;transition:all .3s}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .toggle-bar[_ngcontent-%COMP%]   .disabled[_ngcontent-%COMP%]{background:#bdc2b8}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .topic-name[_ngcontent-%COMP%]{background:rgba(255,255,255,.6);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);padding:15px;margin-bottom:10px;border-radius:10px;counter-reset:videoItem}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .topic-name[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:30px;font-weight:700;color:#00f;margin-bottom:0;cursor:pointer}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .topic-name[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{margin-top:20px}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .topic-name[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .topic-name[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#000;font-size:20px;font-weight:500;display:block;margin-bottom:5px;padding:10px;background:rgba(77,77,77,.5);border-radius:4px;cursor:pointer}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .topic-name[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:before, .topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .topic-name[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:before{counter-increment:videoItem;content:"Lecture " counter(videoItem) " "}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .topic-name[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .topic-name[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:24px;padding-bottom:5px}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .topic-name[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#000}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .topic-name[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:before{counter-increment:videoItem;content:"Document " counter(videoItem) " "}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .topic-name[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;padding:10px;border:1px solid #4d4d4d;background:#0000ff;color:#fff;font-weight:500}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .topic-name[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:24px;padding-bottom:5px}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .hidden[_ngcontent-%COMP%]{display:none}@media screen and (max-width: 500px){.topic[_ngcontent-%COMP%]{padding:80px 15px 15px}.topic[_ngcontent-%COMP%] > h6[_ngcontent-%COMP%]{font-weight:500;margin-bottom:0}.topic[_ngcontent-%COMP%] > h4[_ngcontent-%COMP%]{font-size:24px;font-weight:700;color:#ffc300;margin:0}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]{margin-top:50px}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .iframe-overlay[_ngcontent-%COMP%]{z-index:90}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]{z-index:91}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin:0 5px 5px;outline:none;border:none;box-shadow:none}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #play-button[_ngcontent-%COMP%]:before{width:25px}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #play-button.play[_ngcontent-%COMP%]:before{width:25px}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #play-button.pause[_ngcontent-%COMP%]:before{width:25px}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #seek-backward-button[_ngcontent-%COMP%]:before{width:25px}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #seek-forward-button[_ngcontent-%COMP%]:before{width:25px}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #fullscreen-button[_ngcontent-%COMP%]:before{width:25px}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #volume[_ngcontent-%COMP%]:before{content:attr(data-before);font-size:30px;font-weight:700;color:#00f;margin-bottom:8px;font-size:22px;vertical-align:top;margin-top:3px;display:inline-block}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #volume-dec-button[_ngcontent-%COMP%]:before{width:25px}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #volume-inc-button[_ngcontent-%COMP%]:before{width:25px}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #playbackRate[_ngcontent-%COMP%]:before{content:attr(data-before);font-size:30px;font-weight:700;color:#00f;margin-bottom:8px;font-size:22px;vertical-align:top;margin-top:3px;display:inline-block}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #playback-rate-dec-button[_ngcontent-%COMP%]:before{width:25px}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .custom-video-player[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   #playback-rate-inc-button[_ngcontent-%COMP%]:before{width:25px}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .col-lg-8[_ngcontent-%COMP%]   .fullscreen[_ngcontent-%COMP%]{z-index:101;transform:translate(-50%,-50%) rotate(90deg);top:50%;left:50%;height:100vw;width:calc(100vh - 100px);transform-origin:center center;box-shadow:0 0 0 100px #000}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .toggle-bar[_ngcontent-%COMP%]{margin-top:50px}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .topic-name[_ngcontent-%COMP%]{margin-top:10px}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .topic-name[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:24px;font-weight:700;color:#ffc300;margin-bottom:10px}.topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .topic-name[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .topic[_ngcontent-%COMP%]   .player-section[_ngcontent-%COMP%]   .topic-name[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:16px;font-weight:700;color:#000}}']}),o})()}];let w=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[P.Bz.forChild(x),P.Bz]}),o})(),I=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[C.ez,w]}),o})()}}]);