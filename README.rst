===========================
 OpenSlides Example Plugin
===========================

Overview
========

This plugin for OpenSlides provides an example how to write plugins for
OpenSlides.


Requirements
============

OpenSlides 2.1.x (https://openslides.org/)


Install
=======

This is only an example instruction to install the plugin on GNU/Linux. It
can also be installed as any other Python package and on other platforms,
e. g. on Windows.

Change to a new directory::

    $ cd

    $ mkdir OpenSlides

    $ cd OpenSlides

Setup and activate a virtual environment and install OpenSlides and the
plugin in it::

    $ python3 -m venv .virtualenv

    $ source .virtualenv/bin/activate

    $ pip install "openslides>=2.1,<2.2" openslides-example-plugin

Start OpenSlides::

    $ openslides


License and authors
===================

This plugin is Free/Libre Open Source Software and distributed under the
MIT License, see LICENSE file. The authors are mentioned in the AUTHORS file.


Changelog
=========

Version 1.0 (unreleased)
------------------------
* First release of this plugin.
