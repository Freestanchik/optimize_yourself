package el.opu.ua.optimize_yourself.todoelements;

import el.opu.ua.optimize_yourself.appuser.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface TodoElementsRepository extends JpaRepository<TodoElements, Long> {

    @Override
    Optional<TodoElements> findById(Long aLong);

    @Transactional
    @Query("SELECT t " +
            "FROM todoelements t WHERE t.appuser = ?1")
    List<TodoElements> findByAppUser(AppUser appUser);

    @Transactional
    @Query("SELECT t " +
            "FROM todoelements t WHERE t.appuser = ?1 ORDER BY t.dateStart ASC, t.timeStart ASC")
    List<TodoElements> findOrderedByAppUser(AppUser appUser);

    @Transactional
    @Query("SELECT max(t.id)" +
            "FROM todoelements t")
    Long findTop1ByOrderByIdDesc();

    @Transactional
    @Query("SELECT t " +
            "FROM todoelements t WHERE t.appuser = ?1 AND t.id = ?2")
    Optional<TodoElements> findElementByAppUserAndId(AppUser appUser, Long Id);

    @Transactional
    @Modifying
    @Query("UPDATE todoelements t " +
            "SET t.body = ?2, t.todoType = ?3, t.weatherCheck = ?4, t.completionCheck = ?5, t.timeStart = ?6, t.timeEnd = ?7, t.dateStart = ?8, t.dateEnd = ?9 WHERE t.id = ?1")
    int changeTodo(Long id, String body, String todoType, Boolean weatherCheck, Boolean completionCheck, LocalTime timeStart, LocalTime timeEnd, LocalDate dateStart, LocalDate dateEnd);

}
