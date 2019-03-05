#!/bin/sh
@echo off
SET location=%~dp0

:: go to api and install express and mysql
cd %location%api
echo Installing Express package
echo results: & echo.
terminal /K "npm install express && exit"
echo Installing mysql package
echo results: & echo.
cmd.exe /K "npm install mysql && exit"
echo.

:: install all dependencies
echo Installing other package dependencies found in package-lock.json
echo results: & echo.
cd %location%pollinator-garden
cmd.exe /K "npm install && exit"
echo.

:: link ng commands to be used in angular cli
echo Linking keywords & echo.
cmd.exe /K "npm link && exit"
echo.

:: auditing for CALS IT security
echo Patching Vulnerabilities & echo.
cmd.exe /K "npm audit fix && exit"
echo.
echo Performing audit
echo results: & echo.
cmd.exe /K "npm audit && exit"
echo.

pause