import { Scene } from '../types/game';

export const SCENES: Scene[] = [
  {
    id: "scene_1",
    stage_number: 1,
    title: "ERTALAB",
    location_id: "uy",
    location_name: "O'z Xonadoningiz",
    time_of_day: "Tong",
    situation: "Ertalab. Mahalla asta-sekin uyg‘onmoqda. Ko'chada quyosh nurlari maysalardagi shabnamni yaltiratmoqda. Eshikdan chiqishingiz bilan qo‘shningiz og‘ir sumkalar bilan kelayotganini ko‘rasiz.",
    question: "Qo‘shningizning qo‘lida og‘ir yuklar. Nima qilasiz?",
    dialogue_lore: null,
    lore_author: null,
    choices: [
      {
        id: "c1_a",
        letter: "A",
        text: "Yordam beraman.",
        feedback: "Qo‘shningiz chehrasiga tabassum yugurdi: 'Umringdan baraka top, bolam!' deb duo qildi.",
        effects: { mehr: 10, hurmat: 5 }
      },
      {
        id: "c1_b",
        letter: "B",
        text: "Shoshayotganimni aytaman.",
        feedback: "Siz shoshilib o'tib ketdingiz. Qo'shningiz jilmayib, og'ir sumkalarini sekin ko'tarib davom etdi.",
        effects: {}
      },
      {
        id: "c1_c",
        letter: "C",
        text: "Boshqa odamdan yordam so‘rayman.",
        feedback: "Ko'chadan o'tayotgan yosh yigitni chaqirdingiz va birgalikda qo'shniga yordamlashdingiz.",
        effects: { hamjihatlik: 5 }
      }
    ]
  },
  {
    id: "scene_2",
    stage_number: 2,
    title: "HASHAR",
    location_id: "dokon",
    location_name: "Mahalla Do'koni va Ko'cha",
    time_of_day: "Choshgoh",
    situation: "Bugun mahallada umumxalq hashari. Odamlar ariqlarni tozalab, ko'chalarni supurmoqda, daraxtlarni oqlamoqda. Shu payt do‘stlaringiz kelib futbol o‘ynashga chaqirishmoqda.",
    question: "Nima qilasiz?",
    dialogue_lore: null,
    lore_author: null,
    choices: [
      {
        id: "c2_a",
        letter: "A",
        text: "Hasharga qo‘shilaman.",
        feedback: "Ketmon va supurgani olib hasharga qo'shildingiz. Bir soatda butun ko'cha ozoda va ko'rkam bo'ldi.",
        effects: { hamjihatlik: 10, obodlik: 10 }
      },
      {
        id: "c2_b",
        letter: "B",
        text: "Futbolga ketaman.",
        feedback: "Siz o'yinga shoshildingiz. O'yin qiziqarli bo'ldi, biroq mahalla ko'chasi sizsiz tozalandi.",
        effects: {}
      },
      {
        id: "c2_c",
        letter: "C",
        text: "Avval hasharga yordam berib, keyin futbolga boraman.",
        feedback: "Oqilona va muvozanatli qaror! Qo'shnilar bilan birgalikda hasharni tezda yakunlab, keyin erkin futbol o'ynadingiz.",
        effects: { hamjihatlik: 7, obodlik: 7 }
      }
    ]
  },
  {
    id: "scene_3",
    stage_number: 3,
    title: "BIR XABAR",
    location_id: "markaz",
    location_name: "Mahalla Markazi",
    time_of_day: "Peshin",
    situation: "Mahallaning norasmiy Telegram guruhiga kutilmaganda vahimali xabar keldi: '🚨 ERTAGA SUV BO‘LMAYDI! HAMMAGA YUBORING!'. Biroq xabar manbasi noma'lum va hech qanday rasmiy imzo yo'q.",
    question: "Nima qilasiz?",
    dialogue_lore: null,
    lore_author: null,
    choices: [
      {
        id: "c3_a",
        letter: "A",
        text: "Darhol boshqalarga yuboraman.",
        feedback: "Xabar asossiz bo'lib chiqdi. Odamlar orasida behuda sarosima va ishonchsizlik paydo bo'ldi.",
        effects: { ishonch: -10 }
      },
      {
        id: "c3_b",
        letter: "B",
        text: "Avval ma’lumotni tekshiraman.",
        feedback: "Siz rasmiy manbalarni ko'zdan kechirdingiz va asossiz gaplarga uchmadingiz. Axborot madaniyati va mas'uliyat — jamiyat tayanchi!",
        effects: { ishonch: 10 }
      },
      {
        id: "c3_c",
        letter: "C",
        text: "Mahalla mas’ulidan so‘rayman.",
        feedback: "Mahalla raisiga murojaat qildingiz. Rais tarmoqda uzilish rejalashtirilmaganini aytib, guruhga to'g'ri axborot berdi.",
        effects: { ishonch: 8, hamjihatlik: 3 }
      }
    ]
  },
  {
    id: "scene_4",
    stage_number: 4,
    title: "BIR DAQIQA",
    location_id: "nuroniylar",
    location_name: "Nuroniylar Maskani",
    time_of_day: "Peshindan so'ng",
    situation: "Choyxona oldidagi so'rida o'tirgan, butun mahalla hurmat qiladigan tabarruk Salim bobo sizni chaqirdilar: 'Bolam, bir daqiqa suhbatlashsak…'",
    question: "Nima qilasiz?",
    dialogue_lore: "Salim bobo qadimgi mahalla haqida mehr bilan so'zlab berdilar: 'Bu mahallaning har bir chinorini ota-bobolarimiz birlashib ekishgan. Qachonki odamlar bir-birining shodligiga sherik, dardiga malham bo'lsa — mahalla mustahkam bo'ladi. Kattaga hurmat, kichikka izzat bo'lgan joyda hech qachon fayz arimaydi, bolam.'",
    lore_author: "Salim bobo (84 yosh)",
    choices: [
      {
        id: "c4_a",
        letter: "A",
        text: "Albatta, tinglayman.",
        feedback: "Boboning ibratli o'gitlaridan ma'naviy saboq oldingiz, qariyaning samimiy duosiga sazovor bo'ldingiz.",
        effects: { hurmat: 10, mehr: 5 }
      },
      {
        id: "c4_b",
        letter: "B",
        text: "Keyinroq gaplashamiz.",
        feedback: "Vaqtingiz tig'izligini aytib shoshildingiz. Bobo mayin jilmayib, 'mayli, yoshsan, omon bo'l' deb qolaverdilar.",
        effects: {}
      },
      {
        id: "c4_c",
        letter: "C",
        text: "Vaqt ajratib, suhbatlashaman.",
        feedback: "Boboga issiq ko'k choy quyib uzatdingiz va samimiy gurring qildingiz. Katta avlodning boy tajribasi yoshlar uchun mayoqdir.",
        effects: { hurmat: 8, mehr: 8 }
      }
    ]
  },
  {
    id: "scene_5",
    stage_number: 5,
    title: "YANGI QO‘SHNI",
    location_id: "dokon",
    location_name: "Mahalla Ko'chasi",
    time_of_day: "Tushdan so'ng",
    situation: "Ko‘changizdagi bo'sh turgan hovliga boshqa viloyatdan yangi oila ko‘chib keldi. Ular hovli oldida yuklarni tushirmoqda, hali mahallada hech kimni tanimaydilar.",
    question: "Nima qilasiz?",
    dialogue_lore: null,
    lore_author: null,
    choices: [
      {
        id: "c5_a",
        letter: "A",
        text: "Borib tanishaman.",
        feedback: "Yangi qo'shnilar bilan qo'l berib salomlashdingiz, o'zingizni tanishtirdingiz. Ular juda mamnun bo'lishdi.",
        effects: { mehr: 8, hamjihatlik: 5 }
      },
      {
        id: "c5_b",
        letter: "B",
        text: "E’tibor bermayman.",
        feedback: "Indamay o'tib ketdingiz. Ular bir muddat begonalik va noqulaylik his qilishdi.",
        effects: {}
      },
      {
        id: "c5_c",
        letter: "C",
        text: "Qo‘shnilar bilan tanishtiraman va yordamlashaman.",
        feedback: "O'zbekona mehmondo'stlik! Boshqa qo'shnilarni ham xabardor qilib, yangi oilaga issiq non va choy ilindingiz.",
        effects: { mehr: 10, hamjihatlik: 10 }
      }
    ]
  },
  {
    id: "scene_6",
    stage_number: 6,
    title: "TOZA KO‘CHA",
    location_id: "bog",
    location_name: "Chinorli Xiyobon va Maydoncha",
    time_of_day: "Asr",
    situation: "Bolalar maydonchasi atrofida yoshlar qoldirib ketgan qog'ozlar, suv idishlari va chiqindilar sochilib qolgan. Bolalar esa to'p o'ynashga qiynalmoqda.",
    question: "Nima qilasiz?",
    dialogue_lore: null,
    lore_author: null,
    choices: [
      {
        id: "c6_a",
        letter: "A",
        text: "O‘zim yig‘ishtiraman.",
        feedback: "Birovdan yordam kutmasdan chiqindilarni birma-bir savatga tashladingiz. Toza joyda baraka bo'ladi.",
        effects: { obodlik: 8 }
      },
      {
        id: "c6_b",
        letter: "B",
        text: "E’tibor bermay ketaman.",
        feedback: "'Mening ishim emas' deb chetlab o'tdingiz. Ko'cha iflos holatda qolaverdi.",
        effects: {}
      },
      {
        id: "c6_c",
        letter: "C",
        text: "Boshqalarni ham chaqirib, birga tozalayman.",
        feedback: "Maydondagi bolalarga ibrat bo'lib, 'kelinglar, birgalikda tozalab olamiz' dedingiz. 10 daqiqada maydoncha charog'on bo'ldi.",
        effects: { obodlik: 10, hamjihatlik: 8 }
      }
    ]
  },
  {
    id: "scene_7",
    stage_number: 7,
    title: "IKKI QO‘SHNI",
    location_id: "uy",
    location_name: "Ko'cha Oralig'i",
    time_of_day: "Kun botishi arafasi",
    situation: "Ikki qo‘shni hovli oralig'idagi mevali daraxt shoxlari va devor masalasida bahslashib, bir-biriga qattiq gaplar aytishmoqda.",
    question: "Nima qilasiz?",
    dialogue_lore: null,
    lore_author: null,
    choices: [
      {
        id: "c7_a",
        letter: "A",
        text: "Bir tomonning tarafini olaman.",
        feedback: "Vaziyatni to'liq tushunmasdan bir qo'shnini yoqladingiz, bu esa ikkinchi tomonning ranjishiga va tortishuv kuchayishiga sabab bo'ldi.",
        effects: { ishonch: -5 }
      },
      {
        id: "c7_b",
        letter: "B",
        text: "Aralashmayman.",
        feedback: "Tinchgina chetga o'tdingiz. Tushunmovchilik va xafagarchilik davom etdi.",
        effects: {}
      },
      {
        id: "c7_c",
        letter: "C",
        text: "Ikkalasini ham tinglashga harakat qilaman.",
        feedback: "Siz muloyimlik bilan: 'Aka-uka qo'shnilar, mevali daraxt rishtani uzishga arzirmidi?' deb ularni murosa stoliga chaqirdingiz. Har ikkala tomon yarashdi.",
        effects: { ishonch: 8, hamjihatlik: 8 }
      }
    ]
  },
  {
    id: "scene_8",
    stage_number: 8,
    title: "KELAJAK",
    location_id: "maktab",
    location_name: "Mahalla Maktabi",
    time_of_day: "Shom arafasi",
    situation: "Mahalla yoshlar yetakchisi maktab binosida yig'ilish o'tkazmoqda: 'Mahallamiz yoshlari uchun qanday yangi loyiha tashkil qilsak foydali bo'ladi?'",
    question: "Qanday taklif berasiz?",
    dialogue_lore: null,
    lore_author: null,
    choices: [
      {
        id: "c8_a",
        letter: "A",
        text: "IT to‘garagi va zamonaviy kasblar markazi.",
        feedback: "Kelajak texnologiyalari! Mahalla yoshlari zamonaviy bilim va IT ko'nikmalarini egallash imkoniyatiga ega bo'ldi.",
        effects: { ishonch: 5, obodlik: 5 }
      },
      {
        id: "c8_b",
        letter: "B",
        text: "Sport musobaqasi va mahalla ligasi.",
        feedback: "Sog'lom turmush tarzi va birdamlik! Mahalla yoshlari o'rtasida qizg'in do'stona musobaqalar yo'lga qo'yildi.",
        effects: { hamjihatlik: 7, mehr: 3 }
      },
      {
        id: "c8_c",
        letter: "C",
        text: "Kitobxonlik klubi va ma'rifat kechalari.",
        feedback: "Ma'naviyat chashmasi! Mahalla kutubxonasi jonlanib, ota-bobolarimiz qoldirgan adabiy boyliklarni mutolaa qilish boshlandi.",
        effects: { hurmat: 5, hamjihatlik: 5 }
      }
    ]
  },
  {
    id: "scene_9",
    stage_number: 9,
    title: "BIR KUN O‘TDI",
    location_id: "bog",
    location_name: "Mahalla Ko'chasi — Kun Botishi",
    time_of_day: "Kechqurun",
    situation: "Kun o'tdi. Quyosh ufqqa botib, mahalla ustida mayin binafsha va iliq tillarang nurlar porlamoqda. Siz ko'cha bo'ylab xonadoningizga qaytmoqdasiz. Butun kun davomida qilgan ezgu amallaringiz mahalla qiyofasida o'z aksini topmoqda.",
    question: "Kuningizni sarhisob qilishga tayyormisiz?",
    dialogue_lore: null,
    lore_author: null,
    choices: [
      {
        id: "c9_a",
        letter: "A",
        text: "Mahalla ahvoliga nazar solaman.",
        feedback: "Siz ko'chalardagi sokinlik, odamlarning samimiy nigohlari va toza ariqlarni ko'rib qoniqish his qildingiz.",
        effects: { mehr: 2, hamjihatlik: 2, hurmat: 2, obodlik: 2, ishonch: 2 }
      },
      {
        id: "c9_b",
        letter: "B",
        text: "Shu kun uchun shukrona aytaman.",
        feedback: "Yaxshi niyat va elga ezgu xizmat har doim inson qalbini yorug' qiladi.",
        effects: { hurmat: 5, mehr: 5 }
      },
      {
        id: "c9_c",
        letter: "C",
        text: "Ertangi kunga yangi reja qilaman.",
        feedback: "Ertaga ham yangi imkoniyatlar kuni. Mahalla ravnaqi — har birimizning qo'limizda!",
        effects: { ishonch: 5, obodlik: 5 }
      }
    ]
  }
];
