import { Link, useNavigate } from "react-router-dom";
import { JoinUsBox, Button, Table } from "@components";
import { TRAININGS, TABLE_COLUMNS } from "@/data/demo";
import { PATHS } from "@/routes/paths";

/** Landing page: hero, join-us call to action and a preview of trainings. */
function HomePage() {
  const navigate = useNavigate();
  const featured = TRAININGS.slice(0, 3);

  return (
    <>
      <section className="page-hero">
        <h1 className="page-hero__title">Learn. Train. Grow.</h1>
        <p className="page-hero__subtitle">
          Join our community of trainers and students and start building the
          skills that move your career forward.
        </p>
        <div className="demo-row">
          <Button variant="prime" onClick={() => navigate(PATHS.registration)}>
            Get started
          </Button>
          <Button variant="ghost" onClick={() => navigate(PATHS.training)}>
            Browse trainings
          </Button>
        </div>
      </section>

      <section className="demo-section">
        <div className="demo-section__head">
          <h2 className="demo-section__title">Join our community</h2>
          <p className="demo-section__subtitle">Pick the path that fits you</p>
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

      <section className="demo-section">
        <div className="demo-section__head">
          <h2 className="demo-section__title">Featured trainings</h2>
          <p className="demo-section__subtitle">
            A taste of what&apos;s available
          </p>
        </div>
        <Table columns={TABLE_COLUMNS} data={featured} rowKey={(r) => r.id} />
        <p className="page-more">
          <Link className="page-link" to={PATHS.training}>
            See all trainings →
          </Link>
        </p>
      </section>
    </>
  );
}

export default HomePage;
