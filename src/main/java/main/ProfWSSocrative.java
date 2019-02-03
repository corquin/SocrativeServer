package main;

import static spark.Spark.init;
import static spark.Spark.webSocket;

import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.eclipse.jetty.websocket.api.Session;

import handler.JavaMongodbList;
import handler.SocrativeWSHandler;
import mongoDB.InsertData;
import mongoDB.ListData;

public class ProfWSSocrative {

	public static Map<Session, String> userUsernameMap = new ConcurrentHashMap<>();
	public static AtomicInteger userNumber = new AtomicInteger();
	private static String tipo;
	static String nomTest;
	static int numMsg = 0;

	/*
	 * public static void main(String[] args) { // TODO Auto-generated method stub
	 * tipo = "profesor"; webSocket("/profesor", SocrativeWSHandler.class); init();
	 * }
	 */
	public void inicia() {
		tipo = "profesor";
		webSocket("/profesor", SocrativeWSHandler.class);
		init();
	}

	public static void broadcastMessage(String sender, String message) {
		userUsernameMap.keySet().stream().filter(Session::isOpen).forEach(session -> {
			try {
				ArrayList<String> parseJson = DecoJSON.jsonObj_parse(message);
				String key = DecoJSON.obtKey(parseJson);
				System.out.println(key);
				String titulo = DecoJSON.obtName(parseJson);
				System.out.println(titulo);
				switch (Integer.parseInt(key.replace("\"", ""))) {
				case 1:					
					new InsertData().insert(parseJson, titulo.replace("\"", ""));
					break;
				case 2:
					//new JavaMongodbList().listar();
					String json = new ListData().getDB(titulo.replace("\"", ""));
					System.out.println(json);
					session.getRemote().sendString(json);
					break;
				case 3:
					String jsonD = new ListData().getData(titulo.replace("\"", ""));
					session.getRemote().sendString(jsonD);
					break;
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
