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

    for (currentjudge = 0; currentjudge < numberofjudges; currentjudge++) {
        let displayedindex = currentjudge + 1;

        //Judge Name Handling
        let judgeinput = document.createElement('input');
        judgeinput.dataset.name = 'Judge' + displayedindex;
        judgeinput.setAttribute('placeholder', 'Name Of Judge');
        judgeinput.setAttribute('class', 'allinput');

        let judgeinputlabel = document.createElement('label');
        judgeinputlabel.innerHTML = `Judge ${displayedindex}`;
        judgeinputlabel.setAttribute('for', judgeinput.id);

        //Key Bind Handling 

        let judgepositive = document.createElement('input');
        judgepositive.setAttribute('class', 'judgepositive allinput');
        judgepositive.setAttribute('placeholder', 'Positive');

        let judgenegative = document.createElement('input');
        judgenegative.setAttribute('class', 'judgenegative allinput');
        judgenegative.setAttribute('placeholder', 'Negative');

        let keycontainerdiv = document.createElement('div');
        keycontainerdiv.appendChild(judgepositive);
        keycontainerdiv.appendChild(judgenegative);

        let linebreak = document.createElement('br');

        let judgename = document.createElement('label');
        judgename.innerHTML = `Judge ${displayedindex}`;
        judgenamediv.appendChild(judgeinputlabel);
        judgenamediv.appendChild(judgeinput);

        let keydiv = document.createElement('div');
        keydiv.appendChild(judgename);
        keydiv.appendChild(linebreak);
        keydiv.appendChild(keycontainerdiv);

        judgekeydiv.appendChild(keydiv);
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
        for (let childelement of judgeinputdiv.getElementsByTagName('input'))
        {
            if (childelement.value) {
                JudgeNames.push(childelement.value);
            } else {
                JudgeNames.push(childelement.dataset.name);
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
        for (childelements of judgeinputdiv) {
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
let eventKeyHandleArray = []; //Store the keypress events of the document as a global variable so it can be cleared
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
		    <div> (ButtonContainer)
			    <button> Button to Add, increase value of ^, gets clicked according to key binding </button>
			    <button> Button to Subtract, increase value of ^, gets clicked according to key binding </button>
		    </div>
		</div>
	*/
    const judgeclickerdiv = document.getElementById('JudgeClickerDir');
    judgeclickerdiv.innerHTML = '';

    //Define Functions for the clickers
    const coreClicker = display => {
        let displayvalue = Number(display.innerHTML);
        display.innerHTML = displayvalue + 1;
    }
    let positivearr = [];
    let negativearr = [];
    keyobject.forEach(function (currentitem) {
        positivearr.push(currentitem.positive);
        negativearr.push(currentitem.negative);
    });

    //Loop the same amount as the number of judges, and create clickers
    let positivebuttonarr = [];
    let negativebuttonarr = [];
    for (
        let currentclicker = 0;
        currentclicker < numberofjudges;
        currentclicker++
    ) {
        let positivedisplay = document.createElement('span');
        positivedisplay.innerHTML = '0';

        let positivesign = document.createElement('p');
        positivesign.setAttribute('class', 'positivep');
        positivesign.innerHTML = '+';
        positivesign.appendChild(positivedisplay);

        let positivebutton = document.createElement('button');
        positivebutton.innerHTML = '+';
        positivebutton.addEventListener('click', function () {
            coreClicker(positivedisplay);
        });
        positivebuttonarr.push(positivebutton)

        let negativedisplay = document.createElement('span');
        negativedisplay.innerHTML = '0';

        let negativesign = document.createElement('p');
        negativesign.setAttribute('class', 'negativep');
        negativesign.innerHTML = '-';
        negativesign.appendChild(negativedisplay);

        let negativebutton = document.createElement('button');
        negativebutton.innerHTML = '-';
        negativebutton.addEventListener('click', function () {
            coreClicker(negativedisplay);
        });
        negativebuttonarr.push(negativebutton)

        let clickerdiv = document.createElement('div');

        let signcontainer = document.createElement('div');
        signcontainer.className = 'ClickerSignContainer';
        signcontainer.appendChild(positivesign);
        signcontainer.appendChild(negativesign);

        let buttoncontainer = document.createElement('div');
        buttoncontainer.className = 'ClickerButtonContainer';
        buttoncontainer.appendChild(positivebutton);
        buttoncontainer.appendChild(negativebutton);

        clickerdiv.appendChild(signcontainer);
        clickerdiv.appendChild(buttoncontainer);

        judgeclickerdiv.appendChild(clickerdiv);

    }

    //Clear all applied event key handlers ondocument through the global variable
    if (eventKeyHandleArray) {
        eventKeyHandleArray.forEach((keyfunction) => {
            document.removeEventListener('keypress', keyfunction);
        });
        eventKeyHandleArray = []; //empty array
    }
    //Set The EventListener
    const eventKeyHandle = (event) => {
        const keymode = document.getElementById('ToggleKeyMode');
        positivearr.forEach((currentcharpos, index) => {
            if (currentcharpos == event.key && keymode.checked) {
                positivebuttonarr[index].click();
                return;
            } else {
                return;
            }
        });
        negativearr.forEach((currentcharneg, index) => {
            if (currentcharneg == event.key && keymode.checked) {
                negativebuttonarr[index].click();
                return;
            } else {
                return;
            }
        });
        eventKeyHandleArray.push(eventKeyHandle);
    };
    document.addEventListener('keypress', eventKeyHandle)

};
// Generate Clickers Using Last Two Functions
document
    .getElementById('GenerateJudgeClickers')
    .addEventListener('click', function () {
        let numberofjudges = document.getElementById('NumberOfJudges').value;
        createJudgeClickers(numberofjudges, collectJudgeKeys());
    });
