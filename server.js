'use strict';
var GoodWinston = require('good-winston');
var winston = require('winston');
var Hapi = require('hapi');

// add winston logging
server.register({
register: require('good'),
  options: {
    reporters: [
      new GoodWinston({
        ops: '*',
        request: '*',
        response: '*',
        log: '*',
        error: '*'
      }, winston)
    ]
  }
}, function(err) {
  if(err) {
    return server.log(['error'],'good load error: ' + err);
  }
});


var server = new Hapi.Server();
if( process.env.PORT ) {
  server.connection({ port: process.env.PORT });
}
else {
  server.connection({ port: 1337 });
}

// add a route
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

// start the server
server.start(function () {
  console.log('Server running at:', server.info.uri);
});