package pesko.orgasms.controller;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.Before;
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

import pesko.orgasms.app.domain.entities.Event;
import pesko.orgasms.app.domain.entities.EventType;
import pesko.orgasms.app.domain.entities.Orgasm;
import pesko.orgasms.app.domain.entities.User;
import pesko.orgasms.app.domain.models.binding.EventBindingModel;
import pesko.orgasms.app.domain.models.binding.UserSetRoleBindingModel;
import pesko.orgasms.app.domain.models.service.UserServiceModel;

import pesko.orgasms.app.repository.EventRepository;
import pesko.orgasms.app.repository.OrgasmRepository;
import pesko.orgasms.app.repository.UserRepository;
import pesko.orgasms.app.service.UserService;

import java.time.LocalDateTime;
import java.util.Arrays;


@SpringBootTest
@AutoConfigureMockMvc
@PropertySource(value={"classpath:application.properties"})
public class EventControllerTest {


    @Autowired
    MockMvc mockMvc;

    @Autowired
    EventRepository eventRepository;


    @Autowired
    ObjectMapper mapper;

    Event event= new Event();


   @BeforeEach
    public void init(){
       eventRepository.deleteAll();
       event.setDate(LocalDateTime.now().plusDays(1));
       event.setInfo("Some Info");
       event.setLocation("BG");
       event.setType(EventType.COFFEE);
   }

    @Test
    @WithMockUser(username = "validUser",roles = {"ADMIN"})
    public void create_shouldCreateEvent_whenValid() throws Exception {

        EventBindingModel eventBindingModel=new EventBindingModel();
        eventBindingModel.setDate(LocalDateTime.now().plusMinutes(1));
        eventBindingModel.setInfo("Info");
        eventBindingModel.setLocation("BG");
        eventBindingModel.setType(EventType.COFFEE);

        String json = mapper.writeValueAsString(eventBindingModel);

        mockMvc.perform(post("/event/create")
        .contentType(MediaType.APPLICATION_JSON)
        .content(json))
                .andExpect(status().isCreated());
   }


    @Test
    @WithMockUser(username = "validUser",roles = {"ADMIN"})
    public void create_shouldThrowException_whenDateIsInThePast() throws Exception {

        EventBindingModel eventBindingModel=new EventBindingModel();
        eventBindingModel.setDate(LocalDateTime.now().minusMinutes(1));
        eventBindingModel.setInfo("Info");
        eventBindingModel.setLocation("BG");
        eventBindingModel.setType(EventType.COFFEE);

        String json = mapper.writeValueAsString(eventBindingModel);

        mockMvc.perform(post("/event/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(username = "validUser",roles = {"ADMIN"})
    public void create_shouldThrowException_whenLocationIsNull() throws Exception {

        EventBindingModel eventBindingModel=new EventBindingModel();
        eventBindingModel.setDate(LocalDateTime.now().plusMinutes(1));
        eventBindingModel.setInfo("Info");
        eventBindingModel.setType(EventType.COFFEE);

        String json = mapper.writeValueAsString(eventBindingModel);

        mockMvc.perform(post("/event/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(username = "validUser",roles = {"ADMIN","USER"})
    public void getAllUpcomingEvent_shouldReturnAllEventsForTwoMonths() throws Exception {
       Event threeMonthsUtill = new Event();
        threeMonthsUtill.setType(EventType.BENCH_PARTY);
        threeMonthsUtill.setLocation("BG");
        threeMonthsUtill.setDate(LocalDateTime.now().plusMonths(3));
        threeMonthsUtill.setInfo("Info");

       eventRepository.saveAll(Arrays.asList(event,threeMonthsUtill));

       mockMvc.perform(get("/event/get/upcoming"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$",hasSize(1)));
    }

    @Test
    @WithMockUser(username = "validUser",roles = {"ADMIN"})
    public void deleteEvent_shouldDelete() throws Exception {

       eventRepository.saveAndFlush(event);

       mockMvc.perform(delete("/event/delete/1"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.msg",is("Deleted")));
    }


    @Test
    @WithMockUser(username = "validUser",roles = {"ADMIN"})
    public void deleteEvent_throwException_whenNotFound() throws Exception {


        mockMvc.perform(delete("/event/delete/1"))
                .andExpect(status().isNotFound());

    }
}
