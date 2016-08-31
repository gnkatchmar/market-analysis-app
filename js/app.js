//global variables
questionCount = 0;
var buttonsLoc = document.querySelector("#buttons");
var mainLoc = document.querySelector("#main");
var chartLoc = document.querySelector("#chart-container");
var imageLoc = document.getElementById("image-container");
var chartLoc2 = document.getElementById("chart-container");
var chartTitle = "";
var pickedImages = [];

//object constructor
var imageTracker = function (name, source) {
  this.imageSource = source;
  this.totalUpVotes = 0; //total of all players' upVotes
  this.label = name;
  this.playerUpVotes = 0; //current player's upvotes
  this.y = 0; //used for on-the-fly CanvasJS purposes
}

  //added two images to test and correct coding flexibility
var imageOptions = [
  new imageTracker("Bag", "img/bag.jpg"),
  new imageTracker("Banana", "img/banana.jpg"),
  new imageTracker("Boots", "img/boots.jpg"),
  new imageTracker("Cap", "img/cap.jpg"),
  new imageTracker("Chair", "img/chair.jpg"),
  new imageTracker("Cthulhu", "img/cthulhu.jpg"),
  new imageTracker("Dragon", "img/dragon.jpg"),
  new imageTracker("Pen", "img/pen.jpg"),
  new imageTracker("Scissors", "img/scissors.jpg"),
  new imageTracker("Shark", "img/shark.jpg"),
  new imageTracker("Spider Mobile", "img/spidermobile.jpg"),
  new imageTracker("Sweep", "img/sweep.jpg"),
  new imageTracker("Unicorn", "img/unicorn.jpg"),
  new imageTracker("USB", "img/usb.jpg"),
  new imageTracker("Water Can", "img/water_can.jpg"),
  new imageTracker("Wine Glass", "img/wine_glass.jpg"),
];

//event listener and its function
imageLoc.addEventListener("click", recordClick);

function recordClick(event) {
  var clickedImage = event.target;
  var clickedImageSource = clickedImage.src;
  for (var index = 0; index < imageOptions.length; index++) {
    if (clickedImageSource.indexOf(imageOptions[index].imageSource) >= 0) {
	  //  loadImages();
      imageOptions[index].totalUpVotes++;
      imageOptions[index].playerUpVotes++;
    } // if clickedImageSource
  } // for index
  questionCount++;
  setTimeout(function(){imageLoc.setAttribute("class", "left");}, 1);
  if (questionCount < 15) {
    getThreeImages();
  } else {
    getThreeImages();
    localStorage.setItem("votes",JSON.stringify(imageOptions)); //store data
    buttonsLoc.style.display = "block";
    mainLoc.style.display = "none";
  } // if/else
}

//functions
//create initial data store or retrieve existing data store
function loadImageObject() {
  if (localStorage.getItem("votes") == null) {
    localStorage.setItem("votes",JSON.stringify(imageOptions));
  } else {
    imageOptions = JSON.parse(localStorage.getItem("votes"));
    for (i = 0; i < imageOptions.length; i++) {
      imageOptions[i].playerUpVotes = 0; //this is called for new sessions, to rezero player votes
    };
  } // if/else 
}

//display three different images
function getThreeImages() {
  var pickedImages = [];
  imageLoc.setAttribute("class", "left");
  setTimeout(function(){imageLoc.setAttribute("class", "");}, 1000);
  for (var imageID = 1; imageID <= 3; imageID++) {
    do {
      var index = Math.floor(Math.random() * imageOptions.length);
    } while (pickedImages.indexOf(index) >= 0);
    var source = imageOptions[index].imageSource;
    document.getElementById("image" + imageID).src = source;
    pickedImages.push(index);
    } //for imageID
    document.getElementById("questionsAsked").innerText = questionCount + " of 15 product choices made";
}

//player's report using playerUpVotes
function genReport() {
  for (i = 0; i < imageOptions.length; i++) {
    imageOptions[i].y = imageOptions[i].playerUpVotes;
  };
  chartTitle = "Player Vote Report";
  chartLoc.style.visibility = "visible";
  setTimeout(function(){chartLoc2.setAttribute("class", "fade");}, 0000);
  setTimeout(function(){chartLoc2.setAttribute("class", "");}, 1000);
  setTimeout(initializeChart, 1000);
}

//another round for same player or called by newPlayer() after playerUpVotes zeroed
function another15() {
  buttonsLoc.style.display = "none";
  mainLoc.style.display = "block";
  chartLoc.style.visibility = "hidden";
  questionCount = 0;
  getThreeImages();
}

//New player, zero playerUpVotes
function newPlayer() {
   for (i = 0; i < imageOptions.length; i++) {
    imageOptions[i].playerUpVotes = 0;
      };
  another15();
}

function quitApp() {
  document.body.innerHTML = "";
  var goodbye = document.createElement("h2");
  document.body.appendChild(goodbye);
  var goodbyeText = document.createTextNode("Thank you for playing. Your opinions are somewhat valued.");
  goodbye.appendChild(goodbyeText);
}

//marketer's report using totalUpVotes
function marketing() {
  for (i = 0; i < imageOptions.length; i++) {
      imageOptions[i].y = imageOptions[i].totalUpVotes;
  };  //for i
  chartTitle = "Marketer's Report of All Players' Votes";
  chartLoc.style.visibility = "visible";
  setTimeout(function(){chartLoc2.setAttribute("class", "fade");}, 0000);
  setTimeout(function(){chartLoc2.setAttribute("class", "");}, 1000);
  setTimeout(initializeChart, 1000);
}  

//main program, such that is
loadImageObject();
getThreeImages();
