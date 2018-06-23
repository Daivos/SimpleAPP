package simplePage.item;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.EqualsAndHashCode;
import simplePage.owner.Owner;
import simplePage.storage.Storage;

@Entity
@Table(name = "ITEM")
@EqualsAndHashCode(exclude = { "owner", "storageFacility" })
@PrimaryKeyJoinColumn(name = "itemId")
public class Item {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(unique = true)
	private long itemId;
	private String itemName;
	private int quantity = 0;

	@ManyToOne
	@JsonBackReference(value = "ownerId")
	@JoinColumn(name = "ownerId")
	private Owner owner;

	@ManyToOne
	@JsonBackReference(value = "storageId")
	@JoinColumn(name = "storageId")
	private Storage storageFacility;

	public long getItemId() {
		return itemId;
	}

	public void setItemId(long itemId) {
		this.itemId = itemId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Owner getOwner() {
		return owner;
	}

	public void setOwner(Owner owner) {
		this.owner = owner;
	}

	public Storage getStorageFacility() {
		return storageFacility;
	}

	public void setStorageFacility(Storage storageFacility) {
		this.storageFacility = storageFacility;
	}
	

}
