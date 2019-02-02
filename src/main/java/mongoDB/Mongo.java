package mongoDB;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;

public class Mongo {
	private MongoClient mongoClient;
	private MongoDatabase mongodb;

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

	public void connectDatabase(String nombre) {
		setMongoClient(new MongoClient());
		setMongodb(getMongoClient().getDatabase(nombre));
	}

}
