const { Client, MessageEmbed } = require('discord.js');
const { token, idServidor, prefixo } = require('../config.json');

const bot = new Client();

const formatarData = (padrao, data) => {
    var componentes = 'YYYY:MM:DD:HH:mm:ss'.split(':')
    data = new Date(data || Date.now() - new Date().getTimezoneOffset() * 6e4)

    return data.toISOString().split(/[-:.TZ]/)
        .reduce((template, item, i) => template.split(componentes[i]).join(item), padrao)
};

bot.on('ready', () => {
    const servidor = bot.guilds.cache.get(idServidor);
    console.log(`Bot está online no servidor! Servidor: ${servidor.name} - Token: ${token}`);
});

bot.on('message', async mensagem => {
    const conteudo = mensagem.content;
    const canal = mensagem.channel;

    if (conteudo.startsWith(`${prefixo}bot`)) {
        const resposta = new MessageEmbed()
        .setColor('#3399ff')
        .setAuthor('🤖 Minhas informações')
        .setTitle('Fala meu paçero!')
        .setDescription('Olá eu sou o mais novo bot criado pelo Gustavo!')
        .setThumbnail(bot.user.displayAvatarURL())
        .addField('**Meu nick**', bot.user.username)
        .addField('**Meu ID**', bot.user.id)
        .addField('**Criado em**', formatarData('DD/MM/YYYY, às HH:mm:ss', bot.user.createdAt))
        .setFooter(`🛡 2021 © ${bot.user.username}.`)
        .setTimestamp();

        canal.send(resposta);
    }

    if (conteudo.startsWith(`${prefixo}help`)) {
        const resposta = new MessageEmbed()
        .setColor('#0099ff')
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setTitle('Informações gerais!')
        .setDescription(`Aqui estão algumas informações sobre o bot ${bot.user.username}`)
        .setThumbnail(mensagem.guild.iconURL())
        .addField(`01# - ${prefixo}bot`, 'Mostra algumas informações do bot', false)
        .setTimestamp()
        .setFooter('Copyright © | Todos os direitos reservados ', 'https://i.imgur.com/wSTFkRM.png');

        canal.send(resposta);
    }
});

bot.login(token);