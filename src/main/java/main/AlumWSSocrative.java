package main;

import static spark.Spark.init;
import static spark.Spark.webSocket;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.eclipse.jetty.websocket.api.Session;

import handler.SocrativeWSHandler;
import mongoDB.ListData;

public class AlumWSSocrative {
	public static Map<Session, String> userUsernameMap = new ConcurrentHashMap<>();
	public static AtomicInteger userNumber = new AtomicInteger();
	private static String tipo;
	static String nomTest;
	static int numMsg = 0;

	/*
	 * public static void main(String[] args) { // TODO Auto-generated method stub
	 * tipo = "alumno"; webSocket("/alumno", SocrativeWSHandler.class); init(); }
	 */

	public void inicia() {
		tipo = "alumno";
		System.out.println("Arrancando WS de: " + tipo);
		webSocket("/alumno", SocrativeWSHandler.class);
		init();
	}

	public static void broadcastMessage(String sender, String message) {
		userUsernameMap.keySet().stream().filter(Session::isOpen).forEach(session -> {
			try {
				numMsg++;
				if (numMsg == 1) {
					nomTest = DecoJSON.obtData(message);
					String jsonCuesto = new ListData().getData(nomTest.replace("\"", ""));
					session.getRemote().sendString(jsonCuesto);
				}
				if (numMsg == 2) {
					System.out.println(message);
					// new InsertData().insert(message, nomTest.replace("\"", ""));
					numMsg = 0;
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		});
	}

	public static String getTipo() {
		return tipo;
	}

}
