# Use a imagem base do OpenJDK
FROM openjdk:17-jdk-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie o arquivo JAR para o contêiner
COPY target/eshop-0.0.1-SNAPSHOT.jar /app/app.jar

# Exponha a porta da aplicação
EXPOSE 8080

# Comando para iniciar a aplicação
ENTRYPOINT ["java", "-jar", "/app/app.jar"]