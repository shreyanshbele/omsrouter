'use strict';

var https = require('https');
var q = require('q');

var getData = function(url){
	
		var deffered = q.defer();
		try{
			var body ='';
			https.get(url,function(response){
				response.on('data',function(chunk){
					body += chunk;
				});
				response.on('end',function(){
					deffered.resolve(body);
				});
			});
		}catch (err){
			deffered.reject(err);
		};
		return deffered.promise;
		
};

exports.getData = getData;