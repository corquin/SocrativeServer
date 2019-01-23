package mongoDB;

import java.util.ArrayList;

import org.bson.Document;

public class InsertData {
	public void insert(String jo, String nomTest) {
		Mongo mongodb = new Mongo();
		mongodb.connectDatabase();
		
		mongodb.getMongodb().getCollection(nomTest).drop();
		Document docu;		

		ArrayList<String> preguntas = sacarObjeto(jo);
		for (int i = 0; i < preguntas.size(); i++) {
			docu = Document.parse(preguntas.get(i));
			mongodb.getMongodb().getCollection(nomTest).insertOne(docu);
		}

		System.out.println("guardado");
	}

	public ArrayList<String> sacarObjeto(String jo) {
		ArrayList<String> preguntas = new ArrayList<String>();
		String temPre = "";
		for (int i = 1; i < jo.length(); i++) {
			if (jo.charAt(i) == ']') {
				preguntas.add(temPre);
			} else {
				if (jo.charAt(i) == '}' && jo.charAt(i + 1) == ',' && jo.charAt(i + 2) == '{') {
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
