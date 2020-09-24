package com.skynet.Skymed.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.sql.Connection;
import javax.sql.DataSource;
import java.sql.PreparedStatement;
import org.springframework.stereotype.Repository;

import com.skynet.Skymed.interfaces.IRepository;
import com.skynet.Skymed.model.Endereco;
import com.skynet.Skymed.model.Pessoa;
import org.springframework.beans.factory.annotation.Autowired;

@Repository
public class PessoaRepository implements IRepository<Pessoa> {

	@Autowired
	private DataSource pessoaSource;

	@Override
	public void objectInsert(Pessoa object) {

	}

	@Override
	public ArrayList<Pessoa> objectListing() throws SQLException {

		ArrayList<Pessoa> pessoas = new ArrayList<Pessoa>();
		try (Connection con = pessoaSource.getConnection()) {
			PreparedStatement pstmt = con.prepareStatement("select * from pessoa");
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {

				pessoas.add(objectMaping(rs));

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return pessoas;
	}

	@Override
	public void deleteObject(int ObjectId) throws SQLException {
		// TODO Auto-generated method stub
	}

	@Override
	public Pessoa objectMaping(ResultSet objectRs) throws SQLException {

		Pessoa pessoaObject = new Pessoa();

		pessoaObject.setEmail(objectRs.getString("pes_email"));
		pessoaObject.setId(objectRs.getLong("pes_iden"));
		pessoaObject.setNome(objectRs.getString("pes_nome"));
		pessoaObject.setRg(objectRs.getString("pes_rg"));
		pessoaObject.setTelefone(objectRs.getString("pes_telefone"));
		pessoaObject.setEhPaciente(objectRs.getBoolean("pes_eh_paciente"));
		pessoaObject.setCpf_cnpj(objectRs.getString("pes_cpf_cnpj"));
		pessoaObject.setSenha(objectRs.getString("pes_senha"));

		return pessoaObject;
	}
}
