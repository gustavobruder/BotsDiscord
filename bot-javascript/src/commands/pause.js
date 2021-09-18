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

    queue.dispatcher.pause();
};

module.exports = {
    nome: "pause",
    descricao: "Pausa a reprodução da música atual",
    execute
};