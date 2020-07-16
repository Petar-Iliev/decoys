package pesko.orgasms.app.service.impl;

import org.aspectj.weaver.ast.Or;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pesko.orgasms.app.domain.entities.Orgasm;
import pesko.orgasms.app.domain.entities.User;
import pesko.orgasms.app.domain.models.service.OrgasmServiceModel;
import pesko.orgasms.app.domain.models.service.UserServiceModel;
import pesko.orgasms.app.exceptions.FakeOrgasmException;
import pesko.orgasms.app.global.GlobalStaticConsts;
import pesko.orgasms.app.repository.OrgasmRepository;
import pesko.orgasms.app.repository.UserRepository;
import pesko.orgasms.app.service.OrgasmService;
import pesko.orgasms.app.utils.ValidatorUtil;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class OrgasmServiceImpl implements OrgasmService {

    private final OrgasmRepository orgasmRepository;
    private final ModelMapper modelMapper;
    private final ValidatorUtil validatorUtil;
    private final UserRepository userRepository;
    private final Random random;


    @Autowired
    public OrgasmServiceImpl(OrgasmRepository orgasmRepository, ModelMapper modelMapper, ValidatorUtil validatorUtil, UserRepository userRepository) {
        this.orgasmRepository = orgasmRepository;
        this.modelMapper = modelMapper;
        this.validatorUtil = validatorUtil;
        this.userRepository = userRepository;
        this.random = new Random();
    }

    @Override
    public OrgasmServiceModel saveOrgasm(OrgasmServiceModel orgasmServiceModel, String username) {

        if (!this.validatorUtil.isValid(orgasmServiceModel)) {
            throw new FakeOrgasmException(GlobalStaticConsts.FAKE_ORGASM);
        }

        User user = this.userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));


        Orgasm orgasm = this.modelMapper.map(orgasmServiceModel, Orgasm.class);

        orgasm.setUser(user);

        if (user.getRoles().size() < 3) {
            orgasm.setPending(true);
        }

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
    public void deleteOrgasm(String title) {


        Orgasm orgasm = this.orgasmRepository.findByTitle(title).orElseThrow(() -> new FakeOrgasmException("No such orgasm YET!"));

        this.orgasmRepository.deleteById(orgasm.getId());
    }

    @Override
    public void likeOrgasm(OrgasmServiceModel orgasmServiceModel, String username) {
        this.userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Not found User"));
        Orgasm orgasm = this.orgasmRepository.findByTitle(orgasmServiceModel.getTitle()).orElseThrow(() -> new FakeOrgasmException("Fake orgasm"));

        orgasm.getLikeDislike().put(username, true);

        this.orgasmRepository.save(orgasm);

    }

    @Override
    public void dislikeOrgasm(OrgasmServiceModel orgasmServiceModel, String username) {
        User user = this.userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Not found User"));
        Orgasm orgasm = this.orgasmRepository.findByTitle(orgasmServiceModel.getTitle()).orElseThrow(() -> new FakeOrgasmException("Fake orgasm"));


        orgasm.getLikeDislike().put(username, false);

        this.orgasmRepository.saveAndFlush(orgasm);


    }

    @Override
    public void removeLikeDislikeByUsername(String username) {
        this.orgasmRepository.deleteLikeDislikeUserKey(username);
    }

    @Override
    public List<OrgasmServiceModel> findAllUsersOrgasms(String username) {
        List<Orgasm> orgList = this.orgasmRepository.findAllByUserUsername(username);

        return orgList.stream()
                .map(e -> this.modelMapper.map(e, OrgasmServiceModel.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<OrgasmServiceModel> findAllUsersLikedOrgasms(String username) {

        List<Orgasm>orgList = this.orgasmRepository.findAllOrgasmsLikedBy(username);

        return orgList.stream().map(e->modelMapper.map(e,OrgasmServiceModel.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<OrgasmServiceModel> findALlUsersDislikedOrgasms(String username) {
        List<Orgasm>orgList=this.orgasmRepository.findAllOrgasmsDislikedBy(username);
        return orgList.stream().map(e->modelMapper.map(e,OrgasmServiceModel.class))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteOwnOrgasm(String title, String username) {
     User user= userRepository.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("In"));

    Orgasm orgasm= this.orgasmRepository.findByTitle(title).orElseThrow(()->new FakeOrgasmException("s"));

    if(orgasm.getUser() == user){

        this.orgasmRepository.deleteById(orgasm.getId());
    }

    }

    @Override
    public OrgasmServiceModel modifyPending(String title) {
        Orgasm orgasm = this.orgasmRepository.findByTitle(title).orElseThrow(() -> new FakeOrgasmException("Fake"));
        orgasm.setPending(!orgasm.isPending());
        return this.modelMapper.map(orgasmRepository.saveAndFlush(orgasm), OrgasmServiceModel.class);
    }

    @Override
    public OrgasmServiceModel findByTitle(String title) {
        Orgasm orgasm = this.orgasmRepository.findByTitle(title).orElseThrow(() -> new FakeOrgasmException("Fake Orgasm"));


        return this.modelMapper.map(orgasm, OrgasmServiceModel.class);
    }

    @Override
    public OrgasmServiceModel findLikedOrgasm(String username) {


        this.userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Not FOund"));
        List<Orgasm> orgasms = this.orgasmRepository.findLiked(username);

        return this.randomOrgasm(orgasms);
    }

    @Override
    public OrgasmServiceModel findDislikedOrgasm(String username) {

        this.userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Not FOund"));
        List<Orgasm> orgasms = this.orgasmRepository.findDisliked(username);
        return this.randomOrgasm(orgasms);
    }

    @Override
    public OrgasmServiceModel findRandomOrgasm(String username) {
        this.userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Not FOund"));

        List<Orgasm> orgasms = this.orgasmRepository.findRandom(username);

        return this.randomOrgasm(orgasms);
    }
//TODO DELETE THIS THIS FKING METHOD THIS  THIS FKING METHOD PA PA PA DAM PA PA AP DAM
//    private List<Orgasm> filterPending(List<Orgasm>orgasms){
//
//        return orgasms.stream().filter(e->!e.isPending()).collect(Collectors.toList());
//    }

    private OrgasmServiceModel randomOrgasm(List<Orgasm> orgasms) {

        if (orgasms.size() < 1) {
            throw new FakeOrgasmException("Fake Orgasm");
        }

        int index = this.random.nextInt(orgasms.size());

        OrgasmServiceModel orgasmServiceModel = this.modelMapper.map(orgasms.get(index), OrgasmServiceModel.class);

        return orgasmServiceModel;
    }

}
