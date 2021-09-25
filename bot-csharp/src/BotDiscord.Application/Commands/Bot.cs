using System.Threading.Tasks;
using BotDiscord.Application.Common;
using Discord;
using Discord.Commands;

namespace BotDiscord.Application.Commands
{
    public class Bot : CommandModuleBase
    {
        public override string CommandName => "bot";
        public override string CommandDescription => "Mostra algumas informações do bot";

        [Command("bot")]
        public async Task BotCommand()
        {
            var resposta = new EmbedBuilder()
                .WithColor(new Color(51, 153, 255))
                .WithAuthor("🤖 Minhas informações")
                .WithTitle("Fala meu paçero!")
                .WithDescription("Olá eu sou o mais novo bot criado pelo Gustavo!")
                .WithThumbnailUrl(Context.User.GetAvatarUrl() ?? Context.User.GetDefaultAvatarUrl())
                .AddField("**Meu nick**", Context.User.Username)
                .AddField("**Meu ID**", Context.User.Id)
                .AddField("**Criado em**", Context.User.CreatedAt.ToString("dd/MM/yyyy - HH:mm:ss"))
                .WithFooter($"🛡 2021 © {Context.User.Username}.")
                .WithCurrentTimestamp()
                .Build();

            var mensagemEnviada = await SendCustomMessageAsync(resposta);
        }
    }
}