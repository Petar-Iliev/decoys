package pesko.orgasms.app.domain.models.service;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailServiceModel {

    private String from;
    private String subject;
    private String text;
}
