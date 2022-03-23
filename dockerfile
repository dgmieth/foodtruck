# #without pm2
# FROM node:14-alpine
# COPY ./kungfuBBQ_administrative /var/www/adm
# COPY ./kungfuBBQ_REST /var/www/rest
# WORKDIR /var/www/adm
# RUN npm i \
#     && npm audit fix \
#     && cd ../rest \
#     && npm i \
#     && npm audit fix
# EXPOSE 8082
# EXPOSE 8080
# ENTRYPOINT npm start

#with pm2
FROM keymetrics/pm2:latest-alpine
COPY ./adm /var/www/adm
COPY ./rest /var/www/rest
WORKDIR /var/www
RUN cd ./adm \
    && npm i \
    && npm audit fix \
    && cd ../rest \
    && npm i \
    && npm audit fix \
    && cd ../
COPY ./ecosystem.config.js ./
RUN ls -l
EXPOSE 8070
EXPOSE 8068
CMD [ "pm2-runtime", "start", "ecosystem.config.js","--env=production" ]
