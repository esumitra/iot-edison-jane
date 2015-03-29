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

Describe tasks program here

####  Main program

Describe main program here

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