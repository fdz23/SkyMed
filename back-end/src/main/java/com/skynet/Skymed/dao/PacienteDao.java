package com.skynet.Skymed.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.sql.Connection;
import javax.sql.DataSource;
import java.sql.PreparedStatement;
import org.springframework.stereotype.Repository;

import com.skynet.Skymed.interfaces.IDao;
import com.skynet.Skymed.model.Pessoa;
import org.springframework.beans.factory.annotation.Autowired;

@Repository
public class PacienteDao implements IDao {

	@Autowired
	private DataSource pacienteSource;

	@Override
	public void insertObject(Object object) {

	}

	@Override
	public ArrayList<Object> objectListing() throws SQLException {

		ArrayList<Object> pacientes = new ArrayList<Object>();
		try (Connection con = pacienteSource.getConnection()) {
			PreparedStatement pstmt = con.prepareStatement("select * from paciente");
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {

				pacientes.add(objectMaping(rs));
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return pacientes;
	}

	@Override
	public void deleteObject(int ObjectId) throws SQLException {
		// TODO Auto-generated method stub
	}

	@Override
	public Object objectMaping(ResultSet objectRs) throws SQLException {

		 Pessoa pacienteObject = new Pessoa();
		 
		pacienteObject.setPes_email(objectRs.getString("pes_email"));
		pacienteObject.setPes_id(objectRs.getInt("pes_id"));
		pacienteObject.setPes_nome(objectRs.getString("pes_nome"));
		pacienteObject.setPes_rg(objectRs.getString("pes_rg"));
		pacienteObject.setPes_telefone(objectRs.getString("pes_telefone"));
		pacienteObject.setPes_tipo_cliente(objectRs.getBoolean("pes_tipo_cliente"));
		 
		 

		return pacienteObject;
	}
}
