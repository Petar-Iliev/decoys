package pesko.orgasms.app.web.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import pesko.orgasms.app.domain.models.binding.UserSetRoleBindingModel;
import pesko.orgasms.app.domain.models.info.InfoModel;
import pesko.orgasms.app.domain.models.service.OrgasmServiceModel;
import pesko.orgasms.app.domain.models.service.RoleServiceModel;
import pesko.orgasms.app.domain.models.service.UserServiceModel;
import pesko.orgasms.app.domain.models.view.AdminUrlViewModel;
import pesko.orgasms.app.domain.models.view.OrgasmViewModel;
import pesko.orgasms.app.domain.models.view.UserInfoResponseModel;
import pesko.orgasms.app.exceptions.FakeOrgasmException;
import pesko.orgasms.app.service.OrgasmService;
import pesko.orgasms.app.service.UserService;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Value("${cloudinary.video.app}")
    private String url;

    private final UserService userService;
    private final OrgasmService orgasmService;
    private final ModelMapper modelMapper;

    @Autowired
    public AdminController(UserService userService, OrgasmService orgasmService, ModelMapper modelMapper) {
        this.userService = userService;
        this.orgasmService = orgasmService;
        this.modelMapper = modelMapper;
    }

    @GetMapping(value = "/check")
    @PreAuthorize("hasRole('ADMIN')")
    public AdminUrlViewModel areYouAdmin() {


        return new AdminUrlViewModel(url);
    }

    @GetMapping("/find/user/{name}")
    @PreAuthorize("hasRole('ADMIN')")
    public UserInfoResponseModel findUser(@PathVariable(name = "name") String name) {

        UserServiceModel user = this.userService.findByUsername(name);
        if (user == null) {
            throw new UsernameNotFoundException("User doesn't exist");
        }
        UserInfoResponseModel responseModel = this.modelMapper.map(user, UserInfoResponseModel.class);
        responseModel.setAuthorities(user.getRoles().stream().map(RoleServiceModel::getAuthority).collect(Collectors.toList()));


        return responseModel;
    }

    @GetMapping("/find/orgasm/{name}")
    @PreAuthorize("hasRole('ADMIN')")
    public OrgasmViewModel findOrgasm(@PathVariable(name = "name") String name) {

        OrgasmServiceModel orgasmServiceModel = this.orgasmService.findByTitle(name);

        if (orgasmServiceModel == null) {
            throw new FakeOrgasmException("Orgasm doesn't exist");
        }

        return this.modelMapper.map(orgasmServiceModel, OrgasmViewModel.class);
    }

    @PutMapping("/set-role")
    @PreAuthorize("hasRole('ADMIN')")
    public InfoModel setRoleAuth(@RequestBody UserSetRoleBindingModel userSetRoleBindingModel) {

        if (userSetRoleBindingModel.getRole().equals("ROOT")) {
            throw new IllegalArgumentException("Inside Job");
        }
        this.userService.modifyRole(userSetRoleBindingModel.getUsername(), userSetRoleBindingModel.getRole());
        return new InfoModel();
    }

    @DeleteMapping("/delete/user")
    @PreAuthorize("hasRole('ADMIN')")
    public InfoModel deleteUser(@RequestParam(value = "name", required = true) String name) {
        this.userService.deleteUserByUsername(name);
        return new InfoModel();
    }

    @DeleteMapping("/delete/orgasm")
    @PreAuthorize("hasRole('ADMIN')")
    public InfoModel deleteOrgasm(@RequestParam(value = "name", required = true) String name) {
        this.orgasmService.deleteOrgasm(name);
        return new InfoModel();
    }
}
