/**
 * Created by dcreey on 5/31/2016.
 */

var testHelper = function(){
    "use strict";

};

testHelper.prototype = {
    mockTemplate: (templateRoute, tmpl) => {
        $templateCache.put(templateRoute, tmpl || templateRoute);
    },
    goTo: (url) => {
        $location.url(url);
        $rootScope.$digest();
    },
    goFrom: (url) => {
        return {
            toState: function (state, params) {
                $location.replace().url(url); //Don't actually trigger a reload
                $state.go(state, params);
                $rootScope.$digest();
            }
        };
    },
    resolve: (value) => {
        return {forStateAndView: function (state, view) {
            var viewDefinition = view ? $state.get(state).views[view] : $state.get(state);
            return $injector.invoke(viewDefinition.resolve[value]);
        }};
    }

}

module.exports = testHelper;