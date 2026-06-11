const baseRoles = ["بيبو ماجيفار", "عبده ملقاط", "أبو منة", "تيسير بيه"];

/*
  ========================
  الأدوار الإجرامية
  ========================
*/

const extraCriminalRoles = [
  "ساهر",

  "سيد بشرية",

  "حمادة كلهم",

  "شعبطة",

  "ذيكو",

  "وحيد الفاجر",

  "عصام عبقرينو",

  "كريم كوشة",

  "مفاتن",

  "سعدة",

  "صبحي صيدلية",
];

/*
  ========================
  واجهات الشرطة
  ========================
*/

const disguiseRoles = [
  "ساهر",

  "شعبطة",

  "ذيكو",

  "حمادة كلهم",

  "عصام عبقرينو",

  "مفاتن",

  "سعدة",

  "صبحي صيدلية",
];

/*
  ========================
  الشرطة
  ========================
*/

const policeRoles = ["تيسير بيه", "أبو منة", "زناتي", "حودة الغلبان"];

/*
  ========================
  أدوار تستخدم مرة واحدة
  ========================
*/

const oneTimeRoles = ["صبحي صيدلية"];

/*
  ========================
  Shuffle
  ========================
*/

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

/*
  ========================
  توزيع الأدوار
  ========================
*/

export function distributeRoles(playerCount) {
  /*
    ========================
    البداية
    ========================
  */

  let roles = [...baseRoles];

  /*
    ========================
    إضافة زناتي
    ========================
  */

  if (playerCount >= 8) {
    roles.push("زناتي");
  }

  /*
    ========================
    إضافة العسكري
    ========================
  */

  if (playerCount >= 12) {
    roles.push("حودة الغلبان");
  }

  /*
    ========================
    إضافة باقي الشخصيات
    ========================
  */

  const extraNeeded = playerCount - roles.length;

  const shuffledCriminals = shuffle(extraCriminalRoles);

  roles.push(...shuffledCriminals.slice(0, extraNeeded));

  /*
  ========================
  Shuffle كامل
  ========================
*/

  const finalRoles = shuffle(roles);

  /*
    ========================
    تجهيز الـdisguises
    ========================
  */

  const usedDisguises = [];

  return finalRoles.map((role) => {
    /*
        زناتي مكشوف
      */

    if (role === "زناتي") {
      return {
        realRole: role,

        disguise: null,

        /*
            استخدامات خاصة
          */

        oneTimeUsed: false,
      };
    }

    /*
        الشرطة
      */

    if (policeRoles.includes(role)) {
      const availableDisguises = disguiseRoles.filter(
        (fakeRole) =>
          !usedDisguises.includes(fakeRole) && !finalRoles.includes(fakeRole),
      );

      const disguise =
        availableDisguises[
          Math.floor(Math.random() * availableDisguises.length)
        ];

      usedDisguises.push(disguise);

      return {
        realRole: role,

        disguise,

        /*
            استخدامات خاصة
          */

        oneTimeUsed: false,
      };
    }

    /*
        المجرمين
      */

    return {
      realRole: role,

      disguise: null,

      /*
          استخدامات خاصة
        */

      oneTimeUsed: oneTimeRoles.includes(role) ? false : null,
    };
  });
}
