package pesko.orgasms.app.web.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pesko.orgasms.app.domain.models.binding.EmailBindingModel;
import pesko.orgasms.app.domain.models.info.InfoModel;
import pesko.orgasms.app.domain.models.service.EmailServiceModel;
import pesko.orgasms.app.service.EmailService;

@RestController
@RequestMapping("/mail")
public class EmailController {

    private final EmailService emailService;
    private final ModelMapper modelMapper;

    @Autowired
    public EmailController(EmailService emailService, ModelMapper modelMapper) {
        this.emailService = emailService;
        this.modelMapper = modelMapper;
    }


    @PostMapping("/send")
    public ResponseEntity<InfoModel> sendEmail(@RequestBody  EmailBindingModel emailBindingModel){


        emailService.sendSimpleMessage(this.modelMapper.map(emailBindingModel, EmailServiceModel.class));


        return ResponseEntity.ok().body(new InfoModel("Email received"));
    }
}
