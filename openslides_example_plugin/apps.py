from django.apps import AppConfig

from . import __description__, __verbose_name__, __version__


class ExamplePluginAppConfig(AppConfig):
    name = 'openslides_example_plugin'
    verbose_name = __verbose_name__
    description = __description__
    version = __version__
    angular_site_module = True
    angular_projector_module = True
    js_files = [
        'static/js/openslides_example_plugin/base.js',
        'static/js/openslides_example_plugin/site.js',
        'static/js/openslides_example_plugin/projector.js',
    ]

    def ready(self):
        # Load projector elements.
        # Do this by just importing all from these files.
        from . import projector  # noqa

        # Add plugin urlpatters to application configuration so OpenSlides
        # can find it.
        from .urls import urlpatterns

        self.urlpatterns = urlpatterns
