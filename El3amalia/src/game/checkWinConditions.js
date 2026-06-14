const policeRoles = ["تيسير بيه", "أبو منة", "زناتي", "حودة الغلبان"];

export function checkWinConditions(playersState, nightResult) {
  /*
    ========================
    اللاعبين الأحياء
    ========================
  */

  const alivePlayers = playersState.filter((player) => player.alive);

  /*
    ========================
    الشرطة الأحياء
    ========================
  */

  const alivePolice = alivePlayers.filter((player) =>
    policeRoles.includes(player.role),
  );

  /*
    ========================
    العصابة الأحياء
    ========================
  */

  const aliveCriminals = alivePlayers.filter(
    (player) => !policeRoles.includes(player.role),
  );

  /*
    ========================
    الظابط حي؟
    ========================
  */

  const aliveOfficer = alivePlayers.find(
    (player) => player.role === "تيسير بيه",
  );

  /*
    ========================
    فوز الشرطة
    ========================
  */

  if (aliveCriminals.length === 0) {
    return {
      winner: "police",

      reason: "allCriminalsRemoved",
    };
  }

  /*
    ========================
    فوز العصابة
    الظابط اتقتل فعلاً
    ========================
  */

  if (!aliveOfficer) {
    return {
      winner: "criminals",

      reason: "officerKilled",
    };
  }

  /*
    ========================
    فوز العصابة
    الظابط لوحده
    ========================
  */

  if (aliveOfficer && alivePolice.length === 1) {
    return {
      winner: "criminals",

      reason: "officerAlone",
    };
  }

  /*
    ========================
    لا يوجد فائز
    ========================
  */

  return null;
}
