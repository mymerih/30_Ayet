import { TextScramble } from './TextScramble.js';
const ayetMealResimler = [
  "1_Raad-28.png",
  "2_Hadid-4.png",
  "3_AliImran-104.png",
  "4_Araf-31.png",
  "5_Zilzal-7-8.png",
  "6_Hud-88.png",
  "7_Hujurat-11.png",
  "8_Baqara-148.png",
  "9_Ibrahim-7.png",
  "10_Ankabut-45.png",
  "11_Fatir-28.png",
  "12_AliImran-92.png",
  "13_Asr-1-3.png",
  "14_Muhammad-7.png",
  "15_Insan-7.png",
  "16_Hud-90.png",
  "17_Sad-29.png",
  "18_Nahl-78.png",
  "19_Kahf-107-108.png",
  "20_Baqara-153.png",
  "21_Baqara-10.png",
  "22_Kahf-23-24.png",
  "23_Isra-23.png",
  "24_Anfal-46.png",
  "25_Isra-36.png",
  "26_Balad-17.png",
  "27_Isra-18.png",
  "28_Taghâbun-9.png",
  "29_Araf-44.png",
  "30_Maun-4-7.png"
];


const phrases = 
[
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
"Vay haline şöyle namaz kılanların: Onlar namazlarının özünden uzaktırlar. İbadetlerini gösteriş için yaparlar, zekât ve diğer yardımlarını esirger, vermezler."
]

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
    "وَاللَّهُ أَخْرَجَكُم مِّن بُطُونِ أُمَّهَاتِكُمْ لَا تَعْلَمُونَ شَيْئًا ۖ وَجَعَلَ لَكُمُ السَّمْعَ وَالْأَبْصَارَ وَالْأَفْئِدَةَ لَعَلَّكُمْ تَشْكُرُونَ",
    "إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ كَانَتْ لَهُمْ جَنَّاتُ الْفِرْدَوْسِ نُزُلًا (107) خَالِدِينَ فِيهَا لَا يَبْغُونَ عَنْهَا حِوَلًا (108)",
    "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    "فِي قُلُوبِهِم مَّرَضٌ فَزَادَهُمُ اللَّهُ مَرَضًا ۖ وَلَهُمْ عَذَابٌ أَلِيمٌ بِمَا كَانُوا يَكْذِبُونَ",
    "وَلَا تَقُولَنَّ لِشَيْءٍ إِنِّي فَاعِلٌ ذَٰلِكَ غَدًا ۝ إِلَّا أَن يَشَاءَ اللَّهُ",
    "وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا ۚ إِمَّا يَبْلُغَنَّ عِندَكَ الْكِبَرَ أَحَدُهُمَا أَوْ كِلَاهُمَا فَلَا تَقُل لَّهُمَا أُفٍّ وَلَا تَنْهَرْهُمَا وَقُل لَّهُمَا قَوْلًا كَرِيمًا",
    "وَأَطِيعُوا اللَّهَ وَرَسُولَهُۥ وَلَا تَنَازَعُوا فَتَفْشَلُوا وَتَذْهَبَ رِيحُكُمْ ۖ وَاصْبِرُوا ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    "وَلَا تَقْفُ مَا لَيْسَ لَكَ بِهِۦ عِلْمٌ ۚ إِنَّ السَّمْعَ وَالْبَصَرَ وَالْفُؤَادَ كُلُّ أُولَٰئِكَ كَانَ عَنْهُ مَسْئُولًا",
    "ثُمَّ كَانَ مِنَ الَّذِينَ آمَنُوا وَتَوَاصَوْا بِالصَّبْرِ وَتَوَاصَوْا بِالْمَرْحَمَةِ",
    "مَّن كَانَ يُرِيدُ الْعَاجِلَةَ عَجَّلْنَا لَهُۥ فِيهَا مَا نَشَاءُ لِمَن نُّرِيدُ ثُمَّ جَعَلْنَا لَهُۥ جَهَنَّمَ يَصْلَاهَا مَذْمُومًا مَّدْحُورًا",
    "وَمَن يُؤْمِن بِاللَّهِ وَيَعْمَلْ صَالِحًا يُكَفِّرْ عَنْهُ سَيِّئَاتِهِۦ وَيُدْخِلْهُ جَنَّاتٍ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ خَالِدِينَ فِيهَا أَبَدًا ۚ ذَٰلِكَ الْفَوْزُ الْعَظِيمُ",
    "وَنَادَىٰ أَصْحَابُ الْجَنَّةِ أَصْحَابَ النَّارِ أَن قَدْ وَجَدْنَا مَا وَعَدَنَا رَبُّنَا حَقًّا فَهَلْ وَجَدتُّم مَّا وَعَدَ رَبُّكُمْ حَقًّا ۖ قَالُوا نَعَمْ",
    "فَوَيْلٌ لِّلْمُصَلِّينَ (4) الَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ (5) الَّذِينَ هُمْ يُرَاءُونَ (6) وَيَمْنَعُونَ الْمَاعُونَ (7)"
]



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
  "Feveylul lilmusallîn (4) ellezîne hum an salâtihim sâhûn (5) ellezîne hum yurâûne (6) ve yemneûn el mâûn (7)."
]

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
"19_Kahf_107_108.mp3",
"20_Baqara_153.mp3",
"21_Baqara_10.mp3",
"22_Kahf_23-24.mp3",
"23_Isra_23.mp3",
"24_Anfal_46.mp3",
"25_Isra_36.mp3",
"26_Balad_17.mp3",
"27_Isra_18.mp3",
"28_Taghâbun_9.mp3",
"29_Araf_44.mp3",
"30_Maun_4-7.mp3"
];

const baslik_container = document.querySelector('.ayet_adi');
const meal_container = document.querySelector('.meal');
const ayet_container = document.querySelector('.ayet_container')
const arabic_okunus_contaniner = document.querySelector('.ayet_okunusu_container')
// const ayet_meal_resim_contaniner = document.querySelector('.ayet_meal_resim_contaniner')
const audio_element = document.querySelector('.audio')
const fx = new TextScramble(baslik_container, meal_container, ayet_container, arabic_okunus_contaniner, 
                          // ayet_meal_resim_contaniner,
                          audio_element);
let counter = 0;
const next = () => {
  fx.setText(ayetMealResimler[counter], phrases[counter], arapcaAyetler[counter], 
            ayet_okunuslari[counter], ayetler_mp3[counter], counter)
    .then(() => {
    console.log(arapcaAyetler[counter]);
    setTimeout(next, 50 * phrases[counter].length);
    counter = (counter + 1) % phrases.length;
  });
}

next();