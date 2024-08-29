# Usando uma imagem base do JDK (pode ser openjdk:11-jdk-alpine ou outra versão que você utiliza)
FROM openjdk:17-jdk-alpine

# Definindo o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiando o JAR gerado para o contêiner
COPY target/seu-aplicativo.jar /app/app.jar

# Expondo a porta da aplicação
EXPOSE 8080

# Comando para executar a aplicação
ENTRYPOINT ["java", "-jar", "/app/app.jar"]