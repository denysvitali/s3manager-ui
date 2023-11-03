# s3manager-ui

An UI for [s3manager](https://github.com/denysvitali/s3manager).

![Example UI](docs/example.jpg)


## Requirements

- Docker
- Make
- [s3manager](https://github.com/denysvitali/s3manager) up and running somewhere reachable (e.g: http://127.0.0.1:8080)

## Getting started

```sh
make docker-build
make docker-run
```

If you're running `s3manager` somewhere else than `127.0.0.1:8085`, use these `Makefile` variables:

- `S3MANAGER_HOST`
- `S3MANAGER_PORT`

as follows:

```sh
S3MANAGER_HOST="192.168.0.100" S3MANAGER_PORT=8081 make docker-run
```

## Development


```sh
yarn install
yarn run dev
```

If everything is correct, by going to http://127.0.0.1:5173/buckets you should see a list of your buckets - and you should be able to explore them.