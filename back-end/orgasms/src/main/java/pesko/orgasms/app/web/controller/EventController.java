package pesko.orgasms.app.web.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import pesko.orgasms.app.domain.models.binding.EventBindingModel;
import pesko.orgasms.app.domain.models.info.InfoModel;
import pesko.orgasms.app.domain.models.response.EventResponseModel;
import pesko.orgasms.app.domain.models.service.EventServiceModel;
import pesko.orgasms.app.exceptions.InvalidEventException;
import pesko.orgasms.app.service.EventService;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/event")
public class EventController {

    private final EventService eventService;
    private final ModelMapper modelMapper;

    @Autowired
    public EventController(EventService eventService, ModelMapper modelMapper) {
        this.eventService = eventService;
        this.modelMapper = modelMapper;
    }


    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InfoModel> createEvent(@Valid @RequestBody EventBindingModel eventBindingModel, BindingResult bindingResult){

        if(bindingResult.hasErrors()){
          throw new InvalidEventException("Invalid event props");
        }

        this.eventService.createEvent(this.modelMapper.map(eventBindingModel, EventServiceModel.class));

        return ResponseEntity.status(201).body(new InfoModel("created"));
    }

    @GetMapping("/get/upcoming")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<EventResponseModel>>getAllUpcomingEvent(){

        List<EventResponseModel>events=this.eventService.getThisAndNextMonthEvents().stream()
                .map(e->this.modelMapper.map(e,EventResponseModel.class)).collect(Collectors.toList());

        return ResponseEntity.ok().body(events);

    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InfoModel> deleteEvent(@PathVariable Long id){
        this.eventService.deleteEvent(id);
        return ResponseEntity.ok().body(new InfoModel("Deleted"));
    }
}
