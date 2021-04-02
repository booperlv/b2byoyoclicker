
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

const videoInput = () => {
    let vidsrc = document.getElementById("VideoSource");
    let inputValue = document.getElementById("InputFile").value;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'clicker.html');

    xhr.onload = function () {
        vidsrc.src = "";
        vidsrc.src = inputValue;
    };
    xhr.send(null);
};
document.getElementById("InputFileSubmit").addEventListener("click", videoInput);

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