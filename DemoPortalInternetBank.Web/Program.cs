using System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace DemoPortalInternetBank.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Preserve pre-upgrade behavior for timestamp handling (allow Local DateTime for timestamptz)
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}