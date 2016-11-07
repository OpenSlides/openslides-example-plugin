(function () {

'use strict';

angular.module('OpenSlidesApp.openslides_example_plugin.site', ['OpenSlidesApp.openslides_example_plugin'])

.config([
    'mainMenuProvider',
    'gettext',
    function (mainMenuProvider, gettext) {
        mainMenuProvider.register({
            'ui_sref': 'openslides_example_plugin_overview',
            'img_class': 'star',
            'title': gettext('Example Plugin'),
            'weight': 5000,
            'perm': 'agenda.can_manage',
        });
    }
])

.config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('openslides_example_plugin_overview', {
                url: '/openslides_example_plugin',
                templateUrl: 'static/templates/openslides_example_plugin/overview.html',
            });
    }
])

.controller('OpenSlidesExamplePluginOverviewCtrl', [
    '$http',
    'Projector',
    function ($http, Projector) {
        var Ctrl = this;

        // Project simple welcome slide.
        Ctrl.projectSimpleWelcomeSlide = function () {
            $http.post(
                '/rest/core/projector/1/prune_elements/',
                [{name: 'openslides_example_plugin/simple_welcome_slide'}]
            );
        };

        // Check if custom welcome slide is projected.
        Ctrl.isProjectedSimpleWelcomeSlide = function () {
            var projector = Projector.get(1);
            var isProjected = false;
            if (typeof projector !== 'undefined') {
                var predicate = function (element) {
                    return element.name == 'openslides_example_plugin/simple_welcome_slide';
                };
                isProjected = typeof _.findKey(projector.elements, predicate) === 'string';
            }
            return isProjected;
        };
    }
]);

}());
