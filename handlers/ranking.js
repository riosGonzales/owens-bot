const Punto = require('../models/Punto');

module.exports = async (message) => {
    const top = await Punto.find({ guildID: message.guild.id }).sort({ score: -1 }).limit(10);

    if (top.length === 0) {
        return message.reply('📉 There are no recorded scores yet in this server.');
    }

    const ranking = top.map((p, i) => `#${i + 1} ${p.username} — ${p.score} pt${p.score > 1 ? 's' : ''}`);

    message.channel.send({
        content: `📊 **General Betting Ranking:**\n${ranking.join('\n')}`
    });
};
