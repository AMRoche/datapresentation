
/* Dummy Object for reference;
{
    "Distance": 1.7640740806812176,
    "EstablishmentId": 118164,
    "EstablishmentType": "Hotel",
    "EstablishmentTypeId": 1,
    "ImageUrl": "http://static.travelrepublic.co.uk/EstabImages/Normal/2/3524/54938/757993/118164/1866519975.jpg",
    "Location": "Paris",
    "MinCost": 1687.71,
    "Name": "Hotel Brighton",
    "StarType": 1,
    "Stars": 4,
    "TrpRating": 463414,
    "UserRating": 8.5,
    "UserRatingCount": 10
}

The result set is reasonably large so we need to be be able to filter the data by:
and sort the data by:

*/
var math = {
	"lastSort" : {"type":"","bool":""},
"toFixed" : function(num, fixed) {
	    fixed = fixed || 0;
	    fixed = Math.pow(10, fixed);
	    return Math.floor(num * fixed) / fixed;
	},
	"checkStars" : function(object, desired){
		console.log(parseInt(object["Stars"],10)+","+parseInt(desired["Stars"],10));
		if(parseInt(object["Stars"],10) >= parseInt(desired["Stars"],10)){
			return true;
		}else{
			return false;
		}
	},
	"checkName" : function(object, desired){
		if(object["Name"].toLowerCase().contains(desired["Name"].toLowerCase())){
			return true;
		}else{
			return false;
		}
	},
	"checkTrpRating" : function(object,desired){
		if(parseFloat(object["TrpRating"],10) >= parseFloat(desired["TrpRating"],10)){
			return true;
		}else{
			return false;
		}
	},
	"checkUserRating" : function(object,desired){
		if(parseFloat(object["UserRating"],10) >= parseFloat(desired["UserRating"],10)){
			return true;
		}else{
			return false;
		}
	},
	"checkMinCost" : function(object,desired){
		if(parseFloat(object["MinCost"],10) <= parseFloat(desired["MinCost"],10)){
			return true;
		}else{
			return false;
		}
	},
	"filter" : function(jsonobject){
		var count = 0;
		for(var i in jsonobject){
			if(jsonobject.hasOwnProperty(i)){
				if(i.toLowerCase()=="name"||jsonobject[i]!=""){
					count++;
				}else{
					delete jsonobject[i];
				}
			}
		}
		if(count == 0){
			jsonobject = {"Name":""};
		}
		var results = [];
		var toSplice = [];
		console.log(jsonobject);
		for(var i in jsonobject){
			if(jsonobject.hasOwnProperty(i)){
				if(results.length == 0){
					for(var j = 0; j < network.data["data"]["Establishments"].length;j++){
						toCheck = network.data["data"]["Establishments"][j];
						if(i.toLowerCase()=="name"){
							if(math.checkName(toCheck,jsonobject) == true){
								results.push(toCheck);
							}
						}
						else if(i.toLowerCase()=="stars"){
							if(math.checkStars(toCheck,jsonobject) == true) {
								results.push(toCheck);
							}
						}
						else if(i.toLowerCase()=="trprating"){
							if(math.checkTrpRating(toCheck,jsonobject)==true){
								results.push(toCheck);
							}
						}else if(i.toLowerCase()=="userrating"){
							if(math.checkUserRating(toCheck,jsonobject)==true){
								results.push(toCheck);
							}
						}else if(i.toLowerCase()=="mincost"){
							if(math.checkMinCost(toCheck,jsonobject)==true){
								results.push(toCheck);
							}
						}
					}
				}else{
					for(var j = 0; j < results.length;j++){
						//console.log(i);
						if(i.toLowerCase()=="name"){
							if(math.checkName(results[j],jsonobject) == false){
								toSplice.push(j);
							}
						}
						else if(i.toLowerCase()=="stars"){
							if(math.checkStars(results[j],jsonobject) == false) {
								toSplice.push(j);
							}
						}
						else if(i.toLowerCase()=="trprating"){
							if(math.checkTrpRating(results[j],jsonobject)==false){
								toSplice.push(j);
							}
						}else if(i.toLowerCase()=="userrating"){
							if(math.checkUserRating(results[j],jsonobject)==false){
								toSplice.push(j);
							}
						}else if(i.toLowerCase()=="mincost"){
							if(math.checkMinCost(results[j],jsonobject)==false){
								toSplice.push(j);
							}
						}
					}
					console.log(toSplice);
					for(var j = 0; j < toSplice.length; j++){
						results.splice(toSplice[j]-j,1);
					}
				}
			}
		}
		dommanip.render(results);
	},
	"sort" : function(quality, reverse){
		dommanip.render(network["currentDomData"].sort(function(a,b){
			if(quality.toLowerCase()=="distance"){
					if(parseFloat(a["Distance"],10)> parseFloat(b["Distance"],10)){
						if(reverse){return -1;}else{return 1};
					}
					else if(parseFloat(a["Distance"],10)< parseFloat(b["Distance"],10)){
						if(reverse){return 1;}else{return -1};
					}
					else{
						return 0;
					}
			} else if(quality.toLowerCase()=="stars"){
				if(parseInt(a["Stars"],10)> parseInt(b["Stars"],10)){
					if(reverse){return -1;}else{return 1};
				}
				else if(parseInt(a["Stars"],10)< parseInt(b["Stars"],10)){
					if(reverse){return 1;}else{return -1};
				}
				else{
					return 0;
				}
			} else if(quality.toLowerCase()=="mincost"){
				if(parseFloat(a["MinCost"],10)> parseFloat(b["MinCost"],10)){
					if(reverse){return -1;}else{return 1};
				}
				else if(parseFloat(a["MinCost"],10)< parseFloat(b["MinCost"],10)){
					if(reverse){return 1;}else{return -1};
				}
				else{
					return 0;
				}
			} else if(quality.toLowerCase() == "trprating"){
				if(parseFloat(a["TrpRating"],10)> parseFloat(b["TrpRating"],10)){
					if(reverse){return -1;}else{return 1};
				}
				else if(parseFloat(a["TrpRating"],10)< parseFloat(b["TrpRating"],10)){
					if(reverse){return 1;}else{return -1};
				}
				else{
					return 0;
				}
			} else if(quality.toLowerCase()=="userrating"){
				if(parseFloat(a["UserRating"],10)> parseFloat(b["UserRating"],10)){
					if(reverse){return -1;}else{return 1};
				}
				else if(parseFloat(a["UserRating"],10)< parseFloat(b["UserRating"],10)){
					if(reverse){return 1;}else{return -1};
				}
				else{
					return 0;
				}
			}
		}));

	}
}
