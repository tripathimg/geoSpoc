#!/bin/bash
export MONGO_URI='mongodb://localhost:27017/geoSpoc'
export NODE_ENV='dev'
export PORT=8600
export AUTH_SIGNATURES='FMoezHjTHK'
export AUTH_CALLERS='{"ADMIN":"E2E-ADMIN","LAMBDA":"E2E-LAMBDA"}'
export JWT_SECERET='UZFJLbujnh3xWy3D2StImV5QyRFZIOcb'
export TOKEN_VALIDITY='900000'
export BASE_URL=''

npm run dev

/bin/bash