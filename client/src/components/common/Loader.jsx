import { CircularProgress } from "@mui/material";

const Loader = ({ full }) => {
  const renderClasses = () => {
    let classes = "root_loader";
    if (full) {
      classes += " full";
    }

    return classes;
  };

  return (
    <div className={renderClasses()}>
      <CircularProgress />
    </div>
  );
};

export default Loader;
