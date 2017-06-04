var skillArray = [];
var levelUp = 20;
var total = 0;

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function save() {
	var body = document.getElementById("bod");
	var bodyhtml = body.innerHTML;
	setCookie("page",bodyhtml,5000);
	alert(bodyhtml);
}

function load() {
	var cook = getCookie("page");
	cook2 = cook.replace(/_/g, " ");
	alert(cook2);
	document.getElementById("bod").innerHTML = cook2;
}

// onclick for Add Skill button
function addSkill() {
	// get input
	var newSkill = document.getElementById("skillInput").value;
	skillArray.push(newSkill);
	var i = skillArray.indexOf(newSkill);
	var cellId = i + "cell";
	var divId = i + "div";

	// insert row and cells for new skill and point counter
	var table = document.getElementById("skillTable");
	var row = table.insertRow();
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
		row.parentNode.removeChild(row);
		newDiv.parentNode.removeChild(newDiv);
		opt.parentNode.removeChild(opt);
	}
}

// onclick for Add Action button
function addAction() {
	// get inputs
	var newAction = document.getElementById("ActionInputName").value;
	var corrSkill = document.getElementById("ActionSelectSkill").value;

	if (corrSkill === "Corresponding Skill") {
		alert("Please select a corresponding skill"); 
		return;
	}

	var pointValue = document.getElementById("ActionInputPoints").value;

	if ((pointValue >=1 && pointValue <= 4) == false) {
		alert("Please enter a point value between 1 and 4"); 
		return;
	}

	var i = skillArray.indexOf(corrSkill);
	var cellId = i + "cell";
	var divId = i + "div";

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