"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9575],{9575:(s,l,r)=>{r.r(l),r.d(l,{StudentModule:()=>g});var p=r(6895),d=r(7370),t=r(4719),e=r(6738),u=r(4981);const c=[{path:"",component:(()=>{class n{constructor(o){this.userService=o,this.registerAmpStudentForm=new t.nJ({name:new t.p4("",[t.kI.required]),fname:new t.p4("",[t.kI.required]),mobile:new t.p4("",[t.kI.required]),email:new t.p4("",[t.kI.required]),dob:new t.p4("",[t.kI.required]),city:new t.p4("",[t.kI.required]),state:new t.p4("",[t.kI.required]),class:new t.p4("",[t.kI.required]),school:new t.p4("",[t.kI.required]),aadharno:new t.p4("",[t.kI.required])})}ngOnInit(){}registerAmpStudent(){this.registerAmpStudentForm.valid&&this.userService.registerAmpStudent(this.registerAmpStudentForm.value).subscribe(o=>{console.log(o.paymentUrl),window.location.href=o.paymentUrl})}apmStudentPay(){this.userService.ampPayment({}).subscribe(o=>{console.log(o.paymentUrl),window.location.href=o.paymentUrl})}}return n.\u0275fac=function(o){return new(o||n)(e.Y36(u.K))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-student"]],decls:59,vars:2,consts:[[1,"container"],[3,"formGroup","ngSubmit"],[1,"form-header"],[1,"form-grp"],["required","","type","text","placeholder","name","formControlName","name","id","name"],["for","name"],["required","","type","text","placeholder","fname","formControlName","fname","id","fname"],["for","fname"],["required","","type","text","placeholder","mobile","formControlName","mobile","id","mobile"],["for","mobile"],["required","","type","email","placeholder","email","formControlName","email","id","email"],["for","email"],["required","","type","date","placeholder","dob","formControlName","dob","id","dob"],["for","dob"],["required","","type","text","placeholder","city","formControlName","city","id","city"],["for","city"],["required","","type","text","placeholder","state","formControlName","state","id","state"],["for","state"],["required","","id","class","formControlName","class"],["value","08"],["value","09"],["value","10"],["value","11"],["value","12"],["value","13"],["for","class"],["required","","type","text","placeholder","school","formControlName","school","id","school"],["for","school"],["required","","type","text","placeholder","aadharno","formControlName","aadharno","id","aadharno"],["for","aadharno"],["type","submit",3,"disabled"]],template:function(o,i){1&o&&(e.TgZ(0,"div",0)(1,"form",1),e.NdJ("ngSubmit",function(){return i.registerAmpStudent()}),e.TgZ(2,"div",2)(3,"h3"),e._uU(4,"Student Registeration"),e.qZA()(),e.TgZ(5,"div",3),e._UZ(6,"input",4),e.TgZ(7,"label",5),e._uU(8,"Name"),e.qZA()(),e.TgZ(9,"div",3),e._UZ(10,"input",6),e.TgZ(11,"label",7),e._uU(12,"Father's Name"),e.qZA()(),e.TgZ(13,"div",3),e._UZ(14,"input",8),e.TgZ(15,"label",9),e._uU(16,"Mobile"),e.qZA()(),e.TgZ(17,"div",3),e._UZ(18,"input",10),e.TgZ(19,"label",11),e._uU(20,"Email"),e.qZA()(),e.TgZ(21,"div",3),e._UZ(22,"input",12),e.TgZ(23,"label",13),e._uU(24,"DoB"),e.qZA()(),e.TgZ(25,"div",3),e._UZ(26,"input",14),e.TgZ(27,"label",15),e._uU(28,"City"),e.qZA()(),e.TgZ(29,"div",3),e._UZ(30,"input",16),e.TgZ(31,"label",17),e._uU(32,"State"),e.qZA()(),e.TgZ(33,"div",3)(34,"select",18)(35,"option",19),e._uU(36,"8"),e.qZA(),e.TgZ(37,"option",20),e._uU(38,"9"),e.qZA(),e.TgZ(39,"option",21),e._uU(40,"10"),e.qZA(),e.TgZ(41,"option",22),e._uU(42,"11"),e.qZA(),e.TgZ(43,"option",23),e._uU(44,"12"),e.qZA(),e.TgZ(45,"option",24),e._uU(46,"Passout"),e.qZA()(),e.TgZ(47,"label",25),e._uU(48,"Class"),e.qZA()(),e.TgZ(49,"div",3),e._UZ(50,"input",26),e.TgZ(51,"label",27),e._uU(52,"School"),e.qZA()(),e.TgZ(53,"div",3),e._UZ(54,"input",28),e.TgZ(55,"label",29),e._uU(56,"Aadhar No."),e.qZA()(),e.TgZ(57,"button",30),e._uU(58,"Register and Pay"),e.qZA()()()),2&o&&(e.xp6(1),e.Q6J("formGroup",i.registerAmpStudentForm),e.xp6(56),e.Q6J("disabled",!i.registerAmpStudentForm.valid))},dependencies:[t._Y,t.YN,t.Kr,t.Fj,t.EJ,t.JJ,t.JL,t.Q7,t.sg,t.u],styles:[".addNewStud[_ngcontent-%COMP%]{padding:20px 100px}h2[_ngcontent-%COMP%]{font-size:50px;font-weight:700;color:#ffc300;margin-bottom:16px}.container[_ngcontent-%COMP%]{display:grid;place-items:center}form[_ngcontent-%COMP%]{width:500px;padding:20px;background:rgba(255,255,255,.3);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);border-radius:15px}form[_ngcontent-%COMP%]   .form-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#fff}form[_ngcontent-%COMP%]   .form-grp[_ngcontent-%COMP%]{width:100%}form[_ngcontent-%COMP%]   .form-grp[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{width:100%;padding:20px 10px 10px;border:none;background:rgba(77,77,77,.5)}form[_ngcontent-%COMP%]   .form-grp[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:valid + label[_ngcontent-%COMP%]{transform:translate(10px,-55px);font-size:14px;transition:all .3s}form[_ngcontent-%COMP%]   .form-grp[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;padding:20px 10px 10px;border:none;background:rgba(77,77,77,.5);color:#fff}form[_ngcontent-%COMP%]   .form-grp[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{outline:none}form[_ngcontent-%COMP%]   .form-grp[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder{color:transparent}form[_ngcontent-%COMP%]   .form-grp[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus + label[_ngcontent-%COMP%], form[_ngcontent-%COMP%]   .form-grp[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:not(:placeholder-shown) + label[_ngcontent-%COMP%]{transform:translate(10px,-55px);font-size:14px;transition:all .3s}form[_ngcontent-%COMP%]   .form-grp[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{transform:translate(10px,-37px);display:block;transition:all .3s;pointer-events:none;-webkit-user-select:none;user-select:none;color:#fff;font-size:18px}form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background:#6b921d;color:#fff;border-color:#99cc32;width:200px;display:block;padding:10px 0;margin:20px 0;font-size:18px;font-weight:500}form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus{background:#7aa328;border-color:#7aa328}form[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:disabled{opacity:.8;cursor:not-allowed}h4[_ngcontent-%COMP%]{font-size:30px;font-weight:700;color:#00f;margin-bottom:8px;color:#4d4d4d}h1[_ngcontent-%COMP%]{font-size:40px;font-weight:400;color:#00f;margin-bottom:50px}"]}),n})()}];let m=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[d.Bz.forChild(c),d.Bz]}),n})(),g=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[p.ez,m,t.UX]}),n})()}}]);