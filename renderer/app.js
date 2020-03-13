// Modules
const { ipcRenderer } = require("electron");
const items = require('./items');
// Dom Nodes
let showModal = document.querySelector("#show-modal");
let closeModal = document.querySelector("#close-modal");
let modal = document.querySelector("#modal");
let addItem = document.querySelector("#add-item");
let itemUrl = document.querySelector("#url");

// Disable/enable modal buttons

const toggleModalButtons = () => {
  if(addItem.disabled === true) {
    addItem.disabled = false;
    addItem.style.opacity = 1;
    addItem.innerText = 'Add Item';
    closeModal.style.display = 'inline';
  } else {
    addItem.disabled = true;
    addItem.style.opacity = 0.5;
    addItem.innerText = 'Adding...';
    closeModal.style.display = 'none';
  }
}


// Show modal
showModal.addEventListener("click", e => {
  modal.style.display = "flex";
  itemUrl.focus();
});
// Hide Modal
closeModal.addEventListener("click", e => {
  modal.style.display = "none";
});
// Handle new item
addItem.addEventListener("click", e => {
  // Check a URL exists
  if (itemUrl.value) {
    // Send new item URL to main process
    console.log(`Item URL: ${itemUrl.value}`);
    
    ipcRenderer.send('new-item', itemUrl.value);

    //Disable buttons
    toggleModalButtons();
  }
});

// Listen for keyboard submit
itemUrl.addEventListener("keyup", e => {
  if (e.key === "Enter") addItem.click();
});

// Listen for new item from main process
ipcRenderer.on('new-item-success', (e, newItem) => {
  
  // Add new item to "items" node
  items.addItem(newItem, true);
  //Enable buttons
  toggleModalButtons();

  // Hide modal and clear value;
  modal.style.display = 'none';
  itemUrl.value = '';
})
