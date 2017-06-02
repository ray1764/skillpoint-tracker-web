var skillArray = [];
var levelUp = 20;
var total = 0;

// onclick for Add Skill button
function addSkill() {
	// get input
	var newSkill = document.getElementById("skillInput").value;
	skillArray.push(newSkill);
	var i = skillArray.indexOf(newSkill);
	var cellId = i + "_cell";
	var divId = i + "_div";

	// insert row and cells for new skill and point counter
	var table = document.getElementById("skillTable");
	var row = table.insertRow(skillArray.length);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	cell1.innerHTML = newSkill;
	cell1.className = "cell1";
	cell2.innerHTML = 0;
	cell2.className = "cell2";
	cell2.id = cellId;

	// add new skill to corresponding skills selection
	var select = document.getElementById("ActionSelectSkill");
	var opt = document.createElement("option");
	opt.textContent = newSkill;
	opt.value = newSkill;
	select.appendChild(opt);

	// add div for corresponding skill in actions area
	var mainDiv = document.getElementById("actionDiv");
	var newDiv = document.createElement("div");
	newDiv.className = "actionSubdiv";
	newDiv.id = divId;
	var newHeading = document.createElement("h4");
	newHeading.className = "actionSubheading"
	newHeading.textContent = newSkill;
	mainDiv.appendChild(newDiv);
	newDiv.appendChild(newHeading);

	// create skill delete 'button'
	var cell3 = row.insertCell(2);
	cell3.className = "cell3";
	var delBtn = document.createElement("p");
	delBtn.className = "skillOpt";
	delBtn.textContent = "delete";
	delBtn.onclick = delSkill;
	cell3.appendChild(delBtn);

	// onclick for delete skill
	function delSkill() {
		row.remove();
		newDiv.remove();
		opt.remove();	
	}
}

// onclick for Add Action button
function addAction() {
	// get inputs
	var newAction = document.getElementById("ActionInputName").value;
	var corrSkill = document.getElementById("ActionSelectSkill").value;
	var pointValue = document.getElementById("ActionInputPoints").value;
	var i = skillArray.indexOf(corrSkill);
	var cellId = i + "_cell";
	var divId = i + "_div";

	// create action button
	var div = document.getElementById(divId);
	var newButton = document.createElement("button");
	div.appendChild(newButton);
	newButton.textContent = newAction + ", +" + pointValue;
	newButton.className = "actionBtn";
	newButton.onclick = clickAction;

	// onclick for Action buttons
	function clickAction() {
		// make button add points to corresponding skill
		var counter = document.getElementById(cellId).textContent;
		newCounter = parseInt(counter,10) + parseInt(pointValue,10);
		document.getElementById(cellId).textContent = newCounter;
		var levelCounter = document.getElementById("level");
		total = total + parseInt(pointValue,10);
		levelCounter.textContent = "Level: " + Math.floor(total/levelUp+1);
	}
}

