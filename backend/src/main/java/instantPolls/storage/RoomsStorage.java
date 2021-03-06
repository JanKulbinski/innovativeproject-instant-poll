package instantPolls.storage;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.Map.Entry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import instantPolls.model.Room;

@Component
public class RoomsStorage implements Storage {
	
	volatile private Map<String,Room> rooms;
	volatile private Map<String,String> shortLinks;
	
	public RoomsStorage() {
		rooms = new TreeMap<>();
		shortLinks = new TreeMap<>();
	}
	
	@Override
	public Room createRoom(String name, String token, LocalDate date, String timeZone) {
		String generatedId = generateId();
		Room new_room = new Room(generatedId, name, date, timeZone);
		if(token == null) {
			token = generateId();
		}
		new_room.setToken(token);
		String shortLink = generateShortLink(generatedId); 
		new_room.setShortId(shortLink);
		rooms.put(generatedId, new_room);
		shortLinks.put(shortLink,generatedId);
		return new_room;
	}
	
	private String generateShortLink(String roomId) {
		String shortId = "";
		for(int i = 5; i < roomId.length(); i++) {
			shortId = roomId.substring(0,i);
			if(!shortLinks.containsKey(shortId)) {
				break;
			}
		}
		return shortId;
	}
	
	@Override
	public Room findRoomById(String id) {
		return rooms.get(id);
	}
	
	public String getFullId(String shortId) {
		return shortLinks.get(shortId);
	}
	
	@Override
	public HttpStatus closeRoom(String id, String token) {
		Room room = rooms.get(id);
		if(room == null)
			return HttpStatus.NOT_FOUND;
		if(room.getToken().equals(token)) {
			rooms.remove(id);
			return  HttpStatus.OK;
		} else
			return HttpStatus.UNAUTHORIZED;

	}
	
	@Override
	public void deleteExpiredRooms() {
		Logger log = LoggerFactory.getLogger(RoomsStorage.class);
		
		TimeZone localTimeZone = TimeZone.getDefault();
		int offSetLocalTimeZone = localTimeZone.getOffset(System.currentTimeMillis()) / 1000 / 60;	// server to UTC in minutes
		
		rooms.entrySet().removeIf(entry -> {
			Room room = entry.getValue();
			TimeZone timeZone = room.getTimeZone();
    		int offSetRoomTimeZone = timeZone.getOffset(System.currentTimeMillis()) / 1000 / 60;	// room to UTC in minutes
    		int offSetToLocal = offSetLocalTimeZone - offSetRoomTimeZone;
    		LocalDate dateInRoomTimeZone = LocalDateTime.now().minusMinutes(offSetToLocal).toLocalDate();
    		
    		if (room.getExpirationDate().isBefore(dateInRoomTimeZone)) {	
    			log.info("Room with id: " + room.getId() + "was deleted");
    			shortLinks.remove(room.getShortId());
    			return true;
    		} else
    			return false;
		});	
	}
	
	private String generateId() {
		return UUID.randomUUID().toString();
	}

	public Map<String, Room> getRooms() {
		return rooms;
	}

	public void setRooms(Map<String, Room> rooms) {
		this.rooms = rooms;
	}
	
	
}
