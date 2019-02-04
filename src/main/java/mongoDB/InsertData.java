package mongoDB;

import java.util.ArrayList;

import org.bson.Document;

import main.DecoJSON;

public class InsertData {
	public void insert(ArrayList<String> parseJson, String nomTest) {
		Mongo mongodb = new Mongo();
		mongodb.connectDatabase("cuestonario");

		mongodb.getMongodb().getCollection(nomTest).drop();
		Document docu;

		for (int i = 0; i < parseJson.size()-2; i++) {
			docu = Document.parse(parseJson.get(i));
			mongodb.getMongodb().getCollection(nomTest).insertOne(docu);
		}

		System.out.println("guardado");
	}

	public void insertResult(ArrayList<String> preguntas, String nomTest, String sender) {
		Mongo mongodb = new Mongo();
		mongodb.connectDatabase("respuestas");
		
		mongodb.getMongodb().getCollection(nomTest+"_respuesta_"+sender).drop();
		Document docu;
		
		for (int i = 0; i < preguntas.size(); i++) {
			docu = Document.parse(preguntas.get(i));
			mongodb.getMongodb().getCollection(nomTest+"_respuesta_"+sender).insertOne(docu);
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

	
}
