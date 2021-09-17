const { MessageEmbed } = require('discord.js');
const { formatarData } = require('../utils');

const execute = (bot, msg, args) => {
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

    msg.channel.send(resposta);
};

module.exports = {
    nome: "bot",
    descricao: "Mostra algumas informações do bot",
    execute
};