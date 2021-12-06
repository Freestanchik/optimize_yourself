package el.opu.ua.optimize_yourself.todoelements;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class TodoElementsEditRequest {
    private Long id;
    private String body;
    private String todoType;
    private Boolean weatherCheck;
    private Boolean completionCheck;
    private LocalTime timeStart;
    private LocalTime timeEnd;
    private LocalDate dateStart;
    private LocalDate dateEnd;
}
