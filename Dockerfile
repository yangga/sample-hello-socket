FROM node:10.14.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD . .

RUN apt-get update
RUN apt-get install -y haproxy

COPY docker_plugins/conf/haproxy.cfg /etc/haproxy/haproxy.cfg

RUN npm install

COPY --chown=1000:0 docker_plugins/docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh

ENTRYPOINT ["docker_entrypoint.sh"]
