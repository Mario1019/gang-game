import { useState }
from "react";

function SaadaScreen({

  currentPlayer,

  allPlayers,

  addNightAction,
}) {

  const [
    message,

    setMessage,
  ] = useState("");

  const [
    selectedPlayer,

    setSelectedPlayer,
  ] = useState(null);

  const [
    investigationLocked,

    setInvestigationLocked,
  ] = useState(false);

  const availablePlayers =
    allPlayers.filter(
      (player) =>
        player.playerName !==
        currentPlayer.playerName
    );

  /*
    ========================
    التحقيق
    ========================
  */

  const investigatePlayer =
    (player) => {

      /*
        منع التغيير
      */

      if (
        investigationLocked
      ) {

        return;
      }

      /*
        تسجيل الأكشن
      */

      addNightAction({

        role:
          "سعدة",

        actor:
          currentPlayer.playerName,

        target:
          player.playerName,

        action:
          "investigateInformer",
      });

      setSelectedPlayer(
        player.playerName
      );

      setInvestigationLocked(
        true
      );

      /*
        المخبر
      */

      if (
        player.realRole ===
        "أبو منة"
      ) {

        setMessage(

          `${player.playerName}
           هو المخبر 😈`
        );

      } else {

        setMessage(
          "دور تاني ع المخبر 😭"
        );
      }
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
        سعدة 👁️
      </h1>

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
        دوري ع المخبر 😈
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

              disabled={
                investigationLocked
              }

              onClick={() =>
                investigatePlayer(
                  player
                )
              }

              style={{
                background:

                  selectedPlayer ===
                  player.playerName

                    ? "crimson"

                    : "#111",

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

                  investigationLocked
                    ? "default"
                    : "pointer",

                opacity:

                  investigationLocked &&
                  selectedPlayer !==
                    player.playerName

                    ? 0.45

                    : 1,
              }}
            >
              {
                player.playerName
              }
            </button>
          )
        )}
      </div>

      {message && (

        <div
          style={{
            marginTop:
              "45px",

            padding:
              "22px",

            border:
              "1px solid crimson",

            borderRadius:
              "22px",

            background:
              "#111",

            fontSize:
              "30px",

            lineHeight:
              "1.8",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default SaadaScreen;