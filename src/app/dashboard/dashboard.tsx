
// import "./index.css";
import Header from "@/components/Header";
import PersonalDetails from "@/components/PersonalDetails";
import BookingInfo from "@/components/BookingInfo";
import PlanningSchedule from "@/components/PlanningSchedule";
import Actions from "@/components/Actions";

const Dashboard = () => {
  return (
    <div className="appointment-container">
      <Header />
      <PersonalDetails />
      <BookingInfo />
      <PlanningSchedule />
      <Actions />
    </div>
  );
};

export default Dashboard;
