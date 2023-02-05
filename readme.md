# Doctor Appointment Website

**Introduction**

This is a full-stack website built using the MERN stack (MongoDB, Express.js, React.js, Node.js) that focuses on doctor appointments. The website has three roles: User, Doctor, and Admin. All data is saved in MongoDB Atlas for easy retrieval and management.


**Features**

* Users can book a time slot according to the availability of a doctor.

* Users can apply for a doctor account, which will reflect in the admin's account for approval or rejection.

* Secure login and logout features are implemented.

* Notifications are sent when:

    * a user books an appointment, the doctor will be notified
    * a doctor applies for a time slot, the admin will be notified
    * a doctor accepts or rejects a user's appointment, the user will be notified
    * an admin approves a doctor's account, the doctor will be notified.

**User Role**
* Users can view available doctors and their schedules.
* Users can book appointments with available doctors.
* Users can view their upcoming appointments and cancel them if needed.

**Doctor Role**
* Doctors can view their schedules and upcoming appointments.
* Doctors can confirm or cancel appointments.
* Doctor can manage their profile.

**Admin Role**

* Admins can view and manage all doctor accounts.
* Admins can approve or reject doctor account requests.
* Admins can view and manage all appointments.

**Setup**
* Clone the repository and navigate to the project directory.
* Run `npm install` to install all dependencies.
* Create a MongoDB Atlas account and set up a cluster, and connect it to the app.
* Run `npm start` to start the development server.

**Note**
Make sure you have MongoDB Atlas account and connect it to the app before starting the development server.

**Technologies used**
* MongoDB Atlas
* Express.js
* React.js
* Node.js

**Collaboration**

If you want to collaborate on this project, please feel free to reach out and we will discuss how to proceed.

**Conclusion**

This is a comprehensive website that allows users to book appointments with doctors and also allows doctors to manage their profile and appointments. The admin can approve or reject doctor account requests. The website also has secure login and logout features. With the use of MongoDB Atlas, data management and retrieval is efficient. The notifications feature allows for seamless communication between users, doctors, and admins.