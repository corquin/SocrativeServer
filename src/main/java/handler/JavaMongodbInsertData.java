package handler;

import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.text.ParseException;

import java.util.Locale;

import org.bson.Document;

import static java.util.Arrays.asList;
import java.util.LinkedList;

import java.util.logging.Level;
import java.util.logging.Logger;

public class JavaMongodbInsertData {
	private MongoClient mongoClient;
	private MongoDatabase mongodb;

	public void connectDatabase() {
		setMongoClient(new MongoClient());
		setMongodb(getMongoClient().getDatabase("cuestonario"));
	}
	
	/*public void inserPrueba() {
		DBCollection coll = 
		getMongodb()
	}*/

	public void insertOneDataTest() {
		try {
			DateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.ENGLISH);
			// We add a document to the database directly (Añadimos un documento a la base
			// de datos directamente).
			getMongodb().getCollection("restaurants")
					.insertOne(new Document("address", asList(
							new Document().append("street", "Avenida Castrelos 25 Bajo").append("zipcode", "36210")
									.append("building", "180").append("coord", asList(-73.9557413, 40.7720266)),
							new Document().append("street", "Urzáiz 77 Bajo").append("zipcode", "36004")
									.append("building", "40").append("coord", asList(-73.9557413, 40.7720266))))
											.append("borough", "Vigo").append("cuisine",
													"Galician")
											.append("grades", asList(
													new Document().append("date", format.parse("2015-10-11T00:00:00Z"))
															.append("grade", "A").append("score", 12),
													new Document().append("date", format.parse("2015-12-11T00:00:00Z"))
															.append("grade", "B").append("score", 18)))
											.append("name", "Xules"));
		} catch (ParseException ex) {
			Logger.getLogger(JavaMongodbInsertData.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	public void insertManyDataTest() {
		try {
			DateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.ENGLISH);
			// We create a List<Document> (Creamos una List<Document>).
			LinkedList<Document> dataList = new LinkedList<>();
			// We add a document to the list (Añadimos un documento a la lista).
			dataList.add(new Document("address",
					asList(new Document().append("street", "Avenida Castrelos 25 Bajo").append("zipcode", "36210")
							.append("building", "180").append("coord", asList(-73.9557413, 40.7720266)),
							new Document().append("street", "Urzáiz 77 Bajo").append("zipcode", "36004")
									.append("building", "40").append("coord", asList(-73.9557413, 40.7720266))))
											.append("borough", "Vigo").append("cuisine",
													"Galician")
											.append("grades", asList(
													new Document().append("date", format.parse("2015-10-11T00:00:00Z"))
															.append("grade", "A").append("score", 12),
													new Document().append("date", format.parse("2015-12-11T00:00:00Z"))
															.append("grade", "B").append("score", 18)))
											.append("name", "Xules"));
			dataList.add(
					new Document("address",
							asList(new Document().append("street", "Avenida Ruz Perez").append("zipcode", "30204")
									.append("building", "50").append("coord", asList(-73.9557413, 40.7720266))))
											.append("borough", "Ourense").append("cuisine",
													"Galician")
											.append("grades", asList(
													new Document().append("date", format.parse("2015-09-01T00:00:00Z"))
															.append("grade", "A").append("score", 10),
													new Document().append("date", format.parse("2015-12-01T00:00:00Z"))
															.append("grade", "B").append("score", 14)))
											.append("name", "Código Xules"));
			// Now we insert all documents in the database (Ahora introducimos todos los
			// documentos en la base de datos).
			getMongodb().getCollection("restaurants").insertMany(dataList);
		} catch (ParseException ex) {
			Logger.getLogger(JavaMongodbInsertData.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	public MongoClient getMongoClient() {
		return mongoClient;
	}

	public void setMongoClient(MongoClient mongoClient) {
		this.mongoClient = mongoClient;
	}

	public MongoDatabase getMongodb() {
		return mongodb;
	}

	public void setMongodb(MongoDatabase mongodb) {
		this.mongodb = mongodb;
	}

	public static void main(String args[]) {
		JavaMongodbInsertData javaMongodbInsertData = new JavaMongodbInsertData();
		javaMongodbInsertData.connectDatabase();
		javaMongodbInsertData.insertManyDataTest();
		//javaMongodbInsertData.insertOneDataTest();
		System.out.println("correcto");
	}
}
