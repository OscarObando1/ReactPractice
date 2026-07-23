import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Breadcrumbs,
  LoginForm,
  RegistrationForm,
  MyAccount,
  JoinUsBox,
  Box,
  Button,
  Table,
  ModalBox,
} from "@components";
import notify from "@components/Toaster/notify";
import { useAuth } from "@/auth/context";
import { PROFILE, TRAININGS, TABLE_COLUMNS } from "@/data/demo";

function Section({ title, subtitle, children, wide }) {
  return (
    <section className="demo-section">
      <div className="demo-section__head">
        <h2 className="demo-section__title">{title}</h2>
        {subtitle && <p className="demo-section__subtitle">{subtitle}</p>}
      </div>
      <div className={`demo-section__body ${wide ? "demo-section__body--wide" : ""}`}>
        {children}
      </div>
    </section>
  );
}

/** Component showcase — the app's index route. */
function ShowcasePage() {
  const { authenticated, toggleAuth } = useAuth();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [profile, setProfile] = useState(PROFILE);

  return (
    <>
      <div className="demo-toolbar">
        <Breadcrumbs
          items={[
            { id: "account", label: "My Account" },
            { id: "trainings", label: "Trainings" },
            { label: "Add training" },
          ]}
          onNavigate={(id) => id === "account" && navigate("/account")}
        />
        <Button variant="prime" size="sm" onClick={toggleAuth}>
          Toggle auth ({authenticated ? "on" : "off"})
        </Button>
      </div>

      <Section title="Buttons" subtitle="Shared component · variants & states">
        <div className="demo-row">
          <Button variant="prime">Button prime</Button>
          <Button variant="secondary">Button secondary</Button>
          <Button variant="important">Button important</Button>
          <Button variant="ghost">Button ghost</Button>
          <Button variant="prime" disabled>
            Button disabled
          </Button>
          <Button variant="prime" loading>
            Loading
          </Button>
        </div>
      </Section>

      <Section title="Login form" subtitle="Validation + loading state">
        <LoginForm
          onSubmit={() =>
            new Promise((res) =>
              setTimeout(() => {
                notify.success("Logged in!");
                res();
              }, 1200)
            )
          }
          onSignUp={() => notify.info("Go to sign up")}
        />
      </Section>

      <Section title="Registration form" subtitle="Role-based (student / trainer)" wide>
        <div className="demo-row demo-row--top">
          <RegistrationForm
            role="student"
            image="https://picsum.photos/id/1005/300/400"
            onSubmit={(data) =>
              new Promise((res) =>
                setTimeout(() => {
                  notify.success("Student registered");
                  res({
                    username: `${data.firstName.toLowerCase()}_2043`,
                    password: "Xk9mPq2LrT",
                  });
                }, 900)
              )
            }
          />
          <RegistrationForm role="trainer" />
        </div>
      </Section>

      <Section title="My Account" subtitle="View + edit profile mode">
        <MyAccount
          profile={profile}
          onSave={(next) => {
            setProfile(next);
            notify.success("Profile updated");
          }}
        />
      </Section>

      <Section title="Join Us Box" subtitle="Dynamic role content">
        <div className="demo-row demo-row--top">
          <JoinUsBox
            role="Trainer"
            image="https://picsum.photos/id/180/300/220"
            onJoin={() => notify.info("Register as Trainer")}
          />
          <JoinUsBox
            role="Student"
            image="https://picsum.photos/id/1011/300/220"
            onJoin={() => notify.info("Register as Student")}
          />
        </div>
      </Section>

      <Section title="Box (card)" subtitle="Reusable content wrapper">
        <div className="demo-row demo-row--top">
          <Box
            image="https://picsum.photos/id/1015/360/200"
            tag="Do consectetur"
            title="Aliqua Irure Tempor Lorem Occaecat Volup"
            date="Dec 24, 2022"
            timeToRead="5 mins read"
          />
        </div>
      </Section>

      <Section title="Table" subtitle="Reusable, column-driven" wide>
        <Table columns={TABLE_COLUMNS} data={TRAININGS} rowKey={(r) => r.id} />
      </Section>

      <Section title="Modal & Toaster" subtitle="portal modal · react-toastify">
        <div className="demo-row">
          <Button variant="important" onClick={() => setModalOpen(true)}>
            Delete profile
          </Button>
          <Button variant="secondary" onClick={() => notify.success("Training added")}>
            Show toast
          </Button>
        </div>
      </Section>

      <ModalBox
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Profile Deletion Confirmation"
        confirmLabel="Confirm"
        onConfirm={() => notify.error("Profile deleted")}
      >
        We truly want to see you go. Before you proceed with deleting your
        profile, we want you to know that this action is permanent and
        irreversible. You'll lose access to all your account information.
      </ModalBox>
    </>
  );
}

export default ShowcasePage;
