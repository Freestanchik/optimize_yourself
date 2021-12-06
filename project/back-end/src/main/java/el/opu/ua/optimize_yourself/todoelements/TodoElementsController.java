package el.opu.ua.optimize_yourself.todoelements;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class TodoElementsController {

    private final TodoElementsService todoElementsService;

    // get all todos of user by his login
    @GetMapping(path = "get/all-todos-by-login")
    public List<TodoElements> getAllTodosByUserLogin(@RequestParam("login") String login) throws IllegalStateException {
        return todoElementsService.loadTodosByUser(login);
    }

    // get all todos of user by his login ordered by date and time
    @GetMapping(path = "get/all-ordered-todos-by-login")
    public List<TodoElements> getAllOrderedTodosByUserLogin(@RequestParam("login") String login) throws IllegalStateException {
        return todoElementsService.loadOrderedTodosByUser(login);
    }

    // create todos
    /* requires
        String login;
        String body;
        String todoType;
        Boolean weatherCheck;
        LocalTime timeStart; --> "00:00"
        LocalTime timeEnd;
        LocalDate dateStart; --> "2000-05-25"
        LocalDate dateEnd;
    */
    @PostMapping(path = "post/add-todo")
    public TodoElements addTodo(@RequestBody TodoElementsAddRequest todoElementsAddRequest) {
        return todoElementsService.addTodo(todoElementsAddRequest);
    }

    // delete todos by user login and todoId
    @DeleteMapping(path = "delete/todo")
    public String deleteTodo(@RequestParam("login") String login, @RequestParam("id") Long id) {
        return "{\"deleted\":" + todoElementsService.deleteTodo(login, id) + "}";
    }

    // edit todos by its id
    /* requires
        Long id;
        String body;
        todoType;
        Boolean weatherCheck;
        Boolean completionCheck;
        LocalTime timeStart; --> "00:00"
        LocalTime timeEnd;
        LocalDate dateStart; --> "2000-05-25"
        LocalDate dateEnd;
    */
    @PatchMapping(path = "patch/edit-todo-by-id")
    public String editTodoById(@RequestBody TodoElementsEditRequest todoElementsEditRequest) {
        return "{\"edited\":" + todoElementsService.changeTodo(todoElementsEditRequest) + "}";
    }
}
