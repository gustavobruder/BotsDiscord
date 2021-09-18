const { MessageEmbed } = require('discord.js');

const execute = (bot, msg, args) => {
    const queue = bot.queues.get(msg.guild.id);

    if (!queue) {
        const resposta = new MessageEmbed()
        .setColor('#ffe44c')
        .setTitle('Aviso!')
        .setDescription('Nenhuma música está sendo reproduzida no momento');

        msg.channel.send(resposta);
        return;
    }

    queue.songs = [];
    bot.queues.set(msg.guild.id, queue);
    queue.dispatcher.end();
};

module.exports = {
    nome: "stop",
    descricao: "Para a reprodução de músicas do servidor",
    execute
};