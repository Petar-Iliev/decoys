package pesko.orgasms.app.web.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import pesko.orgasms.app.domain.entities.Orgasm;
import pesko.orgasms.app.domain.models.error.ErrorInfo;
import pesko.orgasms.app.domain.models.info.InfoModel;
import pesko.orgasms.app.domain.models.service.OrgasmServiceModel;
import pesko.orgasms.app.domain.models.binding.OrgasmBindingModel;
import pesko.orgasms.app.domain.models.service.UserServiceModel;
import pesko.orgasms.app.domain.models.view.OrgasmViewModel;
import pesko.orgasms.app.exceptions.FakeOrgasmException;
import pesko.orgasms.app.repository.OrgasmRepository;
import pesko.orgasms.app.repository.UserRepository;
import pesko.orgasms.app.service.OrgasmService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/orgasm")
public class OrgasmController {

    private final OrgasmService orgasmService;
    private final ModelMapper modelMapper;

    @Autowired
    public OrgasmController(OrgasmService orgasmService, ModelMapper modelMapper) {
        this.orgasmService = orgasmService;
        this.modelMapper = modelMapper;

    }


    @PostMapping(path = "/create", produces = "application/json")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<InfoModel> addOrgasm(@Valid @RequestBody OrgasmBindingModel orgasmViewModel, BindingResult bindingResult,Principal principal) {

        if (bindingResult.hasErrors()) {
            throw new FakeOrgasmException("You can't trick me MF");
        }
        this.orgasmService.saveOrgasm(this.modelMapper.map(orgasmViewModel, OrgasmServiceModel.class),principal.getName());

        return ResponseEntity.status(204).body(new InfoModel("Created"));
    }




    @PutMapping("/like")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String>likeOrgasm(@RequestBody OrgasmBindingModel orgasmBindingModel,Principal principal){

        OrgasmServiceModel orgasmServiceModel=this.modelMapper.map(orgasmBindingModel,OrgasmServiceModel.class);
        this.orgasmService.likeOrgasm(orgasmServiceModel,principal.getName());

        return ResponseEntity.ok("Liked");
    }
    @PutMapping("/dislike")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String>dislikeOrgasm(@RequestBody OrgasmBindingModel orgasmBindingModel,Principal principal){

        OrgasmServiceModel orgasmServiceModel=this.modelMapper.map(orgasmBindingModel,OrgasmServiceModel.class);
        this.orgasmService.dislikeOrgasm(orgasmServiceModel,principal.getName());

        return ResponseEntity.ok("Disliked");
    }

    @GetMapping(path = "/find/liked")
    @PreAuthorize("hasRole('USER')")
    public OrgasmViewModel findLikedOrgasm(Principal principal) {

        OrgasmServiceModel orgasmServiceModel = this.orgasmService.findLikedOrgasm(principal.getName());

        return this.modelMapper.map(orgasmServiceModel, OrgasmViewModel.class);
    }
    @GetMapping(path = "/find/disliked")
    @PreAuthorize("hasRole('USER')")
    public OrgasmViewModel findDislikedOrgasm(Principal principal) {

        OrgasmServiceModel orgasmServiceModel = this.orgasmService.findDislikedOrgasm(principal.getName());

        return this.modelMapper.map(orgasmServiceModel, OrgasmViewModel.class);
    }

    @GetMapping(path = "/find/random")
    @PreAuthorize("hasRole('USER')")
    public OrgasmViewModel findRandomOrgasm(Principal principal) {

        OrgasmServiceModel orgasmServiceModel = this.orgasmService.findRandomOrgasm(principal.getName());

        return this.modelMapper.map(orgasmServiceModel, OrgasmViewModel.class);
    }


    @GetMapping(path = "/find/users/all-own")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<OrgasmViewModel>> findAllOwnOrgasms(Principal principal){
      List<OrgasmViewModel>orgasms = this.orgasmService.findAllUsersOrgasms(principal.getName())
              .stream()
              .map(e->this.modelMapper.map(e,OrgasmViewModel.class))
              .collect(Collectors.toList());

        return ResponseEntity.ok().body(orgasms);
    }

    @GetMapping(path = "/find/users/all-liked")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<OrgasmViewModel>> findAllLikedOrgasms(Principal principal){
       List<OrgasmViewModel>orgasms= this.orgasmService.findAllUsersLikedOrgasms(principal.getName())
               .stream()
               .map(e->modelMapper.map(e,OrgasmViewModel.class))
               .collect(Collectors.toList());

        return ResponseEntity.ok().body(orgasms);
    }

    @GetMapping(path = "/find/users/all-disliked")
    public ResponseEntity<List<OrgasmViewModel>> findAllDislikedOrgasms(Principal principal){

        List<OrgasmViewModel>orgasms= this.orgasmService.findALlUsersDislikedOrgasms(principal.getName())
                .stream()
                .map(e->modelMapper.map(e,OrgasmViewModel.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok().body(orgasms);
    }

    @DeleteMapping(path = "/delete/own/{title}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<InfoModel> deleteOwnOrgasm(@PathVariable String title,Principal principal){

        this.orgasmService.deleteOwnOrgasm(title,principal.getName());

        return  ResponseEntity.ok().body(new InfoModel("Deleted"));
    }

    @ExceptionHandler({FakeOrgasmException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorInfo orgasmHandlerException(HttpServletRequest request, FakeOrgasmException ex) {


//        ex.printStackTrace();
        return new ErrorInfo(request.getRequestURI(), ex);
    }
}
