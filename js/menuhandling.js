//Create Judge Name Inputs in Menu based on NumberOfJudges
const handleJudgeNumber = numberofjudges => {
	/*
	Created Structure is as follows:
	For Every Judge,
		<JudgeNames>
			<input> Input for the name of the indexed judge </input>
		</JudgeNames>
		<JudgeKeys>
			<input> Positive Key Keybind </input>
			<input> Negative Key Keybind </input>
		</JudgeKeys>
	*/
	const judgenamediv=document.getElementById('JudgeNames');
	const judgekeydiv=document.getElementById('JudgeKeys');
	judgenamediv.innerHTML = "";
	judgekeydiv.innerHTML = "";
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





//Create Judge Clickers





//Create Judge Clickers based on NumberOfJudges and JudgeNames
const createJudgeClickers = (numberofjudges, keyobject) => {
	/*
	Created Structure is as follows:
	For Every Judge
		<div>
		    <div> (SignContainer)
			<p>
				Positive Sign "+"
				<span> Positive Clicks Display </span>
			</p>
			<p>
				Negative Sign "-"
				<span> Negative Clicks Display </span>
			</p>
		    </div>
		    <div (ButtonContainer)
			<button> Button to Add, increase value of ^, gets clicked according to key binding </button>
			<button> Button to Subtract, increase value of ^, gets clicked according to key binding </button>
		    </div>
		</div>
	*/
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
		let signcontainer = document.createElement('div');
		let buttoncontainer = document.createElement('div');
		signcontainer.className = "ClickerSignContainer";
		buttoncontainer.className = "ClickerButtonContainer";

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
	
		//Set ID using index, for true uniqueness - Harvest ClassName for the actual displayed name.
		clickerdiv.setAttribute("id", "judgeclicker" + currentclicker);
		clickerdiv.setAttribute("class", judgenames[currentclicker])
		
		signcontainer.appendChild(positivesign);
		signcontainer.appendChild(negativesign);
		clickerdiv.appendChild(signcontainer);

		buttoncontainer.appendChild(positivebutton);
		buttoncontainer.appendChild(negativebutton);
		clickerdiv.appendChild(buttoncontainer);

		judgeclickerdiv.appendChild(clickerdiv);

	}
};
// Generate Clickers Using Last Two Functions
document.getElementById('GenerateJudgeClickers').addEventListener('click', function() {
	let numberofjudges = document.getElementById('NumberOfJudges').value;
	createJudgeClickers(numberofjudges, collectJudgeKeys());
})
