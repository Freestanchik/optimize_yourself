package el.opu.ua.optimize_yourself.registration;

import el.opu.ua.optimize_yourself.appuser.AppUser;
import el.opu.ua.optimize_yourself.appuser.AppUserRole;
import el.opu.ua.optimize_yourself.appuser.AppUserService;
import el.opu.ua.optimize_yourself.registration.token.ConfirmationTokenService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;

@RunWith(SpringRunner.class)
@SpringBootTest
public class RegistrationServiceTest {

    @Autowired
    private RegistrationService registrationService;
    @MockBean
    private AppUserService appUserService;
    @MockBean
    private EmailValidator emailValidator;
    @MockBean
    private ConfirmationTokenService confirmationTokenService;

    @Test
    public void registrationTest(){

        AppUser appUser = new AppUser("test","test","test@gmail.com","test", AppUserRole.USER);
        Mockito.when(emailValidator.test(appUser.getEmail()))
                .thenReturn(true);
        Assert.assertTrue(emailValidator.test(appUser.getEmail()));

        Mockito.doReturn("Created")
                .when(appUserService)
                .signUpUser(appUser);
        Mockito.verify(appUserService, Mockito.times(0)).signUpUser(any(AppUser.class));
        Mockito.verify(appUserService, Mockito.times(0)).enableAppUser(anyString());
    }

    @Test(expected = IllegalStateException.class)
    public void registrationFailTest(){
        AppUser appUser = new AppUser("test","test","test@gmail.com","test", AppUserRole.USER);
        RegistrationRequest request = new RegistrationRequest(appUser.getName(),appUser.getLogin(),appUser.getEmail(),appUser.getPassword());
        Mockito.when(emailValidator.test(appUser.getEmail()))
                .thenReturn(false);
        Assert.assertFalse(emailValidator.test(appUser.getEmail()));
        Assert.assertNull(registrationService.register(request));
    }
}