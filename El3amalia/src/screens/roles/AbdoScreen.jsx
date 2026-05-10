import { useState }
from "react";

import { rolesData }
from "../../game/roles";

function AbdoScreen({

  currentPlayer,

  allPlayers,

  addNightAction,

  roleOwner,
}) {

  const [
    selectedPlayer,

    setSelectedPlayer,
  ] = useState(null);

  const [
    sendName,

    setSendName,
  ] = useState(null);

  const [
    locked,

    setLocked,
  ] = useState(false);

  /*
    ========================
    مين بينفذ فعليًا
    ========================
  */

  const realActor =

    roleOwner ||

    currentPlayer
      .playerName;

  /*
    ========================
    اللاعبين
    ========================
  */

  const availablePlayers =

    allPlayers.filter(
      (player) =>
        player.playerName !==
        currentPlayer.playerName
    );

  /*
    ========================
    الضحية
    ========================
  */

  const stolenPlayer =

    allPlayers.find(
      (player) =>
        player.playerName ===
        selectedPlayer
    );

  /*
    ========================
    إرسال التحذير
    ========================
  */

  const chooseFakeMessage =
    (playerName) => {

      if (locked) {

        return;
      }

      setSendName(
        playerName
      );

      setLocked(true);

      addNightAction({

        role:
          "عبده ملقاط",

        actor:
          realActor,

        target:
          selectedPlayer,

        fakeTarget:
          playerName,

        discoveredRole:
          stolenPlayer
            ?.realRole,

        action:
          "stealIntel",

        message:
          `خد بالك يا باشا من ${playerName}`,
      });
    };

  return (

    <div
      style={{
        minHeight:
          "100vh",

        background:
          "#050505",

        color:
          "white",

        padding:
          "30px",

        fontFamily:
          "sans-serif",

        textAlign:
          "center",
      }}
    >

      <h1
        style={{
          fontSize:
            "55px",

          textShadow:
            "0 0 20px crimson",
        }}
      >
        عبده ملقاط 🧤
      </h1>

      {!selectedPlayer ? (

        <>

          <p
            style={{
              marginTop:
                "20px",

              color:
                "#999",

              fontSize:
                "24px",
            }}
          >
            اختار لاعب تنشله
          </p>

          <div
            style={{
              marginTop:
                "50px",

              display:
                "flex",

              flexDirection:
                "column",

              gap:
                "20px",
            }}
          >

            {availablePlayers.map(
              (
                player,
                index
              ) => (

                <button
                  key={index}

                  disabled={locked}

                  onClick={() =>
                    setSelectedPlayer(
                      player.playerName
                    )
                  }

                  style={{
                    background:
                      "#111",

                    border:
                      "1px solid crimson",

                    color:
                      "white",

                    padding:
                      "20px",

                    borderRadius:
                      "20px",

                    fontSize:
                      "24px",

                    cursor:
                      "pointer",
                  }}
                >
                  {
                    player.playerName
                  }
                </button>
              )
            )}
          </div>
        </>

      ) : (

        <>

          <h2
            style={{
              marginTop:
                "20px",

              fontSize:
                "35px",
            }}
          >
            الدور الحقيقي لـ
            {" "}
            {selectedPlayer}
          </h2>

          <div
            style={{
              marginTop:
                "30px",

              padding:
                "25px",

              border:
                "1px solid crimson",

              borderRadius:
                "25px",

              background:
                "#111",
            }}
          >

            <h1
              style={{
                fontSize:
                  "50px",
              }}
            >
              {
                stolenPlayer
                  ?.realRole
              }
            </h1>

            <p
              style={{
                marginTop:
                  "15px",

                color:
                  "crimson",

                fontSize:
                  "28px",
              }}
            >
              (
              {
                rolesData[
                  stolenPlayer
                    ?.realRole
                ]?.title
              }
              )
            </p>
          </div>

          <h3
            style={{
              marginTop:
                "50px",

              fontSize:
                "30px",
            }}
          >
            ابعت تحذير لمين؟
          </h3>

          <div
            style={{
              marginTop:
                "30px",

              display:
                "flex",

              flexDirection:
                "column",

              gap:
                "18px",
            }}
          >

            {availablePlayers.map(
              (
                player,
                index
              ) => (

                <button
                  key={index}

                  disabled={locked}

                  onClick={() =>
                    chooseFakeMessage(
                      player.playerName
                    )
                  }

                  style={{
                    background:

                      sendName ===
                      player.playerName

                        ? "crimson"

                        : "#111",

                    border:
                      "1px solid crimson",

                    color:
                      "white",

                    padding:
                      "18px",

                    borderRadius:
                      "18px",

                    fontSize:
                      "22px",

                    cursor:
                      "pointer",

                    opacity:

                      locked &&
                      sendName !==
                        player.playerName

                        ? 0.45

                        : 1,
                  }}
                >
                  خد بالك يا باشا من
                  {" "}
                  {
                    player.playerName
                  }
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AbdoScreen;