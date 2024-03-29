MGC is a domain specific language based on AngularJS, intended for mathematics education web publishing.
***
<!--
[![Build Status](https://secure.travis-ci.org/angular-ui/angular-ui.png)](http://travis-ci.org/angular-ui/angular-ui)
-->

## Usage
<div class="alert">
Do not use - nothing much works yet!
</div>

### Requirements

* **AngularJS v1.0.1+** is currently required.
* **jQuery / Plugins** _(depends on directive)._ Check specific directive dependencies for more information

## Installation

The repository comes with the modules pre-built and compressed into the `build/` directory.

    angular.module('myApp', ['mgc']);

The modules can be found in the [Directives](https://github.com/gmp26/mgc/tree/master/modules/directives), [Filters](https://github.com/gmp26/mgc/tree/master/modules/filters), [Services](https://github.com/gmp26/mgc/tree/master/modules/services) and [Controllers](https://github.com/gmp26/mgc/tree/master/modules/controllers) folders. Check out the readme file associated with each module for specific module usage information.

## Development

You do not need to build the project to use it - see above - but if you are working on it then this is what you need to know.

### Requirements

1. Install [Node.js](http://nodejs.org/) and npm (which comes with node)

1. Install local dependencies:

    `$ npm install`

1. Install global dependencies `grunt`, and `testacular`:
    
    `$ npm install -g testacular grunt`

### Build Files & Run Tests

Before you commit, always run `grunt` to build and test everything once.

    $ grunt

### Test & Develop

The modules come with unit tests that should be run on any changes and certainly before committing changes to the project.  The unit tests should also provide further insight into the usage of the modules.

First, start the testacular server:

    $ grunt server

Then, open your browser to http://localhost:8080 and run the watch command to re-run tests on every save:

    $ grunt watch

<!--
### Publishing

For core team: if you wish to publish a new version follow these steps:

1. Bump the version number inside `package.json`
2. Build and test
3. Commit the updated `package.json` and `build/` folder on their own commit
4. Tag the commit: `git tag v[maj].[min].[patch]`
5. Push the tag: `git push [angular-ui] master --tags`
-->