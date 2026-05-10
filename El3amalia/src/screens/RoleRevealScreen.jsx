import { useState } from "react";
import { rolesData } from "../game/roles";

function RoleRevealScreen({
  players,
  assignedRoles,
  goToDiscussion,
}) {
  const [currentPlayer, setCurrentPlayer] =
    useState(0);

  const [showRole, setShowRole] =
    useState(false);

  const currentRoleObject =
    assignedRoles[currentPlayer];

  const currentRole =
    currentRoleObject?.realRole ||
    "مجهول";

  const disguise =
    currentRoleObject?.disguise;

  const roleData =
    rolesData[currentRole] || {
      title: "دور غير معروف",
      description:
        "في مشكلة في توزيع الشخصية 😭",
    };

  const disguiseData =
    rolesData[disguise];

  const nextPlayer = () => {
    setShowRole(false);

    setCurrentPlayer(
      currentPlayer + 1
    );
  };

  if (
    currentPlayer >= players.length
  ) {
    return (
      <div
        style={{
          height: "100vh",
          background: "#050505",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          fontFamily: "sans-serif",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "50px",
            textShadow:
              "0 0 15px crimson",
          }}
        >
          العملية بدأت 😈
        </h1>

        <button
          onClick={goToDiscussion}
          style={{
            marginTop: "50px",
            background: "crimson",
            border: "none",
            color: "white",
            padding: "20px 45px",
            borderRadius: "20px",
            fontSize: "24px",
            cursor: "pointer",
            boxShadow:
              "0 0 20px crimson",
          }}
        >
          ابدأ النقاش 🔥
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        background: "#050505",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {!showRole ? (
        <>
          <h1
            style={{
              fontSize: "45px",
              textShadow:
                "0 0 15px crimson",
            }}
          >
            ادّي الموبايل لـ
          </h1>

          <h2
            style={{
              marginTop: "20px",
              fontSize: "55px",
            }}
          >
            {players[currentPlayer]}
          </h2>

          <button
            onClick={() =>
              setShowRole(true)
            }
            style={{
              marginTop: "60px",
              background:
                "crimson",
              border: "none",
              color: "white",
              padding:
                "20px 45px",
              borderRadius:
                "20px",
              fontSize: "24px",
              cursor: "pointer",
              boxShadow:
                "0 0 20px crimson",
            }}
          >
            شوف دورك
          </button>
        </>
      ) : (
        <>
          <h1
            style={{
              fontSize: "35px",
              color: "#888",
            }}
          >
            دورك هو
          </h1>

          <h2
            style={{
              marginTop: "20px",
              fontSize: "60px",
              textShadow:
                "0 0 20px crimson",
            }}
          >
            {currentRole}
          </h2>

          <h3
            style={{
              marginTop: "15px",
              fontSize: "30px",
              color: "crimson",
            }}
          >
            ({roleData.title})
          </h3>

          <p
            style={{
              marginTop: "25px",
              color: "#aaa",
              fontSize: "22px",
              maxWidth: "500px",
              lineHeight: "1.8",
            }}
          >
            {roleData.description}
          </p>

          {disguise && (
            <div
              style={{
                marginTop: "35px",
                padding: "20px",
                border:
                  "1px solid crimson",
                borderRadius:
                  "20px",
                background: "#111",
                maxWidth: "500px",
              }}
            >
              <h3
                style={{
                  color: "crimson",
                  marginBottom: "10px",
                }}
              >
                واجهتك المزيفة 🎭
              </h3>

              <p
                style={{
                  fontSize: "28px",
                }}
              >
                {disguise}
                {" "}
                (
                {
                  disguiseData?.title
                }
                )
              </p>

              <p
                style={{
                  marginTop: "15px",
                  color: "#999",
                  lineHeight: "1.7",
                  fontSize: "18px",
                }}
              >
                {
                  disguiseData?.description
                }
              </p>
            </div>
          )}

          <button
            onClick={nextPlayer}
            style={{
              marginTop: "60px",
              background:
                "crimson",
              border: "none",
              color: "white",
              padding:
                "20px 45px",
              borderRadius:
                "20px",
              fontSize: "24px",
              cursor: "pointer",
              boxShadow:
                "0 0 20px crimson",
            }}
          >
            اللاعب التالي
          </button>
        </>
      )}
    </div>
  );
}

export default RoleRevealScreen;