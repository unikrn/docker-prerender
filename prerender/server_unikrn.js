#!/usr/bin/env node
var prerender = require('./lib');

var server = prerender(
    {
	//logRequests: true,
	pageLoadTimeout: 10 * 1000,
        waitAfterLastRequest: 100,
        pageDoneCheckInterval: 100    
    }
);


server.use(prerender.sendPrerenderHeader());
server.use(prerender.blockResources());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

server.start();
