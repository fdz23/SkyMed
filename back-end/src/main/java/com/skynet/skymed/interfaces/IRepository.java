package com.skynet.skymed.interfaces;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public interface IRepository<T> {

	void objectInsert(T object) throws SQLException;

	ArrayList<T> objectListing() throws SQLException;

	void deleteObject(int ObjectId) throws SQLException;

	T objectMaping(ResultSet objectRs) throws SQLException;

}
