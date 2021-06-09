FROM gitpod/workspace-mysql

USER root

ENV DEBIAN_FRONTEND noninteractive

RUN sudo apt-get update && sudo apt-get install -y redis-server && sudo rm -rf /var/lib/apt
