using Discord;

namespace BotDiscord.Application.Common
{
    public class CustomColors
    {
        public static Color Get(int index) => Cores[index];

        private static Color[] Cores => new[]
        {
            new Color(51, 153, 255),  // #3399ff
            new Color(255, 77, 166),  // #ff4da6
            new Color(255, 92, 51),   // #ff5c33
            new Color(0, 153, 51),    // #009933
            new Color(255, 255, 255), // #ffffff
            new Color(255, 137, 137), // #ff8989
            new Color(102, 255, 198), // #66ffc6
            new Color(255, 220, 81),  // #ffdc51
            new Color(0, 0, 0),       // #000000
        };
    }
}