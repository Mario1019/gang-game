import { useEffect, useState } from "react";

import { roleScreens } from "./roleScreens";

function NightScreen({
  currentTurnPlayer,

  nightPlayers,

  playedPlayers = [],

  goToNextPlayer,

  addNightAction,

  nightActions,

  stolenRoles = [],

  officerMessages = [],
}) {
  console.log("NightScreen Rendered");

  const [showRoleScreen, setShowRoleScreen] = useState(false);

  const [taxTriggered, setTaxTriggered] = useState(false);

  const [decisionConfirmed, setDecisionConfirmed] = useState(false);

  const [secondaryDecisionConfirmed, setSecondaryDecisionConfirmed] =
    useState(false);

  const [pressureTimer, setPressureTimer] = useState(30);

  const [isSecondaryPhase, setIsSecondaryPhase] = useState(false);

  const [secondaryRoleData, setSecondaryRoleData] = useState(null);

  const [targetPlayer, setTargetPlayer] = useState(null);

  const [showVictimScreen, setShowVictimScreen] = useState(false);

  /*========================لو اللاعب الحالياستخدم قدرته========================*/

  const oneTimeAbilityUsed =
    currentTurnPlayer?.realRole === "صبحي صيدلية" &&
    currentTurnPlayer?.oneTimeUsed === true;

  /*========================هل اللاعب الحالي متحكم فيه؟========================*/

  /*
  ========================
  سيد بشرية
  ========================
  */

  const currentPlayerHijacked = stolenRoles.find(
    (action) => action.target === currentTurnPlayer?.playerName,
  );

  /*
  ========================
  شعبطة
  ========================
  */

  const sha3bataCopyAction = nightActions.find(
    (action) =>
      action.action === "copyResult" &&
      action.target === currentTurnPlayer?.playerName &&
      !action.alreadyPlayed,
  );

  /*
  ========================
  هل الدور متحكم فيه؟
  ========================
  */

  const roleHijacked = currentPlayerHijacked;

  /*
  ========================
  مين المتحكم الحقيقي؟
  ========================
  */

  let controllerPlayer = currentTurnPlayer;

  /*
  ========================
  مين صاحب الدور الحقيقي؟
  ========================
  */

  let roleOwnerPlayer = currentTurnPlayer;

  /*
  ========================
  سيد بشرية / شعبطة
  ========================
  */

  if (currentPlayerHijacked) {
    const hijacker = nightPlayers.find(
      (player) => player.playerName === roleHijacked.actor,
    );

    if (hijacker) {
      controllerPlayer = hijacker;
    }
  }

  /*
  ========================
  هل الحالي هو الضحية؟
  ========================
  */

  const isVictimTurn =
    currentPlayerHijacked &&
    currentTurnPlayer?.playerName === currentPlayerHijacked?.target;

  /*
  ========================
  هل الحالي هو سيد نفسه؟
  ========================
  */

  const isSayedPlaying =
    currentPlayerHijacked &&
    controllerPlayer?.playerName === currentTurnPlayer?.playerName;

  /*
  ========================
  لو شعبطة → اللاعب الحقيقي يكمل
  لو سيد → سيد يلعب بداله
  ========================
  */

  let effectivePlayer = currentPlayerHijacked
    ? controllerPlayer
    : currentTurnPlayer;

  if (secondaryRoleData) {
    effectivePlayer = secondaryRoleData.player;
  }

  /*========================مفاتن========================*/

  const pressureAction = nightActions.find(
    (action) =>
      (action.action === "pressureChoice" ||
        action.action === "quickDecision") &&
      action.target === currentTurnPlayer?.playerName,
  );

  /*========================مدة الضغط========================*/

  const pressureDuration = pressureAction?.duration || 30;

  /*========================تايمر مفاتن========================*/

  useEffect(() => {
    const confirmed = secondaryRoleData
      ? secondaryDecisionConfirmed
      : decisionConfirmed;

    if (!showRoleScreen || !pressureAction || confirmed) {
      return;
    }

    if (pressureTimer <= 0) {
      setShowRoleScreen(false);

      goToNextPlayer();

      return;
    }

    const timer = setTimeout(() => {
      setPressureTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    pressureTimer,

    pressureAction,

    decisionConfirmed,

    secondaryDecisionConfirmed,

    secondaryRoleData,

    showRoleScreen,

    goToNextPlayer,
  ]);

  /*========================reset========================*/

  useEffect(() => {
    setDecisionConfirmed(false);

    setPressureTimer(pressureDuration);

    setIsSecondaryPhase(false);

    setSecondaryRoleData(null);

    setShowRoleScreen(false);

    setTargetPlayer(null);

    setSecondaryDecisionConfirmed(false);

    setShowVictimScreen(false);

    console.log("TURN CHANGED:", currentTurnPlayer?.playerName);

    console.log("SHOW ROLE SCREEN:", showRoleScreen);
  }, [currentTurnPlayer, pressureDuration]);

  /*========================لو الليل خلص========================*/

  if (!currentTurnPlayer) {
    return (
      <div
        style={{
          height: "100vh",

          background: "#000",

          color: "white",

          display: "flex",

          justifyContent: "center",

          alignItems: "center",

          fontSize: "50px",

          fontFamily: "sans-serif",
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
          height: "100vh",

          background: "#050505",

          color: "white",

          display: "flex",

          justifyContent: "center",

          alignItems: "center",

          flexDirection: "column",

          textAlign: "center",

          fontFamily: "sans-serif",

          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "80px",

            textShadow: "0 0 25px crimson",
          }}
        >
          💊
        </h1>

        <h2
          style={{
            marginTop: "20px",

            fontSize: "42px",
          }}
        >
          {currentTurnPlayer.playerName}
        </h2>

        <p
          style={{
            marginTop: "20px",

            color: "#999",

            fontSize: "24px",

            lineHeight: "1.8",
          }}
        >
          استخدم آخر ورقة معاه بالفعل…
          <br />
          الليلة دي ملوش حركة 😈
        </p>
      </div>
    );
  }

  /*========================اللاعب المسروق========================*/

  console.log("VICTIM CHECK", {
    current: currentTurnPlayer?.playerName,
    hijacked: currentPlayerHijacked,
    controller: controllerPlayer?.realRole,
    isVictimTurn,
  });

  /*========================كريم كوشة========================*/

  const removedAction = nightActions.find(
    (action) =>
      action.action === "removeFromNight" &&
      action.target === currentTurnPlayer.playerName,
  );

  if (removedAction) {
    setTimeout(() => {
      goToNextPlayer();
    }, 100);

    return (
      <div
        style={{
          height: "100vh",

          background: "#050505",

          color: "white",

          display: "flex",

          justifyContent: "center",

          alignItems: "center",

          flexDirection: "column",

          textAlign: "center",

          fontFamily: "sans-serif",

          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "55px",

            color: "crimson",

            textShadow: "0 0 20px crimson",
          }}
        >
          🚫
        </h1>

        <h2
          style={{
            marginTop: "20px",

            fontSize: "38px",
          }}
        >
          {currentTurnPlayer.playerName}
        </h2>

        <p
          style={{
            marginTop: "15px",

            fontSize: "24px",

            color: "#999",
          }}
        >
          اختفى الليلة 😈
        </p>
      </div>
    );
  }

  /*========================وحيد الفاجر========================*/

  const cancelledAction = nightActions.find(
    (action) =>
      action.action === "cancelRole" &&
      action.target === currentTurnPlayer.playerName,
  );

  /*========================ذيكو========================*/

  const fakeUIAction = nightActions.find(
    (action) =>
      action.action === "fakeUI" &&
      action.target === currentTurnPlayer.playerName,
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
    displayedPlayers = [...nightPlayers]
      .sort(() => Math.random() - 0.5)
      .map((player) => ({
        ...player,

        playerName:
          Math.random() > 0.5
            ? player.playerName
            : nightPlayers[Math.floor(Math.random() * nightPlayers.length)]
                .playerName,
      }));
  }

  /*========================تااااكس========================*/

  if (taxTriggered) {
    setTimeout(() => {
      setTaxTriggered(false);

      setShowRoleScreen(false);

      goToNextPlayer();
    }, 1700);

    return (
      <div
        style={{
          height: "100vh",

          background: "#050505",

          color: "white",

          display: "flex",

          justifyContent: "center",

          alignItems: "center",

          flexDirection: "column",

          fontFamily: "sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: "120px",

            color: "crimson",

            textShadow: "0 0 40px crimson",

            transform: "rotate(-6deg)",
          }}
        >
          ✋ تااااكس
        </h1>

        <p
          style={{
            marginTop: "20px",

            fontSize: "28px",

            color: "#999",
          }}
        >
          دورك اتلغى الليلة 😈
        </p>
      </div>
    );
  }

  if (showVictimScreen) {
    return (
      <div
        style={{
          height: "100vh",
          background: "#050505",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          fontFamily: "sans-serif",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "70px",
            color: "crimson",
            textShadow: "0 0 20px crimson",
          }}
        >
          😈
        </h1>

        <h2
          style={{
            marginTop: "20px",
            fontSize: "42px",
          }}
        >
          اسند ضهرك يا نجم
        </h2>

        <p
          style={{
            marginTop: "20px",
            fontSize: "24px",
            color: "#999",
          }}
        >
          دورك اتلعب بيه الليلة
        </p>

        <button
          onClick={() => {
            setShowVictimScreen(false);

            goToNextPlayer();
          }}
          style={{
            marginTop: "40px",
            background: "crimson",
            border: "none",
            color: "white",
            padding: "20px 45px",
            borderRadius: "20px",
            fontSize: "24px",
            cursor: "pointer",
            boxShadow: "0 0 20px crimson",
          }}
        >
          التالي 😈
        </button>
      </div>
    );
  }

  return (
    <div>
      {!showRoleScreen ? (
        <div
          style={{
            height: "100vh",

            background: fakeUIAction ? "#120505" : "#050505",

            color: "white",

            display: "flex",

            justifyContent: "center",

            alignItems: "center",

            flexDirection: "column",

            textAlign: "center",

            fontFamily: "sans-serif",

            padding: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "45px",

              textShadow: "0 0 20px crimson",
            }}
          >
            {secondaryRoleData
              ? "تمت السرقة بنجاح 😈"
              : "ادّي الموبايل لـ"}{" "}
          </h1>

          <h2
            style={{
              marginTop: "25px",

              fontSize: "60px",

              color: "crimson",
            }}
          >
            {secondaryRoleData
              ? secondaryRoleData.role
              : currentTurnPlayer.playerName}
          </h2>

          <button
            onClick={() => {
              if (isVictimTurn && controllerPlayer.realRole === "سيد بشرية") {
                setShowVictimScreen(true);

                return;
              }

              setShowRoleScreen(true);
            }}
            style={{
              marginTop: "60px",

              background: "crimson",

              border: "none",

              color: "white",

              padding: "20px 45px",

              borderRadius: "20px",

              fontSize: "24px",

              cursor: "pointer",

              boxShadow: "0 0 20px crimson",
            }}
          >
            افتح دورك 😈
          </button>
        </div>
      ) : currentTurnPlayer?.delayedBlock ? (
        <div
          style={{
            height: "100vh",
            background: "#050505",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            fontFamily: "sans-serif",
          }}
        >
          <h1
            style={{
              fontSize: "70px",
              color: "crimson",
            }}
          >
            ⛔
          </h1>

          <h2>{currentTurnPlayer.playerName}</h2>

          <p
            style={{
              color: "#999",
              fontSize: "24px",
            }}
          >
            زناتي سبقك بخطوة 😈
          </p>

          <button
            onClick={() => {
              setShowRoleScreen(false);
              goToNextPlayer();
            }}
            style={{
              marginTop: "40px",
              background: "crimson",
              border: "none",
              color: "white",
              padding: "20px 45px",
              borderRadius: "20px",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            التالي 😈
          </button>
        </div>
      ) : (
        <div
          onClick={() => {
            if (cancelledAction && !taxTriggered) {
              setTaxTriggered(true);
            }
          }}
        >
          {pressureAction && !decisionConfirmed && (
            <div
              style={{
                position: "fixed",

                top: "20px",

                right: "20px",

                background: "crimson",

                color: "white",

                padding: "18px 28px",

                borderRadius: "20px",

                fontSize: "32px",

                zIndex: 99999,

                boxShadow: "0 0 20px crimson",
              }}
            >
              ⏳ {pressureTimer}
            </div>
          )}

          {RoleScreen && (
            <RoleScreen
              startSecondaryRolePhase={(data) => {
                setSecondaryRoleData(data);
                setShowRoleScreen(true);
              }}
              currentPlayer={effectivePlayer}
              allPlayers={displayedPlayers}
              addNightAction={
                cancelledAction
                  ? () => {}
                  : (...args) => {
                      console.log("ADD ACTION", args);
                      if (secondaryRoleData) {
                        setSecondaryDecisionConfirmed(true);
                      } else {
                        setDecisionConfirmed(true);
                      }

                      addNightAction(...args);

                      const action = args[0];

                      if (
                        action.action === "stealRole" ||
                        action.action === "copyResult"
                      ) {
                        const tp = nightPlayers.find(
                          (p) => p.playerName === action.target,
                        );

                        console.log("TARGET PLAYER:", tp);

                        setTargetPlayer(tp);

                        const undercoverPoliceRoles = [
                          "تيسير بيه",
                          "أبو منة",
                          "حودة الغلبان",
                        ];

                        console.log("STEAL DEBUG:", {
                          playerName: tp.playerName,
                          realRole: tp.realRole,
                          disguise: tp.disguise,
                        });

                        setSecondaryRoleData({
                          role: tp.disguise || tp.realRole,
                          player: controllerPlayer,
                        });

                        console.log("SECONDARY ROLE SET:", tp.realRole);

                        setShowRoleScreen(false);
                      }
                    }
              }
              nightActions={nightActions}
              officerMessages={officerMessages}
              roleOwner={
                secondaryRoleData
                  ? secondaryRoleData.player === controllerPlayer
                    ? roleOwnerPlayer.playerName
                    : null
                  : roleHijacked
                    ? roleOwnerPlayer.playerName
                    : null
              }
            />
          )}

          {!cancelledAction && (
            <button
              onClick={() => {
                const isSecondary = !!secondaryRoleData;

                const currentConfirmed = isSecondary
                  ? secondaryDecisionConfirmed
                  : decisionConfirmed;

                if (!currentConfirmed) {
                  return;
                }

                /*
                  ========================
                  Secondary Phase
                  ========================
                */

                if (isSecondary) {
                  setSecondaryRoleData(null);

                  setTargetPlayer(null);

                  setSecondaryDecisionConfirmed(false);

                  setShowRoleScreen(false);

                  console.log(
                    "NEXT PLAYER CLICKED",
                    currentTurnPlayer?.playerName,
                    currentTurnPlayer?.realRole,
                  );

                  goToNextPlayer();

                  return;
                }

                /*
                  ========================
                  Normal Phase
                  ========================
                */

                setShowRoleScreen(false);

                goToNextPlayer();
              }}
              disabled={
                !(secondaryRoleData
                  ? secondaryDecisionConfirmed
                  : decisionConfirmed)
              }
              style={{
                position: "fixed",

                bottom: "20px",

                left: "20px",

                background: (
                  secondaryRoleData
                    ? secondaryDecisionConfirmed
                    : decisionConfirmed
                )
                  ? "crimson"
                  : "#333",

                border: "none",

                color: (
                  secondaryRoleData
                    ? secondaryDecisionConfirmed
                    : decisionConfirmed
                )
                  ? "white"
                  : "#777",

                padding: "18px 30px",

                borderRadius: "18px",

                fontSize: "22px",

                cursor: (
                  secondaryRoleData
                    ? secondaryDecisionConfirmed
                    : decisionConfirmed
                )
                  ? "pointer"
                  : "not-allowed",

                zIndex: 9999,

                boxShadow: (
                  secondaryRoleData
                    ? secondaryDecisionConfirmed
                    : decisionConfirmed
                )
                  ? "0 0 20px crimson"
                  : "none",

                transition: "0.2s",
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
