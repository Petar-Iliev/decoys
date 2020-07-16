package pesko.orgasms.app.domain.models.view;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrgasmViewModel {

    private Long id;

    private String title;

    private String content;

    private String videoUrl;

    private boolean pending;

}
