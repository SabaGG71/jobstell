import AddNewInterview from "../_components/AddNewInterview";
import InterviewList from "../_components/InterviewList";

export default function Dashboard() {
  return (
    <section className="mx-20 p-10">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <p className="text-secondary-500">
        Create and start your AI Mockup Interview
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>

      {/* interview List */}
      <InterviewList />
    </section>
  );
}
