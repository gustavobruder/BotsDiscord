using System;
using System.Threading.Tasks;
using Discord;
using Discord.Commands;

namespace BotDiscord.Application.Common
{
    public abstract class CommandModuleBase : ModuleBase
    {
        public abstract string CommandName { get; }
        public abstract string CommandDescription { get; }

        private readonly Random _random = new Random();

        protected EmbedBuilder CustomColorEmbed()
        {
            return new EmbedBuilder().WithColor(CustomColors.Get(_random.Next(0, 9)));
        }

        protected async Task<IUserMessage> SendCustomMessageAsync(Embed resposta)
        {
            return await Context.Channel.SendMessageAsync(null, false, resposta);
        }
    }
}