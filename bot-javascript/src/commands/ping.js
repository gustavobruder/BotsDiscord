const { MessageEmbed } = require('discord.js');
const { gerarNumeroRandom, cores } = require('../utils');

const execute = (bot, msg, args) => {
    const resposta = new MessageEmbed()
    .setColor(cores[gerarNumeroRandom(0, 8)])
    .setTitle(`${msg.author.username}`)
    .setDescription(`Pong! Your ping is ${Date.now() - msg.createdTimestamp} ms`);

    msg.channel.send(resposta);
};

module.exports = {
    nome: "ping",
    descricao: "Mostra o ping do bot",
    execute
};