function GameOverScreen({
  gameResult,
  playersState,
}) {

  const alivePlayers =

    playersState.filter(
      (player) =>
        player.alive
    );

  const winnerText =

    gameResult?.winner ===
    "police"

      ? "الشرطة كسبت 🚔"

      : "العصابة كسبت 🔪";

  const reasonText = {

    allCriminalsRemoved:
      "كل عناصر العصابة خرجت من اللعبة.",

    officerKilled:
      "القاتل نجح في قتل الظابط.",

    officerAlone:
      "كل عناصر الشرطة خرجوا ولم يتبقَّ سوى الظابط.",

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "#050505",

        color: "white",

        display: "flex",

        flexDirection:
          "column",

        justifyContent:
          "center",

        alignItems:
          "center",

        padding: "30px",

        textAlign:
          "center",

        fontFamily:
          "sans-serif",
      }}
    >

      <h1
        style={{
          fontSize: "65px",

          textShadow:
            "0 0 25px crimson",
        }}
      >
        انتهت اللعبة
      </h1>

      <h2
        style={{
          marginTop: "40px",

          fontSize: "45px",

          color:
            gameResult?.winner ===
            "police"

              ? "#4da6ff"

              : "crimson",
        }}
      >
        {winnerText}
      </h2>

      <p
        style={{
          marginTop: "25px",

          color: "#999",

          fontSize: "26px",

          maxWidth: "700px",

          lineHeight: "1.8",
        }}
      >
        {
          reasonText[
            gameResult?.reason
          ]
        }
      </p>

      <div
        style={{
          marginTop: "60px",

          width: "100%",

          maxWidth: "600px",

          display: "flex",

          flexDirection:
            "column",

          gap: "18px",
        }}
      >

        <h3
          style={{
            fontSize: "30px",

            marginBottom: "10px",
          }}
        >
          الناجين
        </h3>

        {alivePlayers.map(
          (player, index) => (

            <div
              key={index}
              style={{
                background:
                  "#111",

                border:
                  "1px solid #333",

                borderRadius:
                  "18px",

                padding:
                  "18px",

                fontSize:
                  "24px",
              }}
            >
              {player.playerName}

              <div
                style={{
                  marginTop: "8px",

                  color:
                    "#777",

                  fontSize:
                    "18px",
                }}
              >
                {player.role}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default GameOverScreen;