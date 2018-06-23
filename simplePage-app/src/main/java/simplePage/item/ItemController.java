package simplePage.item;

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

import simplePage.item.Item;
import simplePage.item.ItemForClient;
import simplePage.item.ItemService;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*")
public class ItemController {

	@Autowired
	private ItemService itemService;

	//get all items
	@RequestMapping(value = "/items", method = RequestMethod.GET)
	public List<ItemForClient> giveAllItems() {
		return getItemService().receiveAllItems();
	}
	
	//get one item
	@RequestMapping(value="/singleItem/{itemId}", method = RequestMethod.GET)
	public ItemForClient giveSingleItem(@PathVariable("itemId") final Long itemId) {
		return getItemService().receiveItemInfo(itemId);
	}

	//create new item
	@RequestMapping(value = "/newItem/{ownerId}/{storageId}", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void createItem(@RequestBody final Item item, @PathVariable(value="ownerId") long ownerId, @PathVariable(value="storageId") long storageId) {
		itemService.addNewItem(item, ownerId, storageId);
	}

	//update item
	@RequestMapping(path = "/singleItem/update/{itemId}/{ownerId}/{storageId}", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.CREATED)
	public void updateExistingItem(@RequestBody final Item item, @PathVariable final Long itemId, @PathVariable(value="ownerId") long ownerId, @PathVariable(value="storageId") long storageId) {
		itemService.updateItem(item, itemId, ownerId, storageId);
	}

	//delete item
	@RequestMapping(path = "/item/delete/{itemId}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteItemFromDatabase(@PathVariable final Long itemId) {
		itemService.deleteItem(itemId);
	}

	public ItemService getItemService() {
		return itemService;
	}

	public void setItemService(ItemService itemService) {
		this.itemService = itemService;
	}
}
