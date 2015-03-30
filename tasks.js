/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/**
* Task scheduler for IoT Jane
* Tasks emits two events
* new_tasks: when a new task is available to be processed
* tasks_complete: when all tasks are completed
* Tasks provides two actions
* start: starts listening to server for new events and updates events when completed
* stop: stops listening to events and updating events
*/

"use strict";
var EventEmitter = require("events").EventEmitter;
var bunyan = require('bunyan');
var unirest = require('unirest');

var log = bunyan.createLogger({name: 'tasks'});
var Tasks = module.exports = new EventEmitter();

Tasks.task_que = []; // task que that is implemented using Array.push to enque and Array.shift to deque elements
Tasks.pollId = null;
Tasks.config = {serverURL: "https://salty-wave-8470.herokuapp.com",
		pollInterval: 30000};


/**
* calls server url and calls success callback on success
*/
Tasks.getURL = function(url,success_cb){
    unirest
	.get(url)
	.headers({'Accept':'application/json'})
	.end(function(resp){
	    if(resp.ok) {
		log.info(resp.body);
		if(success_cb !== undefined){
		    success_cb(resp.body);
		}
	    } else {
		log.error(resp.error);
	    }
	});    
};

/**
* adds a new task to the list if any and emits a new_tasks event
*/
Tasks.addTasks = function(taskList){
    if (taskList.length > 0) {
	var foundNewTask = false;
	log.info("updated tasks found ...");
	taskList.forEach(function(t){
	    if (t.state == 'new') {
		foundNewTask = true;
		Tasks.getURL(Tasks.config.serverURL+"/tasks/scheduled/"+t.id,
			     function(){
				 Tasks.task_que.push(t);
			     });
	    }
	});
	if (foundNewTask) {
	    this.emit('new_tasks',taskList);
	}
    }
};

/**
* completes next task in queue
*/
Tasks.completeTask = function() {
    if (Tasks.task_que.length > 0) {
	var t = Tasks.task_que.shift();
	log.info("completed task:" + t.id);
	Tasks.getURL(Tasks.config.serverURL+"/tasks/completed/"+t.id);
	if (Tasks.task_que.length === 0) {
	    this.emit('tasks_complete',null);
	}
    }
};

/**
* gets new tasks from server
* TODO replace with a websocket to redis etc.
*/
Tasks.getNewTasks = function() {
    log.info("checking server for updates ...");
    Tasks.getURL(Tasks.config.serverURL+"/tasks/new/edison",
		 function(data){
		     Tasks.addTasks(data);
		 });
};


/**
* starts task manager
*/
Tasks.start = function() {
    log.info("starting tasks ...");
    this.pollId = setInterval(Tasks.getNewTasks,Tasks.config.pollInterval);
};

/**
* stops task manager
*/
Tasks.stop = function() {
    log.info("stopping tasks ...");
    clearInterval(this.pollId);
};