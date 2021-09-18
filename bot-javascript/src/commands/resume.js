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

    queue.dispatcher.resume();
};

module.exports = {
    nome: "resume",
    descricao: "Continua a reprodução da música atual",
    execute
};