exports.index = function(req, res) {
	res.render('account', { user: req.user });
};
