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

        let positivevalues =
            currentjudgediv.getElementsByClassName('positivespan');
        let negativevalues =
            currentjudgediv.getElementsByClassName('negativespan');
        judgedataobject.judgename = currentjudgediv.dataset.name;
        judgedataobject.positive = positivevalues[0].children[0].innerHTML;
        judgedataobject.negative = negativevalues[0].children[0].innerHTML;

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
            judgearray,
            sumpositive,
            sumnegative,
            sumobject
        ) {
            this.playername = playername;
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
            <span> delete the entire li entry </span>
        </div>

        <div> second inline
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

    //--------------------//

    let playername = listobject.playername;
    let judgearray = listobject.judgearray;

    //--------------------//

    let perjudgeinfo = document.createElement('div');
    perjudgeinfo.style.display = 'none';

    //--------------------//

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

    //--------------------//

    let summaryscore = document.createElement('span');
    summaryscore.innerHTML = `${listobject.sumobject.plusDivideByLength(
        judgearray.length
    )} ${listobject.sumobject.minusDivideByLength(judgearray.length)}`;

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

    let secondlinediv = document.createElement('div');
    secondlinediv.appendChild(summaryscore);
    secondlinediv.appendChild(togglebutton);
    secondlinediv.setAttribute('class', 'inlinescores');

    //--------------------//

    const listdiv = document.getElementById('PlayerList');

    let playerdiv = document.createElement('li');
    playerdiv.setAttribute('id', 'player' + listdiv.children.length);
    //Set the data-sum attribute for sorting
    playerdiv.dataset.sum = listobject.sumobject.getSum();
    playerdiv.appendChild(firstlinediv);
    playerdiv.appendChild(secondlinediv);
    playerdiv.appendChild(perjudgeinfo);

    listdiv.appendChild(playerdiv);

    //--------------------//

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
    resetScores();
};
document.getElementById('SaveScore').addEventListener('click', function () {
    let object = collectPlayerListEntry(collectJudgeEntryData());
    newPlayerListEntryHTML(object);
});
