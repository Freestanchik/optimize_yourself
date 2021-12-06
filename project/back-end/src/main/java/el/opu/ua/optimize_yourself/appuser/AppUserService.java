package el.opu.ua.optimize_yourself.appuser;

import el.opu.ua.optimize_yourself.registration.token.ConfirmationToken;
import el.opu.ua.optimize_yourself.registration.token.ConfirmationTokenService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

    private final static String USER_NOT_FOUND_MSG = "User with this %s not found!";

    private final AppUserRepository appUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return appUserRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));
    }

    public AppUser findByLogin(String login) throws IllegalArgumentException {
        return appUserRepository.findByLogin(login).orElseThrow(() -> new IllegalArgumentException("Such user does not exist!"));
    }

    public List<AppUser> findAll() {
        return appUserRepository.findAll();
    }

    public String signUpUser(AppUser appUser) {
        boolean userExists = appUserRepository
                .findByEmail(appUser.getEmail())
                .isPresent();

        if (userExists) {
            throw new IllegalStateException("This user already exists!");
        }
        String encodedPassword = bCryptPasswordEncoder
                .encode(appUser.getPassword());

        appUser.setPassword(encodedPassword);

        appUserRepository.save(appUser);

        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                appUser
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);

        //send email
        return token;
    }


    @Transactional
    public String checkMatches(String email, String password) {
        if (email.isEmpty() || password.isEmpty())
            throw new IllegalArgumentException("Email and password must be filled!");
        if (bCryptPasswordEncoder.matches(password, appUserRepository.extractPasswordFromUserByEmail(email)) && appUserRepository.findByEmail(email) != null)
            return appUserRepository.findByEmail(email).get().getLogin();
        return "false";
    }

    @Transactional
    public AppUser changeAppUser(String login, String name, String password, String email) {
        if (email.isEmpty() || password.isEmpty() || name.isEmpty() || email.isEmpty())
            throw new IllegalStateException("All arguments have to be filled!");
        int checkNew = appUserRepository.changeAppUser(login, name, bCryptPasswordEncoder.encode(password), email);
        int checkOld = appUserRepository.changeAppUser(login, name, password, email);
        if (findByLogin(login).getPassword() != password) {
            if (checkNew == 1) {
                return findByLogin(login);
            }
        } else {
            if (checkOld == 1) {
                return findByLogin(login);
            }
        }
        return findByLogin(login);
    }

    public int enableAppUser(String email) {
        return appUserRepository.enableAppUser(email);
    }

}
