"""
WSGI config for project_track_my_moves project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os
# import sys

# path = os.path.expanduser('~/TrackMyMoves/backend')
# if path not in sys.path:
#     sys.path.insert(0, path)

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project_track_my_moves.settings')

application = get_wsgi_application()
