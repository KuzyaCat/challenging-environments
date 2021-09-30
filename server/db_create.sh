#! /bin/sh
sudo -u postgres psql -c 'CREATE DATABASE challenging_environments_prod'
sudo -u postgres psql -c 'CREATE DATABASE challenging_environments_dev'
sudo -u postgres psql -c 'CREATE DATABASE challenging_environments_test'
