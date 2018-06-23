package simplePage.storage;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import simplePage.storage.StorageRepository;
import simplePage.storage.Storage;
import simplePage.storage.StorageForClient;

@Transactional
@Service
public class StorageService {

	@Autowired
	private StorageRepository storageRepository;

	public StorageRepository getStorageRepository() {
		return storageRepository;
	}

	public void setStorageRepository(StorageRepository storageRepository) {
		this.storageRepository = storageRepository;
	}

	public List<StorageForClient> receiveAllStorages() {
		List<Storage> storagesFromDatabase = getStorageRepository().findAll();
		List<StorageForClient> storagesForClient = storagesFromDatabase.stream().map((storage) -> {
			StorageForClient str = new StorageForClient();
			str.setStorageId(storage.getStorageId());
			str.setStorage(storage.getStorage());
			str.setCity(storage.getCity());
			return str;
		}).collect(Collectors.toList());
		return storagesForClient;
	}
	
	public Storage receiveStorageInfo (long storageId) {
		Storage storage = storageRepository.findByStorageId(storageId);
		return storage;
	}

	public void addNewStorage(Storage storage) {
		storageRepository.save(storage);
		
	}

	public void updateStorage(Storage storage, Long storageId) {
		Storage str = storageRepository.findOne(storageId);
		str.setStorage(storage.getStorage());
		str.setCity(storage.getCity());
		storageRepository.save(str);
	}

	public void deleteStorage(Long storageId) {
		storageRepository.delete(storageId);
	}
}
