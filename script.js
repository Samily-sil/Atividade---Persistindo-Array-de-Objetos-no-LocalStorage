let tasks = [];

const input = document.querySelector('.input__pesquisa');
const addButton = document.querySelector('.button__pesquisa');
const taskList = document.querySelector('.task-list');

const emptyMessage = document.querySelector('.anyTask__body');

function checkEmptyTasks() {
  if (taskList.children.length === 0) {
    emptyMessage.style.display = 'block';
  } else {
    emptyMessage.style.display = 'none';
  }
}

const existingButtons = document.querySelectorAll('.button__task');

existingButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.parentElement.remove();
    checkEmptyTasks();
  });
});

function loadTasks() {
  const storedTasks = localStorage.getItem('listaDeAfazeres');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks); 
    tasks.forEach(taskText => createTask(taskText));
  }
}

function createTask (taskText) {
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('task');

  const span = document.createElement('span');
  span.innerText = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('button__task');
  deleteButton.innerText = 'Excluir';

  deleteButton.addEventListener('click', () => {
      taskDiv.remove();

      tasks = tasks.filter(task => task !== taskText);

      localStorage.setItem('listaDeAfazeres', JSON.stringify(tasks));

      checkEmptyTasks();
  });

  taskDiv.appendChild(span);
  taskDiv.appendChild(deleteButton);
  taskList.appendChild(taskDiv);
}

addButton.addEventListener('click', () => {
  const taskText = input.value.trim();

  if (taskText !== '') {
    createTask(taskText);
    tasks.push(taskText); 
    localStorage.setItem('listaDeAfazeres', JSON.stringify(tasks)); 
    input.value = '';
    checkEmptyTasks();
  }
});

checkEmptyTasks();
loadTasks();

