using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GrowthPath.PublicAPI.Controllers
{
    [Route("api/[controller]")]

    [ApiController]

    public class PublicController : ControllerBase

    {

        private readonly HttpClient _httpClient;


        public PublicController(HttpClient httpClient)

        {

            _httpClient = httpClient;

        }


        [HttpGet("courses-v1")]

        public async Task<IActionResult> GetCourses()

        {

            try

            {

                // URL of the external API

                var externalApiUrl = "https://api.coursera.org/api/courses.v1";


                // Send the request to the external API

                var response = await _httpClient.GetAsync(externalApiUrl);


                if (!response.IsSuccessStatusCode)

                {

                    return StatusCode((int)response.StatusCode, "Failed to fetch data from external API");

                }


                // Read the response content (the external API data)

                var data = await response.Content.ReadAsStringAsync();


                // Return the data to the frontend

                return Ok(data);

            }

            catch (Exception ex)

            {

                return StatusCode(500, $"Internal server error: {ex.Message}");

            }

        }

    }

}
