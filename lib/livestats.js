var http = require('http'),
     sys = require('sys'),
  static = require('node-static/lib/node-static');

function LiveStats(options) {
	if (! (this instanceof arguments.callee)) {
	  return new arguments.callee(arguments);	
	}

  var self = this;  
  self.settings = {
    port: options.port,
    geoipServer: {
	  hostname: options.geoipServer.hostname
	 ,    port: options.geoipServer.port || 80
    }	
  };	
	
  self.init();

};

module.exports = LiveStats;

LiveStats.prototype.init = function() {
	var self = this;
	
	self.httpServer = self.createHTTPServer();
	self.httpServer.listen(self.settings.port);
	sys.log('Server started on port:' + self.settings.port);
	
};

LiveStats.prototype.createHTTPServer = function() {
  var self = this;	
  
  var server = http.createServer(function(request, response) {
    var file = new static.Server('./public', {
      cache : false	
    });	

   request.addListener('end', function() {
     file.serve(request, response);	
   });
 });

 return server;
};