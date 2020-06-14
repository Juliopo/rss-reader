# MYLIVN task

# Taks 1.
Please, write your own versions of:
Array.prototype.map
Array.prototype.filter
Array.prototype.forEach
Array.prototype.reduce

# Task 1 response:
```sh
Array.prototype.map = function(callback) {
      let index = -1,
      length = this.length,
      result = Array(length);

  while (++index < length) {
    result[index] = callback(this[index], index, this);
  }
  return result;
}

Array.prototype.filter = function (callback) {
  let index = -1,
      length = this.length
      resIndex = 0,
      result = [];

  while (++index < length) {
    Let value = this[index];
    if (predicate(value, index, this)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

Array.prototype.forEach = function(callback){
   let index = -1,
      length =  this.length;

  while (++index < length) {
    if (callback(this[index], index, this) === false) {
      break;
    }
  }
  return this;
}

Array.prototype.reduce = function (callback, accumulator, initAccum) {
  let index = -1,
      length = this.length;

  if (initAccum && length) {
    accumulator = this[++index];
  }
  while (++index < length) {
    accumulator = callback(accumulator, array[index], index, array);
  }

  return accumulator;
}
```

# Taks 2. Project
Please, create a simple application where:
UI contains: Form (Input + Submit button), List of items, Pagination
Form Input allows users to input an RSS Feed URL
Form Submit Button fetches provided RSS-feed, then parses it and uses it in List
List just shows downloaded elements (in the simplest way)
Pagination ... it's pagination :) It may be pretty simple, but it should work
In case of any error, UI should show something to the user.

## Installation
This project requires [Node.js](https://nodejs.org/) v10.17+ to run. If you don't want to install or change your node version, you can also do it via docker [Docker](https://docs.docker.com/get-docker/) and docker-compose [docker-compose](https://docs.docker.com/compose/install/)

### installation via node:
Go to your bash, go to the root of this project and run: 
```sh
$ yarn install
$ yarn start
```
the project will start running and will open the browser in the port 4000.

### Installation via docker-compose.
Go to your bash, go to the root of this project and run: 
```sh
$ docker-compose up --build
```
This will install the dependencies and run the project in the port 8080, then open the browser in localhost:4000


## About the App
The app will show you an input field in which you can validate an RSS feed, if is valid will allow you to fetch the data and show it in a paginated list with title and description.

The idea of this ap is not only show the actuall result but to show a very good architecture for handling a big projects with prod build and caching, even if the project right now is very small.