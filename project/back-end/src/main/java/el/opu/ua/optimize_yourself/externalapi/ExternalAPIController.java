package el.opu.ua.optimize_yourself.externalapi;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@AllArgsConstructor
public class ExternalAPIController {

    private final ExternalAPIService externalAPIService;

    // get weather with coordinates in param
    @GetMapping(path = "get/weather")
    public String getWeatherByCoordinates(@RequestParam("latitude") String latitude, @RequestParam("longitude") String longitude) {
        return externalAPIService.getWeather(latitude, longitude);
    }

}
