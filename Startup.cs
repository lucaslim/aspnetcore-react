using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;

namespace Ottobot
{
  public class Startup
  {
    public Startup(IHostingEnvironment env)
    {
      var builder = new ConfigurationBuilder()
          .SetBasePath(env.ContentRootPath)
          .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
          .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
          .AddEnvironmentVariables();
      Configuration = builder.Build();
    }

    public IConfigurationRoot Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddOptions();

      services.AddNodeServices(options =>
      {
        options.LaunchWithDebugging = true;
        options.DebuggingPort = 9229;
      });

      // Add framework services.
      services.AddMvc();

      services.AddResponseCompression();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
    {
      loggerFactory.AddConsole(Configuration.GetSection("Logging"));

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
        {
          ProjectPath = Directory.GetCurrentDirectory(),
          HotModuleReplacement = true,
          ReactHotModuleReplacement = true
        });
      }
      else
      {
        app.UseExceptionHandler("/Home/Error");
      }

      app.UseResponseCompression();

      app.UseStaticFiles(new StaticFileOptions()
      {
        OnPrepareResponse = (context) =>
        {
          var headers = context.Context.Response.GetTypedHeaders();
          headers.CacheControl = new CacheControlHeaderValue()
          {
            MaxAge = TimeSpan.FromDays(env.IsDevelopment() ? 0 : 365),
          };
        }
      });

      app.UseMvc(routes =>
      {
        routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

        routes.MapSpaFallbackRoute(
                  name: "spa-fallback",
                  defaults: new { controller = "Home", action = "Index" }
              );
      });
    }

    public static void Main(string[] args)
    {
      var host = new WebHostBuilder()
          .UseContentRoot(Directory.GetCurrentDirectory() + "/server")
          .UseKestrel()
          .UseIISIntegration()
          .UseStartup<Startup>()
          .Build();

      host.Run();
    }
  }
}
