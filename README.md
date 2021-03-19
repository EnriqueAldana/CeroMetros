# Cero Metros Meteor + Vue

## Description

Web app built with Meteor and Vue, include:
- Authentication
- Users management
- Chat


Supported Platforms
-------------------

- macOS 10.12+
- Linux
- Windows 10

System Requirements
-------------------

- Node 12+ [download here](https://nodejs.org/es/download/)
- Yarn 1.22.0+
- Meteor 2.0 [Installation](https://www.meteor.com/install)
- Mongo 4.2.5 and Robo 3T [download here](https://www.mongodb.com/download-center/community)
- **Note:** In some cases it is necesary to disable antivrus in order to works SMTP Server

## Installation

- Clone the last version of repository [here](https://github.com/<your_username>/<your_repo_name>.git)
- Verify you are on branch **dev**

**Database configuration with terminal**

Note: For Windows Systems verify that mongo is configured as environment system variable.

1. Open a terminal in the project root
2. Restore the database with:
```shell
mongorestore --db curso-meteor ./database/curso-meteor
```

**The following commands are only for support:**

- Export a backup of the database (data exported as formats BSON and JSON):
```shell
mongodump --db curso-meteor --out ./database/
```

- Import more data of a specific collection to the database:
```shell
mongoimport --db curso-meteor --collection <collection_name> <path_collection_json>
```

- Export data of a specific collection from the database:
```shell
mongoexport --db curso-meteor --collection <collection_name>
```

- Restore backup of database from external database:
```shell
mongorestore --host <HOST> --port <PORT> --username=<USERNAME> --password=<PASSWORD> --authenticationDatabase curso-meteor --db <DATABASE> ./database/curso-meteor
```

- Export backup of database from external database:
```shell
mongodump --host <HOST> --port <PORT> --username=<USERNAME> --password=<PASSWORD> --authenticationDatabase curso-meteor --db <DATABASE> --out ./path_to_save
```

**Installing dependencies**

- Run the following commands to install the dependencies:
```shell
yarn
```

**Configure environment variables file**

Go to `./settings/` and copy `settings-development-example.json` to `settings-development.json` and modify the following:

- **STORAGE_PATH** to your path project in your PC/MAC.

Running project
---------------

**On Mac OS X and Linux**
- Run the following commands:
```shell
yarn run:mac
```

**On Windows**
- Run the following commands:
```shell
SET MONGO_URL=mongodb://localhost:27017/curso-meteor
yarn run:windows
```


**Note:**
You can configure your Jetbrains IDE to run the project from the IDE execution button.
