package el.opu.ua.optimize_yourself.appuser;

import el.opu.ua.optimize_yourself.registration.RegistrationRequest;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping
public class AppUserController {

    private final AppUserService appUserService;

    // search user by login
    @GetMapping(path = "get/user-by-login")
    public AppUser getUserByLogin(@RequestParam("login") String login) {
        return appUserService.findByLogin(login);
    }

    // get all users
    @GetMapping(path = "get/all-users")
    public List<AppUser> getAllUsers() {
        return appUserService.findAll();
    }

    // authorise user
    @GetMapping(path = "check/authorised")
    public String doAuthorisationCheck(@RequestParam("email") String email, @RequestParam(value = "password") String password) {
        return "{\"authorised\":\"" + appUserService.checkMatches(email, password) + "\"}";
    }

    // edit user
    /* requires
     {
        "name":"dummy",
        "login":"dummy",
        "email":"dummy@gmail.com",
        "password":"dummy"
    }
    */
    @PatchMapping(path = "patch/edit-user-by-login")
    public AppUser editUserByLogin(@RequestBody RegistrationRequest request) {
        return appUserService.changeAppUser(request.getLogin(), request.getName(), request.getPassword(), request.getEmail());
    }

}
