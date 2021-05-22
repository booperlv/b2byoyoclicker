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
        currentdiv < maindiv.getElementsByTagName('div').length;
        currentdiv++
    ) {
        let currentjudgediv = maindiv.getElementsByTagName[currentdiv];
        let judgedataobject = new judgeEntry();

        let pvalues = currentjudgediv.getElementsByTagName('p');
        judgedataobject.judgename = currentjudgediv.className;
        judgedataobject.positive = pvalues[0].getElementsByTagName('span')[0].innerHTML;
        judgedataobject.negative = pvalues[1].getElementsByTagName('span')[0].innerHTML;

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
    [...parentdiv.getElementsByTagName('div')]
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
        let currentspan = clickerdir.getElementsByTagName('p')[currentindex]
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
		</p>
        <div> for inline
		    <span> Summary Scores </span>
		    <button> Toggle Visibility of span below </button>
        </div> for inline

		<div>
			for every judge and every judegobject in listobject ->
			<div>
			    <p> 
				    Judge Name
				    <span> Per Judge Score </span>
			    </p>
			</div>
		</div>
	</li>
    */

    //Element Creation for a list entry, will output in respective order
    const listdiv = document.getElementById('PlayerList');
    let playerdiv = document.createElement('li');
    let nameparagraph = document.createElement('p');
    let divinline = document.createElement('div');
    let summaryscore = document.createElement('span');
    let togglebutton = document.createElement('button');
    let perjudgeinfo = document.createElement('div');
    let buttonicon = document.createElement('i');

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
        judgename.appendChild(judgescores);
        judgediv.appendChild(judgename);

        judgediv.setAttribute('class', 'judgescore')
        perjudgeinfo.appendChild(judgediv);
    });

    //Start Placing the Elements in their respective dom positions
    togglebutton.appendChild(buttonicon);
    playerdiv.setAttribute('id', 'player' + listdiv.getElementsByTagName('div').length);
    summaryscore.innerHTML = `${listobject.sumobject.plusDivideByLength(
        judgearray.length
    )} ${listobject.sumobject.minusDivideByLength(judgearray.length)}`;
    nameparagraph.innerHTML = playername;

    playerdiv.appendChild(nameparagraph);

    divinline.appendChild(summaryscore);
    divinline.appendChild(togglebutton);
    divinline.setAttribute('class', 'inlinescores')
    playerdiv.appendChild(divinline);

    playerdiv.appendChild(perjudgeinfo);

    listdiv.appendChild(playerdiv);
    sortChildrenToDescend();

    resetScores();
};
document.getElementById('SaveScore').addEventListener('click', function () {
    let object = newPlayerListObject(collectAllJudgeData());
    newPlayerListEntryHTML(object);
});
