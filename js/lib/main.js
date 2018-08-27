var scriptsUrl = "http://localhost:4848/extensions/angularTemplate/";
require.config({
  baseUrl: "http://localhost:4848/resources",
  paths: {
    domReady: scriptsUrl + "js/vendor/domReady/domReady",
    bootstrap: scriptsUrl + "js/vendor/bootstrap/dist/js/bootstrap.min",
    "ui.bootstrap":
      scriptsUrl + "js/vendor/angular-bootstrap/ui-bootstrap-tpls.min",
    app: scriptsUrl + "js/lib/app",
    ga: scriptsUrl + "js/lib/ga",
    "controller.home": scriptsUrl + "js/controllers/home",
    "directive.getObject": scriptsUrl + "js/directives/getObject",
    "directive.dropDown": scriptsUrl + "js/directives/dropDown",
    "service.api": scriptsUrl + "js/services/api",
    "service.utility": scriptsUrl + "js/services/utilities"
  }
});

define(["require", "angular", "app"], function(require, angular) {
  "use strict";

  app.obj.angularApp = angular.module("myApp", [
    "ngAnimate",
    "ngRoute",
    "ui.bootstrap"
  ]);
  app.obj.angularApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: scriptsUrl + "views/home.html",
        controller: "controller.home"
      })
      .otherwise({ redirectTo: "/" });
  });
  require([
    "domReady!",
    "js/qlik",
    "angular",
    "ui.bootstrap",
    "controller.home",
    "service.api",
    "service.utility",
    "directive.getObject",
    "directive.dropDown",
    "bootstrap"
  ], function(document, qlik) {
    app.obj.qlik = qlik;
    qlik.setOnError(function(error) {
      if (!angular.isUndefined(error) && error.code == 16) {
        location.reload();
      } else {
        console.log(error);
      }
    });

    angular.bootstrap(document, ["myApp", "qlik-angular"]);

    app.boot();
  });
});
