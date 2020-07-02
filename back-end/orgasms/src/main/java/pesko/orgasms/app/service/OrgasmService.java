package pesko.orgasms.app.service;


import pesko.orgasms.app.domain.models.service.OrgasmServiceModel;

import java.util.List;

public interface OrgasmService {


    OrgasmServiceModel saveOrgasm(OrgasmServiceModel orgasmServiceModel);

    List<OrgasmServiceModel> findAll();

    boolean modifyFavorite(OrgasmServiceModel orgasmServiceModel,String username);

    OrgasmServiceModel findByTitle(String title);

    void deleteOrgasm(String title);

}
