window.onload = function(){
	dommanip.addEventListeners();
}

var dommanip = {
	"addEventListeners" : function(){

document.getElementById("submitButton").onclick=function(){

	var arr = ["name","stars","trprating","usrrating","mincost"];
	//Name, Stars, TrpRating, UserRating, MinCost
	var toSearch = {};
	for(var i in arr){
		if(document.getElementById(arr[i]+"Check").checked == true){
			if(arr[i]=="name"){
				toSearch["Name"] = document.getElementById(arr[i]).value;

			}
			if(arr[i]=="stars"){
				toSearch["Stars"] = document.getElementById(arr[i]).value;
			}
			if(arr[i]=="trprating"){
				toSearch["TrpRating"] = document.getElementById(arr[i]).value;
				if(document.getElementById(arr[i]).value == ""){
					document.getElementById(arr[i]).className = "error";
				}else{
					document.getElementById(arr[i]).className = "";
				}
			}
			if(arr[i]=="usrrating"){
				toSearch["UserRating"] = document.getElementById(arr[i]).value;
				if(document.getElementById(arr[i]).value == ""){
					document.getElementById(arr[i]).className = "error";
				}else{
					document.getElementById(arr[i]).className= "";
				}
			}
			if(arr[i]=="mincost"){
				toSearch["MinCost"] = document.getElementById(arr[i]).value;
				if(document.getElementById(arr[i]).value == ""){
					document.getElementById(arr[i]).className = "error";
				}else{
					document.getElementById(arr[i]).className= "";
				}
			}
		}
	}
	math.filter(toSearch);
}


document.getElementById("distSort").onclick = function(){
	if(math.lastSort["type"]=="Distance"){
		math.sort("Distance",!math.lastSort["bool"]);
		math.lastSort = {"type":"Distance","bool":!math.lastSort["bool"]};
	}else{
		math.sort("Distance",false);
		math.lastSort = {"type":"Distance","bool":false};
	}
};

document.getElementById("starSort").onclick = function(){
	if(math.lastSort["type"]=="Stars"){
		math.sort("Stars",!math.lastSort["bool"]);
		math.lastSort = {"type":"Stars","bool":!math.lastSort["bool"]};
	}else{
		math.sort("Stars",true);
		math.lastSort = {"type":"Stars","bool":true};
	}
};

document.getElementById("minCostSort").onclick = function(){
	if(math.lastSort["type"]=="MinCost"){
		math.sort("MinCost",!math.lastSort["bool"]);
		math.lastSort = {"type":"MinCost","bool":!math.lastSort["bool"]};
	}else{
		math.sort("MinCost",false);
		math.lastSort = {"type":"MinCost","bool":false};
	}
};

document.getElementById("trpRatingSort").onclick = function(){
	if(math.lastSort["type"]=="TrpRating"){
		math.sort("TrpRating",!math.lastSort["bool"]);
		math.lastSort = {"type":"TrpRating","bool":!math.lastSort["bool"]};
	}else{
		math.sort("TrpRating",true);
		math.lastSort = {"type":"TrpRating","bool":true};
	}
};

document.getElementById("userRatingSort").onclick = function(){
	if(math.lastSort["type"]=="UserRating"){
		math.sort("UserRating",!math.lastSort["bool"]);
		math.lastSort = {"type":"UserRating","bool":!math.lastSort["bool"]};
	}else{
		math.sort("UserRating",true);
		math.lastSort = {"type":"UserRating","bool":true};
	}
};
	var arr = ["name","stars","trprating","usrrating","mincost"];

	for(var i = 0; i < arr.length; i++){
		document.getElementById(arr[i]+"Check").onclick = function(elem){
		return function(){
			console.log(elem);
			console.log(document.getElementById(elem+"Check").checked);
			if(document.getElementById(elem+"Check").checked == false){
				document.getElementById(elem).className="";
			}
		}
		}(arr[i]);
	}

	},

	"render":function(dataset){
		network.currentDomData = dataset;
		var domElement = document.getElementById("hotellist");
		domElement.innerHTML = "";
		var establishments = dataset;
		var AVBSID = network.data["data"]["AvailabilitySearchId"];
		if(establishments.length > 0){
				if(establishments.length>1){
					document.getElementById("resultcount").innerHTML = "There were "+establishments.length+" results for your query.";
				}else{
					document.getElementById("resultcount").innerHTML = "There was only one result for your query.";
				}
			for(var i in establishments){
				var li = document.createElement("li");
				var div = document.createElement("div");
				div.setAttribute("class","dataholder");
				var liDiv = document.createElement("div");

				var img = document.createElement("img");
				img.setAttribute("class","lazy-load");
				img.setAttribute("src","images/tempspinnersmall.gif");
				img.setAttribute("data-src",establishments[i]["ImageUrl"]);
								
				var p = document.createElement("div");
				p.setAttribute("class","hotellabel name");
				p.innerHTML = establishments[i]["Name"];
				div.appendChild(p);

				var p = document.createElement("div");
				p.setAttribute("class","hotellabel stars");
				for(var z = 0; z < establishments[i]["Stars"]; z++){
					p.innerHTML += "&#9734; ";
				}
				div.appendChild(p);

		try{
				var p = document.createElement("div");
				p.setAttribute("class","hotellabel rating");
				p.innerHTML = "This venue was rated "+establishments[i]["UserRating"]+" on average by "+establishments[i]["UserRatingCount"]+" users.";
				div.appendChild(p);
				}catch(e){}
				var dl = document.createElement("dl");

				var dt = document.createElement("dt");
					dt.innerHTML = "Accomodation Type";
					dl.appendChild(dt);

					var dd = document.createElement("dd");
					dd.innerHTML = establishments[i]["EstablishmentType"];
					dl.appendChild(dd);

					var dt = document.createElement("dt");
					dt.innerHTML = "Location";
					dl.appendChild(dt);

					var dd = document.createElement("dd");
					dd.innerHTML = establishments[i]["Location"];
					dl.appendChild(dd);

					var dt = document.createElement("dt");
					dt.innerHTML = "Distance";
					dl.appendChild(dt);

					var dd = document.createElement("dd");
					dd.innerHTML = math.toFixed(establishments[i]["Distance"],2)+" km";
					dl.appendChild(dd);

					var dt = document.createElement("dt");
					dt.innerHTML = "Minimum Cost";
					dl.appendChild(dt);

					var dd = document.createElement("dd");
					dd.innerHTML = establishments[i]["MinCost"];
					dl.appendChild(dd);

					div.appendChild(dl);
//				var p = document.createElement("div");
//				p.setAttribute("class","hotellabel");
//				p.innerHTML = "This venue was rated "+establishments[i]["UserRating"]+" on average by "+establishments[i]["UserRatingCount"]+" users.";
//				div.appendChild(p);

		
				//console.log(establishments[i]["StarType"]);
								liDiv.appendChild(img);
				liDiv.appendChild(div);
				li.appendChild(liDiv);
				domElement.appendChild(li);
			}
		}else{
			document.getElementById("resultcount").innerHTML = "We're really sorry, there were no results available.";
			domElement.appendChild(p);
		}
		lazyload();
	}
};