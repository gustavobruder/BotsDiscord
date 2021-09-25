using System;
using System.Threading.Tasks;
using BotDiscord.Application.Common;
using Discord;
using Discord.Commands;

namespace BotDiscord.Application.Commands
{
    public class Ping : CommandModuleBase
    {
        public override string CommandName => "ping";
        public override string CommandDescription => "Mostra a latência do bot";

        [Command("ping")]
        public async Task PingCommand([Remainder] string math)
        {
            var random = new Random();
            var ping = (int) (DateTimeOffset.UtcNow - Context.Message.Timestamp).TotalMilliseconds;

            var resposta = new EmbedBuilder()
                .WithColor(CustomColors.Get(random.Next(0, 9)))
                .WithTitle($"Fala {Context.Message.Author.Username}!")
                .WithDescription($"Pong! Seu ping é de {ping} ms")
                .WithCurrentTimestamp()
                .Build();

            var mensagemEnviada = await Context.Channel.SendMessageAsync(null, false, resposta);
        }
    }
}