const { MessageEmbed } = require("discord.js");
const db = require('quick.db')
const ms = require("ms");
const ayarlar = require('../ayarlar.json')
const moment = require('moment');
const prefix = Config.prefix;

module.exports.run = async (client, message, args) => {
//-------------------------------------------------------------------------------\\

if(![(ayarlar.registeryt)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.reply(`Bu işlemi sadece yetkililer yapabilir!!!`) 
  
const kayıtsız = (ayarlar.Unregister)

//-------------------------------------------------------------------------------\\



let kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!kullanici) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir kullanıcı etiketlemelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === message.author.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Kendini kayıtsıza atamazsın.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === client.user.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir bot Kayıtsıza atılamaz.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Sunucu sahibini Kayıtsıza atamazsın.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));

message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp().setDescription(`${kullanici}, <@${message.author.id}> tarafından başarıyla kayıtsıza atıldı.`)).then(x => x.delete({timeout: 5000}))
  
 
kullanici.roles.add(kayıtsız) 
kullanici.roles.cache.forEach(r => {
kullanici.roles.remove(r.id)})
kullanici.setNickname("Kayıtsız") 
moment.locale("tr");
message.react(ayarlar.onay);
   

  
}

exports.conf = {
    aliases: ['kayıtsız'],
    permLevel: 0
  };
  exports.help = {
    name: 'kayıtsız',
    açıklama:"",
    komut: "[kayıtsız]",
    help: "kayıtsız ",
    cooldown: 0
  };