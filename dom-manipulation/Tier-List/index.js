let draggedItem;

document.querySelectorAll(".item").forEach(setUpItem);

document.querySelectorAll(".drop-zone").forEach(setUpDropZone);

function setUpItem(item) {
  item.addEventListener("dragstart", onDragItem);
  item.addEventListener("dblclick", onDoubleClickItem);
}

function setUpDropZone(dropZone) {
  dropZone.addEventListener("drop", onDropOverDropZone);
  dropZone.addEventListener("dragover", onDrageoverDropZone);
}

function onDragItem(event) {
  draggedItem = event.target;
}

function onDropOverDropZone() {
  if (this !== draggedItem.parentNode) {
    this.appendChild(draggedItem);
  }
}

function onDrageoverDropZone(event) {
  event.preventDefault();
}

function onDoubleClickItem() {
  const unRankedDropZone = document.getElementById("unranked-drop-zone");

  if (unRankedDropZone != this.parentNode) {
    unRankedDropZone.appendChild(this);
  }
}






