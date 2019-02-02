package mongoDB;

import java.util.ArrayList;

import org.bson.Document;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.util.JSON;

public class InsertData {
	public void insert(String jo, String nomTest) {
		Mongo mongodb = new Mongo();
		mongodb.connectDatabase("cuestonario");

		mongodb.getMongodb().getCollection(nomTest).drop();
		Document docu;

		ArrayList<String> preguntas = list(jo, 0);
		for (int i = 0; i < preguntas.size(); i++) {
			docu = Document.parse(preguntas.get(i));
			mongodb.getMongodb().getCollection(nomTest).insertOne(docu);
		}

		System.out.println("guardado");
	}

	public void insertResult(String json) {
		Mongo mongodb = new Mongo();
		mongodb.connectDatabase("respuestas");
		
		mongodb.getMongodb().getCollection("responde1").drop();
		Document docu;
		
		ArrayList<String> preguntas = list(json, 1);
		for (int i = 0; i < preguntas.size(); i++) {
			docu = Document.parse(preguntas.get(i));
			mongodb.getMongodb().getCollection("responde1").insertOne(docu);
		}

		System.out.println("guardado respuestas");
		/*json = json.substring(1, json.length()-1);
		System.out.println(json);
		com.mongodb.Mongo mongo = new com.mongodb.Mongo("localhost", 27017);
		DB db = mongo.getDB("respuestas");
		DBCollection colle = db.getCollection("responde1");
		colle.drop();
		DBObject dbo = (DBObject) JSON.parse(json);
		colle.insert(dbo);
		System.out.println("guardado respuestas");*/
	}

	public ArrayList<String> list(String jo, int temp) {
		ArrayList<String> preguntas = new ArrayList<String>();
		jo = jo.substring(1, jo.length() - 1);
		jo = (jo + "!");
		String temPre = "";
		int est = 0;
		for (int i = 0; i < jo.length(); i++) {
			if (jo.charAt(i) == ':' && jo.charAt(i + 1) == '[') {
				est = 0;
			}
			if (jo.charAt(i) == ']') {
				est = 1;
			}
			if (jo.charAt(i) == '!') {
				preguntas.add(temPre);
			} else {
				if (jo.charAt(i) == '}' && jo.charAt(i + 1) == ',' && jo.charAt(i + 2) == '{' && est == (1-temp)) {
					preguntas.add(temPre + jo.charAt(i));
					temPre = "";
					i = (i + 1);
				} else {
					temPre += jo.charAt(i);
				}
			}
		}
		for (int i = 0; i < preguntas.size(); i++) {
			System.out.println("*** " + preguntas.get(i));
		}
		return preguntas;
	}
}
