import { Modal, TextField } from "@shopify/polaris";
import { useState } from "react";

const TaskModal = ({ active, toggleModal, addNewTask, creating }) => {
  const [taskName, setTaskName] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (taskName) => {
    setTaskName(taskName);
  };

  const handleSubmit = async () => {
    try {
      if (!taskName.trim()) {
        throw new Error("You need to enter a valid task name!");
      }
      const data = {
        name: taskName,
        // id: Math.floor(Math.random() * Date.now()).toString(36),
        // createdAt: new Date(),
        // isCompleted: false,
      };
      await addNewTask(data);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setTaskName("");
    }
  };
  return (
    <Modal
      // loading={creating}
      open={active}
      onClose={() => {
        setTaskName("");
        toggleModal();
        setMessage("");
      }}
      title="Create a new task"
      primaryAction={{
        content: "Create",
        onAction: handleSubmit,
        disabled: !taskName,
        loading: creating,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: toggleModal,
        },
      ]}
    >
      <Modal.Section>
        <TextField
          value={taskName}
          placeholder="Enter task name..."
          onChange={handleChange}
          error={message}
          autoFocus
        />
      </Modal.Section>
    </Modal>
  );
};

export default TaskModal;
