import {
  getAction,
  getActions,
}
from "./actionHandlers";

export function resolveNightActions(
  nightActions,
  playersState
) {

  let killedPlayer =
    null;

  let arrestedPlayer =
    null;

  let escapedPlayer =
    null;

  /*
    ========================
    عبقرينو
    ========================
  */

  let failedPuzzlePlayer =
    null;

  let policeMessages =
    [];

  let policeSkipped =
    false;

  /*
    ========================
    اجتماع العصابة
    ========================
  */

  let meetingTriggered =
    false;

  let meetingActor =
    null;

  /*
    ========================
    Effects Pipeline
    ========================
  */

  let activeEffects =
    [];

  /*
    ========================
    سجل التنفيذ الحقيقي
    ========================
  */

  let resolvedActions =
    [];

  /*
    ========================
    نتائج شعبطة
    ========================
  */

  let copiedResults =
    [];

  /*
    ========================
    الظابط الحقيقي
    ========================
  */

  const officerPlayer =

    playersState.find(
      (player) =>
        player.role ===
        "تيسير بيه"
    );

  const officerName =
    officerPlayer
      ?.playerName;

  /*
    ========================
    وح وح
    ========================
  */

  const cancelAction =
    getAction(
      nightActions,
      "cancelRole"
    );

  if (cancelAction) {

    activeEffects.push({

      type: "cancel",

      source:
        cancelAction.actor,

      target:
        cancelAction.target,
    });
  }

  /*
    ========================
    سيد بشرية
    ========================
  */

  const stealAction =
    getAction(
      nightActions,
      "stealRole"
    );

  const stolenPlayer =
    stealAction?.target;

  const stealActor =
    stealAction?.actor;

  /*
    ========================
    رسائل الظابط
    ========================
  */

  policeMessages = [

    ...getActions(
      nightActions,
      "intel"
    ),

    ...getActions(
      nightActions,
      "stealIntel"
    ),
  ];

  /*
    ========================
    حودة الغلبان
    ========================
  */

  const houdaAction =
    nightActions.find(
      (action) =>
        action.role ===
        "حودة الغلبان"
    );

  if (houdaAction) {

    activeEffects.push({

      type: "protect",

      source:
        houdaAction.actor,

      target:
        houdaAction.target,
    });
  }

  /*
    ========================
    السواق
    ========================
  */

  const beboAction =
    nightActions.find(
      (action) =>
        action.role ===
        "بيبو ماجيفار"
    );

  if (beboAction) {

    escapedPlayer =
      beboAction.target;

    activeEffects.push({

      type: "escape",

      source:
        beboAction.actor,

      target:
        beboAction.target,
    });
  }

  /*
    ========================
    Helpers
    ========================
  */

  const isCancelled =
    (playerName) =>

      activeEffects.some(
        (effect) =>

          effect.type ===
            "cancel" &&

          effect.target ===
            playerName
      );

  const isProtected =
    (playerName) =>

      activeEffects.some(
        (effect) =>

          effect.type ===
            "protect" &&

          effect.target ===
            playerName
      );

  const hasEscape =
    (playerName) =>

      activeEffects.some(
        (effect) =>

          effect.type ===
            "escape" &&

          effect.target ===
            playerName
      );

  /*
    ========================
    ساهر
    ========================
  */

  const saherAction =
    getAction(
      nightActions,
      "kill"
    );

  if (
    saherAction &&

    !isCancelled(
      saherAction.actor
    )
  ) {

    /*
      حماية العسكري للظابط
    */

    const protectedOfficer =

      saherAction.target ===
        officerName &&

      isProtected(
        officerName
      );

    if (

      !protectedOfficer &&

      !hasEscape(
        saherAction.target
      )
    ) {

      killedPlayer =
        saherAction.target;

      resolvedActions.push({

        type: "kill",

        actor:
          saherAction.actor,

        target:
          saherAction.target,
      });
    }
  }

  /*
    ========================
    الظابط
    ========================
  */

  const taysirAction =
    nightActions.find(
      (action) =>

        action.action ===
          "arrest" ||

        action.action ===
          "skipArrest"
    );

  if (
    taysirAction &&

    !isCancelled(
      taysirAction.actor
    )
  ) {

    if (
      taysirAction.action ===
      "arrest"
    ) {

      /*
        هروب
      */

      if (
        !hasEscape(
          taysirAction.target
        )
      ) {

        arrestedPlayer =
          taysirAction.target;

        resolvedActions.push({

          type: "arrest",

          actor:
            taysirAction.actor,

          target:
            taysirAction.target,
        });
      }
    }

    if (
      taysirAction.action ===
      "skipArrest"
    ) {

      policeSkipped =
        true;

      resolvedActions.push({

        type:
          "skipArrest",

        actor:
          taysirAction.actor,
      });
    }
  }

  /*
    ========================
    صبحي صيدلية
    ========================
  */

  const meetingAction =
    getAction(
      nightActions,
      "triggerMeeting"
    );

  if (
    meetingAction &&

    !isCancelled(
      meetingAction.actor
    )
  ) {

    meetingTriggered =
      true;

    /*
      صاحب الاجتماع
    */

    meetingActor =
      meetingAction.actor;

    resolvedActions.push({

      type:
        "triggerMeeting",

      actor:
        meetingAction.actor,
    });
  }

  /*
    ========================
    عبقرينو
    ========================
  */

  const failedPuzzleAction =
    getAction(
      nightActions,
      "failedPuzzle"
    );

  if (failedPuzzleAction) {

    failedPuzzlePlayer =
      failedPuzzleAction.actor;

    resolvedActions.push({

      type:
        "failedPuzzle",

      actor:
        failedPuzzleAction.actor,
    });
  }

  /*
    ========================
    شعبطة
    ========================
  */

  const copyAction =
    getAction(
      nightActions,
      "copyResult"
    );

  if (copyAction) {

    const copiedPlayer =
      copyAction.target;

    const playerResults =

      resolvedActions.filter(
        (action) =>

          action.actor ===
          copiedPlayer
      );

    copiedResults.push({

      watcher:
        copyAction.actor,

      target:
        copiedPlayer,

      results:
        playerResults,
    });
  }

  return {

    killedPlayer,

    arrestedPlayer,

    escapedPlayer,

    /*
      ========================
      عبقرينو
      ========================
    */

    failedPuzzlePlayer,

    policeMessages,

    policeSkipped,

    stolenPlayer,

    stealActor,

    resolvedActions,

    copiedResults,

    activeEffects,

    meetingTriggered,

    meetingActor,

    cancelledPlayer:
      activeEffects.find(
        (effect) =>
          effect.type ===
          "cancel"
      )?.target,
  };
}