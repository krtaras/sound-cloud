function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}

function selectLeftTab() {
	$("#rightTab").removeClass("inactive-tab");
	$("#leftTab").removeClass("inactive-tab");
	$("#rightTab").removeClass("active-tab");
	$("#leftTab").removeClass("active-tab");
	$("#leftTab").addClass("active-tab");
	$("#rightTab").addClass("inactive-tab");
}

function selectRightTab() {
	$("#rightTab").removeClass("inactive-tab");
	$("#leftTab").removeClass("inactive-tab");
	$("#rightTab").removeClass("active-tab");
	$("#leftTab").removeClass("active-tab");
	$("#rightTab").addClass("active-tab");
	$("#leftTab").addClass("inactive-tab");
}