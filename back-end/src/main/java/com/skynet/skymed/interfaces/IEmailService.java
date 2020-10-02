package com.skynet.skymed.interfaces;

import java.io.IOException;

public interface IEmailService<T> {

	void enviaEmail(T objeto) throws IOException;

}
