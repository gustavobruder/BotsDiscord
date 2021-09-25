using System;
using System.Threading.Tasks;
using BotDiscord.Application.Common;
using Discord;
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
            _discord.Log += Log;
            _discord.MessageReceived += OnMessageReceived;
        }

        private Task OnReady()
        {
            // Get username and tag from bot profile. ex: BotHappy#0690
            BotLogger.LogInfo($"Bot está online no servidor! Token: {_configurationRoot["discord:token"]}");
            BotLogger.LogInfo($"Usuário do bot => {_discord.CurrentUser.Username}#{_discord.CurrentUser.Discriminator}");
            return Task.CompletedTask;
        }

        private Task Log(LogMessage msg)
        {
            Console.WriteLine(msg.ToString());
            return Task.CompletedTask;
        }

        private async Task OnMessageReceived(SocketMessage arg)
        {
            var message = arg as SocketUserMessage;

            if (message == null) return;
            if (message.Author.IsBot) return;

            var posicao = 0;
            if (!message.HasStringPrefix(_configurationRoot["discord:prefix"], ref posicao)) return;

            var context = new SocketCommandContext(_discord, message);

            BotLogger.LogInfo($"Executando comando [{message}]...");
            var result = await _commandService.ExecuteAsync(context, posicao, _serviceProvider);

            if (!result.IsSuccess)
            {
                BotLogger.LogInfo($"Ocorreu um erro ao executar o comando [{message}]: {result.Error}");
            }
        }
    }
}