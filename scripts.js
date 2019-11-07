const ENTER_KEYCODE = 13;
const CLASSES = {
  NODE: 'item',
  CHECKBOX: 'item__checkbox',
  TEXT: 'item__text',
  BUTTON: 'item__button'
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    for (let item of items.querySelectorAll('.item__checkbox')) {
      item.addEventListener('click', finish);
    } 
    for (let item of items.querySelectorAll('.item__text')) {
      item.addEventListener('click', edit);
    }
    for (let item of items.querySelectorAll('.item__button')) {
      item.addEventListener('click', deleteItem);
    }
    _form.addEventListener('submit', formHandler);

    // TODO láta hluti í _items virka
  }

  function formHandler(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const formInput = form.querySelector('.form__input');
    add(formInput.value);
    formInput.value = '';
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    if(e.target.checked){
      e.target.parentElement.className += ' item--done';
    }
    else{
      e.target.parentElement.className = 'item';
    }
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    let inp = el('INPUT', CLASSES.TEXT);
    inp.value = e.target.textContent;
    inp.addEventListener('keyup', (e) => {
      if(e.keyCode === ENTER_KEYCODE)
        commit(e);
    });
    e.target.parentNode.replaceChild(inp, e.target);
    inp.focus();
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    const value = e.target.value;
    const span = el('SPAN', CLASSES.TEXT, edit);
    span.appendChild(document.createTextNode(value));
    e.target.parentNode.replaceChild(span, e.target);
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const node = el('LI', CLASSES.NODE);
        
    let checkbox = el('INPUT', CLASSES.CHECKBOX, finish);
    checkbox.setAttribute('type', 'checkbox');
    node.appendChild(checkbox);

    const span = el('SPAN', CLASSES.TEXT, edit);
    span.appendChild(document.createTextNode(value));
    node.appendChild(span);
    
    const btn = el('BUTTON', CLASSES.BUTTON, deleteItem);
    btn.appendChild(document.createTextNode('Eyða'));
    node.appendChild(btn);

    items.appendChild(node);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    let item = document.createElement(type);
    item.className += className;
    if(clickHandler)
      item.addEventListener('click', clickHandler);
    return item;
  }

  return {
    init: init
  }
})();