// Modules
const { ipcRenderer } = require("electron");

// Dom Nodes
let showModal = document.querySelector("#show-modal");
let closeModal = document.querySelector("#close-modal");
let modal = document.querySelector("#modal");
let addItem = document.querySelector("#add-item");
let itemUrl = document.querySelector("#url");

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
  }
});

// Listen for keyboard submit
itemUrl.addEventListener("keyup", e => {
  if (e.key === "Enter") addItem.click();
});

// Listen for new item from main process
ipcRenderer.on('new-item-success', (e, newItem) => {
  console.log(newItem);
  
})
