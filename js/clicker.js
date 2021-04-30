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

//Create Judge Name Inputs in Menu based on NumberOfJudges
const handleJudgeNumber = numberofjudges => {
	const judgenamediv=document.getElementById('JudgeNames');
	const judgekeydiv=document.getElementById('JudgeKeys');
	judgenamediv.innerHTML = "";
	for (let currentjudge=0; currentjudge < numberofjudges; currentjudge++) {
		let judgeinput = document.createElement("input");

		judgeinput.setAttribute("id", "judgeinput"+currentjudge);

		let keydiv = document.createElement("div");
		let judgepositive = document.createElement("input");
		let judgenegative = document.createElement("input");

		keydiv.setAttribute("id", "judgekeydiv"+currentjudge);
		judgepositive.setAttribute("class", "judgepositive"+currentjudge)
		judgenegative.setAttribute("id", "judgenegative"+currentjudge);

		keydiv.appendChild(judgepositive);
		keydiv.appendChild(judgenegative);
		judgekeydiv.appendChild(keydiv);
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
		for (let childelementindex=0; childelementindex<judgeinputdiv.children.length; childelementindex++) {
			let childelement = judgeinputdiv.children[childelementindex];
			if (childelement.value) {
				JudgeNames.push(childelement.value);
			} else {
				JudgeNames.push(childelement.id);
			} 
		}
		return JudgeNames;
	} else {
		return;
	}
}
//Collect Judge Input Keys to Add clicks
class JudgeKeysClass {
	constructor(id, positive, negative){
		this.id = id;
		this.positive=positive;
		this.negative=negative;
	}
	remap(remappos, remapneg) {
		this.positive=remappos;
		this.negative=remapneg;
	}
}
const collectJudgeKeys = () => {
	const judgeinputdiv = document.getElementById('JudgeKeys').getElementsByTagName('div');
	let judgeKeys = [];
	if (judgeinputdiv) {
		for (let childelementindex = 0; childelementindex < judgeinputdiv.length; childelementindex++) {
			let childelements = judgeinputdiv[childelementindex];
			let judgekeyobject = new JudgeKeysClass();
			judgekeyobject.id = this.id;
			judgekeyobject.positive = childelements.children[0].value;
			judgekeyobject.negative = childelements.children[1].value;
			judgeKeys.push(judgekeyobject);
		}
		return judgeKeys;
	} else {
		return;
	}
}


//Create Judge Clickers based on NumberOfJudges and JudgeNames
const createJudgeClickers = (numberofjudges, keyobject) => {
	const judgeclickerdiv=document.getElementById('JudgeClickerDir');
	judgeclickerdiv.innerHTML = "";
	const judgenames = collectJudgeNames();

	//Define Functions for the clickers
	function coreClicker(display) {
		let displayvalue = Number(display.innerHTML);
		display.innerHTML = displayvalue + 1
	}
	var positivearr = [];
	var negativearr = [];
	keyobject.forEach(function(currentitem){
		positivearr.push(currentitem.positive);
		negativearr.push(currentitem.negative);
	})

	var eventKeyHandle;
	//Loop the same amount as the number of judges,
	for (let currentclicker=0;currentclicker < numberofjudges; currentclicker++) {
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
		positivebutton.setAttribute('id','positivebutton'+currentclicker)
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
		negativebutton.setAttribute('id','negativebutton'+currentclicker)
		negativesign.appendChild(negativedisplay)

		//Set The EventListener That uses the ID of the buttons as declared above as a reference
		eventKeyHandle = (event) => {
			let currentcharpos = positivearr[currentclicker]
			if (currentcharpos == event.key) {
				document.getElementById('positivebutton'+currentclicker).click();
				return;
			}
			else {
				
			}
			let currentcharneg = negativearr[currentclicker]
			if (currentcharneg == event.key) {
				document.getElementById('negativebutton'+currentclicker).click();
				return;
			}
			else {
				
			}
		}
		document.addEventListener('keypress', eventKeyHandle);

		//keyobject.forEach(function(currentobject){
		//	addEvent(document, "keypress", function (e) {
		//	    if (e.key == currentobject.positive) {
		//			positivebutton.click();
		//			console.log('one success sa positive!')
		//		} if (e.key == currentobject.negative) {
		//			negativebutton.click();
		//			console.log('one success sa negative!')
		//		} else {
		//			console.log(e.key)
		//			console.log(currentobject)
		//			console.log('error on keyhandling: key not recognized');
		//		}
		//	});
		//	
		//	function addEvent(element, eventName, callback) {
		//	    if (element.addEventListener) {
		//	        element.addEventListener(eventName, callback, false);
		//	    } else if (element.attachEvent) {
		//	        element.attachEvent("on" + eventName, callback);
		//	    } else {
		//	        element["on" + eventName] = callback;
		//	    }
		//	}
		//})

		//Set ID using index, for true uniqueness - Harvest ClassName for the actual displayed name.
		clickerdiv.setAttribute("id", "judgeclicker" + currentclicker);
		clickerdiv.setAttribute("class", judgenames[currentclicker])
		
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
	createJudgeClickers(numberofjudges, collectJudgeKeys());
})




//Player List JudgeData & Scores





class judgeEntry {
    constructor(judgename, negative, positive) {
        this.judgename = judgename;
        this.positive = positive;
		this.negative = negative;
    }
}

//Place Judge Data into an Object following judgeEntry, add each entry to an array
const collectAllJudgeData = () => {
	const maindiv = document.getElementById('JudgeClickerDir');
	var judgearray = [];
	for (let currentdiv=0;currentdiv<maindiv.children.length;currentdiv++) {
		let currentjudgediv = maindiv.children[currentdiv];
		let judgedataobject = new judgeEntry();
		
		let pvalues = currentjudgediv.getElementsByTagName("p");
		judgedataobject.judgename = currentjudgediv.className;
		judgedataobject.positive = pvalues[0].children[0].innerHTML;
		judgedataobject.negative = pvalues[1].children[0].innerHTML;

		judgearray.push(judgedataobject);
	}
	return judgearray;	
}

//Get sum of all judges scores, flexible class
class AllJudgeSum {
	constructor(positive, negative) {
		this.positive = positive;
		this.negative = negative;
	}
	plusDivideByLength(length) {
		return `+${this.positive/length}`
	}
	minusDivideByLength(length) {
		return `-${this.negative/length}`
	}
	getSum() {
		return this.positive - this.negative;
	}
}
//Return an Object following AllJudgeSum using an input from judgearray
const getAllJudgeSum = judgearray => {
	let temparraypositive = [];
	let temparraynegative = [];
	judgearray.forEach(function(judgeobject){
		temparraypositive.push(Number(judgeobject.positive));
		temparraynegative.push(Number(judgeobject.negative));
	})
	//Add all values of array to each other
	let positivescore=temparraypositive.reduce((a, b) => a + b, 0)
	let negativescore=temparraynegative.reduce((a, b) => a + b, 0)
	const sumobject = new AllJudgeSum();
	sumobject.positive = positivescore;
	sumobject.negative = negativescore;
	return sumobject;
}




//Create List Entry that extends judgeData and Scores




class listEntry {
	constructor(playername, judgearray, sumpositive, sumnegative, sumobject){
		this.playername = playername;
		this.judgearray = judgearray;
		this.sumpositive = sumpositive;
		this.sumnegative = sumnegative;
		this.sumobject = sumobject;
	}
}

//Object based on listEntry that will be used for data transfer within the list
const newPlayerListObject = judgearray => {
	let listentry = new listEntry();
	let playername = document.getElementById('NameForSave').value;
	let sumobject = getAllJudgeSum(judgearray)
	listentry.playername = playername;
	listentry.judgearray = judgearray;
	listentry.sumpositive = sumobject.plusDivideByLength(judgearray.length);
	listentry.sumnegative = sumobject.minusDivideByLength(judgearray.length);
	listentry.sumobject = sumobject;
	return listentry;
}
//Sorts the Children of an element based on their "data-sum" attribute in descending order
const sortChildrenToDescend = () => {
	const parentdiv = document.getElementById('PlayerList');
	[...parentdiv.children]
		.sort((a,b)=>b.dataset.sum-a.dataset.sum)
		.forEach(node=>parentdiv.appendChild(node));
}

//Function that accepts newplayerlistobject as a parameter and generates html content based on it.

//Set Value Of Clicker Span to 0
const resetScores = () => {
	const clickerdir = document.getElementById('JudgeClickerDir');
	for (let currentindex = 0; currentindex < clickerdir.getElementsByTagName("p").length; currentindex++) {
		let currentspan = clickerdir.getElementsByTagName("p")[currentindex].firstElementChild;
		currentspan.innerHTML = 0;
	}	
}
const newPlayerListEntryHTML = listobject => {
	//Element Creation for a list entry, will output in respective order
	const listdiv = document.getElementById('PlayerList')
	let playerdiv = document.createElement("li");
	let nameparagraph = document.createElement("p");
	let summaryscore = document.createElement("span");
	let togglebutton = document.createElement("button");
	let perjudgeinfo = document.createElement("span");

	//Create For Loop that uses the judge array parameter	
	let playername = listobject.playername;
	let judgearray = listobject.judgearray;

	togglebutton.addEventListener('click', function() {
		if (perjudgeinfo.style.display == "none") {
			perjudgeinfo.style.display = "block";
		} else {
			perjudgeinfo.style.display = "none";
		}
	})
	perjudgeinfo.style.display = "none";
	//Set the data-sum attribute for sorting
	playerdiv.dataset.sum = listobject.sumobject.getSum();

	judgearray.forEach((object) => {
		let judgediv = document.createElement("div");
		let judgename = document.createElement("p");
		let judgescores = document.createElement("span");
		judgename.innerHTML = object.judgename;
		judgescores.innerHTML = `+${object.positive}  -${object.negative}`;
		judgename.appendChild(judgescores);
		judgediv.appendChild(judgename);

		perjudgeinfo.appendChild(judgediv);
	})

	//Start Placing the Elements in their respective dom positions
	playerdiv.setAttribute("id", "player" + listdiv.children.length)
	summaryscore.innerHTML = `${listobject.sumobject.plusDivideByLength(judgearray.length)} ${listobject.sumobject.minusDivideByLength(judgearray.length)}`;
	nameparagraph.innerHTML = playername;
	playerdiv.appendChild(nameparagraph);
	playerdiv.appendChild(summaryscore);
	playerdiv.appendChild(togglebutton);
	playerdiv.appendChild(perjudgeinfo);

	listdiv.appendChild(playerdiv);
	sortChildrenToDescend();

	resetScores();
}
document.getElementById('SaveScore').addEventListener("click", function(){
	let object = newPlayerListObject(collectAllJudgeData());
	newPlayerListEntryHTML(object);
})

