FROM alpine:3.15 AS baseimage
ARG VERSION='dev'
RUN apk add --no-cache bash
COPY /build /build
COPY /server /server
RUN ["chmod", "+x", "/build/baseImage.sh"]
RUN ["/bin/bash","-c","/build/baseImage.sh"]

FROM baseimage AS intermediateImage
WORKDIR /ui
COPY /app ./app
RUN ["/bin/bash","-c","/build/intermediateImage.sh"]

FROM baseimage
MAINTAINER SpecTrust
COPY --from=intermediateImage /ui /ui
ENTRYPOINT ["/bin/bash","-c","/server/startupPython.sh"]
EXPOSE 8082