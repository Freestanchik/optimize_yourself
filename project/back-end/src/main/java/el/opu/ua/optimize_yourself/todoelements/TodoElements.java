package el.opu.ua.optimize_yourself.todoelements;

import com.fasterxml.jackson.annotation.JsonIgnore;
import el.opu.ua.optimize_yourself.appuser.AppUser;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity(name = "todoelements")
@Table(name = "todoelements")
public class TodoElements {
    @Id
    @SequenceGenerator(
            name = "todo_sequence",
            sequenceName = "todo_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "todo_sequence"
    )
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_app_user")
    @JsonIgnore
    private AppUser appuser;
    private String body;
    private String todoType;
    private Boolean weatherCheck;
    private Boolean completionCheck = false;
    private LocalTime timeStart;
    private LocalTime timeEnd;
    private LocalDate dateStart;
    private LocalDate dateEnd;


    public TodoElements(String body, String todoType, Boolean weatherCheck, LocalTime timeStart, LocalTime timeEnd, LocalDate dateStart, LocalDate dateEnd) {
        this.body = body;
        this.todoType = todoType;
        this.weatherCheck = weatherCheck;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
    }
}
