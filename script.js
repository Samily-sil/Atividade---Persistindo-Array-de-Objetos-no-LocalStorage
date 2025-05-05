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
    input.value = '';
    checkEmptyTasks();
  }
});

checkEmptyTasks();
