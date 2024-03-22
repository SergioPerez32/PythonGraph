FROM nikolaik/python-nodejs:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y graphviz && \
    npm install -g graphviz && \
    pip install diagrams \
    npm install

COPY . /app
WORKDIR /app
RUN npm install

EXPOSE 3000

CMD ["node", "app.js"]