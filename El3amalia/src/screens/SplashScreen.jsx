function SplashScreen({ goToSettings }) {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <img
        src="/Images/تصميم بدون عنوان (25).png"
        alt="Splash"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />

      <button
        onClick={goToSettings}
        style={{
          position: "absolute",

          left: "50%",
          bottom: "10%",

          transform: "translateX(-50%)",

          width: "30%",
          height: "15%",

          background: "transparent",

          border: "none",

          cursor: "pointer",
        }}
      />
    </div>
  );
}

export default SplashScreen;
