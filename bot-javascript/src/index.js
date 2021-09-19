const { Client, Collection } = require('discord.js');
const { token, idServidor, prefixo } = require('../config.json');
const { formatarData } = require('./utils');
const fs = require('fs');
const path = require('path');

const bot = new Client();
bot.commands = new Collection();
bot.queues = new Map();

const arquivosComandos = fs
    .readdirSync(path.join(__dirname, "./commands"))
    .filter(arquivo => arquivo.endsWith(".js"));

for (var arquivoComando of arquivosComandos) {
    const comando = require(`./commands/${arquivoComando}`);
    bot.commands.set(comando.nome, comando);
}

bot.on('ready', () => {
    const servidor = bot.guilds.cache.get(idServidor);
    console.log(`Bot está online no servidor! Servidor: ${servidor.name} - Token: ${token}`);
});

bot.on('message', async mensagem => {
    const conteudo = mensagem.content;

    if (mensagem.author.bot) return;
    if (!conteudo.startsWith(prefixo)) return;

    const args = conteudo.slice(prefixo.length).split(" ");
    const nomeComando = args.shift();
    const comando = bot.commands.get(nomeComando);

    if (comando == null) return;

    console.log(`[${formatarData('DD/MM/YYYY, às HH:mm:ss', new Date())}] - Recebido comando:`, conteudo);
    comando.execute(bot, mensagem, args);
});

bot.login(token);