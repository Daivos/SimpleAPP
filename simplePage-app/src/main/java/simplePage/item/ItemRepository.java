package simplePage.item;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import simplePage.item.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

	Item findByItemId(long itemId);

}
