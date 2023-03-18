FROM node:18
WORKDIR /app
COPY package*.json ./
COPY yarn.lock .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi
COPY . .
ENV PORT 3400
EXPOSE ${PORT}
CMD ["node", "dist/app.js"]