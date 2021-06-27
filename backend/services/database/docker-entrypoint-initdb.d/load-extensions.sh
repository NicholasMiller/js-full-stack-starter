#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 -d "$POSTGRES_DB" -U "$POSTGRES_USER" <<EOF
CREATE EXTENSION pgcrypto;
SELECT * FROM pg_extension;
EOF
