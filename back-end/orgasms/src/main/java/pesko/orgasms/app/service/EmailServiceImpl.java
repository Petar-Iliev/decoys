package pesko.orgasms.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import pesko.orgasms.app.domain.models.service.EmailServiceModel;

@Component
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;

    @Autowired
    public EmailServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Override
    public void sendSimpleMessage(EmailServiceModel email) {


        if(email.getFrom()==null || email.getFrom().isBlank()){
            email.setFrom("decoybank@gmail.com");
        }
        SimpleMailMessage message=new SimpleMailMessage();

        message.setFrom(email.getFrom());
        message.setTo("decoybank@gmail.com");
        message.setSubject(email.getSubject());
        message.setText(email.getText());
        javaMailSender.send(message);
    }
}
