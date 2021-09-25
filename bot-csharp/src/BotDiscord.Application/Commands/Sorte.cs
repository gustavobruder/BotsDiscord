using System;
using System.Threading.Tasks;
using BotDiscord.Application.Common;
using Discord.Commands;

namespace BotDiscord.Application.Commands
{
    public class Sorte : CommandModuleBase
    {
        public override string CommandName => "sorte";
        public override string CommandDescription => "Mostra com quanta sorte você está hoje";

        [Command("sorte")]
        public async Task SorteCommand()
        {
            var random = new Random();
            var sorte = random.Next(1, 101);

            var resposta = CustomColorEmbed()
                .WithTitle($"Fala {Context.Message.Author.Username}!")
                .WithDescription($"Você está com {sorte}% de sorte hoje.")
                .WithCurrentTimestamp()
                .Build();

            var mensagemEnviada = await SendCustomMessageAsync(resposta);
        }
    }
}