import { useState }
from "react";

function SobhyScreen({

  currentPlayer,

  addNightAction,
}) {

  const [
    selectedChoice,

    setSelectedChoice
  ] = useState(null);

  /*
    ========================
    تفعيل الاجتماع
    ========================
  */

  const triggerMeeting =
    () => {

      addNightAction({

        role:
          "صبحي صيدلية",

        actor:
          currentPlayer.playerName,

        action:
          "triggerMeeting",
      });

      setSelectedChoice(
        "meeting"
      );
    };

  /*
    ========================
    تأجيل الاجتماع
    ========================
  */

  const skipMeeting =
    () => {

      addNightAction({

        role:
          "صبحي صيدلية",

        actor:
          currentPlayer.playerName,

        action:
          "skipMeeting",
      });

      setSelectedChoice(
        "skip"
      );
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
        صبحي صيدلية 💊
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
            "1.9",
        }}
      >
        العصابة مستنية القرار…
        <br />

        هنجمع الناس؟
        ولا لسه بدري؟ 😈
      </p>

      <div
        style={{
          marginTop:
            "70px",

          display:
            "flex",

          flexDirection:
            "column",

          gap:
            "25px",

          maxWidth:
            "600px",

          marginInline:
            "auto",
        }}
      >

        <button
          onClick={
            triggerMeeting
          }

          style={{

            background:

              selectedChoice ===
              "meeting"

                ? "crimson"

                : "#111",

            border:
              "1px solid crimson",

            color:
              "white",

            padding:
              "28px",

            borderRadius:
              "25px",

            fontSize:
              "30px",

            cursor:
              "pointer",

            boxShadow:

              selectedChoice ===
              "meeting"

                ? "0 0 20px crimson"

                : "none",
          }}
        >
          🚨 نجمع العصابة
        </button>

        <button
          onClick={
            skipMeeting
          }

          style={{

            background:

              selectedChoice ===
              "skip"

                ? "#333"

                : "#111",

            border:
              "1px solid #444",

            color:
              "white",

            padding:
              "28px",

            borderRadius:
              "25px",

            fontSize:
              "30px",

            cursor:
              "pointer",
          }}
        >
          🌑 هندور تاني
        </button>
      </div>

      {selectedChoice && (

        <div
          style={{

            marginTop:
              "50px",

            color:
              "#888",

            fontSize:
              "24px",

            lineHeight:
              "1.8",
          }}
        >
          {selectedChoice ===
          "meeting"

            ? "العصابة هتجتمع الصبح 😈"

            : "الليلة هتعدي بهدوء… مؤقتًا 🌑"}
        </div>
      )}
    </div>
  );
}

export default SobhyScreen;