# mgSync

A dark star project server management tool & Mog Gardens private server intergration tool. Manage your server at ease, including auto start, auto crash check, log parsing, process monitoring(CPU,Memory,time running).

Secondly safely extend your database into Mog.Garden search tool. Let users figure more out about your server. Including characters,linkshells,auctions,etc. (You manage the control and how much info is pushed)

## Getting Started

Getting started is pretty simple. If you have never used Node.js. You simply just need to install it for your OS. https://nodejs.org/en/download/

Keep in mind I am developing application with Windows, but do plan on making everything work with Linux. For now though Windows will be less buggy. 


### Prerequisites

Just node https://nodejs.org/en/download/

Then you must install all the required files with node package manager (Comes with node).

* Cd into project directory
* Run below command

```
npm install i
```

## Getting application running

```
node app.js
```

Running the application the first time will result in many errors. (This is because script is building config files that are left out of project due to security.) I plan on making the application just stop after this point and or have a script that also creates these files.

Once files are created. You must change required configuration files. To find these go into the config folder. You will find two json files.
* dsp.json (File for all dark server project configurations)
* mgSync.json (File for all Mog.Garden configurations)

Also keep in mind you can turn off socket portion, and or the server management part. 

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
