(function(ng)
{
  'use strict';
  var
  init = function()
  {
    ng
    .module('iShiasortable', [])
    .directive('ishiaSortable', [directiveProvider])
  },

  arrayExchange = function(arrayObject, hostIndex, guestIndex)
  {
    var temp = arrayObject[hostIndex];
    arrayObject[hostIndex] = arrayObject[guestIndex];
    arrayObject[guestIndex] = temp;
    return arrayObject;
  },

  findIndex = function (node)
  {
    var i=1;
    while(node.previousSibling){
        node = node.previousSibling;
        if(node.nodeType === 1){
            i++;
        }
    }
    return i-1;
  },

  directiveProvider = function()
  {
    var
    link = function(scope, element, attr)
   {
     console.info('sortable');
     element.attr("draggable", "true");
     element.bind("dragstart", function(event)
     {
       var elmIndex = findIndex(element[0]);
       console.info('elmIndex: ', elmIndex);
       console.info('dragstart: ', event);
       event.dataTransfer.setData("elmIndex", elmIndex);
     });

     element.bind("dragover", function(event)
     {
       event.preventDefault();
     });

     element.bind("drop", function(event)
     {
       event.preventDefault();
       // get guest index
       var guestIndex = event.dataTransfer.getData("elmIndex");
       var hostIndex = findIndex(element[0]);
       // switch childs
       scope.$parent.list = arrayExchange(scope.list, hostIndex, guestIndex);
       scope.$apply();
     });
   }
    return {
      restrict: "A",
      scope:{
        list: "=ishiaSortable"
      },
      link:link
    }
  }
  ;
  init();
})(this.angular);
