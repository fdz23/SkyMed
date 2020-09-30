package com.skynet.skymed.interfaces;

import java.io.IOException;

public interface IEmailService <T> {

 
	  void sendEmail(T objectSender) throws IOException ;
	
}
