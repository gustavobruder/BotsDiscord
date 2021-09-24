using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using BotDiscord.Application.Common;
using Discord;
using Discord.Commands;

namespace BotDiscord.Application.Commands
{
    public class Help : CommandModuleBase
    {
        public override string CommandName => "help";
        public override string CommandDescription => "Mostra um menu de comando disponíveis do bot";

        [Command("help")]
        public async Task HelpCommand()
        {
            var commandTypes = new List<Type>();
            commandTypes.AddRange(Assembly.GetExecutingAssembly().GetTypes()
                .Where(type => typeof(CommandModuleBase).IsAssignableFrom(type))
                .Where(type => !type.IsAbstract && !type.IsInterface)
                .Where(type => type != typeof(CommandModuleBase))
            );

            var fields = commandTypes
                .Select(commandType => (CommandModuleBase) Activator.CreateInstance(commandType))
                .Select(command => new EmbedFieldBuilder()
                    .WithName(command?.CommandName)
                    .WithValue(command?.CommandDescription));

            var resposta = new EmbedBuilder()
                .WithColor(new Color(0, 153, 255))
                .WithAuthor(Context.User.Username, Context.User.GetAvatarUrl() ?? Context.User.GetDefaultAvatarUrl())
                .WithTitle("Informações gerais!")
                .WithDescription($"Aqui estão algumas informações sobre o bot {Context.User.Username}")
                .WithThumbnailUrl(Context.Guild.IconUrl)
                .WithFields(fields)
                .WithCurrentTimestamp()
                .WithFooter("Copyright © | Todos os direitos reservados ", "https://i.imgur.com/wSTFkRM.png")
                .Build();

            var mensagemEnviada = await Context.Channel.SendMessageAsync(null, false, resposta);
        }
    }
}