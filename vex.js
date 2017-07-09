const db = require('sqlite');

module.exports = {
	getTeam: (message, args) => new Promise((resolve, reject) => {
		const teamId = args ? args.split(' ')[0].toUpperCase() : message.member.nickname.split(' | ', 2)[1];
		if (/^([0-9]{1,5}[A-Z]?|[A-Z]{2,6}[0-9]{0,2})$/.test(teamId)) {
			return db.get(`SELECT * FROM teams WHERE number = ?`, teamId).then(team => {
				if (!team) {
					message.reply('That team ID has never been registered.');
				}
				resolve(team);
			}).catch(error => {
				console.log(`SELECT * FROM teams WHERE number = ${teamId}`);
				reject(Error(error));
			});
		} else {
			message.reply('Please provide a valid team ID.');
			resolve(undefined);
		}
	})
};
