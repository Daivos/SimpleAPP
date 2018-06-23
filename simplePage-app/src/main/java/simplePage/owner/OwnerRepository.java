package simplePage.owner;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import simplePage.owner.Owner;

@Repository
public interface OwnerRepository extends JpaRepository<Owner, Long> {

	Owner findByOwnerId(long ownerId);

}
