# Angular14DemoApp

## Overview

This is a simple project to allow film data to be created, read, updated and deleted. It consists of the following parts:

- SQLite database generated using Entity Framework 'code first' approach. 
- C# REST API connecting to a SQLite database.
- Angular web application connecting to the REST API to create, read, update and delete data.

## Running

The REST API can be run from Visual Studio and should be started before running the Angular application. 

To run the Angular applicaton first run the 'npm install' command followed by the 'ng serve' command - this will run at localhost:4200. Note if the API runs on a port other than '44376' you will need to update the 'apiUrl' config in the 'environment.development.ts' file to point at the same port where the API is running.

## Database creation

The SQLite database is checked in with the code, but if required could be generated again by running the 'update-database' command from within Visual Studio.