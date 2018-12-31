var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.querySelector('#filter');

// Form submit event
form.addEventListener('submit', addItem);
// Delete event
itemList.addEventListener('click', removeItem);
//filter searches
filter.addEventListener('keyup', filterSearch);

//function for adding item
function addItem(e) {
   e.preventDefault();
   //get input value
   var newItem = document.querySelector('#item').value;
   //create new li element

   var li = document.createElement('li');
   li.className = 'list-group-item';
   //add text node with some input value
   li.appendChild(document.createTextNode(newItem));

   //del button
   var button = document.createElement('button');
   //add classname
   button.className = 'btn btn-danger float-right btn-sm delete';
   //x sign
   button.appendChild(document.createTextNode('X'));
   //appending li
   li.appendChild(button);

   itemList.appendChild(li);
   
   // Saving it to local storage
   if (!localStorage.getItem('list')) {
      var locLi = [];
      locLi.push(newItem);
      localStorage.setItem('list', JSON.stringify(locLi));
   } else {
      var locLi = JSON.parse(localStorage.getItem('list'));
      locLi.push(newItem);
      localStorage.setItem('list', JSON.stringify(locLi));
   }
   //resetting form
   form.reset();
}

//function for removing item 
function removeItem(e) {
   if (e.target.classList.contains('delete')) {
      var li = e.target.parentElement;
      //for older browsers who support  conventional method in which only parent can remove child
      //itemList.removeChild(li);
      //for newer browsers
      li.remove();
   }
}

//funtion for filter
function filterSearch(e) {
   // convert to lowercase
   var text = e.target.value.toLowerCase();
   var items = itemList.getElementsByTagName('li');
   //converting to array
   Array.from(items).forEach(filterer);

   function filterer(item) {
      var itemName = item.firstChild.textContent.toLowerCase();
      // console.log(itemName);
      if (itemName.indexOf(text) != -1) {
         item.style.display = 'block';
      } else {
         item.style.display = 'none';
      }
   }
}

// loading on screen
function load() {
   if (localStorage.getItem('list') != null) {
   var li = JSON.parse(localStorage.getItem('list'));
   Array.from(li).forEach(set);

   function set(item) {
      var li = document.createElement('li');
      li.className = 'list-group-item';
      //add text node with some input value
      li.appendChild(document.createTextNode(item));
      //del button
      var button = document.createElement('button');
      //add classname
      button.className = 'btn btn-danger float-right btn-sm delete';
      //x sign
      button.appendChild(document.createTextNode('X'));
      //appending li
      li.appendChild(button);
      itemList.appendChild(li);
   }
}
}