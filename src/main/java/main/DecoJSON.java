package main;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

public class DecoJSON {
	public static String obtData(String json) {
		json = json.replace("[", "");
		json = json.replace("]", "");
		System.out.println(json);
		JsonObject jobt = new Gson().fromJson(json, JsonObject.class);
		return jobt.get("nombre").toString();
	}
}
