const CronJob = require('cron').CronJob;

var job = new CronJob(
	'* * * * * *',
	function() {
		console.log('You will see this message every second');
	},
	null,
	false,
	'America/Los_Angeles'
);

//module.exports = job;