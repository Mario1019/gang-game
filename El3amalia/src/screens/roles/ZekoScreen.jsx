import { useState } from "react";

function ZekoScreen({
  currentPlayer,
  allPlayers,
  addNightAction,
  playedPlayers = [],
}) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const [locked, setLocked] = useState(false);

  const availablePlayers = allPlayers.filter(
    (player) => player.playerName !== currentPlayer.playerName,
  );

  /*
    ========================
    التشويش
    ========================
  */

  const chooseTarget = (player) => {
    if (locked) {
      return;
    }

    setSelectedPlayer(player.playerName);

    setLocked(true);

    const alreadyPlayed = playedPlayers.includes(player.playerName);

    console.log("ZEKO TARGET", player.playerName, "PLAYED", playedPlayers);

    console.log("ALREADY PLAYED", alreadyPlayed);

    addNightAction({
      role: "ذيكو",

      actor: currentPlayer.playerName,

      action: alreadyPlayed ? "delayedFakeUI" : "fakeUI",

      target: player.playerName,
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

          textShadow: "0 0 20px crimson",
        }}
      >
        ذيكو 🎭
      </h1>

      <p
        style={{
          marginTop: "20px",

          color: "#999",

          fontSize: "24px",

          lineHeight: "1.8",
        }}
      >
        اختار لاعب…
        <br />
        وخلّي الدنيا تلف في عينه 😈
      </p>

      <div
        style={{
          marginTop: "50px",

          display: "flex",

          flexDirection: "column",

          gap: "18px",
        }}
      >
        {availablePlayers.map((player, index) => (
          <button
            key={index}
            disabled={locked}
            onClick={() => chooseTarget(player)}
            style={{
              background:
                selectedPlayer === player.playerName ? "crimson" : "#111",

              border: "1px solid crimson",

              color: "white",

              padding: "20px",

              borderRadius: "20px",

              fontSize: "24px",

              cursor: "pointer",

              opacity:
                locked && selectedPlayer !== player.playerName ? 0.45 : 1,
            }}
          >
            {player.playerName}
          </button>
        ))}
      </div>

      {selectedPlayer && (
        <div
          style={{
            marginTop: "45px",

            padding: "22px",

            border: "1px solid crimson",

            borderRadius: "22px",

            background: "#111",
          }}
        >
          <p
            style={{
              color: "#999",

              fontSize: "22px",
            }}
          >
            الهدف المختار
          </p>

          <h2
            style={{
              marginTop: "12px",

              fontSize: "40px",

              color: "crimson",
            }}
          >
            {selectedPlayer}
          </h2>
        </div>
      )}
    </div>
  );
}

export default ZekoScreen;
