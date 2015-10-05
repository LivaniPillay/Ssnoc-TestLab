var Member = require('./models/models');

function getMembers(res){
	Member.find(function(err, members) {

			if (err) {
				return res.send(err)	
			}

			console.log(members);
			res.json(members); // return all todos in JSON format
		});
};

function getMember(id, res){
	Member.findOne({_id: id}, function(err, members) {

			if (err) {
				return res.send(err)	
			}

			res.json(members); 
			console.log(members);
		});
};

function addMember (req, res) {
	member = new Member({name: req.params.name, password: req.params.pass, status: 0});
	
	member.save(function (err, obj) {	  
		if (err) {
			return res.send(err);
		}

		res.json(member);
	});
}

function removeMember (id, res) {
	Member.remove({_id: id}, function(err, obj) {
        if (err) {
            res.send(err);
        }

        res.json({ message: 'Member '+ id + 'Successfully deleted' });
    });
}

function updateStatus (req, res) {

	res.json({ message: 'Status updated. Member ' + req.params.memeber_id + ' is ' + req.params.status_id });
};

module.exports = function(app) {

// API Calls
	app.get('/api/ssnoc/directory', function(req, res) {
		getMembers(res);
	});

	app.get('/api/ssnoc/member/:member_id', function(req, res) {
		var _id = req.params.memeber_id;
		getMember(_id, res);
	});

	app.get('/api/ssnoc/update_status/:memeber_id/:status_id', function(req, res) {
		updateStatus(req,res);
	});

	app.post('/api/ssnoc/member/:name/:pass', function(req, res) {

		addMember (req, res);
	});

	app.delete('/api/ssnoc/member/:member_id', function(req, res) {

		removeMember(req.params.memeber_id, res);

		//res.json({ message: 'member removed ' + req.params.memeber_id });
	});

	app.get('*', function(req, res) {
		res.sendFile('/public/index.html'); // load the single view file (angular will handle the page changes on the front-end
	});
};