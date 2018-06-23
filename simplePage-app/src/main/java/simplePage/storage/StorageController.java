package simplePage.storage;

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

import simplePage.storage.StorageService;
import simplePage.storage.Storage;
import simplePage.storage.StorageForClient;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*")
public class StorageController {

	@Autowired
	private StorageService storageService;

	public StorageService getStorageService() {
		return storageService;
	}

	public void setStorageService(StorageService storageService) {
		this.storageService = storageService;
	}

	// get all storage facilities
	@RequestMapping(value = "/storageFacilities", method = RequestMethod.GET)
	public List<StorageForClient> giveAllStorages() {
		return getStorageService().receiveAllStorages();
	}

	// get one storage facility
	@RequestMapping(value = "/singleItem/{itemId}/{ownerId}/{storageId}", method = RequestMethod.GET)
	public Storage giveSingleStorage(@PathVariable("storageId") final Long storageId) {
		return getStorageService().receiveStorageInfo(storageId);
	}

	// create new storage
	@RequestMapping(value = "/newStorage", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void createStorage(@RequestBody final Storage storage) {
		storageService.addNewStorage(storage);
	}

	// update storage
	@RequestMapping(path = "/storage/update/{storageId}", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.CREATED)
	public void updateExistingStorage(@RequestBody final Storage storage, @PathVariable final Long storageId) {
		storageService.updateStorage(storage, storageId);
	}

	// delete storage
	@RequestMapping(path = "/storage/delete/{storageId}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteStorageFromDatabase(@PathVariable final Long storageId) {
		storageService.deleteStorage(storageId);
	}
}
