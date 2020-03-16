# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.5] - 2020-03-15
### Changed
- UI changed, fixed un-matching state's name
- UI changed, remove expand states
- UI changed, add daily new cases, deaths cases and recovered cases for both US and CA
- UI changed, add daily new cases, deaths cases for each states
- UI changed, add 1point3acres as date source

## [0.0.4] - 2020-03-13
### Changed
- UI changed, fixed un-matching column
- UI changed, fixed un-matching state's name

## [0.0.3] - 2020-03-12
### Added
- Add a new endpoint `/api/covid19/en`, load North Amercia cases
- Add handlebar to display US cases in different states
- Update README

## [0.0.2] - 2020-02-28
### Added
- Add a new endpoint, some fileds are no longer exist in previous endpoint response
- Update README

## [0.0.1] - 2020-02-11
### Changed
- Change exposed port 80 to 5000.
- Add port 5000 to all Backend endpoint routes
- Add variables in Makefile
- Change default port 3000 to 5000 in server.ts if port is not given in env
- Update README