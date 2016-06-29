/**
 * Created by dcreey on 6/23/2016.
 */
'use strict';

app.directive('route', function () {
    return {
        restrict: 'E',
        scope: {
            color1: '=',
            onDragEnd: '&'
        },
        // object is passed while making the call
        template: "<button ng-click='updateFn({msg : \"Hello World!\"})'>Click</button>",
        replace: true,
        link: function(scope, elm, attrs) {
            function onResize(e) {
                // Namespacing events with name of directive + event to avoid collisions
                scope.$broadcast('resize::resize');
            }

            function cleanUp() {
                angular.element($window).off('resize', onResize);
            }

            angular.element($window).on('resize', onResize);
            scope.$on('$destroy', cleanUp);
        }
    }
});