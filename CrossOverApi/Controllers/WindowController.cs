using CrossOverApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace CrossOverApi.Controllers;


[ApiController]
[Route("api/[controller]")]
public class WindowController : ControllerBase
{
	private CrossOverContext _crossOverContext = new CrossOverContext();

	[HttpGet("[action]")]
	public IEnumerable<SectionType> GetSectionTypes()
	{
		return _crossOverContext.SectionTypes.ToList();
	}

	[HttpGet("[action]")]
	public IEnumerable<WindowType> GetWindowTypes()
	{
		return _crossOverContext.WindowTypes.ToList();
	}

	[HttpGet("[action]")]
	public IEnumerable<Packet> GetPackets()
	{
		return _crossOverContext.Packets.ToList();
	}

	[HttpGet("[action]")]
	public IEnumerable<Color> GetColors()
	{
		return _crossOverContext.Colors.ToList();
	}

	[HttpPost("[action]")]
	public IActionResult CreateRequest(WindowRequest windowRequest)
	{
		_crossOverContext.WindowRequests.Add(windowRequest);
		_crossOverContext.SaveChanges();

		return Ok();
	}

	[HttpPost("[action]")]
	public IActionResult CreateCallRequest(CallRequest callRequest)
	{
		_crossOverContext.CallRequests.Add(callRequest);
		_crossOverContext.SaveChanges();

		return Ok();
	}
}