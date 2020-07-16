package pesko.orgasms.app.domain.models.service;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
public class OrgasmServiceModel {


    private Long id;

    @NotNull
    @NotBlank
    private String title;
    private String content;

    @NotNull
    @NotBlank
    private String videoUrl;
    private List<UserServiceModel> users;

    private boolean pending;


}
