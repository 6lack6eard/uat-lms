"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5149],{5149:(_,d,a)=>{a.r(d),a.d(d,{DetailModule:()=>h});var s=a(6895),c=a(7370),t=a(6738),g=a(7268);function l(e,i){if(1&e&&(t.TgZ(0,"li"),t._uU(1),t.qZA()),2&e){const n=i.$implicit;t.xp6(1),t.hij(" ",n," ")}}function p(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"div",3)(1,"div",4),t._UZ(2,"img",5),t.qZA(),t.TgZ(3,"div",6)(4,"h3")(5,"strong"),t._uU(6,"Course Name"),t.qZA(),t._uU(7),t.qZA(),t.TgZ(8,"h3")(9,"strong"),t._uU(10,"For"),t.qZA(),t._uU(11),t.qZA(),t.TgZ(12,"h3")(13,"strong"),t._uU(14,"Description"),t.qZA(),t._uU(15),t.qZA(),t.TgZ(16,"h3")(17,"strong"),t._uU(18,"Subjects"),t.qZA()(),t.TgZ(19,"ul"),t.YNc(20,l,2,1,"li",7),t.qZA(),t.TgZ(21,"h3")(22,"strong"),t._uU(23,"Price"),t.qZA(),t._uU(24),t.qZA(),t.TgZ(25,"button",8),t.NdJ("click",function(){t.CHM(n);const r=t.oxw();return t.KtG(r.addToCart(r.crashCourseDetail.crashCourseId))}),t._UZ(26,"img",9),t._uU(27," ADD TO CART"),t.qZA(),t.TgZ(28,"button",10),t._uU(29,"BACK TO HOME"),t.qZA()()()}if(2&e){const n=t.oxw();t.xp6(7),t.Oqu(n.crashCourseDetail.crashCourseName),t.xp6(4),t.Oqu(n.crashCourseDetail.crashCourseType),t.xp6(4),t.Oqu(n.crashCourseDetail.crashCourseDes),t.xp6(5),t.Q6J("ngForOf",n.crashCourseDetail.crashCourseSubject),t.xp6(4),t.Oqu(n.crashCourseDetail.crashCoursePrice)}}const u=[{path:"",component:(()=>{class e{constructor(n,o){this.activatedRoute=n,this.crashCourseService=o,this.nav_variable=!1}scroll(){this.nav_variable=document.body.scrollTop>100||document.documentElement.scrollTop>100}ngOnInit(){this.crashCourseId=this.activatedRoute.snapshot.paramMap.get("courseId"),this.getCourseDetail()}getCourseDetail(){this.crashCourseService.getCrashCourseDetail(this.crashCourseId).subscribe(n=>{this.crashCourseDetail=n})}addToCart(n){var o=JSON.parse(localStorage.getItem("crashCourseCart"));if(o)o.includes(n)?alert("Crash course is already in your cart"):(o.push(n),localStorage.setItem("crashCourseCart",JSON.stringify(o)),alert("Crash course is added to your cart"));else{var r=[];r.push(n),localStorage.setItem("crashCourseCart",JSON.stringify(r)),alert("Crash course is added to your cart")}}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(c.gz),t.Y36(g.o))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-detail"]],hostBindings:function(n,o){1&n&&t.NdJ("scroll",function(){return o.scroll()},!1,t.evT)},decls:5,vars:3,consts:[["src","../../../assets/svg/gravity-logo-alt.svg","alt",""],[1,"main"],["class","card",4,"ngIf"],[1,"card"],[1,"card-img"],["src","../../../../assets/images/gravity-crash-course.png","alt",""],[1,"card-body"],[4,"ngFor","ngForOf"],["id","buy",3,"click"],["src","../../../assets/svg/cart.svg","alt",""],["id","back","routerLink",""]],template:function(n,o){1&n&&(t.TgZ(0,"div")(1,"nav"),t._UZ(2,"img",0),t.qZA(),t.TgZ(3,"div",1),t.YNc(4,p,30,5,"div",2),t.qZA()()),2&n&&(t.xp6(1),t.ekj("scrolled",o.nav_variable),t.xp6(3),t.Q6J("ngIf",o.crashCourseDetail))},dependencies:[s.sg,s.O5,c.rH],styles:['nav[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;position:fixed;top:0;left:0;width:100%;z-index:99;padding:10px;box-shadow:0 5px 20px #a4aa9d4d;transition:.3s ease}nav[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:80px;transition:.3s ease}nav[_ngcontent-%COMP%]   #cart[_ngcontent-%COMP%]{position:relative}nav[_ngcontent-%COMP%]   #cart[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:40px;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;margin-right:5px;cursor:pointer}nav[_ngcontent-%COMP%]   #cart[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:none;position:absolute;top:200%;left:50%;transform:translate(-50%);width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;background:#edf9de;color:#4d4d4d;white-space:nowrap;font-size:16px;font-weight:700;text-align:center;box-shadow:0 3px 5px -3px #4d4d4d;padding:5px;border-radius:3px;z-index:100;transition:all .3s}nav[_ngcontent-%COMP%]   #cart[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:before{content:"";background-color:inherit;display:block;height:15px;width:15px;position:absolute;top:0;left:50%;transform:rotate(45deg) translate(-50%);border-radius:3px;z-index:99px}nav[_ngcontent-%COMP%]   #cart[_ngcontent-%COMP%]:hover   span[_ngcontent-%COMP%]{display:block}nav[_ngcontent-%COMP%]   #login[_ngcontent-%COMP%]{display:inline-block;width:80px;padding:5px;border:2px solid #4d4d4d;background:linear-gradient(90deg,#4d4d4d 50%,transparent 50%);background-size:200% 100%;background-position:100% 0;text-decoration:none;color:#4d4d4d;font-weight:700;text-align:center;margin-right:5px;transition:.3s}nav[_ngcontent-%COMP%]   #login[_ngcontent-%COMP%]:hover{background-position:0 0;transition:.3s;color:#fff}nav[_ngcontent-%COMP%]   #register[_ngcontent-%COMP%]{display:inline-block;width:80px;padding:5px;border:2px solid #4d4d4d;text-decoration:none;color:#fff;background:#4d4d4d;font-weight:700;text-align:center;margin-right:5px}.scrolled[_ngcontent-%COMP%]{background:#fff;transition:.3s ease}.scrolled[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:50px;transition:.3s ease}.main[_ngcontent-%COMP%]{margin:150px 20px 100px;display:grid;place-items:center}.main[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:340px;margin:20px;padding:10px;border-radius:6px;box-shadow:0 2px #4d4d4d1a,0 0 10px #4d4d4d4d;overflow:hidden}.main[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-img[_ngcontent-%COMP%]{margin-bottom:20px}.main[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;object-fit:cover;object-position:center;border-radius:3px}.main[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]{margin:0;padding:0}.main[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:22px;font-weight:500;color:#000;margin:20px auto 8px}.main[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:#00f;font-size:16px;display:block}.main[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{font-size:22px;font-weight:500;color:#000}.main[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   #buy[_ngcontent-%COMP%]{width:100%;padding:10px;margin-bottom:20px;background:#0000ff;border:none;border-radius:3px;font-size:20px;font-weight:700;color:#fff;box-shadow:0 5px 10px -3px #4d4d4d;transition:all .3s}.main[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   #buy[_ngcontent-%COMP%]:active{transform:scale(.95);transition:all .3s}.main[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   #back[_ngcontent-%COMP%]{width:100%;padding:10px;background:rgba(164,170,157,.3);border:none;border-radius:3px;font-size:20px;font-weight:700;color:#4d4d4d;transition:all .3s}.main[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   #back[_ngcontent-%COMP%]:active{transform:scale(.95);transition:all .3s}']}),e})()}];let C=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[c.Bz.forChild(u),c.Bz]}),e})(),h=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[s.ez,C]}),e})()}}]);