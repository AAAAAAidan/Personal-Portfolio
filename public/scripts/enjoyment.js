
// Use React! :(

// Table of Contents
// 1. Classes
// 2. Global Vars
// 3. Functions

/////////////
// Classes //
/////////////

// Parent of img and iframe elements
class File {
  constructor(id, title, desc) {
    this.id = id;
    this.title = title;
    this.desc = desc;
  }
}

// For image file img elements
class Image extends File {
  constructor(id, title, desc) {
    super(id, title, desc);
  }

  toHTML() {
    var img = document.createElement("img");
    img.src = currentPath + this.id;
    img.alt = "Image file";
    return img;
  }
}

// For embedded video iframe elements
class Video extends File {
  constructor(id, title, desc) {
    super(id, title, desc);
  }

  toHTML() {
    var iframe = document.createElement("iframe");
    iframe.src = this.id;
    iframe.frameBorder = 0;
    iframe.allowFullscreen = true;
    return iframe;
  }
}

// For button elements
class Button {
  constructor(buttonName, functionName) {
    this.buttonName = buttonName;
    this.functionName = functionName;
  }

  toHTML() {
    var button = document.createElement("button");
    button.innerHTML = this.buttonName;
    button.addEventListener('click', window[this.functionName]);
    return button;
  }
}



/////////////////
// Global Vars //
/////////////////

var currentPath;
var currentFolder;
var currentFiles;
var slideIndex;
var slideFile;
var slideTitle;
var slideDesc;

// Since I'm not using any database connection, all files will be retrieved
// using this object representing a group of folders, with each folder
// containing a content section's header title and files.
var folders = {
  "projects": {
    header: "Aidan's Log of Projects",
    files: [
      new Image("playlists.png", "SiIvaGunner Playlists",
      "SiIvaGunner related YouTube playlists managed through Google Apps Script."),
      new Image("sheets.png", "SiIvaGunner Spreadsheets",
      "Sheets documenting YouTube videos maintained through Google Apps Script."),
      new Image("siivagunnerdb.png", "SiIvaGunner Database",
      "A searchable database of information retrieved from YouTube videos."),
      new Image("simplelibrary.png", "Simple Library",
      "A small digital library of books in the public domain.")
    ]
  },
  "photos": {
    header: "Aidan's Gallery of Photos",
    files: [
      new Image("20170224_192712724.jpg", null, null),
      new Image("20190406_180351743.jpg", null, null),
      new Image("20190406_180724273.jpg", null, null),
      new Image("20190513_162037112.jpg", null, null),
      new Image("20190514_114607604.jpg", null, null),
      new Image("20191227_140718813.jpg", null, null),
      new Image("20200416_085053595.jpg", null, null),
      new Image("20200704_081445184.jpg", null, null),
      new Image("20200810_141533258.jpg", null, null),
      new Image("20200828_172111985.jpg", null, null),
      new Image("20200905_080326036.jpg", null, null),
      new Image("20201017_122145598.jpg", null, null),
      new Image("20201017_122603469.jpg", null, null),
      new Image("20201022_152635575.jpg", null, null),
      new Image("20201023_181514948.jpg", null, null),
      new Image("20201024_123922633.jpg", null, null),
      new Image("20201030_174537221.jpg", null, null),
      new Image("20201121_123609294.jpg", null, null),
      new Image("20201204_140000878.jpg", null, null),
      new Image("20210129_135657586.jpg", null, null),
      new Image("20210130_075346801.jpg", null, null),
      new Image("20210130_075633060.jpg", null, null),
      new Image("20210130_124630153.jpg", null, null),
      new Image("20210212_135352723.jpg", null, null),
      new Image("20210213_074824019.jpg", null, null),
      new Image("20210403_104505220.jpg", null, null),
      new Image("20210415_153802017.jpg", null, null),
      new Image("20210416_180316157.jpg", null, null),
      new Image("20210430_180546789.jpg", null, null),
      new Image("20210502_183715090.jpg", null, null),
      new Image("20210507_153859839.jpg", null, null),
      new Image("20210508_100346499.jpg", null, null),
      new Image("20210509_101708955.jpg", null, null),
      new Image("20210509_104836386.jpg", null, null),
      new Image("20210515_080717175.jpg", null, null),
      new Image("20210515_082614599.jpg", null, null),
      new Image("20210515_083245335.jpg", null, null),
      new Image("20210515_083248368.jpg", null, null),
      new Image("20210515_083254767.jpg", null, null),
      new Image("20210613_160904142.jpg", null, null),
      new Image("20210701_160209025.jpg", null, null),
      new Image("20210701_160252889.jpg", null, null)
    ]
  },
  "videos": {
    header: "Aidan's Set of Videos",
    files: [
      new Video("https://www.youtube.com/embed/teBC7NIaN7A", "3", "Three"),
      new Video("https://www.youtube.com/embed/0YukEii-z64", "9", "Nine"),
      new Video("https://www.youtube.com/embed/WzOeoYXk8qY", "39", "Thirty-Nine")
    ]
  },
  "fun": {
    header: "Aidan's Box of Fun",
    files: [
      new Image("apollo.gif", null, null),
      new Image("damon.gif", null, null),
      new Image("ema.gif", null, null),
      new Image("trucy.gif", null, null)
    ]
  }
};

var backgroundFiles = folders["photos"].files;

// The footer will build a randomized sentence using words from this variable.
var footerWords = [
  ["Blithering buffoon", "Uncouth cretin", "Sad sop", "Cheerful child"], // subject descriptor
  ["Billy", "Bob", "Sandy", "Tim"], // subject
  ["loves to", "hates to", "continues to", "never stops to"], // action descriptor
  ["eat lots of", "drink all of the", "kick a lot of", "smell the"], // action
  ["soup", "water", "rocks", "dirt"], // object
  [".", "!", "?"] // punctuation
];



///////////////
// Functions //
///////////////

// Called on page load, randomize the page contents
function onLoad() {
  randomizeBackgroundContent();
  randomizeMainContent();
}

// Called on page load and change, randomize the background color, image, and footer
function randomizeBackgroundContent() {
  // Randomize the html background image
  var fileIndex = Math.floor(Math.random() * backgroundFiles.length);
  var backgroundFile = backgroundFiles[fileIndex];
  var backgroundImage = "url(images/photos/" + backgroundFile.id + ")";
  document.documentElement.style.backgroundImage = backgroundImage;

  // Randomize the body background color and opacity
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  var alpha = Math.random();
  var rgba = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
  document.body.style.backgroundColor = rgba;

  // Randomize the footer content
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

// Build one of the main content sections randomly
function randomizeMainContent() {
  var folderNames = ["projects", "photos", "videos", "fun"];
  var folderIndex = Math.floor(Math.random() * folderNames.length);
  var folderName = folderNames[folderIndex];
  buildMainContent(folderName);
}

// Build page content from the specified folder
function buildMainContent(folderName) {
  currentPath = "images/" + folderName + "/";
  currentFolder = folders[folderName];
  currentFiles = currentFolder.files;
  randomizeBackgroundContent();

  var header = document.createElement("h2");
  header.innerHTML = currentFolder.header;
  var content = document.createElement("div");

  if (folderName == "fun") {
    // Build two random img elements

    for (var count = 1; count <= 2; count++) {
      var fileIndex = Math.floor(Math.random() * currentFiles.length);
      var file = currentFiles[fileIndex];
      content.appendChild(file.toHTML());
    }
  }
  else {
    // Build a slide show display

    var slider = document.createElement("div");
    slider.id = "slider";
    var prevButton = new Button("Previous", "prev").toHTML();
    var nextButton = new Button("Next", "next").toHTML();
    var slideFileDiv = document.createElement("div");
    slideFileDiv.id = "slideFileDiv";
    slideIndex = Math.floor(Math.random() * currentFiles.length);
    var file = currentFiles[slideIndex];
    slideFile = file.toHTML();
    slideFile.id = "slide";

    slideFileDiv.appendChild(slideFile);
    slider.appendChild(prevButton);
    slider.appendChild(slideFileDiv);
    slider.appendChild(nextButton);
    content.appendChild(slider);

    if (file.title) {
      slideTitle = document.createElement("h3");
      slideTitle.innerHTML = file.title;
      content.appendChild(slideTitle);
    }

    if (file.desc) {
      slideDesc = document.createElement("h4");
      slideDesc.innerHTML = file.desc;
      content.appendChild(slideDesc);
    }
  }

  content.id = folderName;
  var main = document.getElementById("mainContent");
  main.innerHTML = "";
  main.appendChild(header);
  main.appendChild(content);
}

// Change to the slider file at the given index
function changeSlide(fileIndex) {
  if (slideFile) {
    var src = currentFiles[fileIndex].id;

    if (slideFile.nodeName != "IFRAME") {
      src = currentPath + src;
    }

    slideFile.src = src;
  }

  if (slideTitle) {
    slideTitle.innerHTML = currentFiles[fileIndex].title;
  }

  if (slideDesc) {
    slideDesc.innerHTML = currentFiles[fileIndex].desc;
  }
}

// Change to the next image in the file folder
function next() {
  if (++slideIndex >= currentFiles.length){
      slideIndex = 0;
  }

  changeSlide(slideIndex);
}

// Change to the previous image in the file folder
function prev() {
  if (--slideIndex < 0) {
      slideIndex = currentFiles.length - 1;
  }

  changeSlide(slideIndex);
}
