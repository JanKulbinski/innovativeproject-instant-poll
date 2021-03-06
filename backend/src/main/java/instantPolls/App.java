package instantPolls;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.CrossOrigin;
import instantPolls.constants.Constants;

@EnableScheduling
@SpringBootApplication
public class App  {
    public static void main( String[] args ) {
    	SpringApplication.run(App.class, args);
    }
}