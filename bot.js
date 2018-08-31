// Discord.js bot
const Discord = require('discord.js');
const client = new Discord.Client();
const servercount = 0;
client.on('ready', function () {
    client.user.setStatus('available');
    client.user.setActivity('servx help|0 servers invited', { type: 'PLAYING' });
});

client.on('message', function (msg) {
    if (!msg.content.startsWith(process.env.PREFIX) || !msg.guild) return;
    const command = msg.content.split(' ')[0].substr(process.env.PREFIX.length);
    const args = msg.content.split(' ').slice(1).join(' ');
    if (command === 'help') return richhelp(msg.channel);
    else if (command === 'invite') return msg.channel.send(process.env.INVITE);
    else if (command === 'central') return msg.channel.send('https://discord.gg/t4CwhKP');
    else if (command === 'bump') return servbump(msg.guild,msg.channel)
});

client.on('guildCreate', function (guild) {
     let defaultChannel = "";
     guild.channels.forEach(function(channel) {
       if(channel.type == "text" && defaultChannel == "") {
       if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
      defaultChannel = channel;
     }
  })
  defaultChannel.send("Hello, thanks for inviting me. if you dont have the channel **#servers** created, try creating a new one and this will help you to join other servers! :wave:");
  servercount = servercount + 1;
  client.user.setActivity(`servx help|${servercount} servers invited`, { type: 'PLAYING' });
  const invite = defaultChannel.createInvite({maxAge:0});
  sendallguilds('servers',`https://discord.gg/${invite.code}`,true,"Invited")
});

function sendallguilds(name,msg,rich,richtitle) {
  client.guilds.forEach(function (guild) {
      const channel = guild.channels.find("name",name)
      const notfound = false;
      if (!channel) notfound = true;
      if (!notfound) {
      if (rich) {
      richsend(channel,"ServerAppearX",richtitle,msg)
      } else {
      channel.send(msg)
      }
      }
  });
}
function richhelp(channel) {
    let embed = new Discord.RichEmbed()

      .setTimestamp()
      .setTitle(`Commands`)
      .addField(`Server`, `bump`)
      .addField(`Invite`, `invite,central`)
      .setColor("RANDOM")
      .setFooter("This Bot is created by the moar u no#8087")
     // lol that script
    channel.send(embed)
}
function richsend(channel,title,etitle,msg) {
    let embed = new Discord.RichEmbed()

      .setTimestamp()
      .setTitle(title)
      .addField(etitle, msg)
      .setColor("RANDOM")
      .setFooter("This Bot is created by the moar u no#8087")
     // lol that script
    channel.send(embed)
}
function servbump(guild,channelt) {
   let defaultChannel = "";
     guild.channels.forEach(function(channel) {
       if(channel.type == "text" && defaultChannel == "") {
       if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
      defaultChannel = channel;
     }
  }
  const invite = defaultChannel.createInvite({maxAge:0});
  sendallguilds('servers',`https://discord.gg/${invite.code}`,true,"Bumped")
  channelt.send('succesfully bumped server :ok_hand:')
}
client.login(process.env.TOKEN);
