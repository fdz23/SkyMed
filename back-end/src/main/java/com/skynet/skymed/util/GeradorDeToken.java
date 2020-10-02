package com.skynet.skymed.util;

import java.util.Random;

public class GeradorDeToken {

	public String geraToken() {

		Random numberRandom = new Random();
		String token = "";

		for (int i = 0; i < 4; i++) {

			token += "" + numberRandom.nextInt(9);

		}

		return token;

	}

}
