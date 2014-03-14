(function(){
  'use strict';

  angular.module('ui.grid').directive('uiGridViewport', ['$log', '$document', '$timeout', 'uiGridConstants', 'gridUtil',
    function($log, $document, $timeout, uiGridConstants, GridUtil) {
      return {
        // priority: 1000,
        require: '?^uiGrid',
        scope: false,
        link: function($scope, $elm, $attrs, uiGridCtrl) {
          if (uiGridCtrl === undefined) {
            throw new Error('[ui-grid-body] uiGridCtrl is undefined!');
          }

          $elm.on('scroll', function (evt) {
            var newScrollTop = $elm[0].scrollTop;
            var newScrollLeft = $elm[0].scrollLeft;

            if (newScrollLeft !== uiGridCtrl.prevScrollLeft) {
              var xDiff = newScrollLeft - uiGridCtrl.prevScrollLeft;

              var horizScrollLength = (uiGridCtrl.grid.getCanvasHeight() - uiGridCtrl.grid.getViewportHeight());
              var horizScrollPercentage = (uiGridCtrl.prevScrollLeft + xDiff) / horizScrollLength;

              uiGridCtrl.adjustScrollHorizontal(newScrollLeft, horizScrollPercentage);
            }

            if (newScrollTop !== uiGridCtrl.prevScrollTop) {
              var yDiff = newScrollTop - uiGridCtrl.prevScrollTop;

              // uiGridCtrl.fireScrollingEvent({ y: { pixels: diff } });
              var vertScrollLength = (uiGridCtrl.grid.getCanvasHeight() - uiGridCtrl.grid.getViewportHeight());
              // var vertScrollPercentage = (uiGridCtrl.prevScrollTop + yDiff) / vertScrollLength;
              var vertScrollPercentage = newScrollTop / vertScrollLength;

              uiGridCtrl.adjustScrollVertical(newScrollTop, vertScrollPercentage);
            }
          });
        }
      };
    }
  ]);

})();