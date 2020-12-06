package com.skynet.skymed.interfaces;

public interface IEmailService<T> {

	void enviaEmail(String nomeUsuario,String emailUsuario,String senhaUsuario,String tokenUsuario) throws Exception;

}
