package pesko.orgasms.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pesko.orgasms.app.domain.entities.Orgasm;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrgasmRepository extends JpaRepository<Orgasm,Long> {


    @Query("SELECT o from Orgasm o JOIN User u where u.username = :username")
    List<Orgasm>findAllByUserUsername(@Param("username") String username);

    Optional<Orgasm> findByTitle(String title);

}
