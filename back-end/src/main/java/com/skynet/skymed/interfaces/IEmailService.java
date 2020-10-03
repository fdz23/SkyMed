package com.skynet.skymed.interfaces;

public interface IEmailService<T> {

	void enviaEmail(T objeto) throws Exception;

}
