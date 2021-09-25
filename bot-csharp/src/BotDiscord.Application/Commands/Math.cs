using System.Data;
using System.Threading.Tasks;
using BotDiscord.Application.Common;
using Discord.Commands;

namespace BotDiscord.Application.Commands
{
    public class Math : CommandModuleBase
    {
        public override string CommandName => "math";
        public override string CommandDescription => "Calcula uma expressão matemática";

        [Command("math")]
        public async Task MathCommand([Remainder] string expressao)
        {
            var dt = new DataTable();
            var resultado = dt.Compute(expressao, null);

            var resposta = CustomColorEmbed()
                .WithTitle($"Fala {Context.Message.Author.Username}! Expressão: {expressao}")
                .WithDescription($"Pronto! Resultado da expressão é: {resultado}")
                .WithCurrentTimestamp()
                .Build();

            var mensagemEnviada = await SendCustomMessageAsync(resposta);
        }
    }
}