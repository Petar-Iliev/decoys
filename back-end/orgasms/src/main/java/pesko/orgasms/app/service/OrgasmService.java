package pesko.orgasms.app.service;


import pesko.orgasms.app.domain.models.service.OrgasmServiceModel;

import java.util.List;

public interface OrgasmService {


    OrgasmServiceModel saveOrgasm(OrgasmServiceModel orgasmServiceModel,String username);
    List<OrgasmServiceModel> findAll();



    void deleteOrgasm(String title);

    void likeOrgasm(OrgasmServiceModel orgasmServiceModel, String username);
    void dislikeOrgasm(OrgasmServiceModel orgasmServiceModel,String username);
    void removeLikeDislikeByUsername(String username);

    List<OrgasmServiceModel>findAllUsersOrgasms(String username);
    List<OrgasmServiceModel>findAllUsersLikedOrgasms(String username);
    List<OrgasmServiceModel>findALlUsersDislikedOrgasms(String username);
    void deleteOwnOrgasm(String title,String username);

    OrgasmServiceModel modifyPending(String title);
    OrgasmServiceModel findByTitle(String title);
    OrgasmServiceModel findLikedOrgasm(String username);
    OrgasmServiceModel findDislikedOrgasm(String username);
    OrgasmServiceModel findRandomOrgasm(String username);



}
