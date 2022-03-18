# Build Related Arguments
version=local

# Server Related Arguments
serverDebug='true'

# Local Environment Related Arguments
localPort=8082

help:
	@echo "Makefile Arguments:"
	@echo ""
	@echo "Build Related Arguments:"
	@echo "version (Default 'local'. Production format 'v0.0.0')"
	@echo ""
	@echo "Server Related Arguments:"
	@echo "serverDebug (Default 'enabled')"
	@echo ""
	@echo "Local Environment Related Arguments:"
	@echo "localPort (Default '8082')"
	@echo ""
	@echo "Make Commands:"
	@echo "build-local (Builds Docker Image locally for development)"
	@echo "run-local (Runs Docker Image locally for development)"


build-local:
	docker build \
	--build-arg VERSION=${version} \
	-t marqaaron/simple-user-app \
	.

run-local:
	docker run -it -p ${localPort}:8082 \
    --env SERVER_DEBUG_MODE=${serverDebug} \
    --rm \
    --name simple-user-app \
    marqaaron/simple-user-app

dist-to-static:
	cp -r app/dist/ server/python_config/static && rm -rf app/dist