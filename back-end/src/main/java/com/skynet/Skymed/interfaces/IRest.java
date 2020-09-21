package com.skynet.Skymed.interfaces;

import java.util.ArrayList;

public interface IRest {

	ArrayList<Object> getObject();

	void postAndPutObject(Object object);

	void deleteObject(Integer id);

	Object getObjectId(Integer id);

}
