package com.skynet.Skymed.interfaces;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public interface IDao {

	void insertObject(Object object)throws SQLException;

	ArrayList<Object> objectListing()throws SQLException;

	void deleteObject(int ObjectId) throws SQLException;

	Object objectMaping(ResultSet objectRs) throws SQLException;

}
