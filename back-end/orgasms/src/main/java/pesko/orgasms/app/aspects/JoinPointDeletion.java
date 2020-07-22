package pesko.orgasms.app.aspects;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pesko.orgasms.app.events.EventPublisher;

@Aspect
@Component
public class JoinPointDeletion {


    private final EventPublisher eventPublisher;

    @Autowired
    public JoinPointDeletion(EventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }


    @AfterReturning("execution(* pesko.orgasms.app.service.impl.OrgasmServiceImpl.deleteOrgasm(..)) ||" +
            " execution(* pesko.orgasms.app.service.impl.OrgasmServiceImpl.deleteOwnOrgasm(..)))")
    public void afterOrgasmIsDeletedFromTheDB(JoinPoint jp){
      String title= (String) jp.getArgs()[0];
      eventPublisher.publishDeleteEvent(title);
    }
}
