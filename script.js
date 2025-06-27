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

let tasks=[{
    Index:1,
    Title:'lets get coding',
    completed:false
},{
    Index:2,
    Title:'lets get testibg',
    completed:false
},{
    Index:3,
    Title:'lets get writing',
    completed:false
}
];

function CountTasks(){
    let count=0;
    tasks.forEach(()=>{
        count+=1;
    })
    return count;
}

function renderTasks(tasklist=tasks){
    let html="";
    tasklist.forEach((tasks,Index)=>{
        let completedClass = tasks.completed ? 'completedtask' : '';
        let completedTask = tasks.completed ? 'completedT' : '';
        let task=`<div class="task ${completedClass}">
            <button class="checkBox ${completedTask}" data-index-check='${Index}'>v</button>
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
            renderTasks();
            
}

function addTask(){
   let timeoutId;

if (input.value === '') {
    clearTimeout(timeoutId);

    popup.classList.add('top');
    error.classList.remove('hide');     // Show error
    success.classList.add('hide');      // Hide success

    timeoutId = setTimeout(() => {
        popup.classList.remove('top');
        error.classList.add('hide');    // Cleanup
    }, 3000);
} else {
    clearTimeout(timeoutId);

    popup.classList.add('top');
    success.classList.remove('hide');  // Show success
    error.classList.add('hide');       // Hide error

    timeoutId = setTimeout(() => {
        popup.classList.remove('top');
        success.classList.add('hide'); // Cleanup
    }, 3000);
    let IndexCount=1;
    tasks.forEach(()=>{
         IndexCount+=1;


    })

    
    tasks.push(
        {   Index:IndexCount,
            Title:input.value,
            completed:false
        }
    )
    
    renderTasks();
    }
}


function deleteTask(index){
     tasks.splice(index,1);
     renderTasks();
}

dmBtn.addEventListener('click',()=>{
    document.querySelector('.Main').classList.toggle('darkMode')
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



