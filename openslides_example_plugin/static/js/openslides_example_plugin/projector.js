(function () {

'use strict';

angular.module('OpenSlidesApp.openslides_example_plugin.projector', ['OpenSlidesApp.openslides_example_plugin'])

.config([
    'slidesProvider',
    function(slidesProvider) {
        slidesProvider.registerSlide('openslides_example_plugin/simple_welcome_slide', {
            template: 'static/templates/openslides_example_plugin/simple_welcome_slide.html',
        });
    }
])

}());
