# Build Related Arguments
version=local
tag=marqaaron/simple-user-app

# Server Related Arguments
serverDebug='true'

# Host Environment Related Arguments
hostPort=8082
containerName=simple-user-app

help:
	@echo "Makefile Arguments:"
	@echo ""
	@echo "Build Related Arguments:"
	@echo "version (Default 'local'. Production format 'v0.0.0')"
	@echo "tag (Default 'marqaaron/simple-user-app')"
	@echo ""
	@echo "Server Related Arguments:"
	@echo "serverDebug (Default 'enabled')"
	@echo ""
	@echo "Host Environment Related Arguments:"
	@echo "hostPort (Default '8082')"
	@echo "containerName (Default 'simple-user-app')"
	@echo ""
	@echo "Make Commands:"
	@echo "build-local (Builds Docker Image locally for development)"
	@echo "run-local (Runs Docker Image locally for development)"
	@echo "run-production (Runs Docker Image for production)"


build-local:
	docker build \
	--build-arg VERSION=${version} \
	-t ${tag} \
	.

run-local:
	docker run -it -p ${hostPort}:8082 \
    --env SERVER_DEBUG_MODE=${serverDebug} \
    --rm \
    --name ${containerName} \
    ${tag}

run-production:
	docker run -d -p ${hostPort}:8082 \
	--env SERVER_DEBUG_MODE=${serverDebug} \
	--name ${containerName} \
	${tag}
