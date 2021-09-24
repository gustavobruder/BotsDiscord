using System.Threading.Tasks;

namespace BotDiscord.Application
{
    public class Program
    {
        public static async Task Main(string[] args) => await Startup.RunAsync(args);
    }
}