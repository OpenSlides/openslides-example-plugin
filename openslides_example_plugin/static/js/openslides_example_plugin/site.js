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

        /*
         * Bind projectors to controller.
         */
        $scope.$watch(
            function () {
                return Projector.lastModified();
            },
            function () {
                Ctrl.projectors = Projector.getAll();
            }
        );

        /*
         * Default projector for the simple welcome slide. Projector 1 is hard
         * coded here but you can use custom projection defaults instead.
         */
        Ctrl.defaultProjectorSimpleWelcomeSlideId = 1;

        /*
         * Project simple welcome slide.
         */
        Ctrl.projectSimpleWelcomeSlide = function (projectorId) {
            // If the simple welcome slide is already projected, remove it from all projectors.
            var isProjectedSimpleWelcomeSlideIds = Ctrl.isProjectedSimpleWelcomeSlide();
            _.forEach(isProjectedSimpleWelcomeSlideIds, function (id) {
                $http.post('/rest/core/projector/' + id + '/clear_elements/');
            });
            // Show the simple welcome slide if it was not projected before on the given projector.
            if (_.indexOf(isProjectedSimpleWelcomeSlideIds, projectorId) === -1) {
                $http.post(
                    '/rest/core/projector/' + projectorId + '/prune_elements/',
                    [{name: 'openslides_example_plugin/simple_welcome_slide'}]
                );
            }
        };

        /*
         * Check if simple welcome slide is projected anywhere.
         */
        Ctrl.isProjectedSimpleWelcomeSlide = function () {
            var predicate = function (element) {
                return element.name === 'openslides_example_plugin/simple_welcome_slide';
            };
            var isProjectedIds = [];
            Ctrl.projectors.forEach(function (projector) {
                if (typeof _.findKey(projector.elements, predicate) === 'string') {
                    isProjectedIds.push(projector.id);
                }
            });
            return isProjectedIds;
        };
    }
]);

}());
