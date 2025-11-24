import { AppRoutes } from "./routes/AppRoutes";
import { NotificationContainer } from "./components/atoms/Notification";
import "./styles/pages/admin/adminGlobal.css";

export default function App() {
  return (
    <>
      <AppRoutes />
      <NotificationContainer />
    </>
  );
}