const newDiv1 = document.createElement("div");
const newContent1 = document.createTextNode("New Content Before");
newDiv1.appendChild(newContent1);

const newDiv2 = document.createElement("div");
const newContent2 = document.createTextNode("New Content After");
newDiv2.appendChild(newContent2);

const currentDiv = document.getElementsByClassName("box__items")[0];
currentDiv.innerHTML = "Changed Content";
currentDiv.parentNode.insertBefore(newDiv1, currentDiv)
currentDiv.parentNode.append(newDiv2)