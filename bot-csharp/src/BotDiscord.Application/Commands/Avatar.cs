using System;
using System.Threading.Tasks;
using BotDiscord.Application.Common;
using Discord;
using Discord.Commands;

namespace BotDiscord.Application.Commands
{
    public class Avatar : CommandModuleBase
    {
        public override string CommandName => "avatar";
        public override string CommandDescription => "Mostra o avatar de quem executar";

        [Command("avatar")]
        public async Task AvatarCommand()
        {
            var random = new Random();

            var resposta = new EmbedBuilder()
                .WithColor(CustomColors.Get(random.Next(0, 9)))
                .WithTitle($"Fala {Context.Message.Author.Username}!")
                .WithImageUrl(Context.Message.Author.GetAvatarUrl() ?? Context.Message.Author.GetDefaultAvatarUrl())
                .WithCurrentTimestamp()
                .Build();

            var mensagemEnviada = await Context.Channel.SendMessageAsync(null, false, resposta);
        }
    }
}