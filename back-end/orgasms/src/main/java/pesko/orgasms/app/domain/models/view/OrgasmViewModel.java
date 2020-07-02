package pesko.orgasms.app.domain.models.view;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrgasmViewModel {

    private String title;

    private String content;


    private String imgUrl;

    private String videoUrl;

    private int likes;

    private boolean favorite;
}
