package pesko.orgasms.app.domain.models.view;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;
import pesko.orgasms.app.domain.entities.Roles;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class UserInfoResponseModel {

    private String username;
    private Long id;
    private List<String> authorities;

    public UserInfoResponseModel(){

        this.setAuthorities(new ArrayList<>());
    }
}
