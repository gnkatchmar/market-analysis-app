//global variables
questionCount = 0;
var buttonsLoc = document.querySelector("#buttons");
var mainLoc = document.querySelector("#main");
//var tableLoc = document.querySelector("#table");
var pickedImages = [];

//object constructor
var imageTracker = function (name, source) {
  this.imageSource = source;
  this.y = 0; // Y = upVotes; Used for CanvasJS
  this.label = name;
}

var imageOptions = [
  new imageTracker("Bag", "img/bag.jpg"),
  new imageTracker("Banana", "img/banana.jpg"),
  new imageTracker("Boots", "img/boots.jpg"),
  new imageTracker("Chair", "img/chair.jpg"),
  new imageTracker("Cthulhu", "img/cthulhu.jpg"),
  new imageTracker("Dragon", "img/dragon.jpg"),
  new imageTracker("Pen", "img/pen.jpg"),
  new imageTracker("Scissors", "img/scissors.jpg"),
  new imageTracker("Shark", "img/shark.jpg"),
  new imageTracker("Sweep", "img/sweep.jpg"),
  new imageTracker("Unicorn", "img/unicorn.jpg"),
  new imageTracker("USB", "img/usb.jpg"),
  new imageTracker("Water Can", "img/water_can.jpg"),
  new imageTracker("Wine Glass", "img/wine_glass.jpg"),
];

//event listener
document.getElementById("image-container").addEventListener("click", recordClick);

function recordClick(event) {
  var clickedImage = event.target;
  var clickedImageSource = clickedImage.src;
  for (var index = 0; index < imageOptions.length; index++) {
    if (clickedImageSource.indexOf(imageOptions[index].imageSource) >= 0) {
      imageOptions[index].y++;
      console.log(imageOptions[index].y);
    } // if clickedImageSource
  } // for index
  questionCount++;
  if (questionCount < 15) {
    getThreeImages();
  } else {
    getThreeImages();
    buttonsLoc.style.display = "block";
    mainLoc.style.display = "none";
  } // if/else
}

//functions
function getThreeImages() {
  var pickedImages = [];
  for (var imageID = 1; imageID <= 3; imageID++) {
    do {
      var index = Math.floor(Math.random() * 14);
    } while (pickedImages.indexOf(index) >= 0);
    var source = imageOptions[index].imageSource;
    document.getElementById("image" + imageID).src = source;
    pickedImages.push(index);
    }
    document.getElementById("questionsAsked").innerText = questionCount + " of 15 product choices made";
}
// function genReport () {
//   var table = document.createElement("table");
//   tableLoc.appendChild(table);
//     for (var index = 0; index < imageOptions.length; index++) {
//       var currentImage = imageOptions[index];
//       function rows (cell1, cell2) {
//         var row = document.createElement("tr");
//         var itemCell = document.createElement("td");
//         var upvoteCell = document.createElement("td");
//         var item = document.createTextNode(cell1);
//         var upvote = document.createTextNode(cell2 + " votes");
//         itemCell.appendChild(item);
//         upvoteCell.appendChild(upvote);
//         row.appendChild(itemCell);
//         row.appendChild(upvoteCell);
//         table.appendChild(row);
//       };  //function rows
//       rows (imageOptions[index].label, imageOptions[index].y);
//    };  // for index
// }

function genReport() {
initializeChart();
}

function another15() {
  buttonsLoc.style.display = "none";
  mainLoc.style.display = "block";
  //document.getElementById("table").innerHTML = "";
  questionCount = 0;
  getThreeImages();
}

function quitApp() {
  document.body.innerHTML = "";
  var goodbye = document.createElement("h2");
  document.body.appendChild(goodbye);
  var goodbyeText = document.createTextNode("Thank you for playing. Your opinions are somewhat valued.");
  goodbye.appendChild(goodbyeText);
}

//main program
getThreeImages();
