import "@shopify/polaris/dist/styles.css";
import { AppProvider } from "@shopify/polaris";
import AppLayout from "./layout/AppLayout";
import TasksList from "./components/tasks/TasksList";

const App = () => {
  return (
    <AppProvider>
      <AppLayout>
        <TasksList></TasksList>
      </AppLayout>
    </AppProvider>
  );
};

export default App;
