import { ResourceList, Page, Card } from "@shopify/polaris";
import { useState } from "react";
import TaskItem from "./TaskItem";
import TaskModal from "./TaskModal";
import EmptyStateMarkup from "../config/emptyState/EmptyStateMarkup";
import useFetchApi from "../../hooks/useFetchApi";
import useDeleteApi from "../../hooks/useDeleteApi";
import useUpdateStatus from "../../hooks/useUpdateStatus";
import axios from "axios";

const TaskList = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const { isLoading, taskList, setTaskList, setIsLoading, fetched } =
    useFetchApi();
  const [active, setActive] = useState(false);
  const toggleModal = () => {
    setActive((active) => !active);
  };

  const [creating, setCreating] = useState(false);

  const addNewTask = async (data) => {
    try {
      setIsLoading(true);
      setCreating(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/task`,
        data
      );
      const newTaskList = [{ ...response.data.data }, ...taskList];
      setTaskList(newTaskList);
      toggleModal();
    } catch (err) {
      alert("An error has occurred while creating the new task!");
      console.log(err);
    } finally {
      setIsLoading(false);
      setCreating(false);
    }
  };

  const { deleteTasksHandler } = useDeleteApi();

  const deleteTasks = async (ids) => {
    setIsLoading(true);
    await deleteTasksHandler(ids);
    setTaskList((curTask) => curTask.filter((task) => !ids.includes(task.id)));
    setSelectedItems([]);
    setIsLoading(false);
  };

  const { updateStatusHandler } = useUpdateStatus();

  const isCompletedTasks = async (ids) => {
    setIsLoading(true);
    const data = {
      taskList: taskList
        .filter((task) => ids.includes(task.id))
        .map((task) => ({
          id: task.id,
          taskData: { isCompleted: !task.isCompleted },
        })),
    };
    await updateStatusHandler(data);
    setTaskList((curTask) =>
      curTask.map((task) => {
        if (!ids.includes(task.id)) return task;
        return { ...task, isCompleted: !task.isCompleted };
      })
    );
    setSelectedItems([]);
    setIsLoading(false);
  };

  const emptyStateMarkup = <EmptyStateMarkup toggleModal={toggleModal} />;

  const resourceListMarkup = (
    <Card>
      <ResourceList
        resourceName={{ singular: "task", plural: "tasks" }}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
        items={taskList}
        emptyState={fetched && emptyStateMarkup}
        loading={isLoading}
        renderItem={(item) => (
          <TaskItem
            task={item}
            onUpdateTasksState={isCompletedTasks}
            onDelete={deleteTasks}
          />
        )}
        promotedBulkActions={[
          {
            content: "Toggle complete",
            onAction: () => isCompletedTasks(selectedItems),
          },
          {
            content: "Delete",
            onAction: () => deleteTasks(selectedItems),
          },
        ]}
      ></ResourceList>
    </Card>
  );

  const primaryAction = {
    content: "Create task",
    onAction: () => {
      toggleModal();
    },
  };
  return (
    <Page title="Tasks list" primaryAction={primaryAction}>
      {resourceListMarkup}
      <TaskModal
        addNewTask={addNewTask}
        active={active}
        toggleModal={toggleModal}
        creating={creating}
      />
    </Page>
  );
};

export default TaskList;
