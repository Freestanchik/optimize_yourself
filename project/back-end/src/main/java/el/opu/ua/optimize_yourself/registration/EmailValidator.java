package el.opu.ua.optimize_yourself.registration;

import com.sun.xml.bind.v2.TODO;
import org.springframework.stereotype.Service;

import java.util.function.Predicate;

@Service
public class EmailValidator implements Predicate<String> {

    @Override
    public boolean test(String s) {
        if (s.contains("@"))
            return true;
        return false;
    }
}
