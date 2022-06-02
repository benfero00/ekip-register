const { MessageEmbed } = require("discord.js");
const ayarlar = require('../ayarlar.json')
const { config } = require("process");

module.exports.run = (client, message, args) => {

if(![(ayarlar.registeryt)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(ayarlar.red)
    
let tag = ayarlar.tag;
const bsayi = message.guild.premiumSubscriptionCount 
const blevel = message.guild.premiumTier
const tagges = message.guild.members.cache.filter(m => m.user.username.includes(tag)).size
const toplam = message.guild.memberCount
const ses = message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b) 
let etikettag = message.guild.members.cache.filter(m => m.user.discriminator == ayarlar.etiket).size

const embed = new MessageEmbed()
.setColor('BLACK')
 .setDescription(`
 Sunucumuzda toplam \`${toplam}\` üye bulunmaktadır!
 Tagımızda toplam \`${tagges}\` kullanıcı bulunmaktadır!
 Etiket Tagımızda toplam \`${etikettag}\` kullanıcı bulunmaktadır!
 Ses kanallarında \`${ses}\` kişi mevcut!
 Sunucumuzda \`${bsayi}\` boost bulunuyor!
`).setFooter(ayarlar.footer).setTimestamp()
message.channel.send(embed)}

exports.conf = {
    aliases: ['say'],
    permLevel: 0
  };
  exports.help = {
    name: 'say',
    açıklama:"say",
    komut: "[say]",
    help: "say",
    cooldown: 0
  };