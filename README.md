# Example Contacts Application

An application developed as part of a tutorial series on my blog at [Optimal Thoughts](http://blog.optimalcadence.com). The tutorial is a work in progress so check back often for updates.

This application makes use of [Ember CLI](http://www.ember-cli.com/) on the front end with [Hapi](http://hapijs.com/) REST services; [Bookshelf](http://bookshelfjs.org/) ORM with [Knex.js](http://knexjs.org/) for building queries, managing DB migrations, and seed data; and [Sqlite3](http://www.sqlite.org/) for persistence.

## Prerequisites

   * You must have Node.js and NPM installed on your computer.  If not you will need to follow the  installation guide for your platform at http://nodejs.org/.
   * You must have Ember CLI installed globally.  If not you can follow the setup guide at http://www.ember-cli.com/#getting-started.

## Installation

   * Clone this project or download the archive file and unzip it
   * In a terminal navigate to the server directory and run `npm install`
   * In a terminal navigate to the client directory and run `npm install` followed by `bower install`

## Starting Hapi

In a terminal execute the following from within the server directory

			$ node server

## Starting Ember CLI

In a terminal execute the following from within the client directory

			$ ember server -proxy http://localhost:3000/api

You can view the application at http://localhost:4200/contacts and the Ember CLI tests at http://localhost:4200/tests. To run the Hapi API tests run `npm test` while in the server directory.