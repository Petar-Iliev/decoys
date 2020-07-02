package pesko.orgasms.app.service;

import org.aspectj.weaver.ast.Or;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pesko.orgasms.app.domain.entities.Orgasm;
import pesko.orgasms.app.domain.entities.User;
import pesko.orgasms.app.domain.models.service.OrgasmServiceModel;
import pesko.orgasms.app.domain.models.service.UserServiceModel;
import pesko.orgasms.app.exceptions.FakeOrgasmException;
import pesko.orgasms.app.global.GlobalStaticConsts;
import pesko.orgasms.app.repository.OrgasmRepository;
import pesko.orgasms.app.repository.UserRepository;
import pesko.orgasms.app.utils.ValidatorUtil;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrgasmServiceImpl implements OrgasmService {

    private final OrgasmRepository orgasmRepository;
    private final ModelMapper modelMapper;
    private final ValidatorUtil validatorUtil;
    private final UserRepository userRepository;


    @Autowired
    public OrgasmServiceImpl(OrgasmRepository orgasmRepository, ModelMapper modelMapper, ValidatorUtil validatorUtil, UserRepository userRepository) {
        this.orgasmRepository = orgasmRepository;
        this.modelMapper = modelMapper;
        this.validatorUtil = validatorUtil;

        this.userRepository = userRepository;
    }

    @Override
    public OrgasmServiceModel saveOrgasm(OrgasmServiceModel orgasmServiceModel) {

        if (!this.validatorUtil.isValid(orgasmServiceModel)) {
            throw new FakeOrgasmException(GlobalStaticConsts.FAKE_ORGASM);
        }

        Orgasm orgasm = this.modelMapper.map(orgasmServiceModel, Orgasm.class);

        this.orgasmRepository.saveAndFlush(orgasm);

        return orgasmServiceModel;
    }

    @Override
    public List<OrgasmServiceModel> findAll() {

        List<OrgasmServiceModel> orgasmServiceModels =
                this.orgasmRepository.findAll()
                        .stream().map(e -> this.modelMapper.map(e, OrgasmServiceModel.class)).collect(Collectors.toList());

        return orgasmServiceModels;
    }

    @Override
    public boolean modifyFavorite(OrgasmServiceModel orgasmServiceModel, String username) {

        Orgasm orgasm = this.orgasmRepository.findByTitle(orgasmServiceModel.getTitle()).orElseThrow(() -> new FakeOrgasmException("orgasm doesn't exist"));
        User user = this.userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User doesn't exist"));

        int index = user.getOrgasms().indexOf(orgasm);

        if (index == -1) {
            user.getOrgasms().add(orgasm);
        } else {
            user.getOrgasms().remove(index);
        }
        userRepository.saveAndFlush(user);
        return true;
    }

    @Override
    public OrgasmServiceModel findByTitle(String title) {

        Orgasm orgasm = this.orgasmRepository.findByTitle(title).orElse(null);

        if (orgasm == null) {
            return null;
        }

        return this.modelMapper.map(orgasm, OrgasmServiceModel.class);
    }

    @Override
    public void deleteOrgasm(String title) {
        Orgasm orgasm = this.orgasmRepository.findByTitle(title).orElseThrow(() -> new FakeOrgasmException("No such orgasm YET!"));
        this.orgasmRepository.deleteById(orgasm.getId());
    }
}
