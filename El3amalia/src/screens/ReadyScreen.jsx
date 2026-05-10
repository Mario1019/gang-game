function ReadyScreen({ startGame }) {
  return (
    <div
      style={{
        height: "100vh",
        background:
          "radial-gradient(circle, #111, #050505)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "55px",
          textShadow: "0 0 20px crimson",
        }}
      >
        العملية هتبدأ
      </h1>

      <p
        style={{
          color: "#888",
          fontSize: "22px",
          marginTop: "20px",
          lineHeight: "1.8",
        }}
      >
        جهزوا نفسكم...
        <br />
        محدش يورّي دوره لحد 👀
      </p>

      <button
        onClick={startGame}
        style={{
          marginTop: "60px",
          background: "crimson",
          border: "none",
          color: "white",
          padding: "20px 45px",
          borderRadius: "20px",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 0 20px crimson",
        }}
      >
        ابدأ توزيع الأدوار
      </button>
    </div>
  );
}

export default ReadyScreen;