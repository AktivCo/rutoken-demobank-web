using System;
using System.IO;
using DemoPortalInternetBank.Domain;
using DemoPortalInternetBank.Domain.Interfaces;
using DemoPortalInternetBank.Domain.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DemoPortalInternetBank.Web
{
    public class Startup
    {
        private IConfiguration _configuration;

        public IConfiguration Configuration { get; }
        public Startup()
        {
            _configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDistributedMemoryCache();

            services.AddSession(options =>
            {
                options.CookieName = ".DemoBank.Session";
                options.IdleTimeout = TimeSpan.FromSeconds(3600);
            });
            
            services
                .AddDbContext<EfDbContext>(config =>
                    config.UseNpgsql(_configuration.GetConnectionString("Default")));


            services.AddScoped<IDbTransactionService, DbTransactionService>();
            services.AddScoped<IPaymentDataService, PaymentDataService>();
            services.AddScoped<PaymentService>();

            services
                .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie();

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();

            app.UseSession();

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    "default",
                    "{*.}",
                    new
                    {
                        controller = "Home",
                        action = "Index"
                    });
            });
        }
    }
}