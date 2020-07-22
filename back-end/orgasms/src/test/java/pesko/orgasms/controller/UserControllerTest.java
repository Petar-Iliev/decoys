package pesko.orgasms.controller;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import pesko.orgasms.app.domain.entities.User;
import pesko.orgasms.app.domain.models.binding.UserBindingModel;
import pesko.orgasms.app.domain.models.info.InfoModel;
import pesko.orgasms.app.exceptions.InvalidUserException;
import pesko.orgasms.app.repository.UserRepository;
import pesko.orgasms.app.service.RoleService;
import pesko.orgasms.app.service.UserService;
import pesko.orgasms.app.web.controller.UserController;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
@TestPropertySource(locations = "classpath:application.properties")
public class UserControllerTest {


//    @Autowired
//    UserService userService;
//
//    @Autowired
//    ModelMapper modelMapper;
//
//    @MockBean
//    BindingResult bindingResult;
//
//    @MockBean
//    UserRepository userRepository;

    @Autowired
    UserController userController;


//    @Autowired
//    RoleService roleRepository;
//
//    List<User> users;
//
//    User user;

//    @Before
//    public void init(){
//       users=new ArrayList<>();
//       user=new User();
//        user.setUsername("valid_username");
//        user.setPassword("valid_password");
//       userController=new UserController(userService,modelMapper);
//
//       when(userRepository.findAll()).thenReturn(users);
//       when(userRepository.save(any())).thenReturn(user);
//       when(bindingResult.hasErrors()).thenReturn(true);
//    }


    @Test
    public void register_shouldReturnStatusCodeCreate_whenValid(){
        UserBindingModel userBindingModel=new UserBindingModel();
        userBindingModel.setPassword("123123");
        userBindingModel.setUsername("peshoo");
        userBindingModel.setRepeatPassword("123123");
        BindingResult bindingResult=mock(BindingResult.class);
      ResponseEntity<InfoModel> infoModel= userController.register(userBindingModel,bindingResult);

      Assert.assertEquals(infoModel.getStatusCode(), HttpStatus.CREATED);
    }

    @Test(expected = InvalidUserException.class)
    public void register_shouldThrowException_whenUsernameIsInvalid(){
        UserBindingModel userBindingModel=new UserBindingModel();
        userBindingModel.setUsername("pesho");
        userBindingModel.setPassword("123123");
        userBindingModel.setRepeatPassword("123123");
        BindingResult bindingResult=mock(BindingResult.class);

        when(bindingResult.hasErrors()).thenReturn(true);
       userController.register(userBindingModel,bindingResult);
    }

    @Test(expected = InvalidUserException.class)
    public void register_shouldThrowException_whenPasswordIsInvalid(){
        UserBindingModel userBindingModel=new UserBindingModel();
        userBindingModel.setUsername("peshoo");
        userBindingModel.setPassword("12345");
        userBindingModel.setRepeatPassword("12345");
        BindingResult bindingResult=mock(BindingResult.class);

        when(bindingResult.hasErrors()).thenReturn(true);
        userController.register(userBindingModel,bindingResult);
    }


    @Test(expected = InvalidUserException.class)
    public void register_shouldThrowException_whenPasswordAndRepeatPasswordDontMatch(){
        UserBindingModel userBindingModel=new UserBindingModel();

        userBindingModel.setUsername("peshoo");
        userBindingModel.setPassword("123132");
        userBindingModel.setRepeatPassword("123123");
        BindingResult bindingResult=mock(BindingResult.class);

        when(bindingResult.hasErrors()).thenReturn(true);
        userController.register(userBindingModel,bindingResult);
    }



//    @Test
//    public void register_whenCorrect_UserViewModel(){
//
//        when(bindingResult.hasErrors()).thenReturn(false);
//        UserBindingModel userViewModel=new UserBindingModel();
//        userViewModel.setUsername("valid_username");
//        userViewModel.setPassword("valid_password");
//        userViewModel.setRepeatPassword("valid_password");
//
//       UserBindingModel saved= userController.register(userViewModel,bindingResult);
//
//        Assert.assertEquals(saved.getUsername(),"valid_username");
//        Assert.assertEquals(saved.getPassword(),"valid_password");
//        Assert.assertEquals(saved.getRepeatPassword(),null);
//    }

//    @Test(expected = InvalidUserException.class)
//    public void register_whenIncorectUsername_shouldThrowException(){
//
//
//        UserBindingModel userViewModel=new UserBindingModel();
//        userViewModel.setUsername("va");
//        userViewModel.setPassword("valid_password");
//        userViewModel.setRepeatPassword("valid_password");
//
//      userController.register(userViewModel,bindingResult);
//
//    }
//    @Test(expected = InvalidUserException.class)
//    public void register_whenIncorectPassword_shouldThrowException(){
//
//        UserBindingModel userViewModel=new UserBindingModel();
//        userViewModel.setUsername("val");
//        userViewModel.setPassword("inval");
//        userViewModel.setRepeatPassword("inval");
//
//        userController.register(userViewModel,bindingResult);
//
//    }
//    @Test(expected = InvalidUserException.class)
//    public void register_whenPasswordsNotMatching_shouldThrowException(){
//
//        UserBindingModel userViewModel=new UserBindingModel();
//        userViewModel.setUsername("valid");
//        userViewModel.setPassword("valid_password");
//        userViewModel.setRepeatPassword("password_valid");
//
//        userController.register(userViewModel,bindingResult);
//
//    }
}
