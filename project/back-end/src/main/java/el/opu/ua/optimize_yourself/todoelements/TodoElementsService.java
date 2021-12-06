package el.opu.ua.optimize_yourself.todoelements;

import el.opu.ua.optimize_yourself.appuser.AppUser;
import el.opu.ua.optimize_yourself.appuser.AppUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Service
@AllArgsConstructor
public class TodoElementsService {

    private final TodoElementsRepository todoElementsRepository;
    private final AppUserRepository appUserRepository;


    public List<TodoElements> loadTodosByUser(String login) throws IllegalStateException {
        return todoElementsRepository.findByAppUser(appUserRepository.findByLogin(login).orElseThrow(() -> new IllegalStateException("Such user does not exist!")));
    }
    public List<TodoElements> loadOrderedTodosByUser(String login) throws IllegalStateException {
        return todoElementsRepository.findOrderedByAppUser(appUserRepository.findByLogin(login).orElseThrow(() -> new IllegalStateException("Such user does not exist!")));
    }


    @Transactional
    public TodoElements addTodo(TodoElementsAddRequest todoElementsAddRequest) {

        TodoElements todoElements = new TodoElements(
                todoElementsAddRequest.getBody(),
                todoElementsAddRequest.getTodoType(),
                todoElementsAddRequest.getWeatherCheck(),
                todoElementsAddRequest.getTimeStart(),
                todoElementsAddRequest.getTimeEnd(),
                todoElementsAddRequest.getDateStart(),
                todoElementsAddRequest.getDateEnd()
        );
        AppUser appUser = appUserRepository.findByLogin(todoElementsAddRequest.getLogin()).orElseThrow(() -> new IllegalStateException("Such user does not exist!"));
        appUser.addTodo(todoElements);
        appUserRepository.save(appUser);
        return todoElementsRepository.findElementByAppUserAndId(appUser,todoElementsRepository.findTop1ByOrderByIdDesc()).get();
    }

    @Transactional
    public Boolean changeTodo(TodoElementsEditRequest todoElementsEditRequest) {
        todoElementsRepository.findById(todoElementsEditRequest.getId()).orElseThrow(() -> new IllegalStateException("Such todo element does not exist!"));
        if (todoElementsRepository.changeTodo(
                todoElementsEditRequest.getId(),
                todoElementsEditRequest.getBody(),
                todoElementsEditRequest.getTodoType(),
                todoElementsEditRequest.getWeatherCheck(),
                todoElementsEditRequest.getCompletionCheck(),
                todoElementsEditRequest.getTimeStart(),
                todoElementsEditRequest.getTimeEnd(),
                todoElementsEditRequest.getDateStart(),
                todoElementsEditRequest.getDateEnd()
        ) == 1)
            return true;
        return false;
    }

    @Transactional
    public Boolean deleteTodo(String login, Long id) {
        AppUser appUser = appUserRepository.findByLogin(login).orElseThrow(() -> new IllegalStateException("Such user does not exist!"));
        TodoElements todoElements = todoElementsRepository.findElementByAppUserAndId(appUser, id).orElseThrow(() -> new IllegalStateException("Such todo element does not exist!"));
        appUser.removeTodo(todoElements);
        appUserRepository.save(appUser);
        return true;
    }
}
