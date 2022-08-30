FROM maven:3.8-openjdk-18 AS build
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
RUN mvn -f /usr/src/app/pom.xml clean package

FROM openjdk:18-alpine
COPY --from=build /usr/src/app/target/BookPortal-0.0.1-SNAPSHOT.jar /usr/app/BookPortal-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/app/BookPortal-0.0.1-SNAPSHOT.jar"]