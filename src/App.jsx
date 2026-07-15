import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import LoginForm from "./components/LoginForm/LoginForm";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import MyAccount from "./components/MyAccount/MyAccount";
import JoinUsBox from "./components/JoinUsBox/JoinUsBox";
import Box from "./components/Box/Box";
import Button from "./components/Button/Button";
import Table from "./components/Table/Table";
import ModalBox from "./components/ModalBox/ModalBox";
import notify from "./components/Toaster/notify";
import "./App.css";

const USER = {
  name: "Marta_st",
  email: "marta_12334@gmail.com",
  avatar: "https://i.pravatar.cc/120?img=47",
};

const PROFILE = {
  firstName: "Marta",
  lastName: "Black",
  userName: "Marta_st",
  dateOfBirth: "01.01.2001",
  address: "123 Main Street, Boston, MA 02108, United States",
  email: "marta_12334@gmail.com",
  avatar: "https://i.pravatar.cc/160?img=47",
  active: true,
};

const TRAININGS = [
  { id: 1, date: "01.01.2023", name: "JavaScript Course", type: "Webinar", student: "Marta Black", duration: "10 d" },
  { id: 2, date: "11.01.2023", name: "Course 2", type: "Webinar", student: "Student 1", duration: "10 d" },
  { id: 3, date: "13.01.2023", name: "Course 3", type: "Webinar", student: "Student 2", duration: "2 d" },
  { id: 4, date: "18.01.2023", name: "Course 4", type: "Course", student: "Student 3", duration: "5 d" },
];

const TABLE_COLUMNS = [
  { key: "date", header: "Date" },
  { key: "name", header: "Training name" },
  {
    key: "type",
    header: "Type",
    render: (row) => <span className="table__badge">{row.type}</span>,
  },
  { key: "student", header: "Student name" },
  { key: "duration", header: "Duration" },
];

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

function App() {
  const [authenticated, setAuthenticated] = useState(true);
  const [activeId, setActiveId] = useState("blog");
  const [nightMode, setNightMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [profile, setProfile] = useState(PROFILE);

  return (
    <div className="app-shell" data-night={nightMode ? "true" : "false"}>
      <Header
        authenticated={authenticated}
        user={USER}
        activeId={activeId}
        onNavigate={(id) => {
          setActiveId(id);
          notify.info(`Navigated to "${id}"`);
        }}
        onSignIn={() => notify.info("Sign in clicked")}
        onJoinUs={() => notify.info("Join us clicked")}
        onSignOut={() => {
          setAuthenticated(false);
          notify.success("Signed out");
        }}
        nightMode={nightMode}
        onToggleNight={setNightMode}
      />

      <main className="app-main container">
        <div className="demo-toolbar">
          <Breadcrumbs
            items={[
              { id: "account", label: "My Account" },
              { id: "trainings", label: "Trainings" },
              { label: "Add training" },
            ]}
            onNavigate={(id) => setActiveId(id)}
          />
          <Button
            variant="prime"
            size="sm"
            onClick={() => setAuthenticated((v) => !v)}
          >
            Toggle auth ({authenticated ? "on" : "off"})
          </Button>
        </div>

        <Section title="Buttons" subtitle="Shared component · variants & states">
          <div className="demo-row">
            <Button variant="prime">Button prime</Button>
            <Button variant="secondary">Button secondary</Button>
            <Button variant="important">Button important</Button>
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

        <Section title="Modal & Toaster" subtitle="react-modal · react-toastify">
          <div className="demo-row">
            <Button variant="important" onClick={() => setModalOpen(true)}>
              Delete profile
            </Button>
            <Button variant="secondary" onClick={() => notify.success("Training added")}>
              Show toast
            </Button>
          </div>
        </Section>
      </main>

      <Footer
        onSubscribe={(email) => notify.success(`Subscribed: ${email}`)}
        onLanguageChange={(lang) => notify.info(`Language: ${lang}`)}
      />

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

      <ToastContainer position="top-right" autoClose={2500} newestOnTop />
    </div>
  );
}

export default App;
