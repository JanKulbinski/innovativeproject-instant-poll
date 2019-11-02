package WebSocket.StompWS.model;

public class Message {

    private String content;

    public Message() {
    }

    public Message(String name) {
        this.content = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String name) {
        this.content = name;
    }
}
