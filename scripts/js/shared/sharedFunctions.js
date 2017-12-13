

const sharedFunctions = {
	highlightCurrentPage : function(element){
		var path = window.location.pathname;
		var page = path.substring(path.search(/pages/g)+5);
		page = page.replace(/\//g, "").trim();
		var link = element[0].querySelectorAll("[data-ron-nav-link='"+page+"']")[0];
		link.style.borderTop = "2px solid red";
		link.style.borderBottom = "2px solid red";
		link.style.paddingTop = "0.5%";
		link.style.paddingBottom = "0.5%";
	}
};