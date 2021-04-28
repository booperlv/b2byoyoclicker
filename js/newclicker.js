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




//DATA HANDLING
//DATA HANDLING
//DATA HANDLING




//Menu Functions, Creating Judge 

class judgeEntry {
    constructor(judgename, negative, positive) {
        this.judgename = judgename;
        this.negative = negative;
        this.positive = positive;
    }
}

//Create Judge Name Inputs in Menu based on NumberOfJudges
const handleJudgeNumber = numberofjudges => {
	const judgenamediv=document.getElementById('JudgeNames');
	judgenamediv.innerHTML = "";
	for (let currentjudge=0; currentjudge < numberofjudges; currentjudge++) {
		let judgeinput = document.createElement("input");

		judgeinput.setAttribute("id", "judgeinput"+currentjudge);
		judgenamediv.appendChild(judgeinput);
	}
}
//Instantly Create Judge Names On Input
document.getElementById('NumberOfJudges').addEventListener('input', function() {
	let numberofjudges = this.value;
	handleJudgeNumber(numberofjudges);
})


//Collect Judge Names and Place in Array
const collectJudgeNames = () => {
	const judgeinputdiv = document.getElementById('JudgeNames');
	let JudgeNames = [];
	if (judgeinputdiv.children) {
		for (childelementindex=0; childelementindex<judgeinputdiv.childNodes.length; childelementindex++) {
			let childelement = judgeinputdiv.childNodes[childelementindex];
			if (childelement.value) {
				JudgeNames.push(childelement.value)
			} else {
				JudgeNames.push(childelement.id)
			}
		}
		return JudgeNames;
	} else {
		return;
	}
}

//createJudgeClicker Functions, possibly using an external value

//Create Judge Clickers based on NumberOfJudges and JudgeNames
const createJudgeClickers = (numberofjudges, judgenames) => {
	const judgeclickerdiv=document.getElementById('JudgeClickerDir');

	//Define Functions for the clickers
	function coreClicker(display) {
		let displayvalue = Number(display.innerHTML);
		display.innerHTML = displayvalue + 1
	}

	for (let currentclicker=0; currentclicker < numberofjudges; currentclicker++) {

		let clickerdiv = document.createElement('div');
	
		let positivedisplay = document.createElement('span');
		let positivesign = document.createElement('p');
		let positivebutton = document.createElement('button');
		positivebutton.addEventListener('click', function(){
			coreClicker(positivedisplay)
		});
		positivesign.innerHTML = "+"
		positivedisplay.innerHTML = "0"
		positivebutton.innerHTML = "+"
		positivesign.appendChild(positivedisplay);

		let negativedisplay = document.createElement('span');
		let negativesign = document.createElement('p');
		let negativebutton = document.createElement('button');
		negativebutton.addEventListener('click', function() {
			coreClicker(negativedisplay);
		})
		negativesign.innerHTML = "-"
		negativedisplay.innerHTML = "0"
		negativebutton.innerHTML = "-"
		negativesign.appendChild(negativedisplay)

		if (judgenames) {
			clickerdiv.setAttribute("id", judgenames[currentclicker]);
		}
		clickerdiv.appendChild(positivesign);
		clickerdiv.appendChild(positivebutton);

		clickerdiv.appendChild(negativesign);
		clickerdiv.appendChild(negativebutton);

		judgeclickerdiv.appendChild(clickerdiv);

	}
};

// Generate Clickers Using Last Two Functions
document.getElementById('GenerateJudgeClickers').addEventListener('click', function() {
	let numberofjudges = document.getElementById('NumberOfJudges').value;
	let judgenames = collectJudgeNames();
	createJudgeClickers(numberofjudges, judgenames);
})



//Player List and Scores

class listEntry {
	constructor(playername, judgearray, sumpositive, sumnegative){
		this.playername = playername;
		this.judgearray = judgearray;
		this.sumpositive = sumpositive;
		this.sumnegative = sumnegative;
	}
}

var judgeArray = [];

var listArray = [];

const sortArrayDescrending = (array) => {
    array.sort( (a, b) => { return b.score-a.score;} );
};
