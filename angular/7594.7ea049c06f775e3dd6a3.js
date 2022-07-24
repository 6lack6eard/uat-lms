"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7594],{7594:(_,g,r)=>{r.r(g),r.d(g,{StudentAttendanceModule:()=>P});var d=r(8583),l=r(5855),o=r(665),a=r(2205),t=r(639),p=r(4981),u=r(2192),C=r(1105);function f(n,s){1&n&&(t.TgZ(0,"div",7),t.TgZ(1,"div",8),t.TgZ(2,"div",9),t.TgZ(3,"h4"),t._uU(4,"Attendance Graph"),t.qZA(),t.TgZ(5,"div",10),t._UZ(6,"canvas",11),t.qZA(),t.qZA(),t.qZA(),t.qZA())}const M=[{path:"",component:(()=>{class n{constructor(e,c,i){this.userService=e,this.schoolService=c,this.lmsCourse=i,this.filterForm=new o.cw({class:new o.NI(""),session:new o.NI(""),id:new o.NI("")})}ngOnInit(){a.kL.register(...a.zX)}studentByFilter(){this.schoolService.filterStudent(this.filterForm.value).subscribe(e=>{this.student=e.result[0],console.log(this.student),this.absentDateCount=this.student.absentDate.length,this.getTotalActiveDate()})}getTotalActiveDate(){this.userService.getTotalActiveDate().subscribe(e=>{this.totalDateCount=e.result,this.attendanceGraph(this.totalDateCount,this.absentDateCount)})}attendanceGraph(e,c){new a.kL("topperVsMyMarksChart",{type:"bar",data:{labels:["Total","Present","Absent"],datasets:[{label:"No. of days",data:[e,e-c,c],backgroundColor:["rgba(157, 3, 252, 0.6)","rgba(3, 78, 252, 0.6)","rgba(252, 3, 3, 0.6)"],borderColor:["rgba(157, 3, 252, 1)","rgba(3, 78, 252, 1)","rgba(252, 3, 3, 1)"],borderWidth:1}]},options:{scales:{y:{beginAtZero:!0,title:{display:!0,text:"Days"}}}}})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(p.K),t.Y36(u.E),t.Y36(C.u))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-student-attendance"]],decls:13,vars:2,consts:[[1,"filter-student"],[1,"filter"],[3,"formGroup","ngSubmit"],[1,"form-grp"],["type","text","formControlName","id"],["type","submit"],["class","row",4,"ngIf"],[1,"row"],[1,"col"],[1,"details"],[1,"chart"],["id","topperVsMyMarksChart"]],template:function(e,c){1&e&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"h2"),t._uU(3,"View Attendance"),t.qZA(),t.TgZ(4,"form",2),t.NdJ("ngSubmit",function(){return c.studentByFilter()}),t.TgZ(5,"div",3),t.TgZ(6,"label"),t._uU(7,"Enter Mobile no. or Email id or User id"),t.qZA(),t._UZ(8,"input",4),t.qZA(),t.TgZ(9,"div",3),t.TgZ(10,"button",5),t._uU(11,"Search"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.YNc(12,f,7,0,"div",6),t.qZA()),2&e&&(t.xp6(4),t.Q6J("formGroup",c.filterForm),t.xp6(8),t.Q6J("ngIf",c.student))},directives:[o._Y,o.JL,o.sg,o.Fj,o.JJ,o.u,d.O5],styles:['.filter-student[_ngcontent-%COMP%]{min-height:100vh;min-width:100%;background:linear-gradient(135deg,rgba(0,0,255,.3),rgba(0,0,255,.45)),url(bg-2.ef2b19d92aeab4738af9.png);background-position:center;background-size:cover;background-attachment:fixed;padding:50px}h2[_ngcontent-%COMP%]{font-size:50px;font-weight:700;color:#ffc300;margin-bottom:16px}.course[_ngcontent-%COMP%]{margin-bottom:50px}.course[_ngcontent-%COMP%]   .course-list[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}.course[_ngcontent-%COMP%]   .course-list[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:inline-block;min-width:150px;padding:10px 20px;margin-right:20px;margin-bottom:20px;background:#0000ff;color:#fff;text-align:center;border-radius:4px;font-size:30px;font-weight:700;cursor:pointer}.course[_ngcontent-%COMP%]   .course-list[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{outline:none;padding:10px;border-radius:4px;border:1px solid #4d4d4d;font-size:20px;font-weight:500}.filter[_ngcontent-%COMP%]{margin-bottom:50px}.filter[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{width:100%;display:flex}.filter[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .form-grp[_ngcontent-%COMP%]{margin-right:20px}.filter[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .form-grp[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;margin-bottom:0;font-weight:700;font-size:20px;color:#00f}.filter[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .form-grp[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .filter[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .form-grp[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{width:100%;display:block;padding:10px;border:1px solid #4d4d4d;border-radius:4px;outline:none}.filter[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .form-grp[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background:#0000ff;display:inline-block;height:100%;width:200px;font-size:20px;font-weight:500;text-transform:uppercase;color:#fff;border-radius:4px;border:none}.filter[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:20px;font-size:30px}.details[_ngcontent-%COMP%]{background:rgba(255,255,255,.6);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);box-shadow:0 10px 10px -5px #99f;padding:20px;border-radius:20px}.details[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#00f;font-size:16px;font-weight:700;text-transform:uppercase}.details[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]:before{content:"";display:inline-block;background:#0000ff;height:10px;width:10px;border-radius:50%;margin-right:10px}.details[_ngcontent-%COMP%]   .grp[_ngcontent-%COMP%]{margin:24px 0}.details[_ngcontent-%COMP%]   .grp[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#00f;font-size:16px;font-weight:700}.details[_ngcontent-%COMP%]   .grp[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:30px;font-weight:400;color:#000}.details[_ngcontent-%COMP%]   .password[_ngcontent-%COMP%]{margin-top:100px}.details[_ngcontent-%COMP%]   .password[_ngcontent-%COMP%]   .form-grp[_ngcontent-%COMP%]{width:100%}.details[_ngcontent-%COMP%]   .password[_ngcontent-%COMP%]   .form-grp[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{width:100%;padding:20px 10px 10px;border:none;background:rgba(255,255,255,.5)}.details[_ngcontent-%COMP%]   .password[_ngcontent-%COMP%]   .form-grp[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:valid + label[_ngcontent-%COMP%]{transform:translate(10px,-55px);font-size:14px;transition:all .3s}.details[_ngcontent-%COMP%]   .password[_ngcontent-%COMP%]   .form-grp[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;padding:20px 10px 10px;border:none;background:rgba(77,77,77,.5)}.details[_ngcontent-%COMP%]   .password[_ngcontent-%COMP%]   .form-grp[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{outline:none}.details[_ngcontent-%COMP%]   .password[_ngcontent-%COMP%]   .form-grp[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder{color:transparent}.details[_ngcontent-%COMP%]   .password[_ngcontent-%COMP%]   .form-grp[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus + label[_ngcontent-%COMP%], .details[_ngcontent-%COMP%]   .password[_ngcontent-%COMP%]   .form-grp[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:not(:placeholder-shown) + label[_ngcontent-%COMP%]{transform:translate(10px,-55px);font-size:14px;transition:all .3s}.details[_ngcontent-%COMP%]   .password[_ngcontent-%COMP%]   .form-grp[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{transform:translate(10px,-40px);transition:all .3s;pointer-events:none;-webkit-user-select:none;user-select:none;color:#000;font-size:18px;font-weight:500}.details[_ngcontent-%COMP%]   .password[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background:#0000ff;color:#fff;border-color:#00f;width:200px;display:block;padding:10px 0;font-size:18px;font-weight:500}.details[_ngcontent-%COMP%]   .password[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus{background:#0000cc;border-color:#00c}.details[_ngcontent-%COMP%]   .password[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:disabled{opacity:.5;cursor:auto}.student[_ngcontent-%COMP%]   .student-details[_ngcontent-%COMP%]{margin-bottom:20px;background-color:#edf9de;padding:20px;border-radius:15px}.student[_ngcontent-%COMP%]   .student-details[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]{width:100%}.student[_ngcontent-%COMP%]   .student-details[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{width:33.33%;margin-bottom:10px;font-size:20px}.student[_ngcontent-%COMP%]   .student-details[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:#00f}.student[_ngcontent-%COMP%]   .student-details[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:500}.student[_ngcontent-%COMP%]   .student-details[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:none;border-radius:4px;background:red;color:#fff;font-weight:500;font-size:18px;padding:5px 20px;margin-top:20px}']}),n})()}];let O=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[l.Bz.forChild(M)],l.Bz]}),n})(),P=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[d.ez,O,o.UX]]}),n})()}}]);