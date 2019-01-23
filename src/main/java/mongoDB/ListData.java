package mongoDB;

import java.util.ArrayList;

import org.bson.Document;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import static com.mongodb.client.model.Projections.excludeId;

public class ListData {
	private String json = "{\"question\":[";
	//private String json = "[";

	public String getData(String nomTest) {
		Mongo mongodb = new Mongo();
		mongodb.connectDatabase();

		MongoCollection<Document> collection = mongodb.getMongodb().getCollection(nomTest);

		FindIterable<Document> it = collection.find().projection(excludeId());
		ArrayList<Document> docs = new ArrayList<Document>();

		it.into(docs);
		for (Document doc : docs) {
			json = json + doc.toJson() + ",";
			//json = doc.toJson() + ",";
		}
		json = json.substring(0, json.length() - 1);
		json = json + "]}";
		return json;
	}
}
