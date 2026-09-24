# 🎮 MAHALLA: BIR KUN

> **Mavzu**: *“Mahalla — qadriyatlar beshigi, jamiyatning ma’naviy asoslari”*  
> **Janr**: Interaktiv hikoya va qarorlar o‘yini (Interactive Story & Community Decision Game)  
> **Platforma**: Web brauzer (Desktop & Mobile moslashuvchan)  
> **Til**: O‘zbek tili (Lotin alifbosi)

---

## 🌟 Loyiha Haqida

**“MAHALLA: BIR KUN”** — o‘yinchi oddiy bir yosh yigit/qiz sifatida o‘zbek mahallasidagi bir kunini boshlaydi. Tongdan kechgacha yuz beradigan 9 ta hayotiy vaziyatda tanlovlar qiladi. Har bir qaror mahallaning 5 ta asosiy ma’naviy ko‘rsatkichiga ta’sir qiladi:

- ❤️ **Mehr-oqibat** — qo‘shnilarga iltifot, muhtojlarga ko‘mak
- 🤝 **Hamjihatlik** — bir yoqadan bosh chiqarish, hashar va jamoaviy birlik
- 🧓 **Kattalarga hurmat** — nuroniylar o‘giti, tabarruk qariyalarni e’zozlash
- 🌱 **Mahalla obodligi** — ozodalik, tozalik, yashil makon va xiyobonlar
- 🛡️ **O‘zaro ishonch** — axborot madaniyati, xolislik va mahalla tinchligi

O‘yin test yoki viktorina emas, balki real voqealar orqali yoshlarga mahalla qadriyatlarini singdiruvchi badiiy-interaktiv tajribadir.

---

## 🏛️ Arxitektura va Texnologiyalar

Loyiha to‘liq modulli bo‘lib, alohida **Python Backend** va **React Frontend** arxitekturasida barpo etilgan:

```
Mahalla/
├── backend/                     # Python 3.9+ FastAPI REST API Server
│   ├── app/
│   │   ├── main.py              # FastAPI ilovasi va CORS sozlamalari
│   │   ├── database.py          # SQLite ma'lumotlar bazasi (sessiyalar va solnomalar)
│   │   ├── schemas.py           # Pydantic modellar
│   │   ├── data/                # Ssenariylar, lokatsiyalar, profillar, TV xabarlar
│   │   ├── routers/             # game, session, news API routerlari
│   │   └── services/scoring.py  # Profil hisoblash algoritmi
│   ├── requirements.txt
│   └── run.py                   # Port 8000
│
├── frontend/                    # React 19 + TypeScript + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── screens/         # StartScreen, NameScreen, GameScreen, ResultScreen, FinalCinematic
│   │   │   ├── hud/             # GameHUD, StatBar, StatDeltaFloater
│   │   │   ├── map/             # MahallaMap (2D interaktiv SVG xarita, 7 maskan)
│   │   │   ├── scene/           # SceneView, ChoiceCard, StoryDialogueModal
│   │   │   └── common/          # MahallaTVTicker (jonli xabarlar), SoundToggle
│   │   ├── api/client.ts        # FastAPI ulanish + oflayn zaxira (graceful fallback)
│   │   ├── utils/audio.ts       # Web Audio API sintetik tabiat sadolari (birds, breeze, chime)
│   │   └── types/game.ts
│   └── package.json
│
└── run.sh                       # Ikkala qismni birgalikda ishga tushiruvchi skript
```

---

## 🚀 Ishga Tushirish

### 1-usul: Yagona skript orqali (Tavsiya etiladi)

Terminalda loyiha papkasida quyidagi buyruqni bering:

```bash
./run.sh
```

Brauzerda oching: **`http://127.0.0.1:5173`**

---

### 2-usul: Qo‘lda alohida ishga tushirish

**Backendni ishga tushirish (FastAPI):**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
# Server: http://127.0.0.1:8000
# Avtomatik Swagger API hujjatlari: http://127.0.0.1:8000/docs
```

**Frontendni ishga tushirish (React + Vite):**
```bash
cd frontend
npm install
npm run dev -- --host 127.0.0.1 --port 5173
# Brauzer: http://127.0.0.1:5173
```

---

## 🎨 O‘yin Xususiyatlari

1. **Kinematik Boshlang‘ich Ekran**:
   - Quyosh nurlari, bulutlar harakati, qushlar parvozi va tonggi mahalla silueti.
2. **2D Interaktiv Mahalla Xaritasi**:
   - 7 ta asosiy mahalla maskani: 🏠 O'z Xonadoningiz, 🏫 Mahalla Maktabi, 🏛️ Mahalla Fuqarolar Yig'ini, 🌳 Chinorli Xiyobon, 🛒 Mahalla Do'koni, ⚽ Yoshlar Sport Maydoni, 🧓 Nuroniylar Maskani va Choyxona.
   - Joriy joylashuv pini, oqib turgan ariq va tosh ko‘chalar.
3. **9 ta Chuqur Mazmunli Sahna**:
   - *1. Ertalab* (Qo‘shniga yordam)
   - *2. Hashar* (Hashar va futbol balansi)
   - *3. Bir Xabar* (Telegram guruhidagi feyk xabarga munosabat)
   - *4. Bir Daqiqa* (Nuroniy Salim bobo bilan suhbat va mahalla tarixi lore dialogi)
   - *5. Yangi Qo‘shni* (Ko‘chib kelgan oila bilan mehmondo‘stlik)
   - *6. Toza Ko‘cha* (Maydonchadagi chiqindilarni birgalikda tozalash)
   - *7. Ikki Qo‘shni* (Kelishmovchilikda murosa va adolat)
   - *8. Kelajak* (Yoshlar uchun IT, Sport yoki Kitobxonlik loyihasi)
   - *9. Bir Kun O‘tdi* (Kechki mahalla qiyofasining to‘plangan statistikaga qarab dinamik o‘zgarishi)
4. **Mahalla TV — Jonli Yangiliklar Ticker'i**:
   - Vaqti-vaqti bilan ekranning burchagida kutilmagan samimiy mahalla xabarlari chiqib turadi (shaxmat musobaqasi, yangi chaqaloq suyunchisi, issiq patir, yashil makon).
5. **Mahalla Xarakteri va Solnomasi (Community Profile & Chronicle)**:
   - Raqobatli reyting o‘rniga shakllangan xarakter: *Mehrli mahalla*, *Birdam mahalla*, *Avlodlar mahallasi*, *Obod mahalla*, yoki *Ideal mahalla*.
   - SQLite bazasida saqlanadigan avvalgi o‘yinchilar tarixi.
6. **Kinematik Falsafiy Yakun**:
   - Ekran sekin qorong‘ilashib, chuqur ma’naviy xulosalar satr-satr ochiladi:
   > *“Mahalla — shunchaki uylar joylashgan hudud emas. Mahalla — insonlar bir-biriga befarq bo‘lmagan joy. MAHALLA — QADRIYATLAR BESHIGI. JAMIYATNING MA’NAVIY ASOSI.”*
7. **Samimiy Web Audio Tizimi**:
   - Tashqi og‘ir fayllarsiz brauzerda sintetik generatsiya qilinadigan mayin qushlar sayrashi, shabada va tanlov akkordi (sukut bo‘yicha o‘chiq holatda).
