package com.skynet.skymed.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Personalization;
import com.skynet.skymed.interfaces.IEmailService;
import com.skynet.skymed.model.Pessoa;
import com.skynet.skymed.repository.UsuarioRepository;

public class EmailService implements IEmailService<Pessoa> {

	@Override
	public void enviaEmail(String nomeUsuario, String emailUsuario, String senhaUsuario, String tokenUsuario)
			throws Exception {

		Mail mail = new Mail();

		Email from = new Email();
		from.setName("Skymed");
		from.setEmail("skymedsoluttions@gmail.com");
		mail.setFrom(from);

		String subject = "Olá, aqui está seu código de autenticação e sua senha";
		mail.setSubject(subject);

		Personalization personalization = new Personalization();

		Email to = new Email();
		to.setEmail(emailUsuario);
		to.setName(nomeUsuario);
		personalization.addTo(to);

		personalization.setSubject(subject);

		personalization.addDynamicTemplateData("Customer_Name", nomeUsuario);
		personalization.addDynamicTemplateData("Token", tokenUsuario);
		personalization.addDynamicTemplateData("Senha", senhaUsuario);
		System.out.print(senhaUsuario + " - " + tokenUsuario);

		mail.addPersonalization(personalization);

		Content content = new Content();
		content.setType("text/html");
		content.setValue("Something");
		mail.addContent(content);

		mail.setTemplateId("d-ebfcaa73faad4f30a56c4bcaf59ee4dd");

		SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));

		Request request = new Request();
		try {
			request.setMethod(Method.POST);
			request.setEndpoint("/mail/send");
			request.setBody(mail.build());
			Response response = sg.api(request);

		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

}
