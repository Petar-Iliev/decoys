package pesko.orgasms.app.service;


import org.springframework.web.multipart.MultipartFile;
import pesko.orgasms.app.domain.models.service.OrgasmServiceModel;

import java.io.IOException;
import java.util.List;

public interface OrgasmService {


//    OrgasmServiceModel saveOrgasm(OrgasmServiceModel orgasmServiceModel,String username);

    OrgasmServiceModel saveOrgasm(MultipartFile file,String orgasmTitle,String username) throws IOException;
    List<OrgasmServiceModel> findAll();



    void deleteOrgasm(String title);

    OrgasmServiceModel likeOrgasm(OrgasmServiceModel orgasmServiceModel, String username);
    OrgasmServiceModel dislikeOrgasm(OrgasmServiceModel orgasmServiceModel,String username);
    int removeLikeDislikeByUsername(String username);

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
