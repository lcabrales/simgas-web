# SimgasWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Publish into Amazon Lightsail

1. Generate a production build with `ng build --prod` and push it to the remote repository.
2. Execute a `git pull` to fetch the recent `dist/` build.
3. Delete every file except `index.nginx-debian.html` from `/var/www/html` with `ls | grep -v index.nginx-debian.html | xargs rm -rf`.
4. Copy every file from `/dist/simgas-web` folder into `/var/www/html` with `cp -a ~/simgas-web/dist/simgas-web/. /var/www/html`.