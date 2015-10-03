var models = require('./models/models');

function getMembers(res){
	Member.find(function(err, members) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err) {
				return res.send(err)	
				//console.log('Error!');
			}

			console.log(members);
			res.json(members); // return all todos in JSON format
		});
};

function getMember(res){
	Member.findOne({name: 'admin'}, function(err, members) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err) {
				return res.send(err)	
				//console.log('Error!');
			}

			console.log(members);
			res.json(members); // return all todos in JSON format
		});
	console.log('getMember()');
};

function updateStatus(res){
	console.log('updateStatus()');
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all memebers
	app.get('/api/ssnoc/directory', function(req, res) {
		// Get all memebers in the database
		//getMembers(res);
		res.json({ message: 'all memebers' });
	});

	app.get('/api/ssnoc/member/:member_id', function(req, res) {
		// Get all memebers in the database
		var _id = req.params.memeber_id;
		//getMember(_id, res);
		res.json({ message: 'one member: ' + req.params.memeber_id});
	});

	app.get('/api/ssnoc/update_status/:memeber_id/:status_id', function(req, res) {
		// Get all memebers in the database
		// updateStatus();
		res.json({ message: 'status updated ' + req.params.memeber_id + ' ' + req.params.status_id });
	});

	// add a member and send back all memebers after creation
	app.post('/api/ssnoc/member', function(req, res) {

		// // add a member, information comes from AJAX request from Angular
		// Member.create({
		// 	text : req.body.text,
		// 	done : false
		// }, function(err, todo) {
		// 	if (err)
		// 		res.send(err);

		// 	// get and return all the members after you create another
		// 	getMember(res);
		// });
		res.json({ message: 'add member' });
	});

	// delete a member
	app.delete('/api/ssnoc/member/:member_id', function(req, res) {
		// Member.remove({
		// 	_id : req.params.members_id
		// }, function(err, todo) {
		// 	if (err)
		// 		res.send(err);

		// 	getMembers(res);
		// });
		res.json({ message: 'member removed ' + req.params.memeber_id });
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};