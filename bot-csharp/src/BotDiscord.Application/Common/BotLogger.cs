using System;
using Discord;

namespace BotDiscord.Application.Common
{
    public class BotLogger
    {
        public static void LogInfo(string message)
        {
            Console.WriteLine(new LogMessage(LogSeverity.Info, "BotApp", message));
        }
    }
}