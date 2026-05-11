import { useEffect, useState, } from "react";

import { roleScreens } from "./roleScreens";

function NightScreen({

  currentTurnPlayer,

  nightPlayers,

  playedPlayers = [],

  goToNextPlayer,

  addNightAction,

  nightActions,

  stolenRoles = [], }) {

  const [showRoleScreen,

    setShowRoleScreen,

  ] = useState(false);

  const [taxTriggered,

    setTaxTriggered,

  ] = useState(false);

  const [decisionConfirmed,

    setDecisionConfirmed,

  ] = useState(false);

  const [pressureTimer,

    setPressureTimer,

  ] = useState(30);

  const [isSecondaryPhase, setIsSecondaryPhase] = useState(false);

  const [secondaryRoleData, setSecondaryRoleData] = useState(null);

  const [targetPlayer, setTargetPlayer] = useState(null);

  /*========================لو اللاعب الحالياستخدم قدرته========================*/

  const oneTimeAbilityUsed =

    currentTurnPlayer
      ?.realRole ===
    "صبحي صيدلية" &&

    currentTurnPlayer
      ?.oneTimeUsed ===
    true;

  /*========================هل اللاعب الحالي متحكم فيه؟========================*/

  /*
  ========================
  سيد بشرية
  ========================
  */

  const currentPlayerHijacked =
    stolenRoles.find(
      (action) =>

        action.target ===
        currentTurnPlayer
          ?.playerName &&

        !action.alreadyPlayed
    );

  /*
  ========================
  شعبطة
  ========================
  */

  const sha3bataCopyAction =
    nightActions.find(
      (action) =>

        action.action ===
        "copyResult" &&

        action.target ===
        currentTurnPlayer
          ?.playerName &&

        !action.alreadyPlayed
    );

  /*
  ========================
  هل الدور متحكم فيه؟
  ========================
  */

  const roleHijacked =
    currentPlayerHijacked;

  /*
  ========================
  مين المتحكم الحقيقي؟
  ========================
  */

  let controllerPlayer =
    currentTurnPlayer;

  /*
  ========================
  مين صاحب الدور الحقيقي؟
  ========================
  */

  let roleOwnerPlayer =
    currentTurnPlayer;

  /*
  ========================
  سيد بشرية / شعبطة
  ========================
  */

  if (currentPlayerHijacked) {

    const hijacker =
      nightPlayers.find(
        (player) =>

          player.playerName ===
          roleHijacked.actor
      );

    if (hijacker) {

      controllerPlayer =
        hijacker;
    }
  }

  /*
  ========================
  هل الحالي هو الضحية؟
  ========================
  */

  const isVictimTurn =
    currentPlayerHijacked &&
    currentTurnPlayer
      ?.playerName ===
    currentPlayerHijacked
      ?.target;

  /*
  ========================
  هل الحالي هو سيد نفسه؟
  ========================
  */

  const isSayedPlaying =
    currentPlayerHijacked &&
    controllerPlayer
      ?.playerName ===
    currentTurnPlayer
      ?.playerName;

  /*
  ========================
  لو شعبطة → اللاعب الحقيقي يكمل
  لو سيد → سيد يلعب بداله
  ========================
  */

  let effectivePlayer =

    currentPlayerHijacked

      ? controllerPlayer

      : currentTurnPlayer;

  if (secondaryRoleData) {
    effectivePlayer = secondaryRoleData.player;
  }

  /*========================مفاتن========================*/

  const pressureAction = nightActions.find((action) =>

    (
      action.action ===
      "pressureChoice" ||

      action.action ===
      "quickDecision"
    ) &&

    action.target ===
    currentTurnPlayer
      ?.playerName
  );

  /*========================مدة الضغط========================*/

  const pressureDuration =

    pressureAction
      ?.duration || 30;

  /*========================تايمر مفاتن========================*/

  useEffect(() => {

    if (
      !showRoleScreen ||

      !pressureAction ||

      decisionConfirmed
    ) {

      return;
    }

    if (
      pressureTimer <= 0
    ) {

      setShowRoleScreen(
        false
      );

      goToNextPlayer();

      return;
    }

    const timer =
      setTimeout(() => {

        setPressureTimer(
          (prev) =>
            prev - 1
        );

      }, 1000);

    return () =>
      clearTimeout(
        timer
      );

  }, [

    pressureTimer,

    pressureAction,

    decisionConfirmed,

    showRoleScreen,

    goToNextPlayer,

  ]);

  /*========================reset========================*/

  useEffect(() => {

    setDecisionConfirmed(
      false
    );

    setPressureTimer(
      pressureDuration
    );

    setIsSecondaryPhase(false);

    setSecondaryRoleData(null);

    setTargetPlayer(null);

  }, [

    currentTurnPlayer,

    pressureDuration,

  ]);

  /*========================لو الليل خلص========================*/

  if (!currentTurnPlayer) {

    return (

      <div
        style={{
          height:
            "100vh",

          background:
            "#000",

          color:
            "white",

          display:
            "flex",

          justifyContent:
            "center",

          alignItems:
            "center",

          fontSize:
            "50px",

          fontFamily:
            "sans-serif",
        }}
      >
        خلص الليل 😈
      </div>
    );

  }

  /*========================صبحي خلص قدرته========================*/

  if (oneTimeAbilityUsed) {

    setTimeout(() => {

      goToNextPlayer();

    }, 100);

    return (

      <div
        style={{
          height:
            "100vh",

          background:
            "#050505",

          color:
            "white",

          display:
            "flex",

          justifyContent:
            "center",

          alignItems:
            "center",

          flexDirection:
            "column",

          textAlign:
            "center",

          fontFamily:
            "sans-serif",

          padding:
            "20px",
        }}
      >

        <h1
          style={{
            fontSize:
              "80px",

            textShadow:
              "0 0 25px crimson",
          }}
        >
          💊
        </h1>

        <h2
          style={{
            marginTop:
              "20px",

            fontSize:
              "42px",
          }}
        >
          {
            currentTurnPlayer
              .playerName
          }
        </h2>

        <p
          style={{
            marginTop:
              "20px",

            color:
              "#999",

            fontSize:
              "24px",

            lineHeight:
              "1.8",
          }}
        >
          استخدم آخر ورقة
          معاه بالفعل…
          <br />

          الليلة دي
          ملوش حركة 😈
        </p>
      </div>
    );

  }

  /*========================اللاعب المسروق========================*/

  if (
    isVictimTurn &&
    controllerPlayer.realRole === "سيد بشرية"
  ) {

    setTimeout(() => {

      goToNextPlayer();

    }, 100);

    return (

      <div
        style={{
          height:
            "100vh",

          background:
            "#050505",

          color:
            "white",

          display:
            "flex",

          justifyContent:
            "center",

          alignItems:
            "center",

          flexDirection:
            "column",

          textAlign:
            "center",

          fontFamily:
            "sans-serif",

          padding:
            "20px",
        }}
      >

        <h1
          style={{
            fontSize:
              "70px",

            color:
              "crimson",

            textShadow:
              "0 0 20px crimson",
          }}
        >
          😈
        </h1>

        <h2
          style={{
            marginTop:
              "20px",

            fontSize:
              "42px",
          }}
        >
          اسند ضهرك يا نجم
        </h2>

        <p
          style={{
            marginTop:
              "15px",

            fontSize:
              "24px",

            color:
              "#999",
          }}
        >
          دورك اتلعب بيه الليلة
        </p>
      </div>
    );

  }

  /*========================كريم كوشة========================*/

  const removedAction = nightActions.find((action) =>

    action.action ===
    "removeFromNight" &&

    action.target ===
    currentTurnPlayer
      .playerName
  );

  if (removedAction) {

    setTimeout(() => {

      goToNextPlayer();

    }, 100);

    return (

      <div
        style={{
          height:
            "100vh",

          background:
            "#050505",

          color:
            "white",

          display:
            "flex",

          justifyContent:
            "center",

          alignItems:
            "center",

          flexDirection:
            "column",

          textAlign:
            "center",

          fontFamily:
            "sans-serif",

          padding:
            "20px",
        }}
      >

        <h1
          style={{
            fontSize:
              "55px",

            color:
              "crimson",

            textShadow:
              "0 0 20px crimson",
          }}
        >
          🚫
        </h1>

        <h2
          style={{
            marginTop:
              "20px",

            fontSize:
              "38px",
          }}
        >
          {
            currentTurnPlayer
              .playerName
          }
        </h2>

        <p
          style={{
            marginTop:
              "15px",

            fontSize:
              "24px",

            color:
              "#999",
          }}
        >
          اختفى الليلة 😈
        </p>
      </div>
    );

  }

  /*========================وحيد الفاجر========================*/

  const cancelledAction = nightActions.find((action) =>

    action.action ===
    "cancelRole" &&

    action.target ===
    currentTurnPlayer
      .playerName
  );

  /*========================ذيكو========================*/

  const fakeUIAction = nightActions.find((action) =>

    action.action ===
    "fakeUI" &&

    action.target ===
    currentTurnPlayer
      .playerName
  );

  /*========================الدور الحالي========================*/

  let role = currentTurnPlayer.realRole;

  if (secondaryRoleData) {
    role = secondaryRoleData.role;
  }

  /*========================الشاشة الحالية========================*/

  const RoleScreen = roleScreens[role];

  /*========================Fake Players========================*/

  let displayedPlayers = [...nightPlayers];

  if (fakeUIAction) {

    displayedPlayers =
      [...nightPlayers]
        .sort(
          () =>
            Math.random() - 0.5
        )
        .map((player) => ({

          ...player,

          playerName:

            Math.random() >
              0.5

              ? player.playerName

              : nightPlayers[
                Math.floor(
                  Math.random() *
                  nightPlayers.length
                )
              ].playerName,
        }));

  }

  /*========================تااااكس========================*/

  if (taxTriggered) {

    setTimeout(() => {

      setTaxTriggered(
        false
      );

      setShowRoleScreen(
        false
      );

      goToNextPlayer();

    }, 1700);

    return (

      <div
        style={{
          height:
            "100vh",

          background:
            "#050505",

          color:
            "white",

          display:
            "flex",

          justifyContent:
            "center",

          alignItems:
            "center",

          flexDirection:
            "column",

          fontFamily:
            "sans-serif",
        }}
      >

        <h1
          style={{
            fontSize:
              "120px",

            color:
              "crimson",

            textShadow:
              "0 0 40px crimson",

            transform:
              "rotate(-6deg)",
          }}
        >
          ✋ تااااكس
        </h1>

        <p
          style={{
            marginTop:
              "20px",

            fontSize:
              "28px",

            color:
              "#999",
          }}
        >
          دورك اتلغى الليلة 😈
        </p>
      </div>
    );

  }

  return (

    <div>

      {!showRoleScreen ? (

        <div
          style={{
            height:
              "100vh",

            background:
              fakeUIAction
                ? "#120505"
                : "#050505",

            color:
              "white",

            display:
              "flex",

            justifyContent:
              "center",

            alignItems:
              "center",

            flexDirection:
              "column",

            textAlign:
              "center",

            fontFamily:
              "sans-serif",

            padding:
              "20px",
          }}
        >

          <h1
            style={{
              fontSize:
                "45px",

              textShadow:
                "0 0 20px crimson",
            }}
          >
            ادّي الموبايل لـ
          </h1>

          <h2
            style={{
              marginTop:
                "25px",

              fontSize:
                "60px",

              color:
                "crimson",
            }}
          >
            {
              secondaryRoleData ? secondaryRoleData.player.playerName : controllerPlayer.playerName
            }
          </h2>

          {(() => {
            const isOriginal = secondaryRoleData && secondaryRoleData.player !== controllerPlayer;
            const isStolen = secondaryRoleData || currentPlayerHijacked;
            return isOriginal ? (
              <p
                style={{
                  marginTop:
                    "20px",

                  color:
                    "crimson",

                  fontSize:
                    "24px",
                }}
              >
                دورك الأصلي 😈
              </p>
            ) : isStolen ? (
              <p
                style={{
                  marginTop:
                    "20px",

                  color:
                    "crimson",

                  fontSize:
                    "24px",
                }}
              >
                😈 دور مسروق
              </p>
            ) : null;
          })()}

          <button
            onClick={() =>
              setShowRoleScreen(
                true
              )
            }

            style={{
              marginTop:
                "60px",

              background:
                "crimson",

              border:
                "none",

              color:
                "white",

              padding:
                "20px 45px",

              borderRadius:
                "20px",

              fontSize:
                "24px",

              cursor:
                "pointer",

              boxShadow:
                "0 0 20px crimson",
            }}
          >
            افتح دورك 😈
          </button>
        </div>

      ) : (

        <div
          onClick={() => {

            if (
              cancelledAction &&
              !taxTriggered
            ) {

              setTaxTriggered(
                true
              );
            }
          }}
        >

          {pressureAction &&
            !decisionConfirmed && (

              <div
                style={{
                  position:
                    "fixed",

                  top:
                    "20px",

                  right:
                    "20px",

                  background:
                    "crimson",

                  color:
                    "white",

                  padding:
                    "18px 28px",

                  borderRadius:
                    "20px",

                  fontSize:
                    "32px",

                  zIndex:
                    99999,

                  boxShadow:
                    "0 0 20px crimson",
                }}
              >
                ⏳
                {" "}
                {pressureTimer}
              </div>
            )}

          {RoleScreen && (

            <RoleScreen
              currentPlayer={
                effectivePlayer
              }

              allPlayers={
                displayedPlayers
              }

              addNightAction={
                cancelledAction

                  ? () => { }

                  : (...args) => {

                    setDecisionConfirmed(
                      true
                    );

                    addNightAction(
                      ...args
                    );

                    const action = args[0];

                    if (
                      action.action ===
                      "steal" ||
                      action.action ===
                      "copy"
                    ) {

                      const tp =
                        nightPlayers.find(
                          (p) =>
                            p.playerName ===
                            action.target
                        );

                      setTargetPlayer(tp);

                      setSecondaryRoleData({
                        role: tp.realRole,
                        player: controllerPlayer,
                      });

                      setShowRoleScreen(
                        false
                      );
                    }
                  }
              }

              nightActions={
                nightActions
              }

              roleOwner={
                secondaryRoleData
                  ? (
                    secondaryRoleData.player ===
                    controllerPlayer
                      ? roleOwnerPlayer.playerName
                      : null
                  )
                  : roleHijacked
                  ? roleOwnerPlayer.playerName
                  : null
              }
            />
          )}

          {!cancelledAction && (

            <button
              onClick={() => {

                if (
                  !decisionConfirmed
                ) {

                  return;
                }

                if (secondaryRoleData) {
                  if (
                    controllerPlayer.realRole ===
                    "شعبطة" &&
                    secondaryRoleData.player.playerName ===
                    controllerPlayer.playerName
                  ) {
                    setSecondaryRoleData({
                      role: targetPlayer.realRole,
                      player: targetPlayer,
                    });
                  } else {
                    setSecondaryRoleData(null);
                    setTargetPlayer(null);
                  }
                  setShowRoleScreen(false);
                  goToNextPlayer();
                } else {
                  setShowRoleScreen(false);
                  goToNextPlayer();
                }
              }}

              disabled={
                !decisionConfirmed
              }

              style={{
                position:
                  "fixed",

                bottom:
                  "20px",

                left:
                  "20px",

                background:

                  decisionConfirmed

                    ? "crimson"

                    : "#333",

                border:
                  "none",

                color:

                  decisionConfirmed

                    ? "white"

                    : "#777",

                padding:
                  "18px 30px",

                borderRadius:
                  "18px",

                fontSize:
                  "22px",

                cursor:

                  decisionConfirmed

                    ? "pointer"

                    : "not-allowed",

                zIndex:
                  9999,

                boxShadow:

                  decisionConfirmed

                    ? "0 0 20px crimson"

                    : "none",

                transition:
                  "0.2s",
              }}
            >
              التالي 😈
            </button>
          )}
        </div>
      )}
    </div>

  );
}

export default NightScreen;