package el.opu.ua.optimize_yourself.appuser;

import el.opu.ua.optimize_yourself.registration.token.ConfirmationToken;
import el.opu.ua.optimize_yourself.registration.token.ConfirmationTokenService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AppUserServiceTest {

    @Autowired
    private AppUserService userService;

    @MockBean
    private AppUserRepository userRepository;

    @MockBean
    private ConfirmationTokenService tokenService;

    @MockBean
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Test
    public void signUpUserTest() {
        AppUser user = new AppUser();

        Assert.assertNotNull(userService.signUpUser(user));
        Mockito.verify(userRepository, Mockito.times(1)).save(user);
        Mockito.verify(tokenService, Mockito.times(1)).saveConfirmationToken(any(ConfirmationToken.class));
        Mockito.verify(bCryptPasswordEncoder, Mockito.times(1)).encode(user.getPassword());

    }

    @Test(expected = IllegalStateException.class)
    public void signUpUserFailTest() {

        // Arrange
        AppUser user = new AppUser();
        user.setEmail("vanilka5@gmail.com");

        // Act
        Mockito.doReturn(Optional.of(user))
                .when(userRepository)
                .findByEmail("vanilka5@gmail.com");

        // Assert
        Assert.assertNull(userService.signUpUser(user));

    }

    @Test
    public void editAppUserTest(){

        String dummy = "oleg@gmail.com";

        Mockito.doReturn(Optional.of(new AppUser()))
                .when(userRepository)
                .findByLogin("oleg@gmail.com");

        Mockito.when(userRepository.changeAppUser(dummy,dummy,bCryptPasswordEncoder.encode(dummy),dummy))
                .thenReturn(1);

        Assert.assertNotNull(userService.changeAppUser(dummy,dummy,dummy,dummy));
        Mockito.verify(userRepository, Mockito.times(2)).findByLogin(dummy);
        Mockito.verify(bCryptPasswordEncoder, Mockito.times(2)).encode(dummy);
    }

    @Test(expected = IllegalStateException.class)
    public void editAppUserFailTest(){
        Mockito.doReturn(Optional.of(new AppUser()))
                .when(userRepository)
                .findByLogin(anyString());
        Assert.assertNotNull(userService.changeAppUser("","","",""));
    }
}