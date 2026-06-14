import { useState } from "react";

function MafatnScreen({
  currentPlayer,

  allPlayers,

  addNightAction,

  roleOwner,
}) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const availablePlayers = allPlayers.filter(
    (player) => player.playerName !== currentPlayer.playerName,
  );

  /*
    ========================
    اختيار الضحية
    ========================
  */

  const chooseTarget = (player) => {
    /*
        منع التغيير
      */

    if (selectedPlayer) {
      return;
    }

    setSelectedPlayer(player.playerName);

    /*
        تسجيل التأثير
      */

    addNightAction({
      role: "مفاتن",

      actor: roleOwner || currentPlayer.playerName,

      action: "pressureChoice",

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
        مفاتن 💋
      </h1>

      <p
        style={{
          marginTop: "20px",

          color: "#999",

          fontSize: "24px",
        }}
      >
        اختاري شخص…
        <br />
        وخليه يتوتر 😈
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
            disabled={!!selectedPlayer}
            onClick={() => chooseTarget(player)}
            style={{
              background:
                selectedPlayer === player.playerName ? "crimson" : "#111",

              border: "1px solid crimson",

              color: "white",

              padding: "20px",

              borderRadius: "20px",

              fontSize: "24px",

              cursor: selectedPlayer ? "default" : "pointer",

              opacity:
                selectedPlayer && selectedPlayer !== player.playerName
                  ? 0.45
                  : 1,
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

            background: "#111",

            border: "1px solid crimson",

            borderRadius: "22px",

            padding: "22px",

            fontSize: "28px",
          }}
        >
          💋 تم تشتيت: {selectedPlayer}
        </div>
      )}
    </div>
  );
}

export default MafatnScreen;
