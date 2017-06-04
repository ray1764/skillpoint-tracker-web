
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
	var bodyhtml = val.innerHTML;
	setCookie("page",bodyhtml,30);
	alert(bodyhtml);
}

function load() {
	var cook = getCookie("page");
	cook = cook.replace(/_/g, " ");
	alert(cook);
	document.getElementById("bod").innerHTML = cook;
}

function add() {
	var val = document.getElementById("bod");
	var val2 = val.innerHTML;
	document.getElementsByTagName("h1")[0].innerHTML = "fdfsdfdsfsfs";
}