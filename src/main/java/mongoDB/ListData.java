package mongoDB;

import java.util.ArrayList;
import java.util.Set;

import org.bson.Document;

import com.mongodb.Block;
import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import static com.mongodb.client.model.Projections.excludeId;

public class ListData {
	Mongo mongodb = new Mongo();

	public String getData(String nomTest) {
		String json = "{\"name\":\"" + nomTest + "\",\"question\":[";
		// mongodb = new Mongo();
		mongodb.connectDatabase("cuestonario");

		MongoCollection<Document> collection = mongodb.getMongodb().getCollection(nomTest);

		FindIterable<Document> it = collection.find().projection(excludeId());
		ArrayList<Document> docs = new ArrayList<Document>();

		it.into(docs);
		for (Document doc : docs) {
			json = json + doc.toJson() + ",";
		}
		json = json.substring(0, json.length() - 1);
		json = json + "]}";
		return json;
	}

	@SuppressWarnings("deprecation")
	public String getDB(String nomTest) {
		String json = "";
		if (nomTest.equals("null")) {
			json = "{\"name\":\"getCollections\",\"collections\":[";
			mongodb.connectDatabase("cuestonario");
			DB db = mongodb.getMongoClient().getDB("cuestonario");

			Set<String> result = db.getCollectionNames();
			int cont = 1;
			for (String s : result) {
				json = (json + "{\"id\":" + cont + ",\"nombre\":\"" + s + "\"},");
				cont++;
			}
			json = json.substring(0, json.length() - 1);
			json = json + "]}";
		}
		return json;
	}
}
