var skillsArray = [];
var pointsArray = [];

function addSkill() {
	var newSkill = window.prompt("Name of new skill");
	skillsArray.push(newSkill);
	pointsArray.push(0);
	// insert rows and cells for new skill and point counter
	var table = document.getElementById("skillsTable");
	var row = table.insertRow(skillsArray.length);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	// put new skill and counter text in to new cells
	cell1.innerHTML = newSkill;
	cell2.innerHTML = 0;
}