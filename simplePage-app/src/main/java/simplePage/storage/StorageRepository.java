package simplePage.storage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import simplePage.storage.Storage;

@Repository
public interface StorageRepository extends JpaRepository<Storage, Long> {

	Storage findByStorageId(long storageId);

}
