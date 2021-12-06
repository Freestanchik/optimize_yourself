package el.opu.ua.optimize_yourself.todoelements;

import el.opu.ua.optimize_yourself.appuser.AppUser;
import el.opu.ua.optimize_yourself.appuser.AppUserRepository;
import el.opu.ua.optimize_yourself.appuser.AppUserRole;
import el.opu.ua.optimize_yourself.registration.token.ConfirmationToken;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;


@RunWith(SpringRunner.class)
@SpringBootTest
public class TodoElementsServiceTest {

    @Autowired
    private TodoElementsService todoElementsService;

    @MockBean
    private AppUserRepository appUserRepository;

    @MockBean
    private TodoElementsRepository todoElementsRepository;

    @MockBean
    private AppUser appUser;

    @Test
    public void loadTodosByUserTest() {
        AppUser appUser = new AppUser("test", "test", "test@gmail.com", "test", AppUserRole.USER);

        Mockito.doReturn(Optional.of(appUser))
                .when(appUserRepository)
                .findByLogin(appUser.getLogin());
        Assert.assertNotNull(todoElementsRepository.findByAppUser(appUser));
        Assert.assertNotNull(appUserRepository.findByLogin("test"));
        Mockito.verify(todoElementsRepository, Mockito.times(1)).findByAppUser(any(AppUser.class));
        Mockito.verify(appUserRepository, Mockito.times(1)).findByLogin(anyString());

    }

    @Test
    public void loadTodosByUserFailTest() {
        AppUser appUser = new AppUser("test", "test", "test@gmail.com", "test", AppUserRole.USER);
        Mockito.doReturn(null)
                .when(appUserRepository)
                .findByLogin(appUser.getLogin());
        Assert.assertNotNull(todoElementsRepository.findByAppUser(appUser));
        Assert.assertNull(appUserRepository.findByLogin("test"));
    }

    @Test
    public void addTodoTest() {
        AppUser appUser = new AppUser();
        TodoElementsAddRequest todoElementsAddRequest = new TodoElementsAddRequest(
                "dummy",
                "dummy",
                "dummy",
                false,
                LocalTime.MIDNIGHT,
                LocalTime.NOON,
                LocalDate.now(),
                LocalDate.now()
        );
        TodoElements todoElements = new TodoElements(
                todoElementsAddRequest.getBody(),
                todoElementsAddRequest.getTodoType(),
                todoElementsAddRequest.getWeatherCheck(),
                todoElementsAddRequest.getTimeStart(),
                todoElementsAddRequest.getTimeEnd(),
                todoElementsAddRequest.getDateStart(),
                todoElementsAddRequest.getDateEnd()
        );
        Mockito.doReturn(Optional.of(appUser))
                .when(appUserRepository)
                .findByLogin(todoElementsAddRequest.getLogin());
        Assert.assertNotNull(appUserRepository.findByLogin(todoElementsAddRequest.getLogin()));
        Mockito.verify(appUserRepository, Mockito.times(0)).save(any(AppUser.class));
        Mockito.verify(appUserRepository, Mockito.times(1)).findByLogin(anyString());
    }

    @Test(expected = IllegalStateException.class)
    public void addTodoFailTest() {
        AppUser appUser = new AppUser();
        TodoElementsAddRequest todoElementsAddRequest = new TodoElementsAddRequest(
                "dummy",
                "dummy",
                "dummy",
                false,
                LocalTime.MIDNIGHT,
                LocalTime.NOON,
                LocalDate.now(),
                LocalDate.now()
        );
        Mockito.when(appUserRepository.findByLogin(todoElementsAddRequest.getLogin()))
                .thenThrow(IllegalStateException.class);
        Assert.assertNull(appUserRepository.findByLogin(todoElementsAddRequest.getLogin()));
    }

    @Test
    public void editTodoTest() {

        TodoElementsEditRequest todoElementsEditRequest = new TodoElementsEditRequest(
                1L,
                "dummy",
                "dummy",
                false,
                false,
                LocalTime.MIDNIGHT,
                LocalTime.NOON,
                LocalDate.now(),
                LocalDate.now()
        );
        Mockito.doReturn(Optional.of(new TodoElements()))
                .when(todoElementsRepository)
                .findById(1L);

        Mockito.when(todoElementsRepository.changeTodo(
                        1L,
                        "dummy",
                        "dummy",
                        false,
                        false,
                        LocalTime.MIDNIGHT,
                        LocalTime.NOON,
                        LocalDate.now(),
                        LocalDate.now()))
                .thenReturn(1);

        Assert.assertTrue(todoElementsService.changeTodo(todoElementsEditRequest));
        Mockito.verify(todoElementsRepository, Mockito.times(1)).findById(1L);
        Mockito.verify(todoElementsRepository, Mockito.times(1)).changeTodo(
                1L,
                "dummy",
                "dummy",
                false,
                false,
                LocalTime.MIDNIGHT,
                LocalTime.NOON,
                LocalDate.now(),
                LocalDate.now());
    }


    @Test(expected = IllegalStateException.class)
    public void editTodoFailTest() {
        Mockito.doReturn(Optional.of(new TodoElements()))
                .when(todoElementsRepository)
                .findById(anyLong());
        Mockito.when(todoElementsRepository.changeTodo(
                        1L,
                        "dummy",
                        "dummy",
                        false,
                        false,
                        LocalTime.MIDNIGHT,
                        LocalTime.NOON,
                        LocalDate.now(),
                        LocalDate.now()))
                .thenThrow(IllegalStateException.class);
        Assert.assertNotNull(todoElementsRepository.changeTodo(
                        1L,
                        "dummy",
                        "dummy",
                        false,
                        false,
                        LocalTime.MIDNIGHT,
                        LocalTime.NOON,
                        LocalDate.now(),
                        LocalDate.now()
                )
        );
    }

    @Test
    public void deleteTodoTest() {
        String login = "dummy";
        Long id = 1L;
        Mockito.doReturn(Optional.of(new AppUser()))
                .when(appUserRepository)
                .findByLogin(login);
        Assert.assertNotNull(appUserRepository.findByLogin(login));
        Mockito.doReturn(Optional.of(new TodoElements()))
                .when(todoElementsRepository)
                .findById(id);
        Assert.assertNotNull(todoElementsRepository.findById(id));

    }

    @Test(expected = IllegalStateException.class)
    public void deleteTodoFailTest() {

        // Arrange
        String login = "dummy";
        Long id = 1L;

        // Act
        Mockito.when(appUserRepository.findByLogin(login))
                .thenThrow(IllegalStateException.class);
        Mockito.when(todoElementsRepository.findById(id))
                .thenThrow(IllegalStateException.class);

        // Assert
        Assert.assertNotNull(appUserRepository.findByLogin(login));
        Assert.assertNotNull(todoElementsRepository.findById(id));

    }

}