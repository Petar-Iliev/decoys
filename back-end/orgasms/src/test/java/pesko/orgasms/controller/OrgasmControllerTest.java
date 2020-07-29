package pesko.orgasms.controller;



import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.not;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.aspectj.weaver.ast.Or;
import org.hibernate.boot.spi.InFlightMetadataCollector.EntityTableXref;
import org.junit.Assert;
import org.junit.Before;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.util.MimeType;
import pesko.orgasms.app.domain.entities.Orgasm;
import pesko.orgasms.app.domain.entities.User;
import pesko.orgasms.app.exceptions.FakeOrgasmException;
import pesko.orgasms.app.global.MIMETypeConstants;
import pesko.orgasms.app.repository.OrgasmRepository;
import pesko.orgasms.app.repository.UserRepository;

import java.util.Arrays;

@SpringBootTest
@AutoConfigureMockMvc
@PropertySource(value={"classpath:application.properties"})
public class OrgasmControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    UserRepository userRepository;

    @Autowired
    OrgasmRepository orgasmRepository;

    User user = new User();
    Orgasm orgasm = new Orgasm();

    @BeforeEach
     void init(){

        this.user.setUsername("validUser");
        this.user.setPassword("validPassword");

        orgasm.setTitle("validTitle");
        orgasm.setVideoUrl("validUrl");
        orgasm.setPending(false);

    }

    @AfterEach
    public void clear(){
        userRepository.deleteAll();
        orgasmRepository.deleteAll();
    }

    //Create Start
//    @Test
//    @WithMockUser(username = "validUser",roles = {"USER"})
//    public void createOrgasm_shouldReturnOk_whenOk() throws Exception {
//
//        MockMultipartFile file= new MockMultipartFile("somefile","musica.mp3",);



    //Create END
    //FIND START
    @Test
    @WithMockUser(username = "validUser",roles = {"USER"})
    public void findOrgasm_shouldReturnNotFound_whenDoesntExist() throws Exception {

        mockMvc.perform(get("/orgasm/find/pesho"))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(username = "validUser",roles = {"USER"})
    public void findOrgasm_shouldReturnOrgasm_whenValid() throws Exception {
        orgasmRepository.save(orgasm);

                 mockMvc.perform(get("/orgasm/find/validTitle"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title",is("validTitle")))
                .andExpect(jsonPath("$.videoUrl",is("validUrl")))
               .andReturn();

    }

    @Test
    @WithMockUser(username = "validUser",roles = {"USER"})
    public void findLiked_shouldReturnLikedOrgasm_whenUserLikedAtleastOne() throws Exception {
       userRepository.saveAndFlush(user);
        orgasm.getLikeDislike().put(user.getUsername(),true);
        Orgasm dislikedOrgasm = new Orgasm();
        dislikedOrgasm.setPending(false);
        dislikedOrgasm.setTitle("dislikedOne");
        dislikedOrgasm.setVideoUrl("url");
        dislikedOrgasm.getLikeDislike().put(user.getUsername(),false);
        orgasmRepository.saveAndFlush(orgasm);
        orgasmRepository.saveAndFlush(dislikedOrgasm);
        mockMvc.perform(get("/orgasm/find/liked"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title",is(orgasm.getTitle())));

    }
    @Test
    @WithMockUser(username = "validUser",roles = {"USER"})
    public void findDisliked_shouldReturnDislikedOrgasm_whenUserDislikedAtleastOne() throws Exception {
        userRepository.saveAndFlush(user);
        orgasm.getLikeDislike().put(user.getUsername(),true);
        Orgasm dislikedOrgasm = new Orgasm();
        dislikedOrgasm.setPending(false);
        dislikedOrgasm.setTitle("dislikedOne");
        dislikedOrgasm.setVideoUrl("url");
        dislikedOrgasm.getLikeDislike().put(user.getUsername(),false);
        orgasmRepository.saveAndFlush(orgasm);
        orgasmRepository.saveAndFlush(dislikedOrgasm);

        mockMvc.perform(get("/orgasm/find/disliked"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title",is(dislikedOrgasm.getTitle())));

    }

    @Test
    @WithMockUser(username = "validUser",roles = {"USER"})
    public void findDisliked_shouldThrowException_whenUserHaventDislikedAny() throws Exception {
        userRepository.saveAndFlush(user);

        Orgasm dislikedOrgasm = new Orgasm();
        dislikedOrgasm.setPending(false);
        dislikedOrgasm.setTitle("dislikedOne");
        dislikedOrgasm.setVideoUrl("url");

        orgasmRepository.saveAndFlush(orgasm);
        orgasmRepository.saveAndFlush(dislikedOrgasm);

        mockMvc.perform(get("/orgasm/find/disliked"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.ex",is("Fake Orgasm")));

    }

    @Test
    @WithMockUser(username = "validUser",roles = {"USER"})
    public void findLiked_shouldThrowException_whenUserHaventLikedAny() throws Exception {
        userRepository.saveAndFlush(user);

        Orgasm dislikedOrgasm = new Orgasm();
        dislikedOrgasm.setPending(false);
        dislikedOrgasm.setTitle("dislikedOne");
        dislikedOrgasm.setVideoUrl("url");

        orgasmRepository.saveAndFlush(orgasm);
        orgasmRepository.saveAndFlush(dislikedOrgasm);

        mockMvc.perform(get("/orgasm/find/liked"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.ex",is("Fake Orgasm")));

    }

    @Test
    @WithMockUser(username = "validUser",roles = {"USER"})
    public void findDisliked_shouldThrowException_whenUserDontExist() throws Exception {

        mockMvc.perform(get("/orgasm/find/disliked"))
                .andExpect(status().isBadRequest())
                .andExpect(mvcResult -> Assert.assertEquals(mvcResult.getResolvedException().getMessage(),"User not found."));

    }
    @Test
    @WithMockUser(username = "validUser",roles = {"USER"})
    public void findLiked_shouldThrowException_whenUserDontExist() throws Exception {

        mockMvc.perform(get("/orgasm/find/liked"))
                .andExpect(status().isBadRequest())
                .andExpect(mvcResult -> Assert.assertEquals(mvcResult.getResolvedException().getMessage(),"User not found."));

    }
    @Test
    @WithMockUser(username = "validUser",roles = {"USER"})
    public void findALlUserLikedOrgasms_shouldReturnAllLiked_whenValid() throws Exception {
        userRepository.saveAndFlush(user);
        orgasm.getLikeDislike().put(user.getUsername(),true);
        Orgasm liked = new Orgasm();
        liked.setPending(false);
        liked.setTitle("liked");
        liked.setVideoUrl("url");
        liked.getLikeDislike().put(user.getUsername(),true);
        Orgasm dislikedOrgasm = new Orgasm();
        dislikedOrgasm.getLikeDislike().put(user.getUsername(),false);
        dislikedOrgasm.setPending(false);
        dislikedOrgasm.setTitle("dislikedOne");
        dislikedOrgasm.setVideoUrl("url2");

        orgasmRepository.saveAll(Arrays.asList(orgasm,liked,dislikedOrgasm));

        mockMvc.perform(get("/orgasm/find/users/all-liked"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title",is(orgasm.getTitle())))
                .andExpect(jsonPath("$[1].title",is(liked.getTitle())))
                .andReturn();


    }
    @Test
    @WithMockUser(username = "validUser",roles = {"USER"})
    public void findALlUserDislikedOrgasms_shouldReturnAllDisliked_whenValid() throws Exception {
        userRepository.saveAndFlush(user);
        orgasm.getLikeDislike().put(user.getUsername(),true);
        Orgasm liked = new Orgasm();
        liked.setPending(false);
        liked.setTitle("liked");
        liked.setVideoUrl("url");
        liked.getLikeDislike().put(user.getUsername(),true);
        Orgasm dislikedOrgasm = new Orgasm();
        dislikedOrgasm.getLikeDislike().put(user.getUsername(),false);
        dislikedOrgasm.setPending(false);
        dislikedOrgasm.setTitle("dislikedOne");
        dislikedOrgasm.setVideoUrl("url2");

        orgasmRepository.saveAll(Arrays.asList(orgasm,liked,dislikedOrgasm));

        mockMvc.perform(get("/orgasm/find/users/all-disliked"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title",is(dislikedOrgasm.getTitle())));

    }

    @Test
    @WithMockUser(username = "validUser",roles = {"USER"})
    public void findAllOwn_shouldReturnAllOrgasmCreatedByTheUser() throws Exception {
        userRepository.saveAndFlush(user);
        orgasm.setUser(user);
        Orgasm orgasm2=new Orgasm();
        orgasm2.setTitle("valid");
        orgasm2.setPending(false);
        orgasm2.setVideoUrl("videoUrl");
        orgasm2.setUser(user);
        orgasmRepository.saveAll(Arrays.asList(orgasm,orgasm2));

        mockMvc.perform(get("/orgasm/find/users/all-own"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title",is(orgasm.getTitle())))
                .andExpect(jsonPath("$[1].title",is(orgasm2.getTitle())))
                ;
    }
    //FIND END

    //Like START
    @Test
    @WithMockUser(username = "validUser",roles = {"USER"})
    public void likeOrgasm_shouldLike_whenValid() throws Exception {
        userRepository.saveAndFlush(user);
        orgasm.setUser(user);
        orgasmRepository.saveAndFlush(orgasm);

        mockMvc.perform(put("/orgasm/like/validTitle"))
        .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "validUser",roles = {"USER"})
    public void likeOrgasm_shouldReturnNotFound_whenOrgasmDoesntExist() throws Exception {
        userRepository.saveAndFlush(user);
        orgasm.setUser(user);
        orgasmRepository.saveAndFlush(orgasm);

        mockMvc.perform(put("/orgasm/like/invalidTitle"))
                .andExpect(status().isNotFound())
                .andExpect(mvcResult -> Assert.assertTrue(mvcResult.getResolvedException() instanceof FakeOrgasmException));
    }

    @Test
    @WithMockUser(username = "invalidUser",roles = {"USER"})
    public void likeOrgasm_shouldReturnBadRequest_whenUserDoesntExist() throws Exception {
        userRepository.saveAndFlush(user);
        orgasm.setUser(user);
        orgasmRepository.saveAndFlush(orgasm);

        mockMvc.perform(put("/orgasm/like/validTitle"))
                .andExpect(status().isBadRequest())
                .andExpect(mvcResult -> Assert.assertTrue(mvcResult.getResolvedException() instanceof UsernameNotFoundException));
    }

    //Like END

    //Dislike Start


    @Test
    @WithMockUser(username = "validUser",roles = {"USER"})
    public void dislikeOrgasm_shouldLike_whenValid() throws Exception {
        userRepository.saveAndFlush(user);
        orgasm.setUser(user);
        orgasmRepository.saveAndFlush(orgasm);

        mockMvc.perform(put("/orgasm/dislike/validTitle"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "validUser",roles = {"USER"})
    public void dislikeOrgasm_shouldReturnNotFound_whenOrgasmDoesntExist() throws Exception {
        userRepository.saveAndFlush(user);
        orgasm.setUser(user);
        orgasmRepository.saveAndFlush(orgasm);

        mockMvc.perform(put("/orgasm/dislike/invalidTitle"))
                .andExpect(status().isNotFound())
                .andExpect(mvcResult -> Assert.assertTrue(mvcResult.getResolvedException() instanceof FakeOrgasmException));
    }

    @Test
    @WithMockUser(username = "invalidUser",roles = {"USER"})
    public void dislikeOrgasm_shouldReturnBadRequest_whenUserDoesntExist() throws Exception {
        userRepository.saveAndFlush(user);
        orgasm.setUser(user);
        orgasmRepository.saveAndFlush(orgasm);

        mockMvc.perform(put("/orgasm/dislike/validTitle"))
                .andExpect(status().isBadRequest())
                .andExpect(mvcResult -> Assert.assertTrue(mvcResult.getResolvedException() instanceof UsernameNotFoundException));
    }

    //DislikeEnd

    //DELETE OWN START

    @Test
    @WithMockUser(username = "validUser",roles = {"USER"})
    public void deleteOwn_whenUserDoesntExist_shouldThrowUsernameNotFoundException() throws Exception {

        mockMvc.perform(delete("/orgasm/delete/own/invalidUser"))
                .andExpect(status().isBadRequest())
                .andExpect(result -> Assert.assertTrue(result.getResolvedException() instanceof UsernameNotFoundException));
    }

    @Test
    @WithMockUser(username = "validUser",roles = {"USER"})
    public void deleteOwn_whenOrgasmDoesntExist_shouldThrowFakeOrgasmException() throws Exception {

        userRepository.saveAndFlush(user);

        mockMvc.perform(delete("/orgasm/delete/own/invalidOrgasm"))
                .andExpect(status().isNotFound())
                .andExpect(result -> Assert.assertTrue(result.getResolvedException() instanceof FakeOrgasmException));
    }

    @Test
    @WithMockUser(username = "validUser",roles = {"USER"})
    public void deleteOwn_shouldDelete_succOrgasm() throws Exception {

        userRepository.saveAndFlush(user);
        orgasm.setUser(this.user);
        orgasmRepository.save(orgasm);
        mockMvc.perform(delete("/orgasm/delete/own/validTitle"))
                .andExpect(status().isOk());
        Assert.assertEquals(0, orgasmRepository.count());
    }

    //DELETE OWN END




}
