"use strict";

/* Retrieving HTML buttons */
const mainElement = document.querySelector(".mainEl");
const undoBtn = document.querySelector(".undo");
const redoBtn = document.querySelector(".redo");
const clearBtn = document.querySelector(".clear");

/* Arrays */
const addedItems = [];
const redoItems = [];

/* Button enabling/disabling handler */
const btnUpdate = function () {
  if (addedItems.length > 0) {
    undoBtn.disabled = false;
  } else {
    undoBtn.disabled = true;
  }

  if (redoItems.length > 0) {
    redoBtn.disabled = false;
  } else {
    redoBtn.disabled = true;
  }

  if (addedItems.length > 0 || redoItems.length > 0) {
    clearBtn.disabled = false;
  } else {
    clearBtn.disabled = true;
  }
};

/* Main element eventListener to capture clicks that will create the circles */
mainElement.addEventListener("click", (e) => {
  e.preventDefault();
  const cordX = e.clientX;
  const cordY = e.clientY;

  /* Circle drawing handler */
  const drawCircle = function (x, y) {
    const circle = document.createElement("span");
    circle.classList.add("circle");
    circle.style.top = `${y - 8}px`;
    circle.style.left = `${x - 8}px`;
    mainElement.appendChild(circle);
    addedItems.push(circle);
    btnUpdate();
  };

  drawCircle(cordX, cordY);
});

/* Undo button handler */
undoBtn.addEventListener("click", () => {
  const lastCircle = mainElement.querySelector(".circle:last-child");
  if (lastCircle) {
    const removedItem = addedItems.pop();
    redoItems.push(removedItem);
    lastCircle.remove();
    btnUpdate();
  }
});

/* Redo button handler */
redoBtn.addEventListener("click", () => {
  const lastRemovedItem = redoItems.pop();
  mainElement.appendChild(lastRemovedItem);
  addedItems.push(lastRemovedItem);
  btnUpdate();
});

/* Clear button handler */
clearBtn.addEventListener("click", () => {
  const circles = document.querySelectorAll(".circle");
  for (let i = 0; i < circles.length; i++) {
    circles[i].remove();
  }
  addedItems.length = 0;
  redoItems.length = 0;
  btnUpdate();
});
