const input = document.createElement('input');
const button = document.createElement('button');
const container = document.querySelector('#container');
const ul = document.createElement('ul');
let items;
container.appendChild(input);
container.appendChild(button);
container.append(ul);
button.textContent = 'ADD';
button.addEventListener('click', buttonHandler);
input.addEventListener('keypress', function raiseKeyEvent(event) {
  if (event.keyCode === 13) {
    buttonHandler();
  }
});

if (localStorage.getItem('tasks')) {
  drawLocalStorage();
}
function buttonHandler() {
  if (input.value && !(input.value.replace(/\s/g, '') === '')) {
    const item = document.createElement('li');
    item.textContent = input.value;
    item.id = container.childNodes.length - 2;
    ul.appendChild(item);
  }
  input.value = '';
  sort();
}

function sort() {
  items = document.querySelectorAll('li');
  const sortedItems = Array.from(items)
    .map(element => element.textContent)
    .sort();
  localStorage.setItem('tasks', JSON.stringify(sortedItems));
  sortedItems.forEach((element, index) => (items[index].textContent = element));
}

function drawLocalStorage() {
  Array.from(JSON.parse(localStorage.getItem('tasks'))).forEach(element => {
    const item = document.createElement('li');
    item.textContent = element;
    item.id = container.childNodes.length - 2;
    ul.appendChild(item);
  });
}
