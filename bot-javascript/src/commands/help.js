const { MessageEmbed } = require('discord.js');
const { prefixo } = require('../../config.json');

const execute = (bot, msg, args) => {
    var index = 0;
    const camposMenu = bot.commands.map(comando => {
        index++;
        const nComando = index.toString().padStart(2, '0');
        return {
            name: `${nComando}# - ${prefixo}${comando.nome}`,
            value: comando.descricao,
            inline: false,
        }
    });

    const resposta = new MessageEmbed()
    .setColor('#0099ff')
    .setAuthor(bot.user.username, bot.user.displayAvatarURL())
    .setTitle('Informações gerais!')
    .setDescription(`Aqui estão algumas informações sobre o bot ${bot.user.username}`)
    .setThumbnail(msg.guild.iconURL())
    .addFields(camposMenu)
    .setTimestamp()
    .setFooter('Copyright © | Todos os direitos reservados ', 'https://i.imgur.com/wSTFkRM.png');

    msg.channel.send(resposta);
};

module.exports = {
    nome: "help",
    descricao: "Mostra um menu de comando disponíveis do bot",
    execute
};