package pesko.orgasms.controller;

import com.amazonaws.services.s3.AmazonS3;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.validation.BindingResult;
import pesko.orgasms.app.domain.entities.Orgasm;
import pesko.orgasms.app.domain.entities.User;
import pesko.orgasms.app.domain.models.binding.OrgasmBindingModel;
import pesko.orgasms.app.domain.models.info.InfoModel;
import pesko.orgasms.app.exceptions.FakeOrgasmException;
import pesko.orgasms.app.repository.OrgasmRepository;
import pesko.orgasms.app.repository.UserRepository;
import pesko.orgasms.app.service.OrgasmService;
import pesko.orgasms.app.web.controller.OrgasmController;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class OrgasmControllerTest {

    OrgasmController orgasmController;

    @MockBean
    OrgasmRepository orgasmRepository;

    @MockBean
    BindingResult bindingResult;

    @Autowired
    OrgasmService orgasmService;
    @Autowired
    ModelMapper modelMapper;
    OrgasmBindingModel orgasm=new OrgasmBindingModel();

    @MockBean
    Principal principal;

    @MockBean
    UserRepository userRepository;

    @MockBean
    AmazonS3 s3;


//    ArgumentCaptor<Orgasm> argument=ArgumentCaptor.forClass(Orgasm.class);
//        orgasmController.addOrgasm(orgasm,bindingResult,principal);
//        Mockito.verify(orgasmRepository).saveAndFlush(argument.capture());

    @Before
    public void init(){
        User user=new User();
        user.setUsername("peshoo");
        user.setPassword("123123");
        user.setOrgasms(new ArrayList<>());
        user.setRoles(new ArrayList<>());


        when(orgasmRepository.save(any())).thenReturn(new Orgasm());
        when(bindingResult.hasErrors()).thenReturn(true);
        when(principal.getName()).thenReturn("peshoo");
        when(userRepository.findByUsername("peshoo")).thenReturn(Optional.of(user));


        orgasmController=new OrgasmController(orgasmService,modelMapper, s3);

    }

//    @Test
//    public void addOrgasm_whenValid_ShouldReturnInfoModelWithStatusCodeCreated(){
//        when(bindingResult.hasErrors()).thenReturn(false);
//        orgasm.setVideoUrl("v");
//        orgasm.setTitle("v");
//
//        ResponseEntity<InfoModel> model =orgasmController.addOrgasm(orgasm,bindingResult,principal);
//
//        Assert.assertEquals(HttpStatus.CREATED,model.getStatusCode());
//    }
//
//
//    @Test(expected = FakeOrgasmException.class)
//    public void addOrgasm_whenInvalidTitle_ShouldThrowException(){
//        when(bindingResult.hasErrors()).thenReturn(false);
//        orgasm.setVideoUrl("valid_url");
//        orgasm.setTitle("   ");
//      orgasmController.addOrgasm(orgasm,bindingResult,principal);
//
//
//    }
//
//    @Test(expected = FakeOrgasmException.class)
//    public void addOrgasm_whenInvalidVideoUrl_ShouldThrowException(){
//        when(bindingResult.hasErrors()).thenReturn(false);
//        orgasm.setVideoUrl("   ");
//        orgasm.setTitle("validTitle");
//        orgasmController.addOrgasm(orgasm,bindingResult,principal);
//    }
//    @Test(expected = FakeOrgasmException.class)
//    public void addOrgasm_whenVideoUrlIsNull_ShouldThrowException(){
//        when(bindingResult.hasErrors()).thenReturn(false);
//        orgasm.setTitle("validTitle");
//        orgasmController.addOrgasm(orgasm,bindingResult,principal);
//    }
//
//    @Test(expected = FakeOrgasmException.class)
//    public void addOrgasm_whenTitleIsNull_ShouldThrowExcepiton(){
//        when(bindingResult.hasErrors()).thenReturn(false);
//        orgasm.setVideoUrl("   ");
//        orgasmController.addOrgasm(orgasm,bindingResult,principal);
//    }
//
//    @Test(expected = UsernameNotFoundException.class)
//    public void addOrgasm_whenUserDoesntExist_ShouldThrowExcepiton(){
//        when(bindingResult.hasErrors()).thenReturn(false);
//        when(userRepository.findByUsername("peshoo")).thenThrow(new UsernameNotFoundException(""));
//        orgasm.setVideoUrl("v");
//        orgasm.setTitle("v");
//        orgasmController.addOrgasm(orgasm,bindingResult,principal);
//    }
//
//
//    @Test(expected = FakeOrgasmException.class)
//    public void addOrgasm_whenOrgasmAlreadyExist_ShouldThrowExcepiton(){
//        when(bindingResult.hasErrors()).thenReturn(false);
//        orgasm.setVideoUrl("v");
//        orgasm.setTitle("v");
//        OrgasmBindingModel secondOrgasm =new OrgasmBindingModel();
//        secondOrgasm.setTitle("v");
//        secondOrgasm.setVideoUrl("va");
//
//        when(orgasmRepository.saveAndFlush(any())).thenThrow(new FakeOrgasmException(""));
//        orgasmController.addOrgasm(orgasm,bindingResult,principal);
//     Mockito.verify(orgasmRepository).saveAndFlush(any());
//
//    }
//


//    @Test(expected = FakeOrgasmException.class)
//    public void addOrgasm_whenInvalidVideoUrl_ShouldThrowException(){
//        orgasm.setVideoUrl("     ");
//        orgasm.setTitle("valid_title");
//
//      orgasmController.addOrgasm(orgasm,bindingResult);
//
//
//    }
//    @Test(expected = FakeOrgasmException.class)
//    public void addOrgasm_whenInvalidImgUrl_ShouldThrowException(){
//        orgasm.setVideoUrl("valid_url");
//        orgasm.setTitle("valid_title");
//
//     orgasmController.addOrgasm(orgasm,bindingResult);
//
//
//    }
//    @Test(expected = FakeOrgasmException.class)
//    public void addOrgasm_whenInvalidTitle_ShouldThrowException(){
//        orgasm.setVideoUrl("valid");
//        orgasm.setTitle("     ");
//
//      orgasmController.addOrgasm(orgasm,bindingResult);
//

 //   }
}
