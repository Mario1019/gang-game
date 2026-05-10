import { useState } from "react";
import { rolesData } from "../../game/roles";

function AbuMenaScreen({
  currentPlayer,
  allPlayers,
  addNightAction,
  roleOwner,
}) {
  const [selectedPlayer, setSelectedPlayer] =
    useState(null);

  const availablePlayers =
    allPlayers.filter(
      (player) =>
        player.playerName !==
        currentPlayer.playerName
    );

  const investigatedPlayer =
    allPlayers.find(
      (player) =>
        player.playerName ===
        selectedPlayer
    );

  const choosePlayer = (
    playerName
  ) => {
    setSelectedPlayer(
      playerName
    );

    addNightAction({
      role: "أبو منة",

      actor:
  roleOwner ||
  currentPlayer.playerName,

      target: playerName,

      action: "intel",

      message:
        `خد بالك يا باشا من ${playerName}`,
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "white",
        padding: "30px",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "55px",
          textShadow:
            "0 0 20px crimson",
        }}
      >
        أبو منة 🕵️
      </h1>

      {!selectedPlayer ? (
        <>
          <p
            style={{
              marginTop: "20px",
              color: "#999",
              fontSize: "24px",
            }}
          >
            اختار لاعب تراقبه
          </p>

          <div
            style={{
              marginTop: "50px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {availablePlayers.map(
              (player, index) => (
                <button
                  key={index}
                  onClick={() =>
                    choosePlayer(
                      player.playerName
                    )
                  }
                  style={{
                    background:
                      "#111",

                    border:
                      "1px solid crimson",

                    color: "white",

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
                  {player.playerName}
                </button>
              )
            )}
          </div>
        </>
      ) : (
        <>
          <h2
            style={{
              marginTop: "20px",
              fontSize: "35px",
            }}
          >
            الحقيقة الكاملة لـ
            {" "}
            {selectedPlayer}
          </h2>

          <div
            style={{
              marginTop: "30px",
              padding: "25px",
              border:
                "1px solid crimson",

              borderRadius:
                "25px",

              background: "#111",
            }}
          >
            <h1
              style={{
                fontSize: "50px",
              }}
            >
              {
                investigatedPlayer
                  ?.realRole
              }
            </h1>

            <p
              style={{
                marginTop: "15px",
                color: "crimson",
                fontSize: "28px",
              }}
            >
              (
              {
                rolesData[
                  investigatedPlayer
                    ?.realRole
                ]?.title
              }
              )
            </p>
          </div>

          <div
            style={{
              marginTop: "50px",
              padding: "20px",
              border:
                "1px solid #444",

              borderRadius:
                "20px",

              background: "#111",
            }}
          >
            <h3
              style={{
                color: "#aaa",
                marginBottom: "15px",
              }}
            >
              الرسالة اللي هتوصل
              للظابط:
            </h3>

            <p
              style={{
                fontSize: "28px",
                color: "crimson",
                lineHeight: "1.8",
              }}
            >
              خد بالك يا باشا من
              {" "}
              {selectedPlayer}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default AbuMenaScreen;