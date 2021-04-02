//Add Events for Video Upload

const videoUpload = (event) => {
    let files = event.target.files;
    let vidsrc = document.getElementById("VideoSource");
    let filesurl = URL.createObjectURL(files[0]);
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'clicker.html');

    xhttp.onload = function () {
        vidsrc.src = "";
        vidsrc.src = filesurl;
    };
    xhttp.send(null);
};
document.getElementById("UploadFile").addEventListener("change", videoUpload);



//Add Events and Functions for Youtube Video Embed

const formatLink = key => {return "https://youtube.com/embed/" + key;};

const transformYoutubeLinks = link => {
  if (!link) return link;

  const linkreg = /(?:)<a([^>]+)>(.+?)<\/a>/g;
  const fullreg = /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;

  let embedLink = link;  

  // get all the matches for youtube links using the first regex
  const match = link.match(fullreg);
  if (match && match.length > 0) {
    // get all links and put in placeholders
    const matchlinks = link.match(linkreg);
    if (matchlinks && matchlinks.length > 0) {
      for (let i=0; i < matchlinks.length; i++) {
        embedLink = embedLink.replace(matchlinks[i], "#placeholder" + i + "#");
      }
    }

    // now go through the matches one by one
    for (let i=0; i < match.length; i++) {
      // get the key out of the match using the second regex
      let matchParts = match[i].split(regex);
      // replace the full match with the embedded youtube code
      embedLink = embedLink.replace(match[i], formatLink(matchParts[1]));
    }

    // ok now put our links back where the placeholders were.
    if (matchlinks && matchlinks.length > 0) {
      for (let i=0; i < matchlinks.length; i++) {
        embedLink = embedLink.replace("#placeholder" + i + "#", matchlinks[i]);
      }
    }
  }
  return embedLink;
};

const videoInput = link => {
    let vidsrc = document.getElementById("VideoSource");
    let inputValue = link;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'clicker.html');

    xhr.onload = function () {
        vidsrc.src = "";
        vidsrc.src = inputValue;
    };
    xhr.send(null);
};
document.getElementById("InputFileSubmit").addEventListener("click", function() {
    let youtubeInput = transformYoutubeLinks(document.getElementById("InputFile").value);
    videoInput(youtubeInput);
});



//Add Events for Click Counts

var positiveCount=0;
const addClick = () => {
    let positive = document.getElementById("PositiveClicks");
    positiveCount += 1;
    positive.innerHTML = `+${positiveCount}`;
};
var negativeCount=0;
const minusClick = () => {
    let negative = document.getElementById("NegativeClicks");
    negativeCount -= 1;
    negative.innerHTML = negativeCount;
};
document.getElementById("AddOne").addEventListener("click", addClick);
document.getElementById("MinusOne").addEventListener("click", minusClick);



//Add Name+Score to List

class listEntry {
    constructor(name, score, negative, positive) {
        this.name = name;
        this.negative = negative;
        this.positive = positive;
        this.score = score;
    }
}
var listArray = [];

const sortListArray = () => {
    listArray.sort( (a, b) => { return b.score-a.score;} );
};

const listArrayToHTML = () => {
    var parentDir = document.getElementById("PlayerList");
    parentDir.innerHTML = '';
    for (let entry of listArray) {
        let nameLi = document.createElement("li");
        let scoreSpanPositive = document.createElement("span");
        let scoreSpanNegative = document.createElement("span");
        
        nameLi.innerHTML = entry.name;
        scoreSpanPositive.innerHTML = entry.positive;
        scoreSpanNegative.innerHTML = entry.negative;
        
        nameLi.appendChild(scoreSpanPositive);
        nameLi.appendChild(scoreSpanNegative);
        parentDir.appendChild(nameLi);
    }
};

const resetHTML = () => {
    document.getElementById('UploadFile').value = null;
    document.getElementById('InputFile').value = "";
    document.getElementById('VideoSource').src = "";
    document.getElementById('PositiveClicks').innerHTML = 0;
    document.getElementById('NegativeClicks').innerHTML = 0;
    negativeCount = 0;
    positiveCount = 0;
};

const appendDataToList = name => {
    let sumScore = positiveCount - negativeCount;
    //Create Object, Append to Array
    let entry = new listEntry();
    entry.name = name;
    entry.positive = positiveCount;
    entry.negative = negativeCount;
    entry.score = sumScore;
    console.log(entry);
    listArray.push(entry);
    
    sortListArray();
    listArrayToHTML();
    resetHTML();
};
let playerName = document.getElementById("NameForSave");
document.getElementById("SaveScore").addEventListener("click", () => {
    appendDataToList(playerName.value);
});