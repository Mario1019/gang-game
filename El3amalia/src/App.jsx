import { useState }
from "react";

import SplashScreen
from "./screens/SplashScreen";

import SettingsScreen
from "./screens/SettingsScreen";

import PlayersScreen
from "./screens/PlayersScreen";

import ReadyScreen
from "./screens/ReadyScreen";

import RoleRevealScreen
from "./screens/RoleRevealScreen";

import { resolveNightActions }
from "./game/resolveNightActions";

import DiscussionScreen
from "./screens/DiscussionScreen";

import MorningScreen
from "./screens/MorningScreen";

import NightScreen
from "./screens/NightScreen";

import GameOverScreen
from "./screens/GameOverScreen";

import EmergencyMeetingScreen
from "./screens/EmergencyMeetingScreen";

import { prepareNightData }
from "./game/prepareNightData";

import { distributeRoles }
from "./game/roleDistribution";

import { checkWinConditions }
from "./game/checkWinConditions";

function App() {

  const [screen, setScreen] =
    useState("splash");

  const [playerCount,
  setPlayerCount] =
    useState(5);

  const [discussionTime,
  setDiscussionTime] =
    useState(3);

  /*
    ========================
    Game State الحقيقي
    ========================
  */

  const [players,
  setPlayers] =
    useState([]);

  const [playersState,
  setPlayersState] =
    useState([]);

  const [assignedRoles,
  setAssignedRoles] =
    useState([]);

  const [nightPlayers,
  setNightPlayers] =
    useState([]);

  const [currentNightIndex,
  setCurrentNightIndex] =
    useState(0);

  const [nightActions,
  setNightActions] =
    useState([]);

  const [stolenRoles,
  setStolenRoles] =
    useState([]);

  /*
    ========================
    اجتماع العصابة
    ========================
  */

  const [meetingTriggered,
  setMeetingTriggered] =
    useState(false);

  /*
    ========================
    مين لعب بالفعل
    ========================
  */

  const [playedPlayers,
  setPlayedPlayers] =
    useState([]);

  const [nightResult,
  setNightResult] =
    useState(null);

  const [gameResult,
  setGameResult] =
    useState(null);

  /*
    ========================
    تسجيل الأكشنات
    ========================
  */

  const addNightAction =
    (action) => {

      /*
        سيد بشرية
      */

      if (
        action.action ===
        "stealRole"
      ) {

        setStolenRoles(
          (prev) => [
            ...prev,
            action,
          ]
        );
      }

      setNightActions(
        (prev) => [
          ...prev,
          action,
        ]
      );
    };

  /*
    ========================
    توزيع الأدوار
    ========================
  */

  const startRoleDistribution =
    () => {

      const roles =
        distributeRoles(
          playerCount
        );

      setAssignedRoles(
        roles
      );

      /*
        أول Game State
      */

      const initialPlayers =

        players.map(
          (
            player,
            index
          ) => ({

            playerName:
              player,

            role:
              roles[index]
                ?.realRole,

            disguise:
              roles[index]
                ?.disguise,

            alive: true,

            jailed: false,

            muted: false,

            insane: false,

            /*
              ========================
              استخدامات خاصة
              ========================
            */

            oneTimeUsed:
              roles[index]
                ?.oneTimeUsed,
          })
        );

      setPlayersState(
        initialPlayers
      );

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

    const alivePlayers =

      playersState.filter(
        (player) =>

          player.alive
      );

    const preparedPlayers =
      prepareNightData(

        alivePlayers.map(
          (player) => ({
            playerName:
              player.playerName,

            realRole:
              player.role,

            disguise:
              player.disguise,

            alive:
              player.alive,

            /*
              ========================
              الاستخدامات الخاصة
              ========================
            */

            oneTimeUsed:
              player.oneTimeUsed,
          })
        )
      );

    setNightPlayers(
      preparedPlayers
    );

    setCurrentNightIndex(
      0
    );

    setNightActions([]);

    setStolenRoles([]);

    setPlayedPlayers([]);

    setMeetingTriggered(
      false
    );

    setScreen("night");
  };

  /*
    ========================
    إقصاء لاعب
    ========================
  */

  const eliminatePlayer =
    (playerName) => {

      const updatedPlayers =

        playersState.map(
          (player) => {

            if (
              player.playerName ===
              playerName
            ) {

              return {

                ...player,

                alive: false,
              };
            }

            return player;
          }
        );

      setPlayersState(
        updatedPlayers
      );

      /*
        ========================
        Win Conditions
        ========================
      */

      const winResult =

        checkWinConditions(
          updatedPlayers,
          nightResult
        );

      if (winResult) {

        setGameResult(
          winResult
        );

        setScreen(
          "gameOver"
        );

        return;
      }

      setScreen(
        "discussion"
      );
    };

  /*
    ========================
    التالي
    ========================
  */

  const goToNextNightPlayer =
    () => {

      /*
        تسجيل اللاعب الحالي
      */

      const currentPlayer =

        nightPlayers[
          currentNightIndex
        ];

      if (currentPlayer) {

        setPlayedPlayers(
          (prev) => [

            ...prev,

            currentPlayer
              .playerName,
          ]
        );
      }

      let nextIndex =
        currentNightIndex + 1;

      while (
        nextIndex <
        nightPlayers.length
      ) {

        const nextPlayer =
          nightPlayers[
            nextIndex
          ];

        /*
          كريم كوشة
        */

        const removedPlayer =
          nightActions.find(
            (action) =>

              action.action ===
                "removeFromNight" &&

              action.target ===
                nextPlayer
                  ?.playerName
          );

        /*
          سيد بشرية
        */

        const stolenPlayer =
          stolenRoles.find(
            (action) =>

              action.target ===
                nextPlayer
                  ?.playerName
          );

        /*
          صبحي صيدلية
        */

        const sobhyUsed =

          nextPlayer
            ?.realRole ===
              "صبحي صيدلية" &&

          nextPlayer
            ?.oneTimeUsed ===
              true;

        /*
          Skip
        */

        if (
          removedPlayer ||
          stolenPlayer ||
          sobhyUsed
        ) {

          nextIndex++;

        } else {

          break;
        }
      }

      /*
        نهاية الليل
      */

      if (
        nextIndex >=
        nightPlayers.length
      ) {

        const result =
          resolveNightActions(
            nightActions,
            playersState
          );

        /*
          تحديث الحالات
        */

        const updatedPlayersState =

          playersState.map(
            (player) => {

              let updatedPlayer = {

                ...player,
              };

              /*
                ========================
                قتل
                ========================
              */

              if (
                player.playerName ===
                result.killedPlayer
              ) {

                updatedPlayer.alive =
                  false;
              }

              /*
                ========================
                قبض
                ========================
              */

              if (
                player.playerName ===
                result.arrestedPlayer
              ) {

                updatedPlayer.alive =
                  false;

                updatedPlayer.jailed =
                  true;
              }

              /*
                ========================
                صبحي استخدم قدرته
                ========================
              */

              if (
                player.playerName ===
                result.meetingActor
              ) {

                updatedPlayer.oneTimeUsed =
                  true;
              }

              return updatedPlayer;
            }
          );

        setPlayersState(
          updatedPlayersState
        );

        setNightResult(
          result
        );

        /*
          ========================
          اجتماع العصابة
          ========================
        */

        if (
          result.meetingTriggered
        ) {

          setMeetingTriggered(
            true
          );
        }

        /*
          ========================
          Win Conditions
          ========================
        */

        const winResult =

          checkWinConditions(
            updatedPlayersState,
            result
          );

        if (winResult) {

          setGameResult(
            winResult
          );

          setScreen(
            "gameOver"
          );

          return;
        }

        setScreen(
          "morning"
        );

        return;
      }

      setCurrentNightIndex(
        nextIndex
      );
    };

  return (

    <>

      {screen ===
        "splash" && (

        <SplashScreen
          goToSettings={() =>
            setScreen(
              "settings"
            )
          }
        />
      )}

      {screen ===
        "settings" && (

        <SettingsScreen
          playerCount={
            playerCount
          }

          setPlayerCount={
            setPlayerCount
          }

          discussionTime={
            discussionTime
          }

          setDiscussionTime={
            setDiscussionTime
          }

          goToPlayers={() =>
            setScreen(
              "players"
            )
          }
        />
      )}

      {screen ===
        "players" && (

        <PlayersScreen
          playerCount={
            playerCount
          }

          players={players}

          setPlayers={
            setPlayers
          }

          goToReady={() =>
            setScreen(
              "ready"
            )
          }
        />
      )}

      {screen ===
        "ready" && (

        <ReadyScreen
          startGame={
            startRoleDistribution
          }
        />
      )}

      {screen ===
        "roles" && (

        <RoleRevealScreen
          players={players}

          assignedRoles={
            assignedRoles
          }

          goToDiscussion={() =>
            setScreen(
              "discussion"
            )
          }
        />
      )}

      {screen ===
        "discussion" && (

        <DiscussionScreen
          discussionTime={
            discussionTime
          }

          goToNight={
            startNight
          }
        />
      )}

      {screen ===
        "night" && (

        <NightScreen
          currentTurnPlayer={
            nightPlayers[
              currentNightIndex
            ]
          }

          nightPlayers={
            nightPlayers
          }

          playedPlayers={
            playedPlayers
          }

          goToNextPlayer={
            goToNextNightPlayer
          }

          addNightAction={
            addNightAction
          }

          nightActions={
            nightActions
          }

          stolenRoles={
            stolenRoles
          }
        />
      )}

      {screen ===
        "morning" && (

        <MorningScreen
          nightResult={
            nightResult
          }

          meetingTriggered={
            meetingTriggered
          }

          goToDiscussion={() => {

            if (
              meetingTriggered
            ) {

              setScreen(
                "meeting"
              );

            } else {

              setScreen(
                "discussion"
              );
            }
          }}
        />
      )}

      {screen ===
        "meeting" && (

        <EmergencyMeetingScreen
          playersState={
            playersState
          }

          eliminatePlayer={
            eliminatePlayer
          }
        />
      )}

      {screen ===
        "gameOver" && (

        <GameOverScreen
          gameResult={
            gameResult
          }

          playersState={
            playersState
          }
        />
      )}
    </>
  );
}

export default App;