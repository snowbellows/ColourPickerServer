using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ColourPickerServer.Pages;

public class PickerModel : PageModel
{
    private readonly ILogger<PickerModel> _logger;

    public PickerModel(ILogger<PickerModel> logger)
    {
        _logger = logger;
    }

    public void OnGet() { }
}
