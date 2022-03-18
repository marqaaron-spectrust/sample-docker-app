#!/usr/bin/env python3

### IMPORTS ###
import logging
import traceback
import requests
import secrets

from os import environ
from flask import Flask, jsonify, request, redirect, make_response
from flask_caching import Cache

### GLOBALS ###
app = Flask(__name__)
cache = Cache(app,config={'CACHE_TYPE': 'simple'})

def setSessionCookie(request):
    if 'marqaaron-session' in request.cookies:
        return request.cookies['marqaaron-session']
    else:
        return secrets.token_hex(nbytes=16)


# --------- SERVER API ENDPOINTS ----------

@app.route('/api/healthz', methods=['GET'])
def healthz():
    response = {
        'app_data': 'Sample API Up and Running'
    }
    return jsonify(response)

@app.route('/api/config', methods=['GET'])
def config():
    response = {}
    response['app_data'] = {}
    if 'VERSION' in environ:
        response['app_data']['VERSION'] = environ['VERSION'] if environ['VERSION'] != '' else "local-python-mockdata"
    else:
        response['app_data']['VERSION'] = "local"
    response = make_response(response)
    response.set_cookie('marqaaron-session',setSessionCookie(request))
    return response, 200

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    response = {}
    if data['email'] == 'jennypublic@gmail.com' and data['password'] == 'jennyjenny':
        response['app_data'] = {}
        response['app_data']['result'] = True
        response = make_response(response)
        response.set_cookie('marqaaron-session',setSessionCookie(request))
        return response, 200
    else:
        error = dict(
            title='Login Failed',
            message='Please verify that your email and password are correct.'
        )
        response['error'] = error
        response = make_response(response)
        response.set_cookie('marqaaron-session',setSessionCookie(request))
        return response, 403

@app.route('/api/logout', methods=['GET'])
def logout():
    response = {}
    response['app_data'] = {}
    response['app_data']['result'] = True
    response = make_response(response)
    response.set_cookie('marqaaron-session',setSessionCookie(request))
    return response, 200

@app.route('/api/accountDetails', methods=['GET'])
def accountDetails():
    response = {}
    response['app_data'] = {}
    userDetails = dict(
                firstName='Jenny',
                lastName='Public',
                email='jennypublic@gmail.com',
                phoneNumber='555-867-5309',
            )
    response['app_data']['user'] = userDetails
    response = make_response(response)
    response.set_cookie('marqaaron-session',setSessionCookie(request))
    return response, 200

@app.route('/api/lb/<endpoint>', methods=['POST'])
def loopBack(endpoint):
    data = request.get_json()
    response = {}
    response['app_data'] = data
    response = make_response(response)
    response.set_cookie('marqaaron-session',setSessionCookie(request))
    return response, 200

@app.route('/api/nav/<location_id>', methods=['GET'])
def location(location_id):
    response = {}
    response['app_data'] = {}
    response['app_data']['location'] = location_id
    response = make_response(response)
    response.set_cookie('marqaaron-session',setSessionCookie(request))
    return response, 200


# --------- VUE APP RENDERING MUST BE AFTER SERVER API ENDPOINTS ----------

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    logging.info("Path: %s", path)
    allowedStaticFileRoutes = ['assets','favicon.ico']
    pathParts = path.split('/')
    if pathParts[0] in allowedStaticFileRoutes:
        return app.send_static_file(path)
    else:
        return app.send_static_file("index.html")

### CLASSES ###

### MAIN ###
def main():

    # Setup logging
    log_format = "%(asctime)s:%(levelname)s:%(name)s.%(funcName)s: %(message)s"
    logging.basicConfig(
        format=log_format,
        level=logging.DEBUG
    )

    # Set debug_mode variable based on environment variable at deployment
    if 'SERVER_DEBUG_MODE' in environ:
        debug_mode = True if environ['SERVER_DEBUG_MODE'] == 'true' else False
    else:
        debug_mode = False

    # Do stuff
    # Figure out the Kube Proxy thing
    app.run(host='0.0.0.0', port=8082, debug=debug_mode)

if __name__ == "__main__":
    main()