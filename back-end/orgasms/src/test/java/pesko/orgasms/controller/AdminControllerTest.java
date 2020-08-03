package pesko.orgasms.controller;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.context.annotation.PropertySource;
import org.springframework.http.MediaType;

import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import pesko.orgasms.app.domain.entities.Orgasm;
import pesko.orgasms.app.domain.entities.User;
import pesko.orgasms.app.domain.models.binding.UserSetRoleBindingModel;
import pesko.orgasms.app.domain.models.service.UserServiceModel;

import pesko.orgasms.app.repository.OrgasmRepository;
import pesko.orgasms.app.repository.UserRepository;
import pesko.orgasms.app.service.UserService;


@SpringBootTest
@AutoConfigureMockMvc
@PropertySource(value={"classpath:application.properties"})
public class AdminControllerTest {


    @Autowired
    MockMvc mockMvc;

    @Autowired
    UserRepository userRepository;

    @Autowired
    OrgasmRepository orgasmRepository;

    @Autowired
    UserService userService;

    @Autowired
    ObjectMapper mapper;

    User user=new User();

    Orgasm orgasm=new Orgasm();

    static final String USERNAME="validUsername";
    static final String PASSWORD="validPassword";
    static final String TITLE= "validTitle";
    static final String VIDEO_URL= "validURL";


    @BeforeEach
    public void init(){
        user.setUsername(USERNAME);
        user.setPassword(PASSWORD);
        user.setId(1L);
        orgasm.setTitle(TITLE);
        orgasm.setVideoUrl(VIDEO_URL);
        orgasm.setPending(false);

    }

    @AfterEach
   public void clear(){
        userRepository.deleteAll();
        orgasmRepository.deleteAll();
    }

    @Test
    @WithMockUser(username = "validUser",roles = {"ADMIN"})
   public void findUser_shouldReturnUser() throws Exception {
        userRepository.saveAndFlush(user);

        mockMvc.perform(get(String.format("/admin/find/user/%s",USERNAME)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username",is(user.getUsername())));
    }


    @Test
    @WithMockUser(username = "validUser",roles = {"ADMIN"})
    public void findUser_shouldReturnBadRequest_whenInvalid() throws Exception {
        userRepository.saveAndFlush(user);

        mockMvc.perform(get(String.format("/admin/find/user/%s",USERNAME+"I")))
                .andExpect(status().isBadRequest());

    }

    @Test
    @WithMockUser(username = "validUser",roles = {"ADMIN"})
    public void findOrgasm_shouldReturnBadRequest_whenInvalid() throws Exception {


        mockMvc.perform(get(String.format("/admin/find/orgasm/%s","INVALID")))
                .andExpect(status().isBadRequest());

    }

    @Test
    @WithMockUser(username = "validUser",roles = {"ADMIN"})
    public void findOrgasm_shouldReturnOrgasmResponseModelWithStatusOK() throws Exception {

        orgasmRepository.saveAndFlush(orgasm);

        mockMvc.perform(get(String.format("/admin/find/orgasm/%s",TITLE)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title",is(TITLE)));

    }

    @Test
    @WithMockUser(username = "validUser",roles = {"ADMIN"})
    public void setRole_shouldSetRole_whenRoleIsNotRootAndUserIsNotRoot() throws Exception {
       UserServiceModel root =new UserServiceModel();
       root.setUsername(USERNAME);
       root.setPassword(PASSWORD);
        UserServiceModel guest =new UserServiceModel();
        guest.setUsername("guestOne");
        guest.setPassword(PASSWORD);

        UserSetRoleBindingModel userSetRoleBindingModel= new UserSetRoleBindingModel();
        userSetRoleBindingModel.setUsername("guestOne");
        userSetRoleBindingModel.setRole("ADMIN");
      userService.registerUser(root);
      userService.registerUser(guest);

        String json=mapper.writeValueAsString(userSetRoleBindingModel);
        mockMvc.perform(put("/admin/set-role")
        .contentType(MediaType.APPLICATION_JSON)
        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("@.authorities",hasSize(3)));
    }

    @Test
    @WithMockUser(username = "validUser",roles = {"ADMIN"})
    public void setRole_shouldThrowException_whenRoleIsRoot() throws Exception {

        UserSetRoleBindingModel userSetRoleBindingModel= new UserSetRoleBindingModel();
        userSetRoleBindingModel.setUsername("guestOne");
        userSetRoleBindingModel.setRole("ADMIN");
        String json = mapper.writeValueAsString(userSetRoleBindingModel);
        mockMvc.perform(put("/admin/set-role")
        .contentType(MediaType.APPLICATION_JSON)
        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(mvcResult -> mvcResult.getResolvedException().getMessage().equals("Inside Job"));
    }

    @Test
    @WithMockUser(username = "validUser",roles = {"ADMIN"})
    public void setRole_shouldThrowException_whenUserIsRootUser() throws Exception {
        UserServiceModel root =new UserServiceModel();
        root.setUsername(USERNAME);
        root.setPassword(PASSWORD);
        UserSetRoleBindingModel userSetRoleBindingModel= new UserSetRoleBindingModel();
        userSetRoleBindingModel.setUsername("guestOne");
        userSetRoleBindingModel.setRole("ADMIN");
        userService.registerUser(root);
        String json = mapper.writeValueAsString(userSetRoleBindingModel);
        mockMvc.perform(put("/admin/set-role")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(mvcResult -> mvcResult.getResolvedException().getMessage().equals("Inside Job"));
    }

    @Test
    @WithMockUser(username = "validUser",roles = {"ADMIN"})
    public void deleteUser_shouldDelete_whenValid() throws Exception {
        userRepository.saveAndFlush(user);

        mockMvc.perform(delete("/admin/delete/user?name=validUsername"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "validUser",roles = {"ADMIN"})
    public void deleteUser_shouldThrowException_whenUserIsRoot() throws Exception {
        UserServiceModel root =new UserServiceModel();
        root.setUsername(USERNAME);
        root.setPassword(PASSWORD);
        userService.registerUser(root);

        mockMvc.perform(delete("/admin/delete/user?name=validUsername"))
                .andExpect(status().isIAmATeapot())
                .andExpect(mvcResult -> mvcResult.getResolvedException().getMessage().equals("Inside Job"));
    }


    @Test
    @WithMockUser(username = "validUser",roles = {"ADMIN"})
    public void deleteOrgasm_shouldDelete_whenValid() throws Exception {

        orgasmRepository.saveAndFlush(orgasm);

        mockMvc.perform(delete("/admin/delete/orgasm?name=validTitle"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.msg",is("deleted")));
    }

    @Test
    @WithMockUser(username = "validUser",roles = {"ADMIN"})
    public void deleteOrgasm_shouldThrowFakeOrgasmException_whenEntityDoesntExist() throws Exception {

        mockMvc.perform(delete("/admin/delete/orgasm?name=validTitle"))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(username = "validUser",roles = {"ADMIN"})
    public void modifyOrgasm_shouldTogglePendingStateFromFalseToTrue_whenValid() throws Exception {

        orgasmRepository.saveAndFlush(orgasm);

        mockMvc.perform(put("/admin/modi/pending?title=validTitle"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.pending",is(true)));
    }

    @Test
    @WithMockUser(username = "validUser",roles = {"ADMIN"})
    public void modifyOrgasm_shouldTogglePendingStateFromTrueToFalse_whenValid() throws Exception {

        orgasm.setPending(true);
        orgasmRepository.saveAndFlush(orgasm);

        mockMvc.perform(put("/admin/modi/pending?title=validTitle"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.pending",is(false)));
    }

    @Test
    @WithMockUser(username = "validUser",roles = {"ADMIN"})
    public void modifyOrgasm_shouldThrowFakeOrgasmException_whenOrgasmDontExist() throws Exception {



        mockMvc.perform(put("/admin/modi/pending?title=validTitle"))
                .andExpect(status().isBadRequest())
                .andExpect(mvcResult -> mvcResult.getResolvedException().getMessage().equals("Orgasm doesn't exist"));

    }


}
