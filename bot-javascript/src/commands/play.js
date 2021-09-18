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
        return;
    };

    const pesquisa = args.join(" ");
    console.log('Pesquisa:', pesquisa);

    try {
        yts(pesquisa, (error, result) => {
            if (error) {
                throw error;
            } else if (result && result.videos.length > 0) {
                const musica = result.videos[0];
                playSong(bot, msg, musica);
            } else {
                const resposta = new MessageEmbed()
                .setColor('#ffe44c')
                .setTitle('Aviso!')
                .setDescription('Sem resultados encontrados para sua pesquisa');

                msg.channel.send(resposta);
            }
        });
    } catch (ex) {
        console.error(ex);
    }
};

const playSong = async (bot, msg, song) => {
    let queue = bot.queues.get(msg.member.guild.id);

    if (!song) {
        if (queue) {
            queue.connection.disconnect();
            bot.queues.delete(msg.member.guild.id);
            return;
        }
    };

    if (!queue) {
        const conn = await msg.member.voice.channel.join();
        queue = {
            volume: 10,
            connection: conn,
            dispatcher: null,
            songs: [song]
        }
        const stream = await ytdl(song.url, { highWaterMark: 1 << 25, filter: 'audioonly' });
        queue.dispatcher = await queue.connection.play(stream, { type: 'opus' });
        queue.dispatcher.on("finish", () => {
            queue.songs.shift();
            playSong(bot, msg, queue.songs[0]);
        });
        bot.queues.set(msg.member.guild.id, queue);
    } else {
        queue.songs.push(song);
        bot.queues.set(msg.member.guild.id);
    }
};

module.exports = {
    nome: "play",
    descricao: "Reproduz a música desejada no canal atual do usuário",
    execute
};