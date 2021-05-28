//Place Judge Data into an Object following judgeEntry, add each entry to an array
const collectJudgeEntryData = () => {
    class judgeEntry {
        constructor(judgename, negative, positive) {
            this.judgename = judgename;
            this.positive = positive;
            this.negative = negative;
        }
    }
    const maindiv = document.getElementById('JudgeClickerDir');
    var judgearray = [];
    for (
        let currentdiv = 0;
        currentdiv < maindiv.children.length;
        currentdiv++
    ) {
        let currentjudgediv = maindiv.children[currentdiv];
        let judgedataobject = new judgeEntry();

        let positivevalues = currentjudgediv.getElementsByClassName(
            'positiveclickerdisplay'
        )[0];
        let negativevalues = currentjudgediv.getElementsByClassName(
            'negativeclickerdisplay'
        )[0];
        judgedataobject.judgename = currentjudgediv.dataset.name;
        judgedataobject.positive = positivevalues.innerHTML;
        judgedataobject.negative = negativevalues.innerHTML;

        judgearray.push(judgedataobject);
    }
    return judgearray;
};

//Return an Object following AllJudgeSum using an input from judgearray
const collectSumOfEachJudge = (judgearray) => {
    //Get sum of all judges scores, contains options
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

//Object based on listEntry that will be used for data transfer within the list
const collectPlayerListEntry = (judgearray) => {
    class listEntry {
        constructor(
            playername,
            playerelement,
            judgearray,
            sumpositive,
            sumnegative,
            sumobject
        ) {
            this.playername = playername;
            this.playerelement = playerelement;
            this.judgearray = judgearray;
            this.sumpositive = sumpositive;
            this.sumnegative = sumnegative;
            this.sumobject = sumobject;
        }
    }
    let playername = document.getElementById('NameForSave').value;
    let sumobject = collectSumOfEachJudge(judgearray);
    let listentry = new listEntry();
    listentry.playername = playername;
    listentry.playerelement = document.getElementById('NameForSave');
    listentry.judgearray = judgearray;
    listentry.sumpositive = sumobject.plusDivideByLength(judgearray.length);
    listentry.sumnegative = sumobject.minusDivideByLength(judgearray.length);
    listentry.sumobject = sumobject;
    return listentry;
};

//Function that accepts newplayerlistobject as a parameter and generates html content based on it.

//Reset Scores of All CLickers
const newPlayerListEntryHTML = (listobject) => {
    /*
	Created Structure is as follows:

	<li>

        <div> first inline
		    <p> Name Of Player </p>
            <span> delete the entire li entry button </span>
        </div>

        <div> second inline
		    <span> Summary Scores Positive </span>
            <span> Summary Scores Negative </span>
		    <button> Toggle Visibility of span below </button>
        </div> for inline

		<div>
			for every judge and every judgeobject in listobject ->
			<div>
			    <p> 
				    Judge Name
			    </p>
                <div> score container
				    <span> Per Judge Score Positive </span>
				    <span> Per Judge Score Negative </span>
                </div>
			</div>
		</div>

	</li>

    */

    let playername = listobject.playername;
    let judgearray = listobject.judgearray;

    let nameparagraph = document.createElement('p');
    nameparagraph.innerHTML = playername;

    let deleteplayerspan = document.createElement('span');
    deleteplayerspan.innerHTML = 'X';
    deleteplayerspan.setAttribute('class', 'allbutton');
    //Create Function for delete whole entry button
    deleteplayerspan.addEventListener('click', function () {
        if (
            confirm(`Do you really want to remove ${playername} from the list?`)
        ) {
            playerdiv.remove();
        }
    });

    let firstlinediv = document.createElement('div');
    firstlinediv.setAttribute('class', 'inlinenameandbutton');
    firstlinediv.appendChild(nameparagraph);
    firstlinediv.appendChild(deleteplayerspan);

    let summaryscorepositive = document.createElement('span');
    summaryscorepositive.setAttribute('class', 'SummaryScorePositive');
    summaryscorepositive.innerHTML = `${listobject.sumobject.plusDivideByLength(
        judgearray.length
    )}`;
    let summaryscorenegative = document.createElement('span');
    summaryscorenegative.setAttribute('class', 'SummaryScoreNegative');
    summaryscorenegative.innerHTML = `${listobject.sumobject.minusDivideByLength(
        judgearray.length
    )}`;

    let summaryscorecontainer = document.createElement('div');
    summaryscorecontainer.setAttribute('class', 'SummaryScoreContainer');
    summaryscorecontainer.appendChild(summaryscorepositive);
    summaryscorecontainer.appendChild(summaryscorenegative);

    let togglebutton = document.createElement('button');
    let buttonicon = document.createElement('i');
    buttonicon.setAttribute('class', 'arrow down');
    togglebutton.appendChild(buttonicon);
    togglebutton.addEventListener('click', function () {
        if (perjudgeinfo.style.display == 'none') {
            perjudgeinfo.style.display = 'block';
        } else {
            perjudgeinfo.style.display = 'none';
        }
    });

    let secondlinediv = document.createElement('div');
    secondlinediv.appendChild(summaryscorecontainer);
    secondlinediv.appendChild(togglebutton);
    secondlinediv.setAttribute('class', 'inlinescores');

    let perjudgeinfo = document.createElement('div');
    perjudgeinfo.style.display = 'none';
    //perjudgeinfocontent
    judgearray.forEach((object) => {
        let judgename = document.createElement('p');
        judgename.innerHTML = `${object.judgename}`;

        let judgescorespositive = document.createElement('span');
        judgescorespositive.setAttribute('class', 'JudgeScoresPositive');
        judgescorespositive.innerHTML = `+${object.positive}`;

        let judgescoresnegative = document.createElement('span');
        judgescoresnegative.setAttribute('class', 'JudgeScoresNegative');
        judgescoresnegative.innerHTML = `-${object.negative}`;

        let judgescorescontainer = document.createElement('div');
        judgescorescontainer.appendChild(judgescorespositive);
        judgescorescontainer.appendChild(judgescoresnegative);

        let judgediv = document.createElement('div');
        judgediv.setAttribute('class', 'judgescore');
        judgediv.appendChild(judgename);
        judgediv.appendChild(judgescorescontainer);

        perjudgeinfo.appendChild(judgediv);
    });

    const listdiv = document.getElementById('PlayerList');

    let playerdiv = document.createElement('li');
    playerdiv.setAttribute('id', 'player' + listdiv.children.length);
    //Set the data-sum attribute for sorting
    playerdiv.dataset.sum = listobject.sumobject.getSum();
    playerdiv.appendChild(firstlinediv);
    playerdiv.appendChild(secondlinediv);
    playerdiv.appendChild(perjudgeinfo);

    //check if there are clickers
    if (document.getElementById('JudgeClickerDir').children.length) {
        listdiv.appendChild(playerdiv);
    }

    //Sorts the Children of an element based on their "data-sum" attribute in descending order
    const sortChildrenToDescend = () => {
        const parentdiv = document.getElementById('PlayerList');
        [...parentdiv.children]
            .sort((a, b) => b.dataset.sum - a.dataset.sum)
            .forEach((node) => parentdiv.appendChild(node));
    };
    sortChildrenToDescend();

    const resetScores = () => {
        const clickerdir = document.getElementById('JudgeClickerDir');
        const getclickerspans =
            clickerdir.getElementsByClassName('clickerdisplay');
        for (
            let currentindex = 0;
            currentindex < getclickerspans.length;
            currentindex++
        ) {
            let currentspan = getclickerspans[currentindex];
            currentspan.innerHTML = 0;
        }
    };
    resetScores();

    //clear input for player name
    listobject.playerelement.value = '';
};
document.getElementById('SaveScore').addEventListener('click', function () {
    let object = collectPlayerListEntry(collectJudgeEntryData());
    newPlayerListEntryHTML(object);
});
