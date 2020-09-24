package com.skynet.Skymed.interfaces;

import java.sql.SQLException;
import java.util.ArrayList;

public interface IController<T> {

	ArrayList<T> getObject() throws SQLException;

	void postAndPutObject(T object) throws SQLException;

	void deleteObject(Integer id) throws SQLException;

	T getById(Integer id) throws SQLException;

}
 