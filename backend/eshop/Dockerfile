
FROM openjdk:17-jdk-alpine




RUN apk update && apk add --no-cache maven


WORKDIR /usr/local/service




COPY pom.xml /usr/local/service/pom.xml
COPY src /usr/local/service/src



RUN mvn clean package


COPY target/*.jar /app/app.jar


CMD ["java", "-jar", "/app/app.jar"]