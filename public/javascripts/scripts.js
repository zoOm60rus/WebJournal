$(()=>{$("#user-status").on("change",()=>{const e=$("#user-status").val();"Студент"===e?($(".student-form").css("display","block"),$(".lecturer-form").css("display","none")):"Преподаватель"===e?($(".student-form").css("display","none"),$(".lecturer-form").css("display","block")):($(".student-form").css("display","none"),$(".lecturer-form").css("display","none"))}),$("input").on("focus",()=>{$("p.error").remove(),$("input").removeClass("error"),$("select").removeClass("error")}),$("select").on("change",()=>{$("p.error").remove(),$("input").removeClass("error"),$("select").removeClass("error")}),$(".confirm-button-1").on("click",e=>{e.preventDefault(),$("p.error").remove(),$("input").removeClass("error"),$("select").removeClass("error");let r={};const t={username:"#username",usersurname:"#usersurname",userpatronymic:"#userpatronymic"},s=$("#roots").is(":checked");let o=!0;const a=$("#user-status").val();if(s&&""===a)Object.entries(t).forEach(e=>{""===$(e[1]).val()&&($(e[1]).addClass("error"),o=!1)}),o?r={type:0,name:$("#username").val(),surname:$("#usersurname").val(),patronymic:$("#userpatronymic").val(),isAdmin:s}:$(".create-user h1").after('<p class="error"> Заполните выделенные поля </p>');else if("Студент"===a){const e={...t,fakult:"#fakult",course:"#course"};Object.entries(e).forEach(e=>{""===$(e[1]).val()&&($(e[1]).addClass("error"),o=!1)}),o?r={type:1,name:$("#username").val(),surname:$("#usersurname").val(),patronymic:$("#userpatronymic").val(),isAdmin:s,fakult:$("#fakult").val(),course:$("#course").val()}:$(".create-user h1").after('<p class="error"> Необъодимо заполнить все поля </p>')}else if("Преподаватель"===a){const e={...t,department:"#department"};Object.entries(e).forEach(e=>{""===$(e[1]).val()&&($(e[1]).addClass("error"),o=!1)}),o?r={type:2,name:$("#username").val(),surname:$("#usersurname").val(),patronymic:$("#userpatronymic").val(),isAdmin:s,department:$("#department").val()}:$(".create-user h1").after('<p class="error"> Необъодимо заполнить все поля </p>')}else $("#user-status").addClass("error"),$(".create-user h1").after('<p class="error"> Выберите статус </p>');0===Object.keys(r).length&&r.constructor===Object||$.ajax({type:"POST",data:JSON.stringify(r),contentType:"application/json",url:"/administration/newuser"}).done(e=>{console.log(e)})}),$("#group-chose").on("change",function(){const e=$(this).val();console.log(e),$.ajax({type:"POST",data:JSON.stringify({val:e}),contentType:"application/json",url:"/administration/get/group"}).done(e=>{console.log(e);const r=$("#subject-chose");let t=[];t=r.prop?r.prop("options"):r.attr("options"),$("option",r).remove(),t[0]=new Option("Не выбрано","");for(let r=0;r<e.subjects.length;r+=1)t[r+1]=new Option(e.subjects[r].name,e.subjects[r].id)})}),$(".confirm-button-2").on("click",e=>{e.preventDefault(),$("p.error").remove(),$("select").removeClass("error");const r=[];if(""===$("#lecturer-chose").val()&&r.push("lecturer-chose"),""===$("#group-chose").val()&&r.push("group-chose"),""===$("#subject-chose").val()&&r.push("subject-chose"),Array.isArray(r)&&r.length>0){$(".add-lecturer h1").after('<p class="error"> Необходимо выбрать все селекторы </p>');for(let e=0;e<r.length;e+=1)$(`#${r[e]}`).addClass("error")}else if(Array.isArray(r)&&0===r.length){const e={lecturer:$("#lecturer-chose").val(),group:$("#group-chose").val(),subject:$("#subject-chose").val()};console.log(e),$.ajax({type:"POST",data:JSON.stringify(e),contentType:"application/json",url:"/administration/set/group/lecturer"}).done(e=>{console.log(e)})}})}),$(()=>{let e=!0;$(".switch-ref").on("click",r=>{r.preventDefault(),$("p.error").remove(),$("input").removeClass("error"),$("input").val(""),e?(e=!1,$(".register").show("slow"),$(".login").hide("slow")):(e=!0,$(".login").show("slow"),$(".register").hide("slow"))}),$("input").on("focus",()=>{$("p.error").remove(),$("input").removeClass("error")}),$(".login-button").on("click",e=>{e.preventDefault(),$("p.error").remove(),$("input").removeClass("error");const r={email:$("#log-email").val(),password:$("#log-password").val()};$.ajax({type:"POST",data:JSON.stringify(r),contentType:"application/json",url:"/auth/login"}).done(e=>{e.ok?$(window.location).attr("href","/"):($(".login h1").after(`<p class="error">${e.error}</p>`),e.fields&&e.fields.forEach(e=>{$(`input[name=${e}]`).addClass("error")}))})})}),$(()=>{$("#accordion").accordion({collapsible:!0});const e={id:"",subject:"",value:"",comment:""};function r(){$("p.error").remove(),$("input").removeClass("error"),$("select").removeClass("error"),$(".dialog").css("height","181"),$("#mark-select").val(""),$("#comment").val("")}$(document).tooltip({}),$("select").on("change",()=>{$("p.error").remove(),$("input").removeClass("error"),$("select").removeClass("error"),$(".dialog").css("height","181")});const t=$(".dialog").dialog({autoOpen:!1,dialogClass:"dialog-title",height:300,width:350,modal:!0,buttons:{Ok(){e.value=$("#mark-select").val(),e.comment=$("#comment").val(),$("p.error").remove(),$("#mark-select").removeClass("error"),$(".dialog").css("height","181"),(""!==$("#mark-select").val()||($(".dialog").css("height","250"),$("fieldset").before('<p class="error"> Выберите оценку </p>'),$("#mark-select").addClass("error"),0))&&(!function(e){$.ajax({type:"POST",data:JSON.stringify(e),contentType:"application/json",url:"/marks/update"}).done(r=>{console.log(r),r.ok&&("update"===r.type?(console.log("updating"),$(`.${e.id}`).html(e.value),$(`.${e.id}`).prop("title",`Дата: ${Date(Date.now())}. Комментарии: ${e.comment}`),$(`.${e.id}`).removeClass($(`.${e.id}`).attr("class").split(" ").pop()),$(`.${e.id}`).addClass(`mark${e.value}`)):(console.log("adding"),$(`#new${e.subject}`).before(`<button class="mark- ${r.newId} ${e.subject} mark${e.value}" name=mark-${r.newId} class=mark${e.value} id=${r.newId} title="Дата:${Date(Date.now())}. Комментарии:${e.comment}">${e.value}</button>`)))})}(e),r(),t.dialog("close"))},Cancel(){r(),t.dialog("close")}},close(){r(),t.dialog("close")}});$('button[name^="mark-"]').on("click",function(){const r=$(this).attr("class").split(" ");e.id=r[1],e.subject=r[2],function(e,r){const t=window.location.href.split("/")[window.location.href.split("/").length-1];console.log(t),$.ajax({type:"POST",data:JSON.stringify({page:t}),contentType:"application/json",url:"/marks/get"}).done(t=>{for(let s=0;s<t.data.studentProfile.semesters.length;s+=1)for(let o=0;o<t.data.studentProfile.semesters[s].subjects.length;o+=1)if(t.data.studentProfile.semesters[s].subjects[o]._id===e){for(let e=0;e<t.data.studentProfile.semesters[s].subjects[o].marks.length;e+=1)if(t.data.studentProfile.semesters[s].subjects[o].marks[e]._id===r){$("#mark-select").val(t.data.studentProfile.semesters[s].subjects[o].marks[e].value),$("#comment").val(t.data.studentProfile.semesters[s].subjects[o].marks[e].comments);break}break}})}(r[2],r[1]),t.dialog("open")})}),$(()=>{$(".search-button").on("click",e=>{e.preventDefault();const r={fio:$("#fio").val(),fakult:$("#fakult").val(),course:$("#course").val(),spec:$("#spec").val()};console.log(r),$.ajax({type:"POST",data:JSON.stringify(r),contentType:"application/json",url:"/search/students"}).done(e=>{$(".table-body-td").remove(),$("th").css("width","1000px"),$(".table-head-th-0").css("width","8px"),Object.entries(e.data).reverse().forEach(e=>{e[1].studentProfile&&e[1].studentProfile._id&&$(".table-body").after(`<tr class="table-body-td"><th>${parseInt(e[0],10)+parseInt(1,10)}</th><td><a href="/students/${e[1]._id}">${`${e[1].surname} ${e[1].name} ${e[1].patronymic}`}</a></td><td>${e[1].studentProfile.fakult}</td><td>${e[1].studentProfile.course}</td><td>${e[1].studentProfile.spec}</td></tr>`)})})})});