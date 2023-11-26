# Django + Vercel

This example shows how to use Django 4 on Vercel with Serverless Functions using the [Python Runtime](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/python).

## Demo

https://django-template.vercel.app/

## How it Works

Our Django application, `TrackMyMoves` is configured as an installed application in `project_track_my_moves/settings.py`:

```python
# project_track_my_moves/settings.py
INSTALLED_APPS = [
    # ...
    'track_my_moves.apps.TrackMyMovesConfig',
]
```

We allow "\*.vercel.app" subdomains in `ALLOWED_HOSTS`, in addition to 127.0.0.1:

```python
# project_track_my_moves/settings.py
ALLOWED_HOSTS = ['127.0.0.1', '.vercel.app']
```

The `wsgi` module must use a public variable named `application` to expose the WSGI application:

```python
# project_track_my_moves/wsgi.py
application = get_wsgi_application()
```

The corresponding `WSGI_APPLICATION` setting is configured to use the `application` variable from the `project_track_my_moves.wsgi` module:

```python
# project_track_my_moves/settings.py
WSGI_APPLICATION = 'project_track_my_moves.wsgi.application'
```


## Running Locally

```bash
python manage.py runserver
```

Your Django application is now available at `http://localhost:8000`.
