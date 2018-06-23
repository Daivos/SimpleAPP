package simplePage.owner;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.EqualsAndHashCode;
import simplePage.item.Item;

@Entity
@Table(name = "OWNER")
@EqualsAndHashCode(exclude = { "items" })
@PrimaryKeyJoinColumn(name = "ownerId")
public class Owner {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(unique = true)
	private long ownerId;
	private String ownersName;
	private String ownersAddress;

	//@JsonManagedReference(value = "owner")
	@OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
	private List<Item> items;

	public List<Item> getItems() {
		return items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}

	public long getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(long ownerId) {
		this.ownerId = ownerId;
	}

	public String getOwnersName() {
		return ownersName;
	}

	public void setOwnersName(String ownersName) {
		this.ownersName = ownersName;
	}

	public String getOwnersAddress() {
		return ownersAddress;
	}

	public void setOwnersAddress(String ownersAddress) {
		this.ownersAddress = ownersAddress;
	}

}
