var skillArray = [];
var pointArray = [];
var levelUp = 20;
var total = 0;

window.onload=load;
window.onbeforeunload=save;

function load() {
	var check=document.cookie.indexOf("page=");
	// alert(check)
    if (check > 0) {
		var cook = getCookie("page");
		if (cook!== "") 
		cook2 = cook.replace(/_/g, " ");
		document.getElementById("bod").innerHTML = cook2;
		totalStr = getCookie("totalPoints");
		total = parseInt(totalStr, 10);

  	} 
    else {
    	// alert("no cook");
       }
}

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

function reset() {
	if (confirm("Are you sure you want to reset all skillpoints and level?")) {
		
		document.cookie = "page=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
		document.cookie = "totalPoints=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
		window.onbeforeunload = null;
		location.reload();
	}
}

function save() {
	var body = document.getElementById("bod");
	var bodyhtml = body.innerHTML;
	setCookie("page",bodyhtml,5000);
	// alert(bodyhtml);
	setCookie("totalPoints",total,5000);
}

function download(){
    var a = document.body.appendChild(
        document.createElement("a")
    );
    a.download = "skillpoint_save.txt";
    a.href = "data:text/html," + document.getElementById("bod").innerHTML; // Grab the HTML
    a.click();
}

var openFile = function(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
    var currentHtml = reader.result;
    alert(currentHtml);
    document.getElementById("bod").innerHTML=currentHtml;
    totalStr = document.getElementById("tot").textContent;
    total = parseInt(totalStr, 10);
    };
    reader.readAsText(input.files[0]);
  };

  function launchOpen() {
  	document.getElementById("fileInput").click();
  }

  // function launchLoad() {
  // 	document.getElementById("loadBtn").click();
  // }

  // function launchSave() {
  // 	document.getElementById("saveBtn").click();
  // }

// function load(2)() {
// 	var cook = getCookie("page");
// 	cook2 = cook.replace(/_/g, " ");
// 	alert(cook2);
// 	document.getElementById("bod").innerHTML = cook2;
// }

// onclick for Add Skill button
function addSkill() {
	// get input
	var newSkill = document.getElementById("skillInput").value;
	skillArray.push(newSkill);
	var i = skillArray.indexOf(newSkill);
	var cellId = i + "cell";
	var divId = i + "div";
	var delId = i + "del";
	var optId = i + "opt";

	// insert row and cells for new skill and point counter
	var table = document.getElementById("skillTable");
	var row = table.insertRow();
	row.className = "skillRow";
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
	opt.id = optId;
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
	delBtn.className = "delLink";
	delBtn.textContent = "delete";
	delBtn.setAttribute("onclick", "delSkill(this)");
	delBtn.id = delId;
	cell3.appendChild(delBtn);


	// onclick for delete skill
}

function delSkill(thing) {
	if (confirm("Are you sure you want to delete this skill?")) {
		var delId = thing.id;
		var cellId = delId.replace("del", "cell");
		var divId = delId.replace("del", "div");
		var optId = delId.replace("del", "opt")
		var row = document.getElementById(cellId).parentNode;
		var div = document.getElementById(divId);
		var opt = document.getElementById(optId);

		row.parentNode.removeChild(row);
		div.parentNode.removeChild(div);
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
	pointArray.push(pointValue);

	if ((pointValue >=1 && pointValue <= 4) == false) {
		alert("Please enter a point value between 1 and 4"); 
		return;
	}

	var i = skillArray.indexOf(corrSkill);
	var cellId = i + "cell";
	var divId = i + "div";

	// var j = pointArray.indexOf(pointValue);
	// var btnId = j + "btn";

	// create action button
	var div = document.getElementById(divId);
	var newButton = document.createElement("button");
	div.appendChild(newButton);
	newButton.textContent = newAction + ", +" + pointValue;
	newButton.className = "actionBtn";
	// newButton.onclick = clickAction;
	// newButton.addEventListener("click", clickAction)
	newButton.setAttribute("onclick", "clickAction(this)");

	
}

// onclick for Action buttons
	function clickAction(thing) {
		// make button add points to corresponding skill
		var currentDiv = thing.parentNode;
		divId = currentDiv.id;
		cellId = divId.replace("div","cell");
		// alert(cellId);
		var counter = document.getElementById(cellId).textContent;
		var name = thing.textContent;
		var place = parseInt(name.length,10);
		var num = name[place-1];
		// pointNum = this.textContent[this.textContent.length];
		// alert(num);
		// pointValue = par
		var newCounter = parseInt(counter,10) + parseInt(num,10);
		document.getElementById(cellId).textContent = newCounter;
		var levelCounter = document.getElementById("level");
		total = total + parseInt(num,10);
		var totCounter = document.getElementById("tot");
		levelCounter.textContent = "Level: " + Math.floor(total/levelUp+1);
		totCounter.textContent = total;
	}