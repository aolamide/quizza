(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{25:function(e,t,a){e.exports=a(37)},30:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(22),i=a.n(l),o=(a(30),a(5)),c=a(11);var u=function(){return r.a.createElement("nav",null,r.a.createElement("ul",null,r.a.createElement(c.b,{to:"/"},r.a.createElement("li",null,"Home")),r.a.createElement("span",{className:"right"},r.a.createElement(c.b,{to:"/howitworks"},r.a.createElement("li",null,"How It Works")),r.a.createElement(c.b,{to:"/createquiz"},r.a.createElement("li",null,"Create Quiz")))))};var s=function(){return document.title="Quizza",r.a.createElement("div",null,r.a.createElement("h3",null," Home "))};var m=function(){return document.title="How It Works | Quizza",r.a.createElement("div",null,r.a.createElement("h3",null," How It Works "))},d=a(6),p=a(7),h=a(9),E=a(8),v=a(10),q=function(e){var t=e.question;return r.a.createElement("div",null,r.a.createElement("div",null,t.title),r.a.createElement("div",{className:"option-row"},r.a.createElement("div",{className:"option"},r.a.createElement("input",{type:"radio",name:"q".concat(t._id),value:"A",id:"opt".concat(t._id,"A")}),r.a.createElement("label",{htmlFor:"opt".concat(t._id,"A")},t.options[0])),r.a.createElement("div",{className:"option"},r.a.createElement("input",{type:"radio",name:"q".concat(t._id),value:"B",id:"opt".concat(t._id,"B")}),r.a.createElement("label",{htmlFor:"opt".concat(t._id,"B")},t.options[1]))),r.a.createElement("div",{className:"option-row"},r.a.createElement("div",{className:"option"},r.a.createElement("input",{type:"radio",name:"q".concat(t._id),value:"C",id:"opt".concat(t._id,"C")}),r.a.createElement("label",{htmlFor:"opt".concat(t._id,"C")},t.options[2])),r.a.createElement("div",{className:"option"},r.a.createElement("input",{type:"radio",name:"q".concat(t._id),value:"D",id:"opt".concat(t._id,"D")}),r.a.createElement("label",{htmlFor:"opt".concat(t._id,"D")},t.options[3]))))},f=function(e){var t=e.questions;return r.a.createElement("div",{style:{marginTop:"50px"}},t.map(function(e){return r.a.createElement(q,{key:e._id,question:e})}))},b=function(e){var t=e.min,a=e.sec,n=e.stop,l=60*t+Number(a),i=setInterval(function(){if(document.forms[0]){var e=Math.floor(l%3600/60),t=Math.floor(l%60),a=t>10?t:"0"+t,r=e>10?e:"0"+e;document.getElementById("countdown").innerHTML=r+":"+a,--l<0&&(clearInterval(i),n())}else clearInterval(i)},1e3);return r.a.createElement("div",{id:"countdown"})},z=function(e){function t(e){var a,n=e.match;return Object(d.a)(this,t),(a=Object(h.a)(this,Object(E.a)(t).call(this))).fetchQuestions=function(e){e.preventDefault(),fetch("https://lalaquiz.herokuapp.com/api/v1/quiz/".concat(a.state.quizId,"/take")).then(function(e){return e.json()}).then(function(e){a.setState({quiz:e.quiz,starting:!0,modalHidden:!0,user:a.user.value})})},a.submitAnswers=function(e){e&&e.preventDefault();var t=[];a.state.quiz.questions.forEach(function(e){t.push(e._id)});var n=[];t.forEach(function(e){n.push(document.forms[0]["q".concat(e)].value)}),fetch("https://lalaquiz.herokuapp.com/api/v1/submit/".concat(a.state.quiz._id),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({answers:n,takenBy:a.state.user})}).then(function(e){return e.json()}).then(function(e){a.setState({starting:!1,result:{score:e.result.score,max:e.maxScore,percent:e.result.score/e.maxScore*100}})})},a.displayModal=function(){a.popup.style.display="block"},a.state={quizId:n.params.quizId,quiz:null,quizCreator:null,starting:!1,user:"",result:null},a}return Object(v.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("https://lalaquiz.herokuapp.com/api/v1/quiz/".concat(this.state.quizId)).then(function(e){return e.json()}).then(function(t){var a=t.quizDetails,n=a.created,r=a.name,l=a.duration,i=a.creator;e.setState({quiz:{created:n,name:r,duration:l},quizCreator:i}),document.title="".concat(r," | Quizza")})}},{key:"render",value:function(){var e=this;if(this.state.quiz){var t=this.state,a=t.user,n=t.result,l=this.state.quiz,i=l.name,o=l.duration,c=l.created,u=this.state.quizCreator.name;if(!this.state.starting&&!this.state.result)return r.a.createElement("div",null,r.a.createElement("h1",null,i),r.a.createElement("p",null,"Created by ",u),r.a.createElement("h2",null,"Duration : ","".concat(o.min," minutes : ").concat(o.sec," seconds")),r.a.createElement("h3",null,"Created : ",new Date(c).toDateString()),r.a.createElement("div",null,r.a.createElement("button",{onClick:this.displayModal},"TAKE QUIZ")),r.a.createElement("div",{ref:function(t){return e.popup=t},className:"popup"},r.a.createElement("form",{onSubmit:this.fetchQuestions},r.a.createElement("input",{required:!0,ref:function(t){return e.user=t},minLength:"3",type:"text",placeholder:"Enter Name"}),r.a.createElement("button",{type:"submit"},"START"))));if(this.state.starting)return r.a.createElement("div",null,r.a.createElement(b,{stop:this.submitAnswers,min:this.state.quiz.duration.min,sec:this.state.quiz.duration.sec}),r.a.createElement("form",null,r.a.createElement(f,{questions:this.state.quiz.questions}),r.a.createElement("button",{onClick:this.submitAnswers},"SUBMIT QUIZ")));if(this.state.result)return r.a.createElement("div",null,r.a.createElement("p",null,"".concat(a,", your score is ").concat(n.percent,"%")),r.a.createElement("p",null,"You got ".concat(n.score," questions correctly out of ").concat(n.max,".")),r.a.createElement("p",null,"See the quiz leaderboard and see where you rank amongst all who have taken quiz ",r.a.createElement("a",{href:"https://aolamide.me/quiz-app/#/quiz/".concat(this.state.quizId,"/leaderboard"),target:"_blank",rel:"noopener noreferrer"},"LEADERBOARD")))}return r.a.createElement("div",null)}}]),t}(n.Component),w=a(14),y=a.n(w),O=a(18),N=function(e){function t(){var e;return Object(d.a)(this,t),(e=Object(h.a)(this,Object(E.a)(t).call(this))).newQuestion=function(){var e=document.createElement("div");e.innerHTML='<textarea required class="question-input" placeholder="Question"></textarea><div class="option-row"><div class="option"><textarea required placeholder="OPTION A"></textarea></div><div class="option"><textarea required placeholder="OPTION B"></textarea></div></div><div class="option-row"><div class="option"><textarea required placeholder="OPTION C"></textarea></div><div class="option"><textarea required placeholder="OPTION D"></textarea></div></div><div><label for="answer">Choose correct answer</label><select id="answer" class="answers"><option disabled>Choose Answer</option><option value="A">Option A</option><option value="B">Option B</option><option value="C">Option C</option><option value="D">Option D</option></select><button title="Delete Question" class="delete-question">DELETE</button></div>',e.classList.add("question"),document.getElementById("questions").appendChild(e)},e.saveQuestions=function(){var t=Object(O.a)(y.a.mark(function t(a){var n,r,l,i,o,c,u,s,m,d,p,h,E,v,q,f,b,z,w;return y.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),t.next=3,document.getElementsByClassName("question");case 3:return n=t.sent,t.next=6,document.querySelectorAll("select");case 6:for(r=t.sent,l=document.getElementById("name").value,i=document.getElementById("duration-minutes").value,o=document.getElementById("duration-seconds").value,c={min:i,sec:o},u=document.getElementById("email").value,s=document.getElementById("qname").value,m={name:l,email:u},d=[],p=[],h=0;h<n.length;h++)E=n[h].children[0].value,v=n[h].children[1].children[0].children[0].value,q=n[h].children[1].children[1].children[0].value,f=n[h].children[2].children[0].children[0].value,b=n[h].children[2].children[1].children[0].value,z={title:E,options:[v,q,f,b]},d.push(z);for(w=0;w<r.length;w++)p.push(r[w].value);e.setState({name:s,questions:d,answers:p,creator:m,duration:c}),window.confirm("Are you sure you want to submit ? \n Quiz contains ".concat(d.length," questions "))&&e.submitQuiz();case 20:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),e.submitQuiz=Object(O.a)(y.a.mark(function t(){var a,n;return y.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://lalaquiz.herokuapp.com/api/v1/newquiz",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e.state)});case 2:return a=t.sent,t.next=5,a.json();case 5:n=t.sent,alert(n);case 7:case"end":return t.stop()}},t)})),e.state={questions:[],answers:[],creator:null,duration:null,expires:null},e}return Object(v.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("click",function(e){e.target.classList.contains("delete-question")&&e.target.parentNode.parentNode.remove()}),document.title="Create Quiz | Quizza"}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:this.saveQuestions},r.a.createElement("div",null,r.a.createElement("label",null,"Name : ")," ",r.a.createElement("input",{required:!0,id:"name",type:"text"})),r.a.createElement("div",null,r.a.createElement("label",null,"Email Address : ")," ",r.a.createElement("input",{required:!0,id:"email",type:"email"})),r.a.createElement("div",null,r.a.createElement("label",null,"Duration : ")," ",r.a.createElement("input",{required:!0,id:"duration-minutes",type:"number",max:"60",placeholder:"MM"})," :",r.a.createElement("input",{required:!0,id:"duration-seconds",type:"number",max:"59",placeholder:"SS"})),r.a.createElement("div",null,r.a.createElement("label",null,"QUIZ NAME :")," ",r.a.createElement("input",{required:!0,id:"qname",type:"text"})),r.a.createElement("div",{id:"questions"},r.a.createElement("div",{className:"question"},r.a.createElement("textarea",{required:!0,className:"question-input",placeholder:"Question"}),r.a.createElement("div",{className:"option-row"},r.a.createElement("div",{className:"option"},r.a.createElement("textarea",{required:!0,placeholder:"OPTION A"})),r.a.createElement("div",{className:"option"},r.a.createElement("textarea",{required:!0,placeholder:"OPTION B"}))),r.a.createElement("div",{className:"option-row"},r.a.createElement("div",{className:"option"},r.a.createElement("textarea",{required:!0,placeholder:"OPTION C"})),r.a.createElement("div",{className:"option"},r.a.createElement("textarea",{required:!0,placeholder:"OPTION D"}))),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"answer"},"Choose correct answer"),r.a.createElement("select",{id:"answer",className:"answers"},r.a.createElement("option",{disabled:!0},"Choose Answer"),r.a.createElement("option",{value:"A"},"Option A"),r.a.createElement("option",{value:"B"},"Option B"),r.a.createElement("option",{value:"C"},"Option C"),r.a.createElement("option",{value:"D"},"Option D")),r.a.createElement("button",{title:"Delete Question",className:"delete-question"},"DELETE")))),r.a.createElement("button",{onClick:this.newQuestion},"ADD"),r.a.createElement("button",{type:"submit"},"SUBMIT QUIZ")))}}]),t}(n.Component),x=function(e){function t(e){var a,n=e.match;return Object(d.a)(this,t),(a=Object(h.a)(this,Object(E.a)(t).call(this))).state={quizId:n.params.quizId,quiz:null,quizCreator:null},a}return Object(v.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("https://lalaquiz.herokuapp.com/api/v1/quiz/".concat(this.state.quizId,"/leaderboard")).then(function(e){return e.json()}).then(function(t){var a=t.name,n=t.takenBy,r=t.created,l=t.creator;e.setState({quiz:{name:a,takenBy:n,created:r},quizCreator:l}),document.title="".concat(a," Leaderboard | Quizza")})}},{key:"render",value:function(){if(this.state.quiz){var e=this.state.quiz,t=e.takenBy,a=e.name,n=e.created,l=this.state.quizCreator.name;return r.a.createElement("div",null,r.a.createElement("h3",null,a),r.a.createElement("h4",null,"Created by ",l," at ",new Date(n).toDateString()),r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("td",null,"Name"),r.a.createElement("td",null,"Score"))),r.a.createElement("tbody",null,t.sort(function(e,t){return Number(t.score)-Number(e.score)}).map(function(e){return r.a.createElement("tr",{key:e._id},r.a.createElement("td",null,e.name),r.a.createElement("td",null,e.score))}))))}return r.a.createElement("div",null,r.a.createElement("h3",null,"Quiz Not Found "),r.a.createElement("p",null,"This quiz might have expired"))}}]),t}(r.a.Component),I=(a(36),function(e){var t=e.exact,a=e.path,n=e.component;return r.a.createElement(o.a,{exact:t,path:a,render:function(e){return r.a.createElement("div",null,r.a.createElement(u,null),r.a.createElement(n,e))}})});var k=function(){return r.a.createElement(c.a,null,r.a.createElement(o.c,null,r.a.createElement(I,{exact:!0,path:"/",component:s}),r.a.createElement(I,{path:"/howitworks",component:m}),r.a.createElement(I,{path:"/createquiz",component:N}),r.a.createElement(o.a,{exact:!0,path:"/quiz/:quizId",component:z}),r.a.createElement(I,{path:"/quiz/:quizId/leaderboard",component:x})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[25,1,2]]]);
//# sourceMappingURL=main.e9067eff.chunk.js.map