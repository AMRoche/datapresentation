var network = {
	"data" : "",
	"currentDomData" : "",
	"corsLocation" : "scripts/polyfills/xmlhttp/cors/",
	"retrieve": function(){
		/*var xhr = new easyXDM.Rpc({
    		remote: network.corsLocation
		}, {
		    remote: {
		        request: {} // request is exposed by /cors/
		    }
		});
	xhr.request({
	    url: "http://localhost:22300/hoteldata",
	    method: "get"
	}, function(response,error) {
		alert(error);
	    alert(response.status);
	    alert(response.data);
	});*/
		var xhr = createCORSRequest("GET",'http://localhost:22300/hoteldata');
		if(!xhr){
			console.log("CORS seems to not be supported.");
			return;
		}
		xhr.onload = function(){
			console.log("LOADED!");
			network.data = JSON.parse(xhr.responseText);
			console.log(network.data);
			dommanip.render(network.data["data"]["Establishments"]);
		};
		xhr.onerror = function(){
			alert("Error.");
			console.log("Errored out!");
		};
		xhr.send();

	}
};

network.retrieve();