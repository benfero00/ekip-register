const { MessageEmbed } = require('discord.js')
const ayarlar = require('../ayarlar.json')

exports.run =  async (client, message, args) => {

if(![(ayarlar.registeryt)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(ayarlar.red)
  
  const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.react(ayarlar.red)
if(member.id === message.author.id) return message.react(ayarlar.red)
if(member.id === client.user.id) return message.react(ayarlar.red)
if(member.id === message.guild.OwnerID) return message.react(ayarlar.red)
if (member.hasPermission(8)) return message.react(ayarlar.red)
if(member.roles.highest.position >= message.member.roles.highest.position) return message.react(ayarlar.red)
let kayıttabasagelecektag = ayarlar.kayıttabasagelecektag
let isim = args[1]
let yas = Number(args[2])
if(!isim) return message.channel.send(new MessageEmbed().setDescription(`Bir isim girmeyi unuttunuz. \`.i @Kişi/ID <İsim>\` `).setTimestamp().setFooter(ayarlar.footer))
member.setNickname(`${kayıttabasagelecektag} ${isim} ${sembol} ${yaş}`)
message.react(ayarlar.onay)}

exports.conf = {
  aliases: ['İsim'],
  permLevel: 0
};
exports.help = {
  name: 'İsim',
  açıklama:"İsim", 
  komut: "[İsim]",
  help: "İsim ",
  cooldown: 0
};