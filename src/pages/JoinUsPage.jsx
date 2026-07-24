import { useNavigate } from "react-router-dom";
import { JoinUsBox } from "@components";
import { PATHS } from "@/routes/paths";

/** Join-us route: choose a registration flow (trainer / student). */
function JoinUsPage() {
  const navigate = useNavigate();

  return (
    <section className="demo-section">
      <div className="demo-section__head">
        <h1 className="demo-section__title">Join us</h1>
        <p className="demo-section__subtitle">
          Become part of the community as a trainer or a student
        </p>
      </div>
      <div className="demo-row demo-row--top">
        <JoinUsBox
          role="Trainer"
          image="https://picsum.photos/id/180/300/220"
          onJoin={() => navigate(PATHS.registration)}
        />
        <JoinUsBox
          role="Student"
          image="https://picsum.photos/id/1011/300/220"
          onJoin={() => navigate(PATHS.registration)}
        />
      </div>
    </section>
  );
}

export default JoinUsPage;
