package handler;

import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;

import main.ProfWSSocrative;
import main.AlumWSSocrative;

@WebSocket
public class SocrativeWSHandler {
	String tipo;
	static String nomTest;
	int numMsgP = 0, numMsgA = 0;

	@OnWebSocketConnect
	public void onConnect(Session session) throws Exception {
		if ((tipo = AlumWSSocrative.getTipo()) == "alumno") {
			String username = tipo + AlumWSSocrative.userNumber.incrementAndGet() + ":";
			AlumWSSocrative.userUsernameMap.put(session, username);
			System.out.println(username + " conexion inicializada");
		} else {
			if ((tipo = ProfWSSocrative.getTipo()) == "profesor") {
				String username = tipo + ProfWSSocrative.userNumber.incrementAndGet() + ":";
				ProfWSSocrative.userUsernameMap.put(session, username);
				System.out.println(username + " conexion inicializada");
			}
		}

	}

	@OnWebSocketClose
	public void onClose(Session user, int statusCode, String reason) {
		String username = "fail";
		switch (tipo) {
		case "alumno":
			username = AlumWSSocrative.userUsernameMap.get(user);
			AlumWSSocrative.userUsernameMap.remove(user);
			break;
		case "profesor":
			username = ProfWSSocrative.userUsernameMap.get(user);
			ProfWSSocrative.userUsernameMap.remove(user);
			break;
		}
		System.out.println(username + " conexion terminada");
	}

	@OnWebSocketMessage
	public void onMessage(Session user, String message) {
		switch (tipo) {
		case "alumno":
			AlumWSSocrative.broadcastMessage(AlumWSSocrative.userUsernameMap.get(user), message);
			break;
		case "profesor":
			ProfWSSocrative.broadcastMessage(ProfWSSocrative.userUsernameMap.get(user), message);
			break;
		}
	}
}
