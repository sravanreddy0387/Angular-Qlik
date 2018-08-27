"use strict";

app.obj.angularApp.controller("controller.home", function(
  $scope,
  $rootScope,
  $location,
  $injector,
  api,
  utility
) {
  var me = {};

  me.init = function() {
    me.measures = [
      [
        "Count( {$<Priority={'High'}, Status -={'Closed'} >} Distinct %CaseId )",
        false
      ]
    ];
    $scope.kapi = [];
    me.objects = ["ycppXj"];
  };

  me.boot = function() {
    me.init();

    me.events();

    me.createKpis();
    //me.getObjects();

    // For debugging selections uncommment the line below
    app.obj.app.getObject("CurrentSelections", "CurrentSelections");
  };

  me.events = function() {
    me.createKpis = function() {
      angular.forEach(me.measures, function(value, key) {
        api.getHyperCube([], [value[0]], function(data) {
          $scope.kapi[key] = value[1]
            ? utility.string2thousands(data[0][0].qText)
            : data[0][0].qText;
        });
      });
    };
    $rootScope.clearAll = function() {
      app.obj.app.clearAll();
    };
    $scope.resizeIt = function() {
      console.log(app.obj.qlik);
      app.obj.qlik.resize();
    };
  };

  me.boot();
});
