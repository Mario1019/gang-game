import { rolesData }
from "./roles";

export function prepareNightData(
  players
) {

  const preparedPlayers =

    players.map(
      (player) => ({

        playerName:
          player.playerName,

        realRole:
          player.realRole,

        disguise:
          player.disguise ||
          null,

        target: null,

        blocked: false,

        cancelled: false,

        protected: false,

        stolenRole: null,

        copiedInfo: null,

        alive:
          player.alive,

        delayedBlock:
          player.delayedBlock ||
          false,

        /*
          ========================
          استخدامات خاصة
          ========================
        */

        oneTimeUsed:
          player.oneTimeUsed ||
          false,
      })
    );

  /*
    ========================
    ترتيب الليل
    بالـpriority
    ========================
  */

  preparedPlayers.sort(
    (a, b) => {

      const roleA =
        rolesData[
          a.realRole
        ];

      const roleB =
        rolesData[
          b.realRole
        ];

      const priorityA =
        roleA?.priority ||
        999;

      const priorityB =
        roleB?.priority ||
        999;

      return (
        priorityA -
        priorityB
      );
    }
  );

  return preparedPlayers;
}