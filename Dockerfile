FROM node:lts AS builder
COPY . /app
WORKDIR /app
RUN yarn install
RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html/
COPY nginx/nginx.conf /etc/nginx/templates/default.conf.template
COPY nginx/config.json /usr/share/nginx/html/config.json.template
COPY nginx/entrypoint.sh /entrypoint.sh

ENV S3MANAGER_ENDPOINT=http://127.0.0.1:8080

ENTRYPOINT [ "/entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]