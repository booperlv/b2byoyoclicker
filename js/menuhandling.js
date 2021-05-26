//Create Judge Name Inputs in Menu based on NumberOfJudges
const handleJudgeNumber = (numberofjudges) => {
    /*
	Created Structure is as follows:
	For Every Judge,
		<JudgeNames>
            <label> Index of Judge </label>
			<input> Input for the name of the indexed judge </input>
		</JudgeNames>
		<JudgeKeys>
            <div>
                <label> Index of Judge </label>
                <br>
                <div> space between flex
			        <input> Positive Key Keybind </input>
			        <input> Negative Key Keybind </input>
                </div>
            </div>
		</JudgeKeys>
	*/
    const judgenamediv = document.getElementById('JudgeNames');
    const judgekeydiv = document.getElementById('JudgeKeys');
    judgenamediv.innerHTML = '';
    judgekeydiv.innerHTML = '';
    for (let currentjudge = 0; currentjudge < numberofjudges; currentjudge++) {
        let displayedindex = currentjudge + 1;

        let judgeinput = document.createElement('input');
        let judgeinputlabel = document.createElement('label');
        judgeinputlabel.innerHTML = `Judge ${displayedindex}`;
        judgeinput.setAttribute('id', 'Judge' + displayedindex);
        judgeinput.setAttribute('placeholder', 'Name Of Judge');
        judgeinput.setAttribute('class', 'allinput');
        judgeinputlabel.setAttribute('for', judgeinput.id);

        let keydiv = document.createElement('div');
        let judgename = document.createElement('label');
        let linebreak = document.createElement('br');
        let keycontainerdiv = document.createElement('div');
        let judgepositive = document.createElement('input');
        let judgenegative = document.createElement('input');

        judgename.innerHTML = `Judge ${displayedindex}`;

        keydiv.setAttribute('id', 'judgekeydiv' + currentjudge);
        judgepositive.setAttribute('class', 'judgepositive allinput');
        judgepositive.setAttribute('placeholder', 'Positive');
        judgenegative.setAttribute('class', 'judgenegative allinput');
        judgenegative.setAttribute('placeholder', 'Negative');
        keydiv.appendChild(judgename);
        keydiv.appendChild(linebreak);
        keycontainerdiv.appendChild(judgepositive);
        keycontainerdiv.appendChild(judgenegative);
        keydiv.appendChild(keycontainerdiv);
        judgekeydiv.appendChild(keydiv);
        judgenamediv.appendChild(judgeinputlabel);
        judgenamediv.appendChild(judgeinput);
    }
};
//Instantly Create Judge Names On Input
document
    .getElementById('NumberOfJudges')
    .addEventListener('input', function () {
        let numberofjudges = this.value;
        handleJudgeNumber(numberofjudges);
    });

//Collect Judge Names and Place in Array
const collectJudgeNames = () => {
    const judgeinputdiv = document.getElementById('JudgeNames');
    let JudgeNames = [];
    if (judgeinputdiv.children) {
        for (
            let childelementindex = 0;
            childelementindex <
            judgeinputdiv.getElementsByTagName('input').length;
            childelementindex++
        ) {
            let childelement =
                judgeinputdiv.getElementsByTagName('input')[childelementindex];
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
};
//Collect Judge Input Keys to Add clicks
class JudgeKeysClass {
    constructor(id, positive, negative) {
        this.id = id;
        this.positive = positive;
        this.negative = negative;
    }
    remap(remappos, remapneg) {
        this.positive = remappos;
        this.negative = remapneg;
    }
}
const collectJudgeKeys = () => {
    const judgeinputdiv = document.querySelectorAll('#JudgeKeys > div');
    let judgeKeys = [];
    if (judgeinputdiv) {
        for (
            let childelementindex = 0;
            childelementindex < judgeinputdiv.length;
            childelementindex++
        ) {
            let childelements = judgeinputdiv[childelementindex];
            let judgekeyobject = new JudgeKeysClass();
            judgekeyobject.id = this.id;
            let inputsinside = childelements.getElementsByTagName('input');
            //check if positive is not falsy, else make value null
            if (inputsinside[0].value) {
                judgekeyobject.positive = inputsinside[0].value;
            } else {
                judgekeyobject.positive = '';
            }
            //check if negative is not falsy, else make value null
            if (inputsinside[1].value) {
                judgekeyobject.negative = inputsinside[1].value;
            } else {
                judgekeyobject.negative = '';
            }
            judgeKeys.push(judgekeyobject);
        }
        return judgeKeys;
    } else {
        return;
    }
};

//Create Judge Clickers

//Create Judge Clickers based on NumberOfJudges and JudgeNames
let eventKeyHandleArray = []; //Store the event key as a global variable so it can be cleared
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
    const judgeclickerdiv = document.getElementById('JudgeClickerDir');
    judgeclickerdiv.innerHTML = '';
    const judgenames = collectJudgeNames();

    //Define Functions for the clickers
    function coreClicker(display) {
        let displayvalue = Number(display.innerHTML);
        display.innerHTML = displayvalue + 1;
    }
    var positivearr = [];
    var negativearr = [];
    keyobject.forEach(function (currentitem) {
        positivearr.push(currentitem.positive);
        negativearr.push(currentitem.negative);
    });

    //Clear all applied event key handlers ondocument through the global variable
    if (eventKeyHandleArray) {
        eventKeyHandleArray.forEach((keyfunction) => {
            document.removeEventListener('keypress', keyfunction);
        });
        eventKeyHandleArray.length = 0; //empty array
    }

    //Set The EventListener That uses the ID of the buttons as declared above as a reference
    const eventKeyHandle = (event) => {
        positivearr.forEach((currentcharpos, index) => {
            if (currentcharpos == event.key && keymode.checked) {
                document.getElementById('positivebutton' + index).click();
                return;
            } else {
                return;
            }
        });
        negativearr.forEach((currentcharneg, index) => {
            if (currentcharneg == event.key && keymode.checked) {
                document.getElementById('negativebutton' + index).click();
                return;
            } else {
                return;
            }
        });
    };
    eventKeyHandleArray.push(eventKeyHandle);
    document.addEventListener('keypress', eventKeyHandle);

    let keymode = document.getElementById('ToggleKeyMode');
    //Loop the same amount as the number of judges,
    for (
        let currentclicker = 0;
        currentclicker < numberofjudges;
        currentclicker++
    ) {
        let clickerdiv = document.createElement('div');
        let signcontainer = document.createElement('div');
        let buttoncontainer = document.createElement('div');
        signcontainer.className = 'ClickerSignContainer';
        buttoncontainer.className = 'ClickerButtonContainer';

        let positivedisplay = document.createElement('span');
        let positivesign = document.createElement('p');
        let positivebutton = document.createElement('button');
        positivebutton.addEventListener('click', function () {
            coreClicker(positivedisplay);
        });
        positivesign.innerHTML = '+';
        positivedisplay.innerHTML = '0';
        positivebutton.innerHTML = '+';
        positivebutton.setAttribute('id', 'positivebutton' + currentclicker);
        positivesign.setAttribute('class', 'positivep');
        positivesign.appendChild(positivedisplay);

        let negativedisplay = document.createElement('span');
        let negativesign = document.createElement('p');
        let negativebutton = document.createElement('button');
        negativebutton.addEventListener('click', function () {
            coreClicker(negativedisplay);
        });
        negativesign.innerHTML = '-';
        negativedisplay.innerHTML = '0';
        negativebutton.innerHTML = '-';
        negativebutton.setAttribute('id', 'negativebutton' + currentclicker);
        negativesign.setAttribute('class', 'negativep');
        negativesign.appendChild(negativedisplay);

        //Set ID using index, for true uniqueness - Harvest ClassName for the actual displayed name.
        clickerdiv.setAttribute('id', 'judgeclicker' + currentclicker);
        clickerdiv.setAttribute('class', judgenames[currentclicker]);

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
document
    .getElementById('GenerateJudgeClickers')
    .addEventListener('click', function () {
        let numberofjudges = document.getElementById('NumberOfJudges').value;
        createJudgeClickers(numberofjudges, collectJudgeKeys());
    });
