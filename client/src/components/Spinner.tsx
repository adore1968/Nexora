import { VscLoading } from "react-icons/vsc";

function Spinner() {
  return (
    <div className="flex items-center justify-center py-10">
      <VscLoading className="animate-spin text-4xl text-indigo-500" />
    </div>
  );
}

export default Spinner;
