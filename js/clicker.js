//Add Events for Video Upload

const videoFrame = document.getElementById('VideoFrame'); 
const videoUpload = (event, videoTarget) => {
    let files = event.target.files;
    let filesurl = URL.createObjectURL(files[0]);
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'clicker.html');

    xhttp.onload = function () {
        videoTarget.src = "";
        videoTarget.src = filesurl;
    };
    xhttp.send(null);
};
document.getElementById("UploadFile").addEventListener("change", function() {
	videoUpload(event, videoFrame)
});

//Add Events and Functions for Youtube Video Embed

const formatLink = key => {return "https://youtube.com/embed/" + key;};

const transformYoutubeLinks = link => {
  if (!link) return link;

  const linkreg = /(?:)<a([^>]+)>(.+?)<\/a>/g;
  const fullreg = /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;

  let embedLink = link;  

  const match = link.match(fullreg);
  if (match && match.length > 0) {
    const matchlinks = link.match(linkreg);
    if (matchlinks && matchlinks.length > 0) {
      for (let i=0; i < matchlinks.length; i++) {
        embedLink = embedLink.replace(matchlinks[i], "#placeholder" + i + "#");
      }
    }

    for (let i=0; i < match.length; i++) {
      let matchParts = match[i].split(regex);
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

const videoInput = (link, videoTarget) => {
    let inputValue = link;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'clicker.html');

    xhr.onload = function () {
        videoTarget.src = "";
        videoTarget.src = inputValue;
    };
    xhr.send(null);
};
document.getElementById("InputFileSubmit").addEventListener("click", function() {
    let youtubeInput = transformYoutubeLinks(document.getElementById("InputFile").value);
    videoInput(youtubeInput, videoFrame);
});









//CHANGE STUFF HERE









//Add Events for Click Counts

const addClick = (positive, positiveCount) => {
    positiveCount += 1;
    positive.innerHTML = `+${positiveCount}`;
};
const minusClick = (negative, negativeCount) => {
    negativeCount -= 1;
    negative.innerHTML = negativeCount;
};

//Add Name+Score to List

class listEntry {
	constructor(playername, judgearray, sumpositive, sumnegative, rearrangescore){
		this.playername = playername;
		this.judgearray = judgearray;
		this.sumpositive = sumpositive;
		this.sumnegative = sumnegative;
		this.rearrangescore = rearrangescore;
	}
}

class judgeEntry {
    constructor(judgename, negative, positive) {
        this.judgename = judgename;
        this.negative = negative;
        this.positive = positive;
    }
}
var judgeArray = [];

var listArray = [];

const sortArrayDescrending = (array) => {
    array.sort( (a, b) => { return b.score-a.score;} );
};

//const 

const arrayToHTML = (listDir, liArray) => {
    listDir.innerHTML = '';
    for (let entry of liArray) {
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
    document.getElementById('VideoFrame').src = "";
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
