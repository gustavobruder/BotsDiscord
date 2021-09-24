using System;
using System.Threading.Tasks;
using Discord.Commands;
using Discord.WebSocket;
using Microsoft.Extensions.Configuration;

namespace BotDiscord.Application.Services
{
    public class CommandHandler
    {
        private readonly DiscordSocketClient _discord;
        private readonly CommandService _commandService;
        private readonly IConfigurationRoot _configurationRoot;
        private readonly IServiceProvider _serviceProvider;

        public CommandHandler(
            DiscordSocketClient discord,
            CommandService commandService,
            IConfigurationRoot configurationRoot,
            IServiceProvider serviceProvider)
        {
            _discord = discord;
            _commandService = commandService;
            _configurationRoot = configurationRoot;
            _serviceProvider = serviceProvider;

            _discord.Ready += OnReady;
            _discord.MessageReceived += OnMessageReceived;
        }

        private Task OnReady()
        {
            // Get username and tag from bot profile. ex: BotHappy#0690
            Console.WriteLine($"Bot está online no servidor! Token: ${_configurationRoot["discord:token"]}");
            Console.WriteLine($"Usuário do bot => {_discord.CurrentUser.Username}#{_discord.CurrentUser.Discriminator}");
            return Task.CompletedTask;
        }

        private async Task OnMessageReceived(SocketMessage arg)
        {
            var msg = arg as SocketUserMessage;

            if (msg.Author.IsBot) return;

            var context = new SocketCommandContext(_discord, msg);

            int posicao = 0;

            if (msg.HasStringPrefix(_configurationRoot["discord:prefix"], ref posicao) ||
                msg.HasMentionPrefix(_discord.CurrentUser, ref posicao))
            {
                var result = await _commandService.ExecuteAsync(context, posicao, _serviceProvider);

                if (!result.IsSuccess)
                {
                    var erro = result.Error;
                    await context.Channel.SendMessageAsync($"Ocorreu um erro: \n{erro}");
                    Console.WriteLine(erro);
                }
            }
        }
    }
}