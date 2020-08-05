package pesko.orgasms.service;


import com.amazonaws.services.s3.AmazonS3;
import org.checkerframework.checker.nullness.Opt;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import pesko.orgasms.app.domain.entities.Orgasm;
import pesko.orgasms.app.domain.entities.Role;
import pesko.orgasms.app.domain.entities.User;
import pesko.orgasms.app.domain.models.service.OrgasmServiceModel;
import pesko.orgasms.app.exceptions.FakeOrgasmException;
import pesko.orgasms.app.repository.OrgasmRepository;
import pesko.orgasms.app.repository.UserRepository;
import pesko.orgasms.app.service.impl.OrgasmServiceImpl;
import pesko.orgasms.app.utils.ValidatorUtil;
import pesko.orgasms.app.utils.ValidatorUtilImpl;
import pesko.orgasms.serviceUtils.OrgasmServiceUtil;
import pesko.orgasms.serviceUtils.RoleServiceUtil;
import pesko.orgasms.serviceUtils.UserServiceUtil;


import java.util.*;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


@SpringBootTest
public class OrgasmServiceTest {

    OrgasmRepository orgasmRepository;
    UserRepository userRepository;
    ModelMapper modelMapper;
    ValidatorUtil validatorUtil;
    OrgasmServiceImpl orgasmService;

    @MockBean
    AmazonS3 s3;
    List<Orgasm> orgasmsList;
    List<User> userList;

    @Before
    public void setUp() {
        modelMapper = new ModelMapper();
        validatorUtil = new ValidatorUtilImpl();

        orgasmsList = new ArrayList<>();
        userList = new ArrayList<>();

        orgasmRepository = Mockito.mock(OrgasmRepository.class);
        userRepository = Mockito.mock(UserRepository.class);

        when(orgasmRepository.findAll()).thenReturn(orgasmsList);
        when(userRepository.findAll()).thenReturn(userList);


        orgasmService = new OrgasmServiceImpl(orgasmRepository, modelMapper, validatorUtil, userRepository, s3);

    }

    @Test
    public void findAll_whenTwoOrgasms_expectTwo() {
        orgasmsList.addAll(OrgasmServiceUtil.createOrgasm(2));

        List<OrgasmServiceModel> orgasmServiceModels = orgasmService.findAll();

        assertThat(orgasmServiceModels.size(), is(2));

    }

    @Test
    public void findAll_whenZeroOrgasms_expectToBeEmpty() {


        List<OrgasmServiceModel> orgasmServiceModels = orgasmService.findAll();

        assertThat(orgasmServiceModels.size(), is(0));

    }

    @Test
    public void findRandomOrgasm_shouldReturnRandomOrgasmWhichIsNotLikedOrDislikedAndNotPending(){

      User user=new User();
      Orgasm orgasm=new Orgasm();
      orgasm.setPending(false);
      orgasm.setTitle("Random");
      List<Orgasm> orgasms = new ArrayList<>();
      orgasms.add(orgasm);
      when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
      when(orgasmRepository.findRandom(user.getUsername())).thenReturn(orgasms);
        OrgasmServiceModel returnedOrgasm = orgasmService.findRandomOrgasm(user.getUsername());
        assertThat("Random",is(returnedOrgasm.getTitle()));
    }


//    @Test
//    public void saveOrgasm_whenUserCreateValidOrgasm_shouldReturnOrgasmServiceModel_inPendingMode() {
//
//
//        User user = new User();
//        user.setUsername("user");
//
//
//        when(userRepository.findByUsername("user")).thenReturn(Optional.of(user));
//
//        OrgasmServiceModel orgasm = new OrgasmServiceModel();
//
//        orgasm.setTitle("valid");
//        orgasm.setVideoUrl("valid");
//        OrgasmServiceModel savedOrgasm = orgasmService.saveOrgasm(orgasm, "user");
//
//        Assert.assertEquals(true, savedOrgasm.isPending());
//
//
//    }
//
//    @Test
//    public void saveOrgasm_whenAdminCreateValidOrgasm_shouldReturnOrgasmServiceModel_notInPendingMode() {
//
//        List<Role> roles = RoleServiceUtil.getAllRoles();
//        User user = new User();
//        user.setUsername("user");
//        user.setRoles(roles);
//
//
//        when(userRepository.findByUsername("user")).thenReturn(Optional.of(user));
//
//        OrgasmServiceModel orgasm = new OrgasmServiceModel();
//
//        orgasm.setTitle("valid");
//        orgasm.setVideoUrl("valid");
//        OrgasmServiceModel savedOrgasm = orgasmService.saveOrgasm(orgasm, "user");
//
//        Assert.assertEquals(false, savedOrgasm.isPending());
//
//
//    }
//
//
//    @Test(expected = FakeOrgasmException.class)
//    public void saveOrgasm_whenVideoUrlIsInvalid_shouldThrowFakeOrgasmException() {
//
//        OrgasmServiceModel orgasm = new OrgasmServiceModel();
//
//        orgasmService.saveOrgasm(orgasm, "bla");
//
//    }
//
//    @Test(expected = FakeOrgasmException.class)
//    public void saveOrgasm_whenTitleIsInvalid_shouldThrowFakeOrgasmException() {
//
//        OrgasmServiceModel orgasm = new OrgasmServiceModel();
//        orgasm.setVideoUrl("Valid");
//
//        orgasmService.saveOrgasm(orgasm, "bla");
//
//    }
//
//    @Test(expected = UsernameNotFoundException.class)
//    public void saveOrgasm_whenUserDoesntExist_shouldThrowUsernameNotFoundException() {
//
//        OrgasmServiceModel orgasm = new OrgasmServiceModel();
//        orgasm.setVideoUrl("validUrl");
//        orgasm.setTitle("validTitle");
//
//        orgasmService.saveOrgasm(orgasm, "bla");
//
//    }
//
//    @Test(expected = FakeOrgasmException.class)
//    public void saveOrgasm_whenOrgasmAlreadyExist_shouldThrowFakeOrgasmException() {
//
//        User user = new User();
//        user.setUsername("user");
//
//        OrgasmServiceModel orgasm = new OrgasmServiceModel();
//        orgasm.setVideoUrl("validUrl");
//        orgasm.setTitle("validTitle");
//
//        Orgasm alreadyPersistedOrgasm = new Orgasm();
//
//        when(userRepository.findByUsername("user")).thenReturn(Optional.of(user));
//        when(orgasmRepository.findByTitle("validTitle")).thenReturn(Optional.of(alreadyPersistedOrgasm));
//
//
//        orgasmService.saveOrgasm(orgasm, "user");
//
//    }


//    @Test
//    public void findAllUsersLikedOrgasm_shouldReturnEmptyCollection_whenUserDidntLikedAny(){
//
//        orgasmsList=OrgasmServiceUtil.createOrgasm(2);
//        orgasmsList.get(0).getLikeDislike().put("user",true);
//        orgasmsList.get(1).getLikeDislike().put("user",true);
//
//        when(orgasmRepository.findAllOrgasmsLikedBy("")).thenReturn(orgasmsList);
//
//        List<OrgasmServiceModel>orgasmServiceModels=
//    }

    @Test
    public void removeLikeDislikeByUsername_shouldDeleteOrgasmLikeDislikeFromDBAndReturnONE() {

        when(orgasmRepository.deleteLikeDislikeUserKey("user")).thenReturn(1);
        int result = orgasmService.removeLikeDislikeByUsername("user");

        Assert.assertEquals(1, result);

    }

    @Test
    public void removeLikeDislikeByUsername_shouldReturnZERO_whenUserHaventLikedOrDislikedAnyOrgasm() {

        when(orgasmRepository.deleteLikeDislikeUserKey("userNotLikedDisliked")).thenReturn(0);
        int result = orgasmService.removeLikeDislikeByUsername("user");

        Assert.assertEquals(0, result);

    }


    @Test
    public void dislikeOrgasm_shouldDislikeOrgasm_whenValidUserOrgasm() {
        User user = new User();
        user.setUsername("user");
        Orgasm orgasm = new Orgasm();

        OrgasmServiceModel orgasmServiceModel = new OrgasmServiceModel();
        orgasmServiceModel.setTitle("title");

        when(userRepository.findByUsername("user")).thenReturn(Optional.of(user));
        when(orgasmRepository.findByTitle("title")).thenReturn(Optional.of(orgasm));

        OrgasmServiceModel result = orgasmService.dislikeOrgasm("title", user.getUsername());

        Assert.assertEquals(true, result.getLikeDislike().containsKey("user"));
        Assert.assertEquals(false, result.getLikeDislike().get("user"));
    }

    @Test(expected = UsernameNotFoundException.class)
    public void dislikeOrgasm_shouldThrowExceptionWhenUserIsInvalid() {

        OrgasmServiceModel orgasmServiceModel = new OrgasmServiceModel();
        orgasmServiceModel.setTitle("title");


        orgasmService.dislikeOrgasm("title", "invalidUser");

    }

    @Test(expected = FakeOrgasmException.class)
    public void dislikeOrgasm_shouldThrowExceptionWhenOrgasmIsInvalid() {

        User user = new User();
        user.setUsername("user");
        when(userRepository.findByUsername("user")).thenReturn(Optional.of(user));
        OrgasmServiceModel orgasmServiceModel = new OrgasmServiceModel();
        orgasmServiceModel.setTitle("title");


        orgasmService.dislikeOrgasm("title", user.getUsername());

    }

    @Test
    public void likeOrgasm_shouldLikeOrgasm_whenValidUserOrgasm(){
        User user = new User();
        user.setUsername("user");
        Orgasm orgasm = new Orgasm();

        OrgasmServiceModel orgasmServiceModel = new OrgasmServiceModel();
        orgasmServiceModel.setTitle("title");

        when(userRepository.findByUsername("user")).thenReturn(Optional.of(user));
        when(orgasmRepository.findByTitle("title")).thenReturn(Optional.of(orgasm));

        OrgasmServiceModel result = orgasmService.likeOrgasm("title", user.getUsername());

        Assert.assertEquals(true, result.getLikeDislike().containsKey("user"));
        Assert.assertEquals(true, result.getLikeDislike().get("user"));
    }

    @Test(expected = UsernameNotFoundException.class)
    public void likeOrgasm_shouldThrowExceptionWhenUserIsInvalid() {

        OrgasmServiceModel orgasmServiceModel = new OrgasmServiceModel();
        orgasmServiceModel.setTitle("title");


        orgasmService.likeOrgasm("title", "invalidUser");

    }

    @Test(expected = FakeOrgasmException.class)
    public void likeOrgasm_shouldThrowExceptionWhenOrgasmIsInvalid() {

        User user = new User();
        user.setUsername("user");
        when(userRepository.findByUsername("user")).thenReturn(Optional.of(user));
        OrgasmServiceModel orgasmServiceModel = new OrgasmServiceModel();
        orgasmServiceModel.setTitle("title");


        orgasmService.likeOrgasm("title", user.getUsername());

    }

    @Test
    public void modifyPending_shouldModifyStateFromTrueToFalse(){
        Orgasm orgasm=new Orgasm();
        orgasm.setPending(true);
        when(orgasmRepository.findByTitle("title")).thenReturn(Optional.of(orgasm));
        when(orgasmRepository.saveAndFlush(orgasm)).thenReturn(orgasm);
        OrgasmServiceModel result=orgasmService.modifyPending("title");


        Assert.assertEquals(false,result.isPending());
    }

    @Test
    public void modifyPending_shouldModifyStateFromFalseToTrue(){
        Orgasm orgasm=new Orgasm();
        orgasm.setPending(false);
        when(orgasmRepository.findByTitle("title")).thenReturn(Optional.of(orgasm));
        when(orgasmRepository.saveAndFlush(orgasm)).thenReturn(orgasm);
        OrgasmServiceModel result=orgasmService.modifyPending("title");


        Assert.assertEquals(true,result.isPending());
    }


}
