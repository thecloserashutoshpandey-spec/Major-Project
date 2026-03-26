import "./home.css";

function Home() {
  return (
    <div className="hero">

      <div className="hero-content">

        <h1 className="title">
          <span className="text">CodeCollab</span> <span className="emoji">🚀</span>
        </h1>

        <p className="subtitle">
          Real-time collaborative coding made simple & powerful
        </p>

        <div className="buttons">
          <button className="btn primary">Create Room</button>
          <button className="btn secondary">Join Room</button>
        </div>

      </div>

      <p className="bottom-text">
        Code. Collaborate. Build together like pros.
      </p>

    </div>
  );
}

export default Home;