const { MessageEmbed } = require('discord.js')
const Database = require('quick.db')
const kdb = new Database.table("kayıtlar")
const ayarlar = require('../ayarlar.json')
const tdb = new Database.table("taglılar")

exports.run = async(client, message, args) => {

let embed = new MessageEmbed().setAuthor(message.author.tag,message.author.displayAvatarURL({ dynamic : true })).setColor("RANDOM").setFooter(ayarlar.footer)
    

if(!args[0]) {
    message.channel.send(embed.setDescription(`[Hata] Yalnış kullanım! ${ayarlar.prefix}taglı-alım aç/kapat`)).then(papaz => papaz.delete({ timeout : 10000 })).then(message.react(ayarlar.redemoj))
    return;    
    }

    
    if (args[0] == 'aç') {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embed.setDescription(`${message.author} bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!`)).then(papaz => papaz.delete({ timeout : 5000 })).then(message.react(ayarlar.red))

        let açıkmı =  tdb.fetch(`taglıalım.${message.guild.id}`)
        if(açıkmı === true) return message.channel.send(embed.setDescription(`Sunucu durumu zaten taglı alım durumunda!`)).then(papaz => papaz.delete({ timeout : 5000 })).then(message.react(ayarlar.red))
        await tdb.set(`taglıalım.${message.guild.id}`, true)
        message.channel.send(embed.setDescription(`Başarıyla taglı alım moduna geçildi.`)).then(papaz => papaz.delete({ timeout : 5000 })).then(message.react(ayarlar.oney))
     }

     if (args[0] == 'kapat') { 
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embed.setDescription(`${message.author} bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!`)).then(papaz => papaz.delete({ timeout : 5000 })).then(message.react(ayarlar.red))
        let kapalımı = tdb.fetch(`taglıalım.${message.guild.id}`)
        if(kapalımı === false) return message.channel.send(embed.setDescription(`Sunucu durumu zaten taglı alım durumuna kapalı!`)).then(papaz => papaz.delete({ timeout : 5000 })).then(message.react(ayarlar.red))
        await tdb.set(`taglıalım.${message.guild.id}`, false)
        message.channel.send(embed.setDescription(`Başarıyla taglı alım modundan çıkıldı.`)).then(papaz => papaz.delete({ timeout : 5000 })).then(message.react(ayarlar.oney))
    }



}
     exports.conf = {
        aliases: ['taglı-alım'],
        permLevel: 0
      };
      
      exports.help = {
        name: 'taglı-alım',
        açıklama:"",
        komut: "[taglı-alım]",
        help: "taglı-alım ",
        cooldown: 0
    
      };