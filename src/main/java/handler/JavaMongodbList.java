package handler;

import org.bson.Document;
import com.mongodb.Block;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoDatabase;

public class JavaMongodbList {

	private MongoClient mongoClient;
	private MongoDatabase mongodb;

	public void connectDatabase() {
		setMongoClient(new MongoClient());
		setMongodb(getMongoClient().getDatabase("cuestonario"));
	}

	public void listRestaurants() {
		FindIterable<Document> iterable = getMongodb().getCollection("restaurants").find();
		iterable.forEach(new Block<Document>() {
			@Override
			public void apply(final Document document) {
				System.out.println(document);
			}
		});
	}

	public void listRestaurantsByCuisine(String cuisine) {
		// We return documents with the find method by setting a <b>criteria</ b>
		// element equal to the cuisine.
		// Devolvemos los documentos con el método find estableciendo un <b>criteria</b>
		// igual para el elemento cuisine.
		FindIterable<Document> iterable = getMongodb().getCollection("restaurants")
				.find(new Document("cuisine", cuisine));
		// Iterate the results and apply a block to each resulting document.
		// Iteramos los resultados y aplicacimos un bloque para cada documento.
		iterable.forEach(new Block<Document>() {
			@Override
			public void apply(final Document document) {
				System.out.println(document);
			}
		});
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

	public static void main(String[] args) {
		JavaMongodbList javaMongodbList = new JavaMongodbList();
		javaMongodbList.connectDatabase();
		//javaMongodbList.listRestaurants();
		javaMongodbList.listRestaurantsByCuisine("Galician");
	}

}