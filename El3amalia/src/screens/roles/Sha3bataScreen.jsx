import {
  useMemo,
  useState,
}
from "react";

function Sha3bataScreen({

  currentPlayer,

  allPlayers,

  addNightAction,

  playedPlayers = [],
}) {

  const [
    selectedPlayer,

    setSelectedPlayer,
  ] = useState(null);

  const [
    locked,

    setLocked,
  ] = useState(false);

  /*
    ========================
    اللاعبين المتاحين
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
    subset عشوائي
    ========================
  */

  const randomPlayers =
    useMemo(() => {

      const shuffled =

        [...availablePlayers]
          .sort(
            () =>
              Math.random() - 0.5
          );

      const randomCount =

        Math.max(
          2,

          Math.floor(
            Math.random() *
            shuffled.length
          )
        );

      return shuffled.slice(
        0,
        randomCount
      );

    }, []);

  /*
    ========================
    الاختيار
    ========================
  */

  const chooseTarget =
    (player) => {

      if (locked) {

        return;
      }

      const alreadyPlayed =

        playedPlayers.includes(
          player.playerName
        );

      /*
        ========================
        تسجيل الأكشن
        ========================
      */

      addNightAction({

        role:
          "شعبطة",

        actor:
          currentPlayer
            .playerName,

        target:
          player.playerName,

        /*
          ========================
          الأكشن الحقيقي
          ========================
        */

        action:
          "copyResult",

        /*
          ========================
          هل لعب بالفعل؟
          ========================
        */

        alreadyPlayed,
      });

      setSelectedPlayer(
        player.playerName
      );

      setLocked(true);
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
        شعبطة 🕶️
      </h1>

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
        اختار لاعب…
        <br />

        ولو الليلة عجبتك
        يمكن تبقى نسخة منه 😈
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

        {randomPlayers.map(
          (
            player,
            index
          ) => {

            const alreadyPlayed =

              playedPlayers.includes(
                player.playerName
              );

            return (

              <button
                key={index}

                disabled={locked}

                onClick={() =>
                  chooseTarget(
                    player
                  )
                }

                style={{
                  background:

                    selectedPlayer ===
                    player.playerName

                      ? "crimson"

                      : alreadyPlayed

                        ? "#1a1a1a"

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

                    locked
                      ? "default"
                      : "pointer",

                  opacity:

                    locked &&
                    selectedPlayer !==
                      player.playerName

                      ? 0.45

                      : 1,
                }}
              >
                {
                  player.playerName
                }

                {alreadyPlayed &&
                  " 👁️"}
              </button>
            );
          }
        )}
      </div>

      {selectedPlayer && (

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
          }}
        >

          <p
            style={{
              color:
                "#999",

              fontSize:
                "22px",
            }}
          >
            الهدف المختار
          </p>

          <h2
            style={{
              marginTop:
                "12px",

              fontSize:
                "40px",

              color:
                "crimson",
            }}
          >
            {selectedPlayer}
          </h2>

          <p
            style={{
              marginTop:
                "15px",

              color:
                "#999",

              fontSize:
                "22px",
            }}
          >
            {
              playedPlayers.includes(
                selectedPlayer
              )

              ? "👁️ لعب بالفعل وهتشوف نتيجته"

              : "🔥 دوره لسه مجاش وهتسرق شاشته"
            }
          </p>
        </div>
      )}
    </div>
  );
}

export default Sha3bataScreen;