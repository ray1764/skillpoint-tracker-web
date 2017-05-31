var skillArray = [];
var pointArray = [];

function addSkill() {
	var newSkill = document.getElementById("skillInput").value;
	skillArray.push(newSkill);
	pointArray.push(0);

	// insert rows and cells for new skill and point counter
	var table = document.getElementById("skillTable");
	var row = table.insertRow(skillArray.length);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);

	// put new skill and counter text in to new cells
	cell1.innerHTML = newSkill;
	cell1.className = "cell1";
	cell2.innerHTML = 0;
	cell2.className = "cell2";

	//add new skill to corresponding skills selection
	var select = document.getElementById("ActionSelectSkill");
	var opt = document.createElement("option");
	opt.textContent = newSkill;
	opt.value = newSkill;
	select.appendChild(opt);
}

function addAction() {
	var newAction = document.getElementById("ActionInputName").value;
	var corrSkill = document.getElementById("ActionSelectSkill").value;
	var pointValue = document.getElementById("ActionInputPoints").value;

	// make button
	var div = document.getElementById("actionDiv");
	var newButton = document.createElement("button");
	div.appendChild(newButton);
	newButton.textContent = newAction + " - " + pointValue;
	newButton.className = "actionBtn";
}