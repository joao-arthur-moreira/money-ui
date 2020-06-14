FROM ubuntu:18.04

RUN apt-get update

RUN apt-get install -y nginx

RUN apt install -y openjdk-8-jdk

ADD dist/money-ui/ /var/www/html/

ADD ../../../../Documents/workspace-spring-tool-suite-4-4.4.0.RELEASE/algamoney-api/target/algamoney-api-1.0.0-SNAPSHOT.jar /api/api.jar

RUN echo "daemon off;" >> /etc/nginx/nginx.conf

CMD service nginx start

CMD java -jar /api/api.jar --algamoney.origin-permitida=http://localhost:8000 --spring.profiles.active=oauth-security
