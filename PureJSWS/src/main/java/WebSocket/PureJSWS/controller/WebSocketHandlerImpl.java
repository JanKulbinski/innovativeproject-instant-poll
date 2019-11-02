package WebSocket.PureJSWS.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

@Component
public class WebSocketHandlerImpl extends TextWebSocketHandler {

	List<WebSocketSession> sessions = new ArrayList<WebSocketSession>();

	public WebSocketHandlerImpl() {
		super();
		startSendingDate();
	}

	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message)
			throws InterruptedException, IOException {
		Map<String, String> value = new Gson().fromJson(message.getPayload(), Map.class);
		try {
			sendMessageToAll(value.get("content"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
		JsonObject response = new JsonObject();
		response.addProperty("message", "Hello");
		session.sendMessage(new TextMessage(response.toString()));
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
		sessions.remove(session);
	}

	public void sendMessageToAll(String message) throws Exception {
		JsonObject response = new JsonObject();
		response.addProperty("message", message);
		for (WebSocketSession webSocketSession : sessions) {
			webSocketSession.sendMessage(new TextMessage(response.toString()));
		}
	}

	public void startSendingDate() {
		Timer timer = new Timer();
		timer.schedule(new TimerTask() {
			@Override
			public void run() {
				try {
					DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
					LocalDateTime now = LocalDateTime.now();
					sendMessageToAll(dtf.format(now));
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}, 1000, 5000);
	}
}
