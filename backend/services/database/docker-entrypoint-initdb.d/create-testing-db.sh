#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 -d "$POSTGRES_DB" -U "$POSTGRES_USER" <<EOF
\set db_name `echo "${POSTGRES_DB}_testing"`
CREATE DATABASE :db_name;
EOF
