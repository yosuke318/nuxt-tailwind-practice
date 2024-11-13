FROM ubuntu:latest
LABEL authors="maruyama"

ENTRYPOINT ["top", "-b"]