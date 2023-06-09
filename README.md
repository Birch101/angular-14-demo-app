# Angular14DemoApp

[![Build and Deploy to Azure App Service](https://github.com/Birch101/angular-14-demo-app/actions/workflows/node-build-deploy.yml/badge.svg)](https://github.com/Birch101/angular-14-demo-app/actions/workflows/node-build-deploy.yml)

## Overview

This is a simple project to allow film data to be created, read, updated and deleted. It consists of the following parts:

- Angular web application connecting to the REST API to create, read, update and delete data.
- Connects to the REST API defined in https://github.com/Birch101/rest-api-demo

## Running

Clone the REST API from https://github.com/Birch101/rest-api-demo. This API can then be run from Visual Studio.

To run the Angular applicaton first run the 'npm install' command followed by the 'ng serve' command - this will run at localhost:4200. Note if the API runs on a port other than '44376' you will need to update the 'apiUrl' config in the 'environment.development.ts' file to point at the same port where the API is running.

## Deployment
The Angular application is automatically deployed to an Azure App Service at this URL via a yaml script included in this repository:
- https://angular-14-demo.azurewebsites.net

This Angular application makes use of following API:
- REST API - https://github.com/Birch101/rest-api-demo - deployed to https://rest-api-demo-cb.azurewebsites.net/swagger/index.html
