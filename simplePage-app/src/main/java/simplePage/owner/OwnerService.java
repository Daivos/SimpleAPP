package simplePage.owner;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import simplePage.owner.Owner;
import simplePage.owner.OwnerForClient;
import simplePage.owner.OwnerRepository;

@Transactional
@Service
public class OwnerService {

	@Autowired
	private OwnerRepository ownerRepository;

	public OwnerRepository getOwnerRepository() {
		return ownerRepository;
	}

	public void setOwnerRepository(OwnerRepository ownerRepository) {
		this.ownerRepository = ownerRepository;
	}

	public List<OwnerForClient> receiveAllOwners() {
		List<Owner> ownersFromDatabase = getOwnerRepository().findAll();
		List<OwnerForClient> ownersForClient = ownersFromDatabase.stream().map((owner) -> {
			OwnerForClient own = new OwnerForClient();
			own.setOwnerId(owner.getOwnerId());
			own.setOwnersName(owner.getOwnersName());
			own.setOwnersAddress(owner.getOwnersAddress());
			return own;
		}).collect(Collectors.toList());
		return ownersForClient;
	}
	
	public Owner receiveOwnerInfo (long ownerId) {
		Owner ownerForClient = ownerRepository.findByOwnerId(ownerId);
		return ownerForClient;
	}

	public void addNewOwner(Owner owner) {
		ownerRepository.save(owner);
	}

	public void updateOwner(Owner owner, Long ownerId) {
		Owner own = ownerRepository.findOne(ownerId);
		own.setOwnersName(owner.getOwnersName());
		own.setOwnersAddress(owner.getOwnersAddress());
		ownerRepository.save(own);
	}

	public void deleteOwner(Long ownerId) {
		ownerRepository.delete(ownerId);
	}
}
