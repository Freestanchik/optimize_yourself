package el.opu.ua.optimize_yourself.externalapi;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.web.client.RestTemplate;


@Service
@AllArgsConstructor
public class ExternalAPIService {
    public String getWeather(String latitude, String longitude) {
        if (latitude.isEmpty() || longitude.isEmpty())
            throw new IllegalStateException("All arguments have to be filled!");
        String url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=6a92db42b8745663d3f0d3227234a6db";
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(url, String.class);
        return result;
    }

}
