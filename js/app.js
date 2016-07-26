function showClickResults() {
  alert("I Got Clicked!");
}

function clickResults2() {
  alert("Just Saying 'Hi' Again.");
}

function headerResults() {
  alert("This is an import part of the page.");
}

function bodyResults() {
  alert("The body tag is responding to the click.");
}

document.getElementById("click-button").addEventListener("click", showClickResults);
document.body.addEventListener("click", bodyResults);


document.getElementById("heading").addEventListener("click", headerResults);


var imageTracker = function (name, source) {
  this.imageSource = source;
  this.upVotes = 0;
  this.name = name;
}

var imageOptions = [
  new imageTracker("Banana", "images/banana.jpg"),
  new imageTracker("Bag", "images/bag.jpg"),
  new imageTracker("Boots", "images/boots.jpg"),
  new imageTracker("Chair", "images/chair.jpg"),
  new imageTracker("Cthulhu", "images/cthulhu.jpg"),
  new imageTracker("Dragon", "images/dragon.jpg"),
];

function getThreeImages() {
  var index = Math.floor(Math.random() * 6);
  var source = imageOptions[index].imageSource;
  document.getElementById("image1").src = source;
}