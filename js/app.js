//global variables
questionCount = 0;
var buttonsLoc = document.querySelector("#buttons");
var mainLoc = document.querySelector("#main");
var chartLoc = document.querySelector("#chart-container");
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
document.getElementById("image-container").addEventListener("click", recordClick);

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
      var index = Math.floor(Math.random() * imageOptions.length);
    } while (pickedImages.indexOf(index) >= 0);
    var source = imageOptions[index].imageSource;
    document.getElementById("image" + imageID).src = source;
    pickedImages.push(index);
    } //for imageID
    document.getElementById("questionsAsked").innerText = questionCount + " of 15 product choices made";
}

function loadImages() {
  if (localStorage.getItem("images") == null) {
    
   /* imageOptions.push(new imageTracker("Bag", "img/bag.jpg"));
	imageOptions.push(new imageTracker("Banana", "img/banana.jpg"));
    imageOptions.push(new imageTracker("Boots", "img/boots.jpg"));
	imageOptions.push(new imageTracker("Cap",   "img/cap.jpg"));
    imageOptions.push(new imageTracker("Chair", "img/chair.jpg"));
    imageOptions.push(new imageTracker("Cthulhu", "img/cthulhu.jpg"));
    imageOptions.push(new imageTracker("Dragon", "img/dragon.jpg"));
	imageOptions.push(new imageTracker("Pen", "img/pen.jpg"));
	imageOptions.push(new imageTracker("Scissors", "img/scissors.jpg"));
	imageOptions.push(new imageTracker("Shark", "img/shark.jpg"));
	imageOptions.push(new imageTracker("Spider Mobile", "img/spidermobile.jpg"));
	imageOptions.push(new imageTracker("Sweep", "img/sweep.jpg"));
	imageOptions.push(new imageTracker("Unicorn", "img/unicorn.jpg"));
	imageOptions.push(new imageTracker("USB", "img/usb.jpg"));
	imageOptions.push(new imageTracker("Water Can", "img/water_can.jpg"));
	imageOptions.push(new imageTracker("Wine Glass", "img/wine_glass.jpg"));
	console.log("here");
	*/
	for(var i=0; i < imageOptions.length; i++)
	{
	localStorage.setItem(imageOptions[i].label, imageOptions[i].imageSource );
	}
	
  } else {
    var storedImages = JSON.parse(localStorage.getItem("images"));
    for (var index = 0; index < storedImages.length; index++) {
      var image = storedImages[index];
      var tracker = new imageTracker(image.label, image.imageSource);
      tracker.totalUpVotes = image.totalUpVotes;
      imageOptions.push(tracker);
    }
  }
}



//player's report using playerUpVotes
function genReport() {
  for (j = 0; j < imageOptions.length; j++) {
    imageOptions[j].y = imageOptions[j].playerUpVotes;
  };
  chartTitle = "Player Vote Report";
  chartLoc.style.visibility = "visible";
  initializeChart();
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
//  document.body.innerHTML = "";
  for (i = 0; i < imageOptions.length; i++) {
      imageOptions[i].y = imageOptions[i].totalUpVotes;
  };  //for i
  chartTitle = "Marketer's Report of All Players' Votes";
  chartLoc.style.visibility = "visible";
  initializeChart();
}  

//main program, such that is
loadImages();
getThreeImages();
