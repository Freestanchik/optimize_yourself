package el.opu.ua.optimize_yourself.registration;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@AllArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    // register user
    /* requires

        "name": "dummy",
        "login": "dummy",
        "password": "dummy",
        "email": "dummy@gmail.com"
    */
    @PostMapping(path = "register")
    public String register(@RequestBody RegistrationRequest request) {
        if (registrationService.register(request).isEmpty())
            return "{\"created\":false}";
        return "{\"created\":true}";
    }

    // have no implementation due to financial issues
    @GetMapping(path = "confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }

}
