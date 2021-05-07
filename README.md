# React Node Mongodb project

# Install

Make sure you have [docker installed](https://docs.docker.com/get-docker/).

```bash
$ yarn
```

# Dev

```bash
$ yarn dev:all
```

Open http://localhost:3001

# Roadmap

- [ ] make collaborative (websockets)
- [ ] separate rectangles and connecting lines to own components
- [ ] ensure no connecting lines duplicates in reseting db
- [ ] add tests
  - [ ] server
  - [ ] client
- [ ] convert to monorepo
- [ ] deploy
  - [ ] docker compose prod version
  - [ ] Dockerfiles prod versions
  - [ ] Heroku / Aws?
- [ ] Implement typescript in the server
- [ ] handle rectangle drag optimistic update revert fail
- [ ] server: separate rectangles and commenting lines to two microservices
- [ ] devOps: setup travis
  - [ ] run tests/lint/tsc
  - [ ] deploy to staging when pushing to develop
  - [ ] deploy to production when pushing to master
