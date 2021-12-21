package frontend.eksamensprojektfrontend.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

    @RequestMapping("/")
    public String index() {
        return "index.html";
    }

    @RequestMapping("/results")
    public String results() {
        return "results.html";
    }

}