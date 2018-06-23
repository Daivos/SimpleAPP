package simplePage.owner;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import simplePage.owner.Owner;
import simplePage.owner.OwnerForClient;
import simplePage.owner.OwnerService;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*")
public class OwnerController {

	@Autowired
	private OwnerService ownerService;

	public OwnerService getOwnerService() {
		return ownerService;
	}

	public void setOwnerService(OwnerService ownerService) {
		this.ownerService = ownerService;
	}

	// get all owners
	@RequestMapping(value = "/owners", method = RequestMethod.GET)
	public List<OwnerForClient> giveAllOwners() {
		return getOwnerService().receiveAllOwners();
	}

	// get one owner
	@RequestMapping(value = "/singleItem/{itemId}/{ownerId}", method = RequestMethod.GET)
	public Owner giveSingleOwner(@PathVariable("ownerId") final Long ownerId) {
		return ownerService.receiveOwnerInfo(ownerId);
	}

	// create new owner
	@RequestMapping(value = "/newOwner", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void createOwner(@RequestBody final Owner owner) {
		ownerService.addNewOwner(owner);
	}

	// update owner
	@RequestMapping(path = "/owner/update/{ownerId}", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.CREATED)
	public void updateExistingOwner(@RequestBody final Owner owner, @PathVariable final Long ownerId) {
		ownerService.updateOwner(owner, ownerId);
	}

	// delete owner
	@RequestMapping(path = "/owner/delete/{ownerId}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteOwnerFromDatabase(@PathVariable final Long ownerId) {
		ownerService.deleteOwner(ownerId);
	}
}
