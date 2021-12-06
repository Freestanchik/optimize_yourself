package el.opu.ua.optimize_yourself.appuser;

import el.opu.ua.optimize_yourself.todoelements.TodoElements;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.*;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity(name = "appuser")
@Table(name = "appuser")
public class AppUser implements UserDetails {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    private Long id;
    private String name;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String login;
    private String password;
    @Enumerated(EnumType.STRING)
    private AppUserRole appUserRole;
    @OneToMany(mappedBy = "appuser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TodoElements> todoElementsSet = new ArrayList<>();
    private Boolean locked = false;
    private Boolean enabled = false; // = true;


    public AppUser(String name, String login, String email, String password, AppUserRole appUserRole) {
        this.name = name;
        this.login = login;
        this.email = email;
        this.password = password;
        this.appUserRole = appUserRole;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(appUserRole.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public String getLogin() {
        return login;
    }

    public String getName() {
        return name;
    }


    public void addTodo(TodoElements todoElements) {
        todoElementsSet.add(todoElements);
        todoElements.setAppuser(this);
    }

    public void removeTodo(TodoElements todoElements) {
        todoElementsSet.remove(todoElements);
        todoElements.setAppuser(null);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
