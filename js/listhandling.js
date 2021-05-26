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
    for (
        let currentdiv = 0;
        currentdiv < maindiv.children.length;
        currentdiv++
    ) {
        let currentjudgediv = maindiv.children[currentdiv];
        let judgedataobject = new judgeEntry();

        let positivevalues =
            currentjudgediv.getElementsByClassName('positivep');
        let negativevalues =
            currentjudgediv.getElementsByClassName('negativep');
        judgedataobject.judgename = currentjudgediv.className;
        judgedataobject.positive = positivevalues[0].children[0].innerHTML;
        judgedataobject.negative = negativevalues[0].children[0].innerHTML;

        judgearray.push(judgedataobject);
    }
    return judgearray;
};

//Get sum of all judges scores, flexible class
class AllJudgeSum {
    constructor(positive, negative) {
        this.positive = positive;
        this.negative = negative;
    }
    plusDivideByLength(length) {
        let output = this.positive / length;
        return `+${output.toFixed(2)}`;
    }
    minusDivideByLength(length) {
        let output = this.negative / length;
        return `-${output.toFixed(2)}`;
    }
    getSum() {
        return this.positive - this.negative;
    }
}
//Return an Object following AllJudgeSum using an input from judgearray
const getAllJudgeSum = (judgearray) => {
    let temparraypositive = [];
    let temparraynegative = [];
    judgearray.forEach(function (judgeobject) {
        temparraypositive.push(Number(judgeobject.positive));
        temparraynegative.push(Number(judgeobject.negative));
    });
    //Add all values of array to each other
    let positivescore = temparraypositive.reduce((a, b) => a + b, 0);
    let negativescore = temparraynegative.reduce((a, b) => a + b, 0);
    const sumobject = new AllJudgeSum();
    sumobject.positive = positivescore;
    sumobject.negative = negativescore;
    return sumobject;
};

//Create List Entry that extends judgeData and Scores

class listEntry {
    constructor(playername, judgearray, sumpositive, sumnegative, sumobject) {
        this.playername = playername;
        this.judgearray = judgearray;
        this.sumpositive = sumpositive;
        this.sumnegative = sumnegative;
        this.sumobject = sumobject;
    }
}

//Object based on listEntry that will be used for data transfer within the list
const newPlayerListObject = (judgearray) => {
    let listentry = new listEntry();
    let playername = document.getElementById('NameForSave').value;
    let sumobject = getAllJudgeSum(judgearray);
    listentry.playername = playername;
    listentry.judgearray = judgearray;
    listentry.sumpositive = sumobject.plusDivideByLength(judgearray.length);
    listentry.sumnegative = sumobject.minusDivideByLength(judgearray.length);
    listentry.sumobject = sumobject;
    return listentry;
};
//Sorts the Children of an element based on their "data-sum" attribute in descending order
const sortChildrenToDescend = () => {
    const parentdiv = document.getElementById('PlayerList');
    [...parentdiv.children]
        .sort((a, b) => b.dataset.sum - a.dataset.sum)
        .forEach((node) => parentdiv.appendChild(node));
};

//Function that accepts newplayerlistobject as a parameter and generates html content based on it.

//Set Value Of Clicker Span to 0
const resetScores = () => {
    const clickerdir = document.getElementById('JudgeClickerDir');
    for (
        let currentindex = 0;
        currentindex < clickerdir.getElementsByTagName('p').length;
        currentindex++
    ) {
        let currentspan =
            clickerdir.getElementsByTagName('p')[currentindex]
                .firstElementChild;
        currentspan.innerHTML = 0;
    }
};

const newPlayerListEntryHTML = (listobject) => {
    /*
	Created Structure is as follows:
	<li>
		<p>
			Name Of Player
            <button> delete the entire li entry </button>
		</p>
        <div> for inline
		    <span> Summary Scores </span>
		    <button> Toggle Visibility of span below </button>
        </div> for inline

		<div>
			for every judge and every judgeobject in listobject ->
			<div>
			    <p> 
				    Judge Name
			    </p>
				<span> Per Judge Score </span>
			</div>
		</div>
	</li>
    */

    //Element Creation for a list entry, will output in respective order
    const listdiv = document.getElementById('PlayerList');
    let playerdiv = document.createElement('li');

    let firstlinediv = document.createElement('div');
    let nameparagraph = document.createElement('p');
    let deleteplayerdiv = document.createElement('span');

    let secondlinediv = document.createElement('div');
    let summaryscore = document.createElement('span');
    let togglebutton = document.createElement('button');
    let buttonicon = document.createElement('i');

    let perjudgeinfo = document.createElement('div');

    //Create For Loop that uses the judge array parameter
    let playername = listobject.playername;
    let judgearray = listobject.judgearray;

    togglebutton.addEventListener('click', function () {
        if (perjudgeinfo.style.display == 'none') {
            perjudgeinfo.style.display = 'block';
        } else {
            perjudgeinfo.style.display = 'none';
        }
    });
    buttonicon.setAttribute('class', 'arrow down');

    perjudgeinfo.style.display = 'none';
    //Set the data-sum attribute for sorting
    playerdiv.dataset.sum = listobject.sumobject.getSum();

    judgearray.forEach((object) => {
        let judgediv = document.createElement('div');
        let judgename = document.createElement('p');
        let judgescores = document.createElement('span');
        judgename.innerHTML = `${object.judgename}`;
        judgescores.innerHTML = `+${object.positive}  -${object.negative}`;
        judgediv.appendChild(judgename);
        judgediv.appendChild(judgescores);

        judgediv.setAttribute('class', 'judgescore');
        perjudgeinfo.appendChild(judgediv);
    });

    //Create Function for delete whole entry button
    deleteplayerdiv.addEventListener('click', function () {
        if (
            confirm(`Do you really want to remove ${playername} from the list?`)
        ) {
            playerdiv.remove();
        }
    });

    //Start Placing the Elements in their respective dom positions
    togglebutton.appendChild(buttonicon);
    playerdiv.setAttribute('id', 'player' + listdiv.children.length);
    firstlinediv.setAttribute('class', 'inlinenameandbutton');
    nameparagraph.innerHTML = playername;
    deleteplayerdiv.innerHTML = 'X';
    deleteplayerdiv.setAttribute('class', 'allbutton');
    summaryscore.innerHTML = `${listobject.sumobject.plusDivideByLength(
        judgearray.length
    )} ${listobject.sumobject.minusDivideByLength(judgearray.length)}`;

    firstlinediv.appendChild(nameparagraph);
    firstlinediv.appendChild(deleteplayerdiv);
    playerdiv.appendChild(firstlinediv);

    secondlinediv.appendChild(summaryscore);
    secondlinediv.appendChild(togglebutton);
    secondlinediv.setAttribute('class', 'inlinescores');
    playerdiv.appendChild(secondlinediv);

    playerdiv.appendChild(perjudgeinfo);

    listdiv.appendChild(playerdiv);
    sortChildrenToDescend();

    resetScores();
};
document.getElementById('SaveScore').addEventListener('click', function () {
    let object = newPlayerListObject(collectAllJudgeData());
    newPlayerListEntryHTML(object);
});
