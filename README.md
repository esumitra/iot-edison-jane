iot-edison-jane
===================


An Internet-of-Things (**IoT**) Node.js program that provides Elderly Care Assistance. The prototype of the system was developed at the  Intel Edison  Hackathon help in Boston, March 2015. 

----------


System Overview
-------------

Jane is a Edison based IoT device that retrieves healthcare reminders and alerts for the patient from a internet server reminders the patient of his or her upcoming task and waits until the patient acknowledges that the task is complete. When the patient acknowledges that the task is complete, Jane notifies the server which monitors the status of each task in the patients schedule and notifies the caregiver if the patient has not acknowledged the completion of tasks critical to the patients well being.

This system helps caregivers monitor patients daily health activities and proactively intervene when critical tasks are not acknowledged.

![Elderly Care System](http://cdn.instructables.com/F0B/HTGT/I7IJA7W4/F0BHTGTI7IJA7W4.LARGE.jpg)

The full system is described at [IoT Jane Instructable](http://www.instructables.com/id/Intel-Edison-IoT-Hackathon-Jane-an-Elderly-Care-As/)

> **Note:**

> - Only the IoT Jane device program running on the Edison device is described in this project. 
> - The Task service is a different project and is build using Clojure, Clojurescript and React.

Node.js on Edison Overview
-------------

####  Tasks

The task class maintains a task que containing every task that is being monitored by the device. The task class polls the server every 30 seconds for new tasks added since last poll time. 
New tasks are added to the task que and a **new_task** event is emitted. As tasks are scheduled i.e., added to the task queue, a server call is made to change the task status to scheduled which
is displayed in the UI as a pending task. When tasks are completed, they are removed from the task queue and the server is again notified that the task state is now changed to completed which
updates the UI.If there are no more tasks pending in the task queue a **tasks_complete** event is emitted.

####  Main program

The main program configures the LED to GPIO digital pin 4 and the switch to GPIO digital pin 8. When a new_task event is received, the main program turns on the LED indicating that a new task
needs completion. The patient signals that a task is complete by pressing the switch which calls the task completion method. When a tasks_complete event is received, the LED is turned off
indicating that all tasks have been completed.

![Edison prototype shield wiring](http://cdn.instructables.com/FQT/JXYG/I7KB4XTZ/FQTJXYGI7KB4XTZ.LARGE.jpg)

Future Work
-------------

Future enhancements to the prototype include:

> **System:**
> - Use web sockets on the device instead of polling.
> - Using web sockets directly with the server is sufficient for the prototype but to scale to a production deployment, web sockets with Redis messaging server

> **Device:**

> - Add text services through Twilio

Copyright
-------------
Copyright © 2015 Edward Sumitra

Distributed under the MIT License version 1.0.