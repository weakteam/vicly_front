FROM node:10.15.2
MAINTAINER BlessedVictim
WORKDIR /app
COPY . ./
RUN npm install --silent
RUN npm install -g serve
RUN npm run build
# start app
CMD ["serve", "-s", "build"]