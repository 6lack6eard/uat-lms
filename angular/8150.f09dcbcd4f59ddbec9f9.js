"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8150],{8150:(f,i,s)=>{s.r(i),s.d(i,{LmsVideoModule:()=>a});var c=s(8583),r=s(5855),o=s(639),l=s(2192);function g(n,t){if(1&n&&(o.TgZ(0,"div",5),o.TgZ(1,"span"),o._uU(2),o.qZA(),o.qZA()),2&n){const e=t.$implicit;o.Q6J("routerLink",e),o.xp6(2),o.Oqu(e)}}function m(n,t){if(1&n&&(o.TgZ(0,"div",2),o.TgZ(1,"h6"),o._uU(2,"LMS Courses"),o.qZA(),o.TgZ(3,"h4"),o._uU(4),o.qZA(),o.TgZ(5,"div",3),o.YNc(6,g,3,2,"div",4),o.qZA(),o.qZA()),2&n){const e=o.oxw();o.xp6(4),o.hij("Welcome, ",e.profile.name,""),o.xp6(2),o.Q6J("ngForOf",e.school.lmsCourse)}}const p=[{path:"",component:(()=>{class n{constructor(e){this.schoolService=e}ngOnInit(){this.profile()}profile(){this.schoolService.viewProfile().subscribe(e=>{this.school=e.result})}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(l.E))},n.\u0275cmp=o.Xpm({type:n,selectors:[["app-lms-video"]],decls:2,vars:1,consts:[[1,"main-bg"],["class","lmscourse",4,"ngIf"],[1,"lmscourse"],[1,"courses-pallet"],["class","course",3,"routerLink",4,"ngFor","ngForOf"],[1,"course",3,"routerLink"]],template:function(e,d){1&e&&(o.TgZ(0,"div",0),o.YNc(1,m,7,2,"div",1),o.qZA()),2&e&&(o.xp6(1),o.Q6J("ngIf",d.profile))},directives:[c.O5,c.sg,r.rH],styles:[".main-bg[_ngcontent-%COMP%]{min-height:100vh;min-width:100%;background:linear-gradient(135deg,rgba(0,0,255,.3),rgba(0,0,255,.45)),url(bg-2.ef2b19d92aeab4738af9.png);background-position:center;background-size:cover;background-attachment:fixed}.lmscourse[_ngcontent-%COMP%]{padding:50px}.lmscourse[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]{color:#fff;font-weight:700}.lmscourse[_ngcontent-%COMP%] > h4[_ngcontent-%COMP%]{font-size:50px;font-weight:700;color:#ffc300;margin-bottom:16px;font-weight:900}.lmscourse[_ngcontent-%COMP%]   .courses-pallet[_ngcontent-%COMP%]{margin-top:50px;display:flex;flex-wrap:wrap}.lmscourse[_ngcontent-%COMP%]   .courses-pallet[_ngcontent-%COMP%]   .course[_ngcontent-%COMP%]{background:rgba(255,255,255,.6);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);box-shadow:0 10px 10px -5px #99f;padding:20px;margin:0 20px 20px 0;border-radius:20px;cursor:pointer}.lmscourse[_ngcontent-%COMP%]   .courses-pallet[_ngcontent-%COMP%]   .course[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{width:200px;display:block;text-align:center;font-size:50px;font-weight:700;color:#ffc300;color:#000;margin-bottom:0}@media screen and (max-width: 660px){.lmscourse[_ngcontent-%COMP%]{padding:80px 15px 15px}.lmscourse[_ngcontent-%COMP%] > h6[_ngcontent-%COMP%]{font-weight:500;margin-bottom:0}.lmscourse[_ngcontent-%COMP%] > h4[_ngcontent-%COMP%]{font-size:30px;font-weight:700;color:#ffc300;margin-bottom:10px}.lmscourse[_ngcontent-%COMP%]   .courses-pallet[_ngcontent-%COMP%]{margin-top:30px}.lmscourse[_ngcontent-%COMP%]   .courses-pallet[_ngcontent-%COMP%]   .course[_ngcontent-%COMP%]{margin-bottom:30px}}"]}),n})()}];let u=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[[r.Bz.forChild(p)],r.Bz]}),n})(),a=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[[c.ez,u]]}),n})()}}]);