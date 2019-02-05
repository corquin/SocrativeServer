package main;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.util.ArrayList;

public class DecoJSON {
	/*
	public static String obtData(String json) {
		json = json.replace("[", "");
		json = json.replace("]", "");
		System.out.println(json);
		JsonObject jobt = new Gson().fromJson(json, JsonObject.class);
		return jobt.get("nombre").toString();
	}*/

	//obtenemos la key del jsonString segun la accion del profesor
	public static String obtKey(ArrayList<String> parseJson) {
		String key = parseJson.get(parseJson.size()-1);
		
		JsonObject jobt = new Gson().fromJson(key, JsonObject.class);
		return jobt.get("key").toString();
	}
	
	//obtenemos la key del jsonString segun la accion del profesor
		public static String obtName(ArrayList<String> parseJson) {
			String key = parseJson.get(parseJson.size()-2);
			
			JsonObject jobt = new Gson().fromJson(key, JsonObject.class);
			return jobt.get("titulo").toString();
		}

	//Retorna un array de objetos recuperados de jsonString
	public static ArrayList<String> jsonObj_parse(String jo) {
		ArrayList<String> preguntas = new ArrayList<String>();
		jo = jo.substring(1, jo.length() - 1);
		jo = (jo + "!");
		String temPre = "";
		int est = 1;
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
				if (jo.charAt(i) == '}' && jo.charAt(i + 1) == ',' && jo.charAt(i + 2) == '{' && est == 1) {
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
