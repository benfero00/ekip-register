const { MessageEmbed, ReactionCollector } = require('discord.js')
const Database = require('quick.db')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')

exports.run = async(client, message, args) => {

let embed = new MessageEmbed().setAuthor(message.author.tag,message.author.displayAvatarURL({ dynamic : true })).setColor("RANDOM").setFooter(ayarlar.footer)
    
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!member) return message.channel.send(embed.setDescription(`${message.author} Lütfen bir kullanıcı belirtin @Kişi/İD gibi.`)).then(papaz => papaz.delete({timeout : 8000})).then(message.react(ayarlar.red))

if (member.user.bot) return message.channel.send(embed.setDescription(`${message.author} Botların isim geçmişi olmaz !`)).then(papaz => papaz.delete({timeout : 5000})).then(message.react(ayarlar.red))

let isimler = db.get(`isimler.${member.user.id}`);
if (!isimler) return message.channel.send(new MessageEmbed().setAuthor(message.author.tag,message.author.displayAvatarURL({dynamic:true})).setColor('RANDOM').setDescription(`Bu Kullanıcının Toplam "0" Kayıtlı İsmi Bulundu`)).then(papaz => papaz.delete({timeout:10000}))
let isimlersayı = `${db.fetch(`isimler.${member.id}`).length} `
let isimleri = `${isimler.map((data, i) => `**${i + 1}.** ${data}`).join("\n")}`

const papaz = new MessageEmbed()
    .setColor('BLUE')
    .setDescription(`
 ${member} Kişisi Toplamda ${isimlersayı} Sefer Kayıt Olmuş ${ayarlar.onay} 
 Kişinin Geçmiş İsimleri Aşağıda Listelendiği Gibidir
  
 ${isimleri}`)
    .setTimestamp()
message.channel.send(papaz)
}

    
exports.conf = {
    aliases: ['isimler'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'isimler',
    açıklama:"isimler",
    komut: "[isimler]",
    help: "isimler ",
    cooldown: 0

  };