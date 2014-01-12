var http = require('http'),
	fs = require('fs'),
     url = require('url');

var responseheader = {'Access-Control-Allow-Origin':'*','Content-Type': 'application/json','x-foo':'bar', "Access-Control-Allow-Methods":"OPTIONS, GET"};
var listening = 22300;
var pollTime = 15 * 1000*60;
var data = {"data":{},"timestamp":new Date().getTime()};
getdata();

http.createServer(function(request, response){

     var path = url.parse(request.url).pathname;
      if(request.method.toLowerCase()== "options"){
      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, OPTIONS, GET";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      response.writeHead(200, headers);
      response.end();
         }
      if(request.method.toLowerCase() == "get"){
      	if(path == "/hoteldata"){
      		response.writeHead(200,responseheader);
      		response.end(JSON.stringify(data));
      	}
      }
    console.log(request.method.toLowerCase());}).listen(listening);
console.log("server initialized on "+listening);
setInterval(getdata,pollTime);
console.log("Intermittent data polling set to "+(pollTime/1000/60)+" minutes and started.");

function getdata(){
	try{
		data["data"] = JSON.parse(fs.readFileSync("../data/hotels.json",{"encoding":"utf-8"}));
		data["timestamp"] = new Date().getTime();
	}catch(e){
		console.log(e);
	}
}
