package main;

import java.util.Scanner;

public class MainSocrative {

	public static void main(String[] args) {
		Scanner data = new Scanner(System.in);
		var ent = data.nextInt();
		if (ent == 1) {
			new ProfWSSocrative().inicia();
		} else {
			new AlumWSSocrative().inicia();
		}

	}

}
