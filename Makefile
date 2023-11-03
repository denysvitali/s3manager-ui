IMAGE=dvitali/s3manager-ui
TAG?=latest

S3MANAGER_HOST?=127.0.0.1
S3MANAGER_PORT?=8080

docker-build:
	docker build -t "$(IMAGE):$(TAG)" .

docker-push:
	docker push "$(IMAGE):$(TAG)"

docker-run:
	docker run -it \
		--rm -p 8085:80 \
		-e "S3MANAGER_ENDPOINT=http://$(S3MANAGER_HOST):$(S3MANAGER_PORT)" \
		"$(IMAGE):$(TAG)"