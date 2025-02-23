import AddNewInterview from "../_components/AddNewInterview";
import InterviewList from "../_components/InterviewList";
import Sidebar from "./_components/Sidebar";

export default function Dashboard() {
  return (
    <section>
      <div>
        <Sidebar />
      </div>
      <div>
        <AddNewInterview />
      </div>

      {/* interview List */}
      <InterviewList />
    </section>
  );
}
