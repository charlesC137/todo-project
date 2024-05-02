import './mode-switch.js';


let todoArray = JSON.parse(localStorage.getItem('todoArray')) || [];
let id = JSON.parse(localStorage.getItem('id')) || 0;

filter('all');

class TodoObject{
  constructor(id, todoText, status){
    this.id = id;
    this.todoText = todoText;
    this.status = status;
  }
}

document.querySelector('.save-btn').addEventListener('click', () => {
  addTodo();
})

document.addEventListener('keyup', (e) => {
  if(e.key === 'Enter'){
    addTodo();
  }
});

document.querySelector('.filter-all').addEventListener('click', () => {
  filter('all');
})

document.querySelector('.filter-active').addEventListener('click', () => {
  filter('active');
})

document.querySelector('.filter-completed').addEventListener('click', () => {
  filter('completed');
})

document.querySelector('.clear-completed').addEventListener('click', clearCompleted)

function addTodo(){
  let todoText = document.querySelector('.input-field').value;
  const todoId = id;
  const status = 'active';

  if(todoText){
    const todo = new TodoObject(todoId, todoText, status);
    todoArray.push(todo);
  
    id++;
    document.querySelector('.input-field').value = '';
    saveToStorage();
    displayFilter();
  }
}

function saveToStorage(){
  localStorage.setItem('todoArray', JSON.stringify(todoArray));
  localStorage.setItem('id', JSON.stringify(id))
}

function removeTodo(){
  document.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const divId = parseInt(e.target.parentElement.parentElement.dataset.id);

      for(let i = 0; i < todoArray.length; i++){
        const todo = todoArray[i];

        if(todo.id === divId){
          todoArray.splice(i, 1)
          displayFilter();
        }
      }
    })
  })
} 

function checkTodo(){
  document.querySelectorAll('.check-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const divId = parseInt(e.target.parentElement.parentElement.dataset.id);
      
      for(let i = 0; i < todoArray.length; i++){
        const todo = todoArray[i];
        
        if(todo.id === divId){
          if(todo.status === 'active'){
            todo.status = 'completed'
            e.target.parentElement.classList.add('check-btn-active');
          } else {
            todo.status = 'active'
            e.target.parentElement.classList.remove('check-btn-active');
          }
          saveToStorage();
          displayFilter();
        }
      }
    })
  })
}

function filter(param){
  const newArray = param === 'all'
  ? todoArray
  : todoArray.filter((todo) => {
    return(todo.status === param)
  });

  let html = '';

  if(newArray.length > 0){
    newArray.forEach((todo) => {
      html += `
        <div data-id="${todo.id}" class="todo">
      
          <button class="check-btn ${todo.status}">
            <img alt="check" class="svg-check" src="./images/icon-check.svg">
          </button>
  
          <div class="todo-text text-${todo.status}">
            ${todo.todoText}
          </div>
  
          <button class="delete-btn">
            <img class="svg-cross" src="./images/icon-cross.svg" alt="cross">
          </button>
        
        </div>
      `
    })
  }
  
  document.querySelector('#todo-count').textContent = newArray.length < 2
    ? `${newArray.length} item`
    : `${newArray.length} items`;

  document.querySelector('.todo-list').innerHTML = html;
  removeTodo();
  activeFilter();
  checkTodo();
  saveToStorage();
}

function clearCompleted(){
  for(let i = 0; i < todoArray.length; i++){
    const todo = todoArray[i];

    if(todo.status === 'completed'){
      todoArray.splice(i, 1);
    }
  }

  displayFilter();
}

function activeFilter(){
  const btns = document.querySelectorAll('.filter-div button');
  
  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      btns.forEach((button) => {
        button.classList.remove('selected-filter')
      })

      e.target.classList.add('selected-filter');
    })
  })
}

function displayFilter(){
  const selectedBtn = document.querySelector('.selected-filter');
   
  if(selectedBtn.classList.contains('filter-active')){
   filter('active')
  } else if(selectedBtn.classList.contains('filter-completed')){
    filter('completed')
  } else {
    filter('all')
  }
}