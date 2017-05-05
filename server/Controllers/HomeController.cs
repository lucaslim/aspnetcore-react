using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.AspNetCore.SpaServices.Prerendering;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;

namespace Ottobot.Controllers
{
  public class HomeController : Controller
  {
    public async Task<IActionResult> Index([FromServices] IHostingEnvironment hostEnv, [FromServices] INodeServices nodeServices)
    {
      var requestFeature = Request.HttpContext.Features.Get<IHttpRequestFeature>();
      var unencodedPathAndQuery = requestFeature.RawTarget;
      var unencodedAbsoluteUrl = $"{Request.Scheme}://{Request.Host}{unencodedPathAndQuery}";
      var prerenderResult = await Prerenderer.RenderToString(
        hostEnv.ContentRootPath,
        nodeServices,
        new JavaScriptModuleExport("wwwroot/dist/server"),
        unencodedAbsoluteUrl,
        unencodedPathAndQuery,
        null,
        30000,
        Request.PathBase.ToString()
      );

      ViewData["InitialState"] = JsonConvert.SerializeObject(prerenderResult.Globals["initialState"]);
      ViewData["Html"] = prerenderResult.Html;
      ViewData["Meta"] = prerenderResult.Globals["meta"];
      ViewData["Link"] = prerenderResult.Globals["link"];
      ViewData["Title"] = prerenderResult.Globals["title"];
      ViewData["CriticalCss"] = prerenderResult.Globals["criticalCss"];

      return View();
    }
  }
}
