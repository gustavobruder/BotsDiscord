const { MessageEmbed } = require('discord.js');
const { gerarNumeroRandom, cores } = require('../utils');

const execute = (bot, msg, args) => {
    const resposta = new MessageEmbed()
    .setColor(cores[gerarNumeroRandom(0, 8)])
    .setTitle(`${msg.author.username}`)
    .setImage(msg.author.displayAvatarURL());

    msg.channel.send(resposta);
};

module.exports = {
    nome: "avatar",
    descricao: "Mostra o avatar de quem executar",
    execute
};