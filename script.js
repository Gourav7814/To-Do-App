let tasks = [];

const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const progressBar = document.getElementById('progress-bar');
const taskCount = document.getElementById('task-count');
const congratsPopup = document.getElementById('congrats-popup');

addTaskBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text !== '') {
    tasks.push({ text, completed: false });
    taskInput.value = '';
    renderTasks();
  }
});

taskInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTaskBtn.click();
});

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = "flex justify-between items-center bg-[#334155] p-3 rounded shadow";

    const left = document.createElement('div');
    left.className = "flex items-center gap-2";

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.className = "accent-cyan-400 w-5 h-5";
    checkbox.addEventListener('change', () => {
      task.completed = !task.completed;
      renderTasks();
    });

    const span = document.createElement('span');
    span.textContent = task.text;
    span.className = task.completed ? "line-through text-cyan-400" : "text-white";

    left.appendChild(checkbox);
    left.appendChild(span);

    const right = document.createElement('div');
    right.className = "flex gap-2";

    const editBtn = document.createElement('button');
    editBtn.innerHTML = '✏️';
    editBtn.className = "hover:text-yellow-400";
    editBtn.onclick = () => {
      const newText = prompt("Edit your task:", task.text);
      if (newText !== null) {
        task.text = newText.trim();
        renderTasks();
      }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.className = "hover:text-red-500";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      renderTasks();
    };

    right.appendChild(editBtn);
    right.appendChild(deleteBtn);

    li.appendChild(left);
    li.appendChild(right);

    taskList.appendChild(li);
  });

  updateProgress();
}

function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;

  const percent = total === 0 ? 0 : (completed / total) * 100;
  progressBar.style.width = `${percent}%`;
  taskCount.textContent = `${completed} / ${total}`;

  if (total > 0 && completed === total) {
    showCelebration();
  } else {
    hideCelebration();
  }
}

function showCelebration() {
  createStars();
  showBottomMessage();
}

function showBottomMessage() {
  const popup = document.getElementById('bottom-popup');
  popup.classList.remove('hidden');
  popup.classList.add('animate-bounce');

  setTimeout(() => {
    popup.classList.add('hidden');
    popup.classList.remove('animate-bounce');
  }, 3000);
}

function createStars() {
  for (let i = 0; i < 30; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    Object.assign(star.style, {
      position: 'fixed',
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 20 + 10}px`,
      color: '#facc15',
      animation: 'fly 1.5s ease-out forwards',
    });
    star.textContent = '⭐';
    document.body.appendChild(star);
  }
}

const style = document.createElement('style');
style.textContent = `
@keyframes fly {
  0% { transform: scale(0.5) translateY(0); opacity: 1; }
  100% { transform: scale(1.2) translateY(-100px); opacity: 0; }
}
`;
document.head.appendChild(style);
