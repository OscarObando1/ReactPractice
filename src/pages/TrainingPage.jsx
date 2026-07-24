import { Table } from "@components";
import { TRAININGS, TABLE_COLUMNS } from "@/data/demo";

/** Training catalogue route. */
function TrainingPage() {
  return (
    <section className="demo-section">
      <div className="demo-section__head">
        <h1 className="demo-section__title">Trainings</h1>
        <p className="demo-section__subtitle">
          All available courses and webinars
        </p>
      </div>
      <Table columns={TABLE_COLUMNS} data={TRAININGS} rowKey={(r) => r.id} />
    </section>
  );
}

export default TrainingPage;
