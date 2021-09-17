const { MessageEmbed } = require('discord.js');
const yts = require( 'yt-search' )
const ytdl = require('ytdl-core-discord');

const execute = (bot, msg, args) => {
    if (!msg.member.voice.channel) {
        const resposta = new MessageEmbed()
        .setColor('#ffe44c')
        .setTitle('Aviso!')
        .setDescription('Você precisa estar em um canal de voz para reproduzir uma música');

        msg.channel.send(resposta);
    };

    const pesquisa = args.join(" ");
    console.log('Pesquisa: ', pesquisa);

    try {
        yts(pesquisa, (error, result) => {
            if (error) {
                throw error;
            } else {
                if (result && result.videos.length > 0) {
                    const musica = result.videos[0];
                    playSong(bot, msg, musica);
                }
            }
        });
    } catch (ex) {
        console.error(ex);
    }
};

const playSong = async (bot, msg, song) => {
    if (!song) return;

    let queue = bot.queues.get(msg.member.guild.id);

    if (!queue) {
        const conn = await msg.member.voice.channel.join();
        queue = {
            volume: 10,
            connection: conn,
            dispatcher: null,
            songs: [song]
        }
    }
    const stream = await ytdl(song.url);
    queue.dispatcher = await queue.connection.play(stream, { type: 'opus' });
    bot.queues.set(msg.member.guild.id, queue);
};

module.exports = {
    nome: "play",
    descricao: "Reproduz a música desejada no canal atual do usuário",
    execute
};