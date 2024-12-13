import { TextScramble } from "./TextScramble.js";
const ayetMealResimler = [
  "1_Raad_28.png",
  "2_Hadid_4.png",
  "3_AliImran_104.png",
  "4_Araf_31.png",
  "5_Zilzal_7-8.png",
  "6_Hud_88.png",
  "7_Hujurat_11.png",
  "8_Baqara_148.png",
  "9_Ibrahim_7.png",
  "10_Ankabut_45.png",
  "11_Fatir_28.png",
  "12_AliImran_92.png",
  "13_Asr_1-3.png",
  "14_Muhammad_7.png",
  "15_Insan_7.png",
  "16_Hud_90.png",
  "17_Sad_29.png",
  "18_Nahl_78.png",
  "19_Kehf_107-108.png",
  "20_Baqara_153.png",
  "21_Baqara_10.png",
  "22_Kehf_23-24.png",
  "23_Isra_23.png",
  "24_Enfal_46.png",
  "25_Isra_36.png",
  "26_Beled_17.png",
  "27_Isra_18.png",
  "28_28_Tegâbun_9.png",
  "29_Araf_44.png",
  "30_Maun_4-7.png",
];

const turkce_mealler = [
  "İyi bilin ki kalpler ancak Allah’ı anmakla huzur bulur.",
  "Nerede bulunursanız bulunun, O daima sizinle beraberdir. Allah bütün yaptıklarınızı görür.",
  "Sizden, hayra çağıran, iyiliği emreden ve kötülüğe engel olan bir topluluk bulunsun. İşte kurtuluşa erenler onlardır.",
  "Yiyin, için fakat israf etmeyin. Çünkü Allah israf edenleri sevmez.",
  "Kim zerre miktarı hayır yapmışsa onu görür. Kim de zerre miktarı şer işlemişse onu görür.",
  "Başarılı olmam sadece Allah’ın yardımı ile olur. Onun için ben de yalnız O’na dayanıyorum, O’na yöneliyorum.",
  "Ey iman edenler! Sizden hiçbir topluluk bir başka toplulukla alay etmesin. Ne malum? Belki alay edilenler edenlerden daha hayırlıdır. Birbirinizi karalamayın, birbirinize kötü lakaplar takmayın.",
  "Hayırlı işlerde birbirinizle yarışın.",
  "Eğer şükrederseniz, Ben nimetlerimi daha da artırırım, ama nankörlük ederseniz haberiniz olsun ki azabım pek şiddetlidir!",
  "Muhakkak ki namaz, insanı, ahlâk dışı davranışlardan, meşrû olmayan işlerden uzak tutar.",
  "Allah’tan, kulları içinde ancak ilim sahibi olanlar korkar.",
  "Sevdiğiniz şeylerden Allah yolunda harcamadıkça iyiliğe eremezsiniz. Harcadığınız her şeyi Allah hakkıyla bilir.",
  "Andolsun zamana ki insan gerçekten ziyan içindedir. Ancak iman edip dünya ve âhiret için iyi ve yararlı işler yapanlar, birbirlerine hakkı tavsiye edenler ve sabrı tavsiye edenler başkadır.",
  "Ey iman edenler! Eğer siz Allah’a yardım ederseniz (emrini tutar, dinini uygularsanız), O da size yardım eder ve ayaklarınızı sağlam bastırır.",
  "O has kullar, verdikleri sözleri ve üzerlerine aldıkları sorumlulukları yerine getirirler; felâketi bütün ufukları saracak bir günden korkarlar.",
  "Rabbinizden bağışlanma dileyin, sonra da O’na tövbe edin. Şüphesiz Rabbim, engin merhamet sahibidir ve mü’minleri çok sevmektedir.",
  "Bu Kur’an, âyetlerini düşünsünler ve akıl sahipleri öğüt alsınlar diye sana indirdiğimiz mübarek bir kitaptır.",
  "Allah sizi annelerinizin karnından çıkardığı zaman hiçbir şey bilmiyordunuz. Şükredesiniz diye size kulaklar, gözler ve gönüller verdi.",
  "Şüphesiz, inanıp yararlı işler yapanlara, onlar için, içlerinde ebedi kalacakları Firdevs cennetleri bir konaktır.",
  "Ey iman edenler! Sabır göstererek ve namazı vesile kılarak Allah'tan yardım dileyin. Muhakkak ki Allah sabredenlerle beraberdir.",
  "Kalplerinde bir hastalık vardır. Allah da onların hastalığını arttırmıştır. Yalan söylediklerinden dolayı onları elem verici bir azap beklemektedir.",
  "Yapmaya niyet ettiğin herhangi bir hususta da “Yarın şunu yapacağım.” deme. “İnşâallah (Allah dilerse, izin verirse) yapacağım” de.",
  "Rabbin kesin olarak şunları emretti: Kendisinden başkasına ibadet etmeyin, ana-babaya da iyi davranın. Onlardan biri veya her ikisi senin yanında yaşlanırsa sakın onlara ‘öf’ bile deme; onları azarlama, onlara tatlı ve güzel söz söyle.",
  "Allah ve resulüne itaat edin, birbirinize düşmeyin, sonra zayıflarsınız ve zaferi elden kaçırırsınız. Sabredin, kuşkusuz Allah sabredenlerle beraberdir.",
  "Hakkında kesin bilgi sahibi olmadığın şeye dayanıp karar verme. Çünkü kulak, göz ve kalb, evet bunların hepsi (verdiğin karar, vardığın sonuçtan) sorumludur ve sorguya çekilecektir.",
  "Bir de, elbette iman etmiş olmak ve karşılıklı sabır teşvik ve tavsiyesinde bulunmak, merhamet teşvik ve tavsiyesinde bulunmaktır.",
  "Kim şu peşin dünya zevkini isterse, Biz de dilediğimiz kimse hakkında ve dilediğimiz miktarda, o dünya zevkini ona veririz. Ama sonra ona cehennemi mekân kılarız, O da yerilmiş ve kovulmuş olarak oraya atılır.",
  "Kim Allah'a iman eder, makbul ve güzel işler yaparsa, Allah onun fenalıklarını, günahlarını siler ve içinden ırmaklar akan cennetlere, hem de devamlı kalmak üzere yerleştirir. İşte en büyük başarı, en büyük mutluluk budur.",
  "Cennetlikler cehennemliklere: “Biz, Rabbimizin bize vâd ettiği şeylerin gerçek olduğunu gördük; siz de Rabbinizin size vâd ettiklerinin gerçekleştiğini gördünüz mü?” deyince onlar: “Evet” diye cevap verirler.",
  "Vay haline şöyle namaz kılanların: Onlar namazlarının özünden uzaktırlar. İbadetlerini gösteriş için yaparlar, zekât ve diğer yardımlarını esirger, vermezler.",
];
const almanca_mealler = [
  "Seid euch dessen bewusst, dass es im Gedenken an Ihn und in der vollkommenen Hingabe an Gott ist, dass die Herzen Ruhe und Zufriedenheit finden.",
  "Er ist bei euch, wo immer ihr sein mögt. Und Gott sieht wohl, was immer ihr tut.",
  "Es soll unter euch eine Gemeinschaft sein, die zum Guten aufruft und das Rechte gebietet und tatkräftig fördert und Unrecht verwehrt und sich bemüht, Übles zu verhindern. Sie sind es, die erfolgreich sein werden.",
  "Esst und trinkt, doch seid nicht verschwenderisch, denn Er liebt wahrlich nicht die Verschwenderischen.",
  "Wer nun im Gewicht eines Stäubchens Gutes tut, wird es sehen. Und wer im Gewicht eines Stäubchens Böses tut, wird es sehen.",
  "Mein Erfolg bei meiner Aufgabe hängt allein von Gott ab. In Ihn habe ich mein Vertrauen gesetzt, und Ihm wende ich mich wir stets von ganzem Herzen zu.",
  "O ihr, die ihr glaubt! Lasst nicht die einen unter euch über die anderen spotten; es mag durchaus sein, dass die Letzteren besser sind als die Ersteren; ... Und verleumdet euch nicht gegenseitig, und verletzt einander nicht durch Schimpfnamen.",
  "So wetteifert miteinander in allem, was gut ist.",
  "Wenn ihr dankbar seid, werde Ich euch fürwahr mehr geben; seid ihr jedoch undankbar, dann wird Meine Strafe gewiss streng sein.",
  "Trage vor und überbringe ihnen, was dir vom Buch offenbart wird, und verrichte das Gebet entsprechend seinen Vorschriften. Wahrlich, das Gebet hält ab von allem, was abscheulich und verwerflich ist, und von allem, was schlecht ist. Wahrlich, Gottes zu gedenken, ist am hervorragendsten. Gott weiß um alles, was ihr tut.",
  "Von all Seinen Dienern empfinden nur diejenigen, die echtes Wissen besitzen, Ehrfurcht vor Gott.",
  "Niemals werdet ihr Güte und Tugend erlangen, ehe ihr nicht von dem hingebt, was euch lieb ist, für die Sache Gottes oder um die Bedürftigen zu versorgen. Und was immer ihr hingebt, wahrlich Gott weiß es wohl.",
  "Bei der Zeit, Wahrlich, der Mensch befindet sich in einem Zustand des Verlustes; Außer denen, die glauben und gut, rechtschaffen handeln und sich gegenseitig zur Wahrheit aufrufen und sich gegenseitig zu standhafter Geduld aufrufen.",
  "O ihr, die ihr glaubt! Wenn ihr Gottes Sache unterstützt, dann wird Er euch helfen und eure Füße festen Halt finden lassen.",
  "Das sind diejenigen, die ihre Versprechen und die Pflichten, die sie übernehmen, erfüllen und die einen Tag fürchten, dessen Übel sich weithin ausbreitet und alles erfasst.",
  "Fleht euren Herrn an, dass Er euch vergeben möge, und wendet euch Ihm in Reue zu. Wahrlich, mein Herr ist barmherzig, liebevoll.",
  "Dies ist ein Buch, das Wir dir herabgesandt haben, voll des Segens, damit sie über seine Zeichen nachsinnen mögen und damit die Menschen, die einsichtig sind, darüber nachdenken und sich in Acht nehmen mögen.",
  "Gott hat euch aus den Schößen eurer Mütter hervorgebracht, als ihr von nichts wusstet, und hat euch Gehör und Augen mitgegeben, und Herzen, damit ihr euren Dank abstatten möget.",
  "Wahrlich, diejenigen, die glauben und gut, rechtschaffen handeln, die sollen in den Gärten der höchsten Ebene des Paradieses willkommen geheißen werden. Dort werden sie verweilen, ohne irgendeine Änderung zu begehren.",
  "O ihr, die ihr glaubt! Sucht Hilfe in Geduld (Standfestigkeit) und im Gebet; wahrlich, Gott ist mit den Geduldigen (Standhaften).",
  "In ihren Herzen ist eine Krankheit und (wegen ihres moralischen Verfalls und der Schliche, die sie aus Neid und in böser Absicht anwenden) hat Gott ihre Krankheit größer werden lassen. Ihnen wird eine schmerzliche Strafe zuteil werden, weil sie zu lügen pflegen.",
  "Und sage nicht über etwas (das du vorhast): „Ich werde es morgen tun“. Ohne hinzuzufügen: „So Gott will.“",
  "Dein Herr hat entschieden, dass ihr niemanden außer Ihm allein anbeten sollt und dass ihr die Eltern in schönster Freundlichkeit behandeln sollt. Wenn ein (Elternteil) oder beide zu deinen Lebzeiten ein hohes Alter erreichen, dann sage nicht: „Pfui“ zu ihnen, und weise sie auch nicht ab, sondern richte stets liebenswürdige Worte an sie.",
  "Und gehorcht Gott und Seinem Gesandten, und streitet nicht miteinander, damit ihr nicht den Mut verliert und eure Kraft und Ausdauer euch verlässt, und bleibt geduldig; wahrlich, Gott ist mit den Geduldigen.",
  "Und folge nicht dem, wovon du kein Wissen hast, und enthalte dich grundloser Behauptungen und Vermutungen. Wahrlich, Gehör, Sehvermögen und Herz sie alle werden dereinst darüber befragt werden.",
  "Und dass man davon abgesehen zu jenen gehört, die glauben und einander zu Geduld aufrufen und sich gegenseitig zu Mitgefühl und Erbarmen anspornen.",
  "Wer immer sich nur die unmittelbaren Vorteile wünscht, so gewähren Wir davon so viel Wir möchten, wem immer Wir wollen. Danach schicken Wir ihn in die Hölle, wo er brennen wird, in Schande gestürzt und verstoßen.",
  "Wer auch immer an Gott glaubt und gut, rechtschaffen handelt, deren böse Taten wird Er für sie auslöschen und sie eintreten lassen in Gärten, durch die Ströme fließen, in denen sie für immer verweilen werden. Das ist die höchste Glückseligkeit.",
  "Die Bewohner des Paradieses werden den Bewohnern des Feuers zurufen: „Jetzt haben wir tatsächlich gefunden, dass das, was unser Herr uns versprochen hat, wahr ist. Habt (auch) ihr gefunden, dass das, was euer Herr euch versprochen hat, wahr ist?“ Sie werden sagen: „Ja!“",
  "Wehe also jenen Betenden, die nachlässig sind in ihren Gebeten, die von anderen dabei gesehen und wahrgenommen werden wollen, und doch jegliche Hilfeleistung verweigern.",
];

const arapcaAyetler = [
  "ا أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
  "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ ۖ وَاللّٰهُ بِمَا تَعْمَلُونَ بَصِيرٌ",
  "وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ ۚ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ",
  "كُلُوا وَاشْرَبُوا وَلَا تُسْرِفُوا ۚ إِنَّهُ لَا يُحِبُّ الْمُسْرِفِينَ",
  "فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُۥ (7) وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُۥ (8)",
  "وَمَا تَوْفِيقِي إِلَّا بِاللّٰهِ ۚ عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ",
  "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا يَسْخَرْ قَوْمٌ مِّن قَوْمٍ عَسَىٰ أَن يَكُونُوا خَيْرًا مِّنْهُمْ وَلَا نِسَاءٌ مِّن نِسَاءٍ عَسَىٰ أَن يَكُنَّ خَيْرًا مِّنْهُنَّ وَلَا تَلْمِزُوا أَنفُسَكُمْ وَلَا تَنَابَزُوا بِالْأَلْقَابِ ۖ  ",
  "فَاسْتَبِقُوا الْخَيْرَاتِ إ",
  "وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ وَلَئِن كَفَرْتُمْ إِنَّ عَذَابِي لَشَدِيدٌ",
  "اتْلُ مَا أُوحِيَ إِلَيْكَ مِنَ الْكِتَابِ وَأَقِمِ الصَّلَاةَ ۖ إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ ۗ وَلَذِكْرُ اللَّهِ أَكْبَرُ ۗ وَاللَّهُ يَعْلَمُ مَا تَصْنَعُونَ",
  "إِنَّمَا يَخْشَى اللَّهَ مِنْ عِبَادِهِ الْعُلَمَاءُ ۗ إ",
  "لَن تَنَالُوا الْبِرَّ حَتَّىٰ تُنفِقُوا مِمَّا تُحِبُّونَ ۚ وَمَا تُنفِقُوا مِن شَيْءٍ فَإِنَّ اللَّهَ بِهِ عَلِيمٌ",
  "وَالْعَصْرِ ۝ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ ۝ إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
  "يَا أَيُّهَا الَّذِينَ آمَنُوا إِن تَنصُرُوا اللَّهَ يَنصُرْكُمْ وَيُثَبِّتْ أَقْدَامَكُمْ",
  "يُوفُونَ بِالنَّذْرِ وَيَخَافُونَ يَوْمًا كَانَ شَرُّهُ مُسْتَطِيرًا",
  "وَاسْتَغْفِرُوا رَبَّكُمْ ثُمَّ تُوبُوا إِلَيْهِ ۚ إِنَّ رَبِّي رَحِيمٌ وَدُودٌ",
  "كِتَابٌ أَنزَلْنَاهُ إِلَيْكَ مُبَارَكٌ لِّيَدَّبَّرُوا آيَاتِهِ وَلِيَتَذَكَّرَ أُولُوا الْأَلْبَابِ",
  "وَاللَّهُ أَخْرَجَكُم مِّن بُطُونِ أُمَّهَاتِكُمْ لَا تَعْلَمُونَ شَيْئًا ۖ وَجَعَلَ لَكُمُ السَّمْعَ وَالْأَبْصَار�� وَالْأَفْئِدَةَ لَعَلَّكُمْ تَشْكُرُونَ",
  "إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ كَانَتْ لَهُمْ جَنَّاتُ الْفِرْدَوْسِ نُزُلًا (107) خَالِدِينَ فِيهَا لَا يَبْغُونَ عَنْهَا حِوَلًا (108)",
  "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
  "فِي قُلُوبِهِم مَّرَضٌ فَزَادَهُمُ اللَّهُ مَرَضًا ۖ وَلَهُمْ عَذَابٌ أَلِيمٌ بِمَا كَانُوا يَكْذِبُونَ",
  "وَلَا تَقُولَنَّ لِشَيْءٍ إِنِّي فَاعِلٌ ذَٰلِكَ غَدًا ۝ إِلَّا أَن يَشَاءَ اللَّهُ",
  "وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا ۚ إِمَّا يَبْلُغَنَّ عِندَكَ الْكِبَرَ أَحَدُهُمَا أَوْ كِلَاه��مَا فَلَا تَقُل لَّهُمَا أُفٍّ وَلَا تَنْهَرْهُمَا وَقُل لَّهُمَا قَوْلًا كَرِيمًا",
  "وَأَطِيعُوا اللَّهَ وَرَسُولَهُۥ وَلَا تَنَازَعُوا فَتَفْشَلُوا وَتَذْهَبَ رِيحُكُمْ ۖ وَاصْبِرُوا ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
  "وَلَا تَقْفُ مَا لَيْسَ لَكَ بِهِۦ عِلْمٌ ۚ إِنَّ السَّمْعَ وَالْبَصَرَ وَالْفُؤَادَ كُلُّ أُولَٰئِكَ كَانَ عَنْهُ مَسْئُولًا",
  "ثُمَّ كَانَ مِنَ الَّذِينَ آمَنُوا وَتَوَاصَوْا بِالصَّبْرِ وَتَوَاصَوْا بِالْمَرْحَمَةِ",
  "مَّن كَانَ يُرِيدُ الْعَاجِلَةَ عَجَّلْنَا لَهُۥ فِيهَا مَا نَشَاءُ لِمَن نُّرِيدُ ثُمَّ جَعَلْنَا لَهُۥ جَهَنَّمَ يَصْلَاهَا مَذْمُومًا مَّدْحُورًا",
  "وَمَن يُؤْمِن بِاللَّهِ وَيَعْمَلْ صَالِحًا يُكَفِّرْ عَنْهُ سَيِّئَاتِهِۦ وَيُدْخِلْهُ جَنَّاتٍ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ خَالِدِينَ فِيهَا أَبَدًا ۚ ذَٰلِكَ الْفَوْزُ الْعَظِيمُ",
  "وَنَادَىٰ أَصْحَابُ الْجَنَّةِ أَصْحَابَ النَّارِ أَن قَدْ وَجَدْنَا مَا وَعَدَنَا رَبُّنَا حَقًّا فَهَلْ وَجَدتُّم مَّا وَعَدَ رَبُّكُمْ حَقًّا ۖ قَالُوا نَعَمْ",
  "فَوَيْلٌ لِّلْمُصَلِّينَ (4) الَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ (5) الَّذِينَ هُمْ يُرَاءُونَ (6) وَيَمْنَعُونَ الْمَاعُونَ (7)",
];

const ayet_okunuslari = [
  "Elâ bi zikrillâhi tatma'innul kulûb.",
  "Ve huve me'akum eyne mâ kuntum. Vallâhu bimâ ta'melûne basîr.",
  "Ve'l tekun minkum ummetun yed'une ilel hayr ve ye'murûne bilma'rûfi ve yenhevne anil munker. Ve ulâike humul muflihûn.",
  "Ve kulû veşrebû velâ tusrifû. İnnehu lâ yuhibbul musrifîn.",
  "Fe men ya'mel mithkâle zerratin hayren yereh. Ve men ya'mel mithkâle zerratin şerren yereh.",
  "Ve mâ tevfîkî illâ billâh. Aleyhi tevekkeltu ve ileyhi unîb.",
  "Yâ eyyuhe'llezîne âmenû lâ yeshar kavmun min kavm. Asâ en yekûnû hayren minhum ve lâ nisâun min nisâin asâ en yekunne hayren minhunne ve lâ telmizû enfusekum ve lâ tenâbezû bil elkâb.",
  "Feste bigû'l hayrât.",
  "Ve iz te'ezzen rabbukum le'in şekartum le'ezîdennekum ve le'in kefertum inne azâbî leşedîd.",
  "Utlu mâ ûhıye ileyke minel kitâbi ve ekımıssalâte, inne salâte tenha anil fahşâ'i vel munker. Ve le zikrullâhi ekber, vallâhu ya'lemu mâ tasneûn.",
  "İnnemâ yahşellâhe min ibâdihil ulemâ.",
  "Len tenâlûl birre hattâ tunfikû mimmâ tuhıbbûn, ve mâ tunfikû min şey'in feinnallâhe bihî alîm.",
  "Vel asr. İnnel insâne le fî husr. İllellezîne âmenû ve amilussâlihâti ve tevâsav bil hakkı ve tevâsav bis sabr.",
  "Yâ eyyuhellezîne âmenû in tansurûllâhe yansurkum ve yusebbid akdâmekum.",
  "Yûfûne bin nezeri ve yehâfûne yevmen kâne şerruhu mustatîrâ.",
  "Vestâğfirû rabbekum summe tûbû ileyh, inne rabbî rahîmun vedûd.",
  "Kitâbun enzelnâhu ileyke mubârekun li yeddeberû âyâtihî ve li yetezekkere ulûl elbâb.",
  "Vallâhu ahraçekum min butûni ummehâtikum lâ ta'lemûne şey'en ve ceale lekumus sem'a vel ebsâra vel ef'ideh leallekum teşkurûn.",
  "İnnellezîne âmenû ve amilussâlihâti kânet lehum cennâtul firdevsi nuzulâ (107) hâlidîne fîhâ lâ yebğûne anhâ hivâlâ (108).",
  "Yâ eyyuhellezîne âmenûstaînû bissabri ve salât, innallâhe meas sâbirîn.",
  "Fî kulûbihim maradun fezâdehumullâhu maradâ, ve lehum azâbun elîm bime kânû yekzibûn.",
  "Ve lâ tekûl enne li şey'in innî fâilun zâlike ğadâ illâ en yeşâellâh.",
  "Ve kadâ rabbuke ellâ ta'budû illâ iyyâhu ve bilvâlideyni ihsânâ. İmme yebluganne indekel kiber ehaduhumâ ev kilâhumâ felâ tekul lehuma uffin ve lâ tenherhumâ ve kul lehuma kavlen kerîmâ.",
  "Ve etîullâhe ve rasûlehu ve lâ tenâzeû fetefşelû ve tezhebe rîhukum vasbirû, innallâhe meas sâbirîn.",
  "Ve lâ takfu mâ leyse leke bihî ilm. İnness sem'a vel basara vel fuâde kullu ulâike kâne anhû mes'ûlâ.",
  "Summe kâne minellezîne âmenû ve tevâsav bissabr ve tevâsav bil merhamah.",
  "Men kâne yurîdül âcilete accelnâ lehû fîhâ mâ neşâu limen nurîd, summe cealnâ lehu cehenneme yaslâhâ mezmûmen medhûrâ.",
  "Ve men yu'min billâhi ve ya'mel sâlihan yukaffir anhu seyyiâtihî ve yudhılhu cennâtin tecrî min tahtihel enhâru hâlidîne fîhâ ebedâ, zâlike fevzul azîm.",
  "Ve nâdâ ashâbul cenneti ashâben nâri en kad vecednâ mâ vaadenâ rabbunâ hakkâ, fehel vecedtum mâ vaade rabbukum hakkâ? Kâlû neam.",
  "Feveylul lilmusallîn (4) ellezîne hum an salâtihim sâhûn (5) ellezîne hum yurâûne (6) ve yemneûn el mâûn (7).",
];

const ayetler_mp3 = [
  "1_Raad_28.mp3",
  "2_Hadid_4.mp3",
  "3_AliImran_104.mp3",
  "4_Araf_31.mp3",
  "5_Zilzal_7-8.mp3",
  "6_Hud_88.mp3",
  "7_Hujurat_11.mp3",
  "8_Baqara_148.mp3",
  "9_Ibrahim_7.mp3",
  "10_Ankabut_45.mp3",
  "11_Fatir_28.mp3",
  "12_AliImran_92.mp3",
  "13_Asr_1-3.mp3",
  "14_Muhammad_7.mp3",
  "15_Insan_7.mp3",
  "16_Hud_90.mp3",
  "17_Sad_29.mp3",
  "18_Nahl_78.mp3",
  "19_Kehf_107_108.mp3",
  "20_Baqara_153.mp3",
  "21_Baqara_10.mp3",
  "22_Kehf_23-24.mp3",
  "23_Isra_23.mp3",
  "24_Enfal_46.mp3",
  "25_Isra_36.mp3",
  "26_Beled_17.mp3",
  "27_Isra_18.mp3",
  "28_Tegâbun_9.mp3",
  "29_Araf_44.mp3",
  "30_Maun_4-7.mp3",
];

const baslik_container = document.querySelector(".ayet_adi");
const ayet_container = document.querySelector(".ayet_container");
const meal_container = document.querySelector("#meal");
const arabic_okunus_contaniner = document.querySelector(
  ".ayet_okunusu_container"
);
const audio_element = document.querySelector(".audio");
const next_Button = document.querySelector("#next-ayet");
const prev_Button = document.querySelector("#prev-ayet");
const ayetJumpInput = document.querySelector("#ayet-no");
const ayetJumpSelect = document.querySelector("#ayetNum");
const ayetTekrar_checkbox = document.querySelector("#ayetTekrar");
const auto_play = document.querySelector("#auto-play");
const meal_bekleme_suresi_input = document.querySelector(
  "#mealBeklemeKatsayisi"
);
const meal_kalan_sure = document.querySelector("#kalan_sure");
const plabackRateInput = document.getElementById("playbackRate");
const plabackRateSpan = document.getElementById("playbackRateValue");

// NESNE olusturma
const fx = new TextScramble(
  baslik_container,
  meal_container,
  ayet_container,
  arabic_okunus_contaniner,
  audio_element
);

// Degiskenler
let counter = 15;
let mealler = turkce_mealler;
let endedListener;
let mealBeklemeKatsayisi = 45;
let beklemeSuresi;
let mealPlayRate = 1.0;
// ANA Fonksiyon, Metin Animasyon ve Ayet Seslendirme
const next = () => {
  // Ayet sayici ve oynatma hizi belirleme
  ayetJumpInput.value = counter + 1;
  ayetJumpSelect.value = counter + 1;
  determinePlaybackRate();
  determineMealBeklemeSuresi();

  // Meal Animasyon
  fx.setText(
    ayetMealResimler[counter],
    mealler[counter],
    arapcaAyetler[counter],
    ayet_okunuslari[counter],
    ayetler_mp3[counter],
    counter
  ).then(() => {
    if (audio_element.ended) audio_element.play();

    // Daha once tanimlanmis dinleyiciyi kaldiriyoruz
    if (endedListener) {
      audio_element.removeEventListener("ended", endedListener);
    }

    // Yeni dinleyici olustur ve referansi sakla

    endedListener = () => {
      if (ayetTekrar_checkbox.checked) {
        console.log("next if checkbox: " + ayetTekrar_checkbox.checked);
        playAyet();
      } else if (!auto_play.checked) {
      } else {
        counter = (counter + 1) % mealler.length;
        setTimeout(() => {
          next();
        }, beklemeSuresi);
      }
    };

    // Yeni dinleyiciyi tanimla
    audio_element.addEventListener("ended", endedListener, { once: true });
  });
};

// Ayet oynatma hizinin ayarlanmasi ve guncellenmesi
plabackRateInput.addEventListener("change", (event) => {
  mealPlayRate = event.target.value;
  console.log('mealPlayRate :>> ', mealPlayRate);
  plabackRateSpan.innerHTML = mealPlayRate;
  audio_element.playbackRate = mealPlayRate; // Set playback rate
});

function determinePlaybackRate() {
  audio_element.src = `./ses 30 Ayet/${ayetler_mp3[counter]}`;
  audio_element.playbackRate = mealPlayRate; // Set playback rate
}

function playAyet() {
  if (ayetTekrar_checkbox.checked) {
    console.log("playAyet if checkbox: " + ayetTekrar_checkbox.checked);

    audio_element.play(); // play the audio
    audio_element.addEventListener("ended", playAyet, { once: true });
  } else {
    console.log("playAyet if checkbox: " + ayetTekrar_checkbox.checked);
    counter = (counter + 1) % mealler.length;
    next();
  }
}

next_Button.addEventListener("click", () => {
  counter = (counter + 1) % mealler.length;
  next();
  determineMealBeklemeSuresi();
});

prev_Button.addEventListener("click", () => {
  counter = (counter - 1) % mealler.length;
  next();
  determineMealBeklemeSuresi();
});

// Ayet atlatma Girisi

const jumpAyah = (e) => {
  counter = (parseInt(e.target.value) - 1) % mealler.length;
  // ayetJumpSelect.value = e.target.value;
  ayetJumpInput.blur();
  next();
}
ayetJumpInput.addEventListener("change", jumpAyah);
ayetJumpSelect.addEventListener('change', jumpAyah);

ayetJumpInput.addEventListener('wheel', (e) => {
  e.preventDefault(); // Prevent default scroll behavior
}, {passive: false});

// Auto Play checkbox'i dinleyerek programi baslatma
auto_play.addEventListener("input", () => {
  console.log("auto-play: ", auto_play.checked);
  if (auto_play.checked) {
    if (audio_element.ended) audio_element.play();
    audio_element.addEventListener(
      "ended",
      () => {
        counter = (counter + 1) % mealler.length;
        next();
        determineMealBeklemeSuresi();
      },
      { once: true }
    );
  }
});

// Bekleme Suresi Girme Fonksiyonu
function determineMealBeklemeSuresi() {
  beklemeSuresi = mealBeklemeKatsayisi * mealler[counter].length;
  meal_kalan_sure.textContent = `${(beklemeSuresi / 1000).toFixed(1)} sn`;
}

meal_bekleme_suresi_input.addEventListener("input", () => {
  mealBeklemeKatsayisi = meal_bekleme_suresi_input.value;
  document.querySelector("#beklemeKatsayisiOutput").value =
  mealBeklemeKatsayisi;
  determineMealBeklemeSuresi();
});

window.beklemeSuresiGir = function (selectElement) {
  let beklemeKatsayisi = selectElement.value;
  if (!beklemeKatsayisi) return;
  mealBeklemeKatsayisi = beklemeKatsayisi;
  document.querySelector("#beklemeKatsayisiOutput").textContent =
    beklemeKatsayisi;
  // selectElement.value = '';
};

determineMealBeklemeSuresi();
next();

// Dinamik responsive düzenleme
// window.addEventListener("resize", () => {
//   const width = window.innerWidth;

//   if (width < 768) {
//     document.querySelector(".container").style.flexDirection = "column";
//   } else {
//     document.querySelector(".container").style.flexDirection = "row";
//   }
// });
