package el.opu.ua.optimize_yourself.appuser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface AppUserRepository extends JpaRepository<AppUser, Long> {

    Optional<AppUser> findByEmail(String email);

    Optional<AppUser> findByLogin(String login);

    @Transactional
    @Modifying
    @Query("UPDATE appuser a " +
            "SET a.enabled = TRUE WHERE a.email = ?1")
    int enableAppUser(String email);

    @Transactional
    @Query("SELECT a.password " +
            "FROM appuser a WHERE a.email = ?1")
    String extractPasswordFromUserByEmail(String email);

    @Transactional
    @Modifying(clearAutomatically=true)
    @Query("UPDATE appuser a " +
            "SET a.name = ?2, a.password = ?3, a.email = ?4 WHERE a.login = ?1")
    int changeAppUser(String login, String name, String password, String email);

}
