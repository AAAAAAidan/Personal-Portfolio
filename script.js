// TODO
// - Add projects and videos
// - Globalize index/next()/prev() usage
// - Merge global variables into objects or arrays

var footerWords = [
  ["I"], // subject nouns
  ["love", "hate"], // descriptor verbs
  ["rapidly", "vigourously"], // adverbs
  ["eating", "drinking"], // action verbs
  ["soup", "water"], // object nouns
  [".", "!"] // punctuation marks
];
var projects = [

];
var photos = [
  "IMG_20170224_192712724", "IMG_20190406_180351743_HDR", "IMG_20190406_180724273_HDR",
  "IMG_20190513_162037112", "IMG_20190514_114607604", "IMG_20191227_140718813",
  "IMG_20200416_085053595", "IMG_20200704_081445184_HDR", "IMG_20200810_141533258_HDR",
  "IMG_20200828_172111985", "IMG_20200905_080326036_HDR", "IMG_20201017_122145598",
  "IMG_20201017_122603469", "IMG_20201022_152635575_HDR", "IMG_20201023_181514948",
  "IMG_20201024_123922633", "IMG_20201030_174537221_HDR", "IMG_20201121_123609294_HDR",
  "IMG_20201204_140000878", "IMG_20210129_135657586_HDR", "IMG_20210130_075346801_HDR",
  "IMG_20210130_075633060", "IMG_20210130_124630153", "IMG_20210212_135352723",
  "IMG_20210213_074824019_HDR", "IMG_20210403_104505220_HDR", "IMG_20210415_153802017",
  "IMG_20210416_180316157_HDR", "IMG_20210430_180546789", "IMG_20210502_183715090",
  "IMG_20210507_153859839", "IMG_20210508_100346499_HDR", "IMG_20210509_101708955_HDR",
  "IMG_20210509_104836386_HDR", "IMG_20210515_080717175", "IMG_20210515_082614599",
  "IMG_20210515_083245335_HDR", "IMG_20210515_083248368_HDR", "IMG_20210515_083254767_HDR",
  "IMG_20210613_160904142", "IMG_20210701_160209025", "IMG_20210701_160252889_HDR"
];
var fun = [
  "apollo",
  "damon",
  "ema",
  "trucy"
];

var galleryImg;
var galleryIndex = 0;
var funImgs;
var funIndex = 0;

var element;
var title;
var description;



// Called on page load, randomize the page contents
function onLoad() {
  galleryImg = document.getElementById("galleryImg");
  funImgs = document.getElementsByClassName("funImg");
  randomizeContent();
  showRandomDiv();
}



// Display one of the main divs randomly
function showRandomDiv() {
  var divs = document.getElementsByClassName("mainDiv");
  var divIndex = Math.floor(Math.random() * divs.length);
  var divId = divs[divIndex].getAttribute("id");
  showDiv(divId);
}



// Called on page load and change, randomize the background color and image
function randomizeContent() {
  // Randomize the html background image
  var imgIndex = Math.floor(Math.random() * photos.length);
  document.documentElement.style.backgroundImage = "url(media/photos/" + photos[imgIndex] + ".jpg)";

  // Randomize the body background color and opacity
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  var alpha = Math.random();
  document.body.style.backgroundColor = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";

  // Randomize the footer
  var content = "";

  for (var wordsIndex = 0; wordsIndex < footerWords.length; wordsIndex++) {
    var word = footerWords[wordsIndex];
    var wordIndex = Math.floor(Math.random() * word.length);
    content += " " + word[wordIndex];
  }

  var length = content.length;
  content = content.slice(0, length - 2) + content.slice(length - 1);
  document.getElementById("footerContent").innerHTML = content;
}



// Display the specified main div, and hide the rest
function showDiv(divId) {
  randomizeContent();
  var divs = document.getElementsByClassName("mainDiv");

  for (var divIndex  = 0; divIndex < divs.length; divIndex++) {
    var div = divs[divIndex];

    if (div.getAttribute("id") == divId) {

      if (divId == "photos") {
        galleryIndex = Math.floor(Math.random() * photos.length);
        galleryImg.src = "media/photos/" + photos[galleryIndex] + ".jpg";
      }
      else if (divId == "fun") {
        for (funIndex = 0; funIndex < funImgs.length; funIndex++) {
          var funImg = funImgs[funIndex];
          funImgsIndex = Math.floor(Math.random() * fun.length);
          funImg.src = "media/fun/" + fun[funImgsIndex] + ".gif";
        }
      }

      div.style.display = "block";
    }
    else {
      div.style.display = "none";
    }
  }
}



// Move to next image in gallery
function next() {
  if (++galleryIndex >= photos.length){
      galleryIndex = 0;
  }

  galleryImg.src = "media/photos/" + photos[galleryIndex] + ".jpg";
}



// Move to previous image in gallery
function prev() {
  if (--galleryIndex < 0) {
      galleryIndex = photos.length - 1;
  }

  galleryImg.src = "media/photos/" + photos[galleryIndex] + ".jpg";
}
