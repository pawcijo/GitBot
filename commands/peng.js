const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('peng')
		.setDescription('Replies with Peng!')
};