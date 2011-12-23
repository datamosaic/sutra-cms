/**
 * MONGODB TESTING
 * 
 * This test method uses the default Java driver placed in the plugins directory.
 * Startup MongoDB first: ./mongod
 * 
 * My guess is that all MongoDB code will need to be run through headless client plugin in production.
 * This way Servoy Server is the client to MongoDB and handles all connection pooling. Need to verify.
 * 
 * Testing MongoDB as optional data storage for "web_block_data" table which is key/value pairs to begin
 * with and in a multi-tenant, multi-website environment could get quite large comparitive to other tables.
 * 
 * Logging and session tables are additional candidates.
 * 
 * Future: checkout mongodb-rhino. allows conversion to/from native JavaScript objects and MongoDB's BSON
 * 	(do away with get and put to build and retrieve BSON objects)
 * http://code.google.com/p/mongodb-rhino/
 * 
 * @author David Workman, Data Mosaic, November 2011
 * 
 * @properties={typeid:24,uuid:"BA231E32-D846-433D-BBF5-260D5590DD17"}
 */
function test() {

	// header
	importClass(Packages.com.mongodb.Mongo)
	importClass(Packages.com.mongodb.DB)
	importClass(Packages.com.mongodb.DBCollection)
	importClass(Packages.com.mongodb.BasicDBObject)
	importClass(Packages.com.mongodb.DBObject)
	importClass(Packages.com.mongodb.DBCursor)
	
	// connection
	var m = new Mongo()
	
	// get database and collection
	var db = m.getDB( "cms" ) 
	var coll = db.getCollection("block_data")
	
	// insert data	
	if ( !coll.findOne() ) {  // already inserted
		
		// complex document
		var doc = new BasicDBObject()
		doc.put("name", "MongoDB")
		doc.put("type", "database")
		doc.put("count", 1)
		var info = new BasicDBObject()
		info.put("x", 203)
		info.put("y", 102)
		doc.put("info", info)
	
		coll.insert(doc)
		
		// insert sample simple documents
		for (var i = 0; i < 100; i++) {
			coll.insert(new BasicDBObject().append("i", i));
		}
	}
	
	// count
	application.output(coll.getCount())  // = 101
	
	// first record
	var doc = coll.findOne()
	application.output(doc)
	application.output(doc.get("name"))
	
	// simple query
	var query = new BasicDBObject()
	query.put("i", 71)
	cur = coll.find(query)
	while(cur.hasNext()) {
		application.output(cur.next())
	}
	
	// set of documents
	var query = new BasicDBObject()
    query.put("i", new BasicDBObject("$gt", 95));  // e.g. find all where i > 95
	cur = coll.find(query)
	while(cur.hasNext()) {
		application.output(cur.next())
	}

}
