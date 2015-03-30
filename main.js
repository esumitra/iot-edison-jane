/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
A node.js application for an elderly care device prototyped on the Intel(R) Edison with Arduino breakout board.
*/

var Cylon = require('cylon');
var unirest = require('unirest');
var bunyan = require('bunyan');
var tasks = require('./tasks');
var log = bunyan.createLogger({name: 'main'});

// IoT device sensor configuration and event handlers 
Cylon
  .robot()
  .connection('edison', { adaptor: 'intel-iot' })
  .device('led', { driver: 'led', pin: 4, connection: 'edison' })
  .device('button', { driver: 'button', pin: 8, connection: 'edison' })
  .on('ready', function(my) {
    my.led.turnOff();
    // task event handlers
    tasks.on('new_tasks',function(e){
      log.info("new task detected");
      my.led.turnOn();
    });
    tasks.on('tasks_complete',function(e){
      log.info("all tasks completed");
      my.led.turnOff();
    });
    my.button.on('push', function() {
      tasks.completeTask();
    });
    tasks.start();
  });

log.info("starting main ...");
Cylon.start();
