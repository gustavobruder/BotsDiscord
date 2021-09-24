using Discord.Commands;

namespace BotDiscord.Application.Common
{
    public abstract class CommandModuleBase : ModuleBase
    {
        public abstract string CommandName { get; }
        public abstract string CommandDescription { get; }
    }
}