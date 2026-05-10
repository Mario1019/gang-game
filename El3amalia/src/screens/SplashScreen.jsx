function SplashScreen({ goToSettings }) {
  return (
    <div
      style={{
        height: "100vh",
        background:
          "radial-gradient(circle at top, #1a1a1a, #050505)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "30px",
        }}
      >
        <div
          style={{
            width: "90px",
            height: "45px",
            background: "white",
            borderRadius: "50%",
          }}
        ></div>

        <div
          style={{
            width: "90px",
            height: "45px",
            background: "white",
            borderRadius: "50%",
          }}
        ></div>
      </div>

      <h1
        style={{
          fontSize: "75px",
          marginTop: "30px",
          textShadow: "0 0 20px crimson",
        }}
      >
        العملية
      </h1>

      <p
        style={{
          color: "#888",
          marginBottom: "40px",
        }}
      >
        محدش هنا بريء
      </p>

      <button
        onClick={goToSettings}
        style={{
          background: "crimson",
          border: "none",
          padding: "18px 50px",
          color: "white",
          fontSize: "24px",
          borderRadius: "20px",
          cursor: "pointer",
          boxShadow: "0 0 20px crimson",
        }}
      >
        ابدأ
      </button>
    </div>
  );
}

export default SplashScreen;