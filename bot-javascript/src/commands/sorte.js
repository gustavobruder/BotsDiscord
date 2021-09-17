const { MessageEmbed } = require('discord.js');
const { gerarNumeroRandom, cores } = require('../utils');

const execute = (bot, msg, args) => {
    const sorte = gerarNumeroRandom(1, 100);

    const resposta = new MessageEmbed()
    .setColor(cores[gerarNumeroRandom(0, 8)])
    .setTitle(`${msg.author.username}`)
    .setDescription(`Você está com ${sorte}% de sorte hoje.`)

    msg.channel.send(resposta);
};

module.exports = {
    nome: "sorte",
    descricao: "Mostra com quanta sorte você está hoje",
    execute
};