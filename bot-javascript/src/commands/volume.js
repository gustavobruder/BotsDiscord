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

    const volume = Number(args.join(" "));
    if (isNaN(volume) || volume < 0 || volume > 10) {
        const resposta = new MessageEmbed()
        .setColor('#ffe44c')
        .setTitle('Aviso!')
        .setDescription('O volume deve ser um valor entre 0 e 10');

        msg.channel.send(resposta);
        return;
    }

    queue.dispatcher.setVolume(volume / 10);
    queue.volume = volume;
    bot.queues.set(msg.guild.id, queue);
};

module.exports = {
    nome: "vol",
    descricao: "Ajusta o volume numa escala de 0 a 10",
    execute
};