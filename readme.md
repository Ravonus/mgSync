# mgSync

A dark star project server management tool & Mog Gardens private server intergration tool. Manage your server at ease, including auto start, auto crash check, log parsing, process monitoring(CPU,Memory,time running).

Secondly safely extend your database into Mog.Garden search tool. Let users figure more out about your server. Including characters,linkshells,auctions,etc. (You manage the control and how much info is pushed)
Lets bring a full feature from end to the players. Dark star is still in development, but it doesn't mean the managment and community driven aspect has to be lacking. A system that will let us all share and colab together, and also extend your very own servers for all your members.

## Getting Started

Getting started is pretty simple. If you have never used Node.js. You simply just need to install it for your OS. https://nodejs.org/en/download/.

The application has everything you need packaged into it (No extra webserver installs or database installs). Any Authentication extension will use mysql already installed for DSP.

Keep in mind I am developing application with Windows, but it shoukd work with linux as well. For now though Windows will be less buggy. 


### Prerequisites

Just node https://nodejs.org/en/download/

Then you must install all the required files with node package manager (Comes with node).

* Cd into project directory
* Run below command

```
npm install i
```

## Getting application running

* First time run setup.
* Answer all question prompts.
* If this part is skipped. The system will create conf files that you will need to fill out before the app works properly.

```
npm run setup
```

* After setup is complete simply run app.

```
npm start
```

Running the application the first time will result in many errors if setup script was not ran. (This is because script is building config files that are left out of project due to security)

(If setup script was ran skip below)
Once files are created. You must change required configuration files. To find these go into the config folder. You will find two json files.
* dsp.json (File for all dark server project configurations)
* mgSync.json (File for all Mog.Garden configurations)

Also keep in mind you can turn off socket portion, and or the server management part. 

## Current Features
- Dark Star Project Managment.
* Start all executables.
* Keep them running. (Even on crash)
* Custom web portal.
* Track and search logs on web portal.
* Track executable statistics. (CPU and Ram usage)
* Edit all config files easily from portal.
* View Mysql information from web portal.
* Edit Mysql information from web portal.
* Script to change zone ip to external.
* Script to change zone ip to internal gateway.
* Script to change zone ip to loop back.
* Delete sessions that are stuck
* Count users logged into DSP server.
* Works for Linux and Windows.

- Mog Garden Sync.
* Sync Character list to site.
* Socket communication for security.
* Audit system to make sure no wrong edits or reads can happen.
* Permissions system.
* Cookie connection so token always has to match authenticated cookie before socket communication.
* No Mysql Database share  - App is connected locally and uses server socket connections.
* Connected multiple servers to one account.
* Manage server from Mog.Garden.


## Planned Features
- Dark Star Project Managment.
* Full Database managment.
* Authentication via website.
* Extended API (To make full fledge frontend)
* User management via website portal.
* Permissions on portal (So gms can help manage)
* Small community page.
* Better statistics.
* Extended front end for full DSP management.
* Recaptcha and checks to make sure create users are not abused.
* Custom launcher for help with authentication.
* Reset DSP account password

- Mog Garden Sync.
* Full database management (Via Mog.Garden)
* Advance linkshell managment (Linkshell inventory and banks) - Across servers even. 
* Let users view your characters and other information of server. (Like ffxiAH)
* Users can determine which servers is right for them, and or find out more information with just looking on website.
* Extended user managment. Users can actually manage character from website.
* Extended community sections. Each server will have their own private spot in the community to manage everything.
* Advance planner and PUG system on site. (VERY advance to make sure everyone can plan events together.. Even across servers)
* Advance Server Owner agreements. (Let members trade items accros servers as long as server owners accept features)
* Advance multi-server linkshells.
* Advance community driven trades and auctions.
* Server transfers.
* Server Character Syncs.
* Global server seasons and special events that can be reverted after events,etc.
* Huge Final Fantasy Database just like FFXIAH, but for Dark start server owners.


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Ravonus/mgSync/tags). 

## Authors

* **Chad Koslovsky**

See also the list of [contributors](https://github.com/Ravonus/mgSync/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
