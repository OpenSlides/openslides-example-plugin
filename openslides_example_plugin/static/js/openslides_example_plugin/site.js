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
    '$scope',
    '$http',
    'Projector',
    function ($scope, $http, Projector) {
        var Ctrl = this;

        // Bind projectors to controller.
        $scope.$watch(
            function () {
                return Projector.lastModified();
            },
            function () {
                Ctrl.projectors = Projector.getAll();
            }
        );

        // Default projector for the simple welcome slide. Projector 1 is hard coded.
        Ctrl.defaultProjectorSimpleWelcomeSlideId = 1;

        // Project simple welcome slide.
        Ctrl.projectSimpleWelcomeSlide = function (projectorId) {
            var isProjectedSimpleWelcomeSlideId = Ctrl.isProjectedSimpleWelcomeSlide();
            if (isProjectedSimpleWelcomeSlideId > 0) {
                // Deactivate slide on current projector.
                $http.post('/rest/core/projector/' + isProjectedSimpleWelcomeSlideId + '/clear_elements/');
            }
            if (isProjectedSimpleWelcomeSlideId != projectorId) {
                // Activate slide on the new projector.
                $http.post(
                    '/rest/core/projector/' + projectorId + '/prune_elements/',
                    [{name: 'openslides_example_plugin/simple_welcome_slide'}]
                );
            }
        };

        // Check if simple welcome slide is projected anywhere.
        Ctrl.isProjectedSimpleWelcomeSlide = function () {
            var predicate = function (element) {
                return element.name === 'openslides_example_plugin/simple_welcome_slide';
            };
            var projectorId = 0;
            Ctrl.projectors.forEach(function (projector) {
                if (typeof _.findKey(projector.elements, predicate) === 'string') {
                    projectorId = projector.id;
                }
            });
            return projectorId;
        };
    }
]);

}());
