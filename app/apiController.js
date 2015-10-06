var Member = require('./models/memberModel');
var Message = require('./models/messageModel');

function getMembers(res){
	Member.find(function(err, members) {

			if (err) {
				return res.send(err)	
			}

			console.log(members);
			res.json(members); // return all todos in JSON format
		});
};

function getMember(req, res){
	Member.findOne({name: req.params.name}, function(err, members) {

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

        res.json({ message: 'Member '+ id + ' successfully removed' });
    });
}

function updateStatus (req, res) {

	res.json({ message: 'Status updated: Member ' + req.params.memeber_id + ' status is ' + req.params.status_id });
};

module.exports = function(app) {

// API Calls
//Members
/**
 * @api {get} /api/ssnoc/directory List all members in the directory
 *
 * @apiName GetMembers
 *
 * @apiSuccess {String} JSON with members information.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{"name":"test","password":"1234","status":0,"_id":2,"__v":0}]
 */
	app.get('/api/ssnoc/directory', function(req, res) {
		getMembers(res);
	});

/**
 * @api {get} /api/ssnoc/member:name List member information
 *
 * @apiName GetMember
 *
 * @apiParam {String} user name
 *
 * @apiSuccess {String} JSON with member information.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{"name":"test","password":"1234","status":0,"_id":2,"__v":0}]
 */

	app.get('/api/ssnoc/member/:name', function(req, res) {
		getMember(req, res);
		console.log("name!!")
	});

/**
 * @api {post} /api/ssnoc/update_status/:memeber_id/:status_id Update member status
 *
 * @apiName UpdateStatus
 *
 * @apiParam {Number} user id
 *
 * @apiParam {Number} status id
 *
 * @apiSuccess {String} JSON with member information.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{"name":"test","password":"1234","status":0,"_id":2,"__v":0}]
 */

	app.post('/api/ssnoc/update_status/:memeber_id/:status_id', function(req, res) {
		updateStatus(req,res);
	});

/**
 * @api {post} /api/ssnoc/member/:name/:pass Add members to directory
 *
 * @apiName AddMember
 *
 * @apiSuccess {String} JSON with member information.
 *
 * @apiParam {String} user name
*
 * @apiParam {String} password
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{ message: 'Status updated: Member 3 status is 2 }]
 */

	app.post('/api/ssnoc/member/:name/:pass', function(req, res) {

		addMember (req, res);
	});

/**
 * @api {delete} /api/ssnoc/update_status/:memeber_id/:status_id Remove member from directory
 *
 * @apiName RemoveMember
 *
 * @apiSuccess {String} JSON with member information.
 *
 * @apiParam {Number} member_id
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{ message: 'Member Test successfully removed' }]
 */

	app.delete('/api/ssnoc/member/:member_id', function(req, res) {
		removeMember(req.params.memeber_id, res);
	});

//Chat
	app.post('/api/ssnoc/message/:user_id/:message', function(req, res) {
		addPublicMessage(req, res);
	});

	app.get('/api/ssnoc/messages', function(req, res) {
		getPublicMessages(res);
	});

//Files

	app.get('/chatting', function(req, res) {
		appRoot = __dirname + '/../public/ChatPublicly.html';
		res.sendfile(appRoot); // load the single view file (angular will handle the page changes on the front-end)
	});
	
	app.get('*', function(req, res) {
		appRoot = __dirname + '/../public/index.html';
		console.log(appRoot);
		res.sendfile(appRoot); // load the single view file (angular will handle the page changes on the front-end)
	});

};