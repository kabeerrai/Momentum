let dmBtn=document.querySelector(".toggle");
let allTasks=document.querySelector('.tasks')
let input=document.querySelector('.textField')
let addBtn=document.querySelector('.add')
let noOfTasks=document.querySelector('.number') 
let completedFilter=document.querySelector('.completed')
let allFilter=document.querySelector('.all')
let activeFilter=document.querySelector('.active')
let popup=document.querySelector('.popup')
let error=document.querySelector('.error');
let success=document.querySelector('.success');

let tasks=JSON.parse(localStorage.getItem('tasks') || '[]');
let mode=JSON.parse(localStorage.getItem('mode'))||'';

function saveToLocalStorage(){
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function trackMode(){
    localStorage.setItem('mode',JSON.stringify(mode))
}

function CountTasks(){
   
    return tasks.length;
}

function renderTasks(tasklist=tasks){
    let html="";
    tasklist.forEach((tasks,Index)=>{
        let completedClass = tasks.completed ? 'completedtask' : '';
        let completedTask = tasks.completed ? 'completedT' : '';
        let task=`<div class="task ${completedClass}">
            <button class="checkBox ${completedTask}" data-index-check='${Index}'>✔️</button>
            <span class="taskTitle">${tasks.Title}</span>
            <button class="delete" data-index='${Index}'>X</button>
        </div>`
        html+=task;
    })
    allTasks.innerHTML= html;
    noOfTasks.innerHTML=CountTasks();

     let delbtns=document.querySelectorAll(`.delete`);
    
     delbtns.forEach((delbtn)=>{
        delbtn.addEventListener('click',()=>{
                let index=parseInt(delbtn.getAttribute('data-index'));
                deleteTask(index);
            })
     })


     let completeBtns=document.querySelectorAll('.checkBox');
     completeBtns.forEach((btn)=>{
        btn.addEventListener('click',()=>{
                let index=parseInt(btn.getAttribute('data-index-check'));
                completeTask(index);
        })
     })
     
   
}

function completeTask(index){
            if( tasks[index].completed===false){
                tasks[index].completed=true;
            }else if ( tasks[index].completed===true){
                tasks[index].completed=false
            }
            saveToLocalStorage();
            renderTasks();
            
}

let timeoutId;
function addTask(){
if (input.value === '') {
    clearTimeout(timeoutId);

    popup.classList.add('top');
    error.classList.remove('hide');     
    success.classList.add('hide');      

    timeoutId = setTimeout(() => {
        popup.classList.remove('top');
        error.classList.add('hide');    
    }, 3000);
} else {
    clearTimeout(timeoutId);

    popup.classList.add('top');
    success.classList.remove('hide');  
    error.classList.add('hide');       

    timeoutId = setTimeout(() => {
        popup.classList.remove('top');
        success.classList.add('hide'); 
    }, 3000);
  
    let IndexCount= tasks.length +1;

    tasks.push(
        {   Index:IndexCount,
            Title:input.value,
            completed:false
        }
    )
    
    saveToLocalStorage();
    renderTasks();
    }
}


function deleteTask(index){

     tasks.splice(index,1);
     saveToLocalStorage();
     renderTasks();
}

function renderMode(){
    let main=document.querySelector('.Main')
    main.classList.remove('darkMode')
    if(mode==='darkMode'){
    main.classList.add('darkMode');
    }
}

renderMode();

dmBtn.addEventListener('click',()=>{
    if(mode===""){
    mode='darkMode'
    }else if(mode==="darkMode"){
    mode=""
    }
    renderMode();
    trackMode();
})

renderTasks();

addBtn.addEventListener('click',()=>{
        addTask() ;
        input.value='';
})


completedFilter.addEventListener('click',()=>{

    completedFilter.classList.add('fStyleSelect')
    allFilter.classList.remove('fStyleSelect')
    activeFilter.classList.remove('fStyleSelect')
   
    renderTasks(tasks.filter(t =>t.completed));
})

activeFilter.addEventListener('click',()=>{

    completedFilter.classList.remove('fStyleSelect')
    allFilter.classList.remove('fStyleSelect')
    activeFilter.classList.add('fStyleSelect')
    
    renderTasks(tasks.filter(t =>!t.completed));
})

allFilter.addEventListener('click',()=>{
    

    completedFilter.classList.remove('fStyleSelect')
    allFilter.classList.add('fStyleSelect')
    activeFilter.classList.remove('fStyleSelect')
    
    renderTasks(tasks);
})



