package pesko.orgasms.service;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import pesko.orgasms.app.domain.entities.Event;
import pesko.orgasms.app.domain.models.service.EventServiceModel;
import pesko.orgasms.app.exceptions.InvalidEventException;
import pesko.orgasms.app.repository.EventRepository;
import pesko.orgasms.app.service.EventService;
import pesko.orgasms.app.service.OrgasmService;
import pesko.orgasms.app.service.impl.EventServiceImpl;
import pesko.orgasms.app.utils.ValidatorUtil;
import pesko.orgasms.app.utils.ValidatorUtilImpl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
public class EventServiceTest {


    EventRepository eventRepository;

    ModelMapper modelMapper;
    ValidatorUtil validatorUtil;
    EventService eventService;
    EventServiceModel eventServiceModel;
    Event event = new Event();

    @Before
    public void init() {

        LocalDateTime time = LocalDateTime.now().plusMinutes(1);
        modelMapper = new ModelMapper();
        validatorUtil = new ValidatorUtilImpl();
        eventRepository = Mockito.mock(EventRepository.class);
        eventServiceModel = new EventServiceModel();
        eventServiceModel.setDate(time);
        eventServiceModel.setInfo("Info");
        eventServiceModel.setLocation("BG");

        event.setDate(time);
        event.setInfo("Info");
        event.setLocation("BG");
        event.setId(1L);


        when(eventRepository.saveAndFlush(any())).thenReturn(event);
        eventService = new EventServiceImpl(eventRepository, validatorUtil, modelMapper);
    }

    @Test
    public void createEvent_shouldPersist_whenValid() {

        EventServiceModel result = eventService.createEvent(eventServiceModel);
        verify(eventRepository).saveAndFlush(any());
        Assert.assertEquals(eventServiceModel.getDate(), result.getDate());
        Assert.assertEquals(eventServiceModel.getInfo(), result.getInfo());
        Assert.assertEquals(eventServiceModel.getLocation(), result.getLocation());
        Assert.assertNotEquals(eventServiceModel.getId(), result.getId());
    }

    @Test(expected = InvalidEventException.class)
    public void createEvent_shouldThrowException_whenDateIsInvalid() {
        eventServiceModel.setDate(LocalDateTime.now().minusNanos(1));
        eventService.createEvent(eventServiceModel);
    }

    @Test(expected = InvalidEventException.class)
    public void createEvent_shouldThrowException_whenLocationIsInvalid() {
        eventServiceModel.setLocation("");
        eventService.createEvent(eventServiceModel);
    }


    @Test
    public void deleteEvent_shouldDelete_whenEventExist(){
        when(eventRepository.findById(1L)).thenReturn(Optional.of(event));
        eventService.deleteEvent(1L);
        verify(eventRepository).deleteById(1L);
    }

    @Test(expected = IllegalArgumentException.class)
    public void deleteEvent_shouldThrowException_whenEventDontExist(){
        when(eventRepository.findById(1L)).thenReturn(Optional.empty());
        eventService.deleteEvent(1L);
    }

    @Test
    public void getThisAndNextMonthEvents_shouldReturnThisAndNextMonthEvents(){
        List<Event> events= new ArrayList<>();
        events.add(event);
        when(eventRepository.findAllByDateBetween(any(),any())).thenReturn(events);

      List<EventServiceModel>result = eventService.getThisAndNextMonthEvents();

      Assert.assertEquals(result.size(),1);

    }
}
