using Microsoft.AspNetCore.SignalR;

namespace ColourPickerServer.Hubs
{
    public class ColourPickerHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
