package WebSocket.StompWS.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Timer;
import java.util.TimerTask;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import WebSocket.StompWS.model.*;

@Controller
public class WSController {
	
	@Autowired
	private SimpMessagingTemplate template;

	public WSController() {
		startSendingDate();
	}

	@MessageMapping("/hello")
	@SendTo("/topic/chat")
	public Message message(Message message) throws Exception {
		return new Message(HtmlUtils.htmlEscape(message.getContent()));
	}

	public void sendDate() {
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
		LocalDateTime now = LocalDateTime.now();
		this.template.convertAndSend("/topic/chat", new Message(dtf.format(now)));
	}

	public void startSendingDate() {
		Timer timer = new Timer();
		timer.schedule(new TimerTask() {
			@Override
			public void run() {
				sendDate();
			}
		}, 1000, 5000);
	}
	
}
