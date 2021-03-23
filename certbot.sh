#!/bin/bash
docker run -it --rm -p 443:443 -p 80:80 --name certbot \
  -v "/etc/letsencrypt:/etc/letsencrypt" \
  -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
  -v "/var/log/letsencrypt":"/var/log/letsencrypt" \
  certbot/certbot:latest \
  certonly

