FROM openjdk:18
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} BookPortal.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/BookPortal.jar"]