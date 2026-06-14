import { useState } from "react";

import SplashScreen from "./screens/SplashScreen";

import SettingsScreen from "./screens/SettingsScreen";

import PlayersScreen from "./screens/PlayersScreen";

import ReadyScreen from "./screens/ReadyScreen";

import RoleRevealScreen from "./screens/RoleRevealScreen";

import { resolveNightActions } from "./game/resolveNightActions";

import DiscussionScreen from "./screens/DiscussionScreen";

import MorningScreen from "./screens/MorningScreen";

import NightScreen from "./screens/NightScreen";

import GameOverScreen from "./screens/GameOverScreen";

import EmergencyMeetingScreen from "./screens/EmergencyMeetingScreen";

import { prepareNightData } from "./game/prepareNightData";

import { distributeRoles } from "./game/roleDistribution";

import { checkWinConditions } from "./game/checkWinConditions";

function App() {
  const [screen, setScreen] = useState("splash");

  const [playerCount, setPlayerCount] = useState(5);

  const [discussionTime, setDiscussionTime] = useState(3);

  /*
    ========================
    Game State الحقيقي
    ========================
  */

  const [players, setPlayers] = useState([]);

  const [playersState, setPlayersState] = useState([]);

  const [assignedRoles, setAssignedRoles] = useState([]);

  const [nightPlayers, setNightPlayers] = useState([]);

  const [currentNightIndex, setCurrentNightIndex] = useState(0);

  const [nightActions, setNightActions] = useState([]);

  const [stolenRoles, setStolenRoles] = useState([]);

  const [officerMessages, setOfficerMessages] = useState([]);

  const [pendingOfficerMessages, setPendingOfficerMessages] = useState([]);

  /*
    ========================
    اجتماع العصابة
    ========================
  */

  const [meetingTriggered, setMeetingTriggered] = useState(false);

  /*
    ========================
    مين لعب بالفعل
    ========================
  */

  const [playedPlayers, setPlayedPlayers] = useState([]);

  const [nightResult, setNightResult] = useState(null);

  const [gameResult, setGameResult] = useState(null);

  /*
    ========================
    تسجيل الأكشنات
    ========================
  */

  const addNightAction = (action) => {
    /*
        سيد بشرية
      */

    if (action.action === "stealRole") {
      setStolenRoles((prev) => [...prev, action]);
    }

    if (action.action === "intel" || action.action === "stealIntel") {
      setPendingOfficerMessages((prev) => [...prev, action]);
    }

    setNightActions((prev) => [...prev, action]);
  };

  /*
    ========================
    توزيع الأدوار
    ========================
  */

  const startRoleDistribution = () => {
    const roles = distributeRoles(playerCount);

    setAssignedRoles(roles);

    /*
        أول Game State
      */

    const initialPlayers = players.map((player, index) => ({
      playerName: player,

      role: roles[index]?.realRole,

      disguise: roles[index]?.disguise,

      alive: true,

      jailed: false,

      muted: false,

      insane: false,

      /*
              ========================
              استخدامات خاصة
              ========================
            */

      bulletCount: 1,

      oneTimeUsed: roles[index]?.oneTimeUsed,

      delayedBlock: false,

      delayedRemoveFromNight: false,
    }));

    setPlayersState(initialPlayers);

    setScreen("roles");
  };

  /*
    ========================
    بداية الليل
    ========================
  */

  const startNight = () => {
    /*
      اللاعبين الأحياء فقط
    */

    const alivePlayers = playersState.filter((player) => player.alive);

    const preparedPlayers = prepareNightData(
      alivePlayers.map((player) => ({
        playerName: player.playerName,

        realRole: player.role,

        disguise: player.disguise,

        alive: player.alive,

        /*
              ========================
              الاستخدامات الخاصة
              ========================
            */
        bulletCount: player.bulletCount,

        oneTimeUsed: player.oneTimeUsed,

        delayedBlock: player.delayedBlock,

        delayedRemoveFromNight: player.delayedRemoveFromNight,
      })),
    );

    setOfficerMessages(pendingOfficerMessages);

    setPendingOfficerMessages([]);

    setNightPlayers(preparedPlayers);

    setCurrentNightIndex(0);

    setNightActions([]);

    setStolenRoles([]);

    setPlayedPlayers([]);

    setMeetingTriggered(false);

    setScreen("night");
  };

  /*
    ========================
    إقصاء لاعب
    ========================
  */

  const eliminatePlayer = (playerName) => {
    const updatedPlayers = playersState.map((player) => {
      if (player.playerName === playerName) {
        return {
          ...player,

          alive: false,
        };
      }

      return player;
    });

    setPlayersState(updatedPlayers);

    /*
        ========================
        Win Conditions
        ========================
      */

    const winResult = checkWinConditions(updatedPlayers, nightResult);

    if (winResult) {
      setGameResult(winResult);

      setScreen("gameOver");

      return;
    }

    setScreen("discussion");
  };

  /*
    ========================
    التالي
    ========================
  */

  const goToNextNightPlayer = () => {
    console.log("CURRENT INDEX:", currentNightIndex);

    console.log("CURRENT PLAYER:", nightPlayers[currentNightIndex]?.playerName);
    /*
        تسجيل اللاعب الحالي
      */

    const currentPlayer = nightPlayers[currentNightIndex];

    if (currentPlayer) {
      setPlayedPlayers((prev) => [...prev, currentPlayer.playerName]);
    }

    let nextIndex = currentNightIndex + 1;

    while (nextIndex < nightPlayers.length) {
      const nextPlayer = nightPlayers[nextIndex];

      /*
          كريم كوشة
        */

      const removedPlayer = nightActions.find(
        (action) =>
          action.action === "removeFromNight" &&
          action.target === nextPlayer?.playerName,
      );

      /*
          سيد بشرية
        */

      const stolenPlayer = stolenRoles.find(
        (action) => action.target === nextPlayer?.playerName,
      );

      /*
          صبحي صيدلية
        */

      const sobhyUsed =
        nextPlayer?.realRole === "صبحي صيدلية" &&
        nextPlayer?.oneTimeUsed === true;

      const delayedRemovedPlayer = nextPlayer?.delayedRemoveFromNight === true;

      /*
          Skip
        */

      if (removedPlayer || delayedRemovedPlayer || sobhyUsed) {
        nextIndex++;
      } else {
        break;
      }
    }

    /*
        نهاية الليل
      */

    if (nextIndex >= nightPlayers.length) {
      const result = resolveNightActions(nightActions, playersState);

      /*
          تحديث الحالات
        */

      const updatedPlayersState = playersState.map((player) => {
        let updatedPlayer = {
          ...player,
        };

        if (updatedPlayer.delayedBlock) {
          updatedPlayer.delayedBlock = false;
        }

        const delayedRemoveAction = nightActions.find(
          (action) =>
            action.action === "delayedRemove" &&
            action.target === player.playerName,
        );

        if (delayedRemoveAction) {
          updatedPlayer.delayedBlock = true;
        }

        if (updatedPlayer.delayedRemoveFromNight) {
          updatedPlayer.delayedRemoveFromNight = false;
        }

        const delayedNightRemoveAction = nightActions.find(
          (action) =>
            action.action === "delayedRemoveFromNight" &&
            action.target === player.playerName,
        );

        if (delayedNightRemoveAction) {
          updatedPlayer.delayedRemoveFromNight = true;
        }

        /*
        ========================
            قتل
        ========================
        */

        if (player.playerName === result.saherBulletConsumed) {
          updatedPlayer.bulletCount = 0;
        }

        if (player.playerName === result.killedPlayer) {
          updatedPlayer.alive = false;
        }

        /*
                ========================
                قبض
                ========================
              */

        if (player.playerName === result.arrestedPlayer) {
          updatedPlayer.alive = false;

          updatedPlayer.jailed = true;
        }

        if (player.playerName === result.houdaSacrificePlayer) {
          updatedPlayer.alive = false;
        }

        /*
  ========================
  عبقرينو
  ========================
*/

        if (player.playerName === result.failedPuzzlePlayer) {
          updatedPlayer.alive = false;
        }

        /*
                ========================
                صبحي استخدم قدرته
                ========================
              */

        if (player.playerName === result.meetingActor) {
          updatedPlayer.oneTimeUsed = true;
        }

        return updatedPlayer;
      });

      setPlayersState(updatedPlayersState);

      setNightResult(result);

      /*
          ========================
          اجتماع العصابة
          ========================
        */

      if (result.meetingTriggered) {
        setMeetingTriggered(true);
      }

      /*
          ========================
          Win Conditions
          ========================
        */

      const winResult = checkWinConditions(updatedPlayersState, result);

      if (winResult) {
        setGameResult(winResult);

        setScreen("gameOver");

        return;
      }

      setScreen("morning");

      return;
    }

    console.log("NEXT INDEX:", nextIndex);

    console.log("NEXT PLAYER:", nightPlayers[nextIndex]?.playerName);

    setCurrentNightIndex(nextIndex);
  };

  return (
    <>
      {screen === "splash" && (
        <SplashScreen goToSettings={() => setScreen("settings")} />
      )}

      {screen === "settings" && (
        <SettingsScreen
          playerCount={playerCount}
          setPlayerCount={setPlayerCount}
          discussionTime={discussionTime}
          setDiscussionTime={setDiscussionTime}
          goToPlayers={() => setScreen("players")}
        />
      )}

      {screen === "players" && (
        <PlayersScreen
          playerCount={playerCount}
          players={players}
          setPlayers={setPlayers}
          goToReady={() => setScreen("ready")}
        />
      )}

      {screen === "ready" && <ReadyScreen startGame={startRoleDistribution} />}

      {screen === "roles" && (
        <RoleRevealScreen
          players={players}
          assignedRoles={assignedRoles}
          goToDiscussion={() => setScreen("discussion")}
        />
      )}

      {screen === "discussion" && (
        <DiscussionScreen
          discussionTime={discussionTime}
          goToNight={startNight}
        />
      )}

      {screen === "night" && (
        <NightScreen
          currentTurnPlayer={nightPlayers[currentNightIndex]}
          nightPlayers={nightPlayers}
          playedPlayers={playedPlayers}
          goToNextPlayer={goToNextNightPlayer}
          addNightAction={addNightAction}
          nightActions={nightActions}
          stolenRoles={stolenRoles}
          officerMessages={officerMessages}
        />
      )}

      {screen === "morning" && (
        <MorningScreen
          nightResult={nightResult}
          meetingTriggered={meetingTriggered}
          goToDiscussion={() => {
            if (meetingTriggered) {
              setScreen("meeting");
            } else {
              setScreen("discussion");
            }
          }}
        />
      )}

      {screen === "meeting" && (
        <EmergencyMeetingScreen
          playersState={playersState}
          eliminatePlayer={eliminatePlayer}
        />
      )}

      {screen === "gameOver" && (
        <GameOverScreen gameResult={gameResult} playersState={playersState} />
      )}
    </>
  );
}

export default App;
