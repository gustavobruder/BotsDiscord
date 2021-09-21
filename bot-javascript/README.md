# Bot Discord
Um bot no discord escrito em javascript utilizando discord.js.

# O Desafio

Escrever um bot para utilização no discord com algumas funcionalidades simples porém legais.

# Pré requisitos para utilizar o projeto

* Apresentar nodejs instalado na máquina com versão 12.0.0 ou superior.
* Apresentar *ffmpeg* instalado na máquina, para baixar [clique aqui](https://www.ffmpeg.org/download.html).

# Como rodar o projeto?

1. Abra o prompt de comando
2. Entre no diretório *BotsDiscord > bot-javascript*
3. Execute o comando *npm install*
4. Altere o arquivo *config.json* informando o id do servidor e o token do bot
5. Execute o comando *npm start*

# Como rodar o projeto utilizando docker?

1. Necessário docker desktop instalado na máquina
2. Entre no diretório *BotsDiscord > bot-javascript*
3. Execute o comando *docker-compose up -d*

# Comandos disponíveis

01. **$help**: Mostra um menu de comando disponíveis do bot
02. **$bot**: Mostra algumas informações do bot
03. **$ping**: Mostra o ping do bot
04. **$sorte**: Mostra com quanta sorte você está hoje
05. **$avatar**: Mostra o avatar de quem executar
06. **$play**: Reproduz a música desejada no canal atual do usuário
07. **$pause**: Pausa a reprodução da música atual
08. **$resume**: Continua a reprodução da música atual
09. **$vol**: Ajusta o volume numa escala de 0 a 10
10. **$stop**: Para a reprodução de músicas do servidor