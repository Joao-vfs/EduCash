import { ProgressProps } from "./type";

export const Progress: React.FC<ProgressProps> = ({ progress = 0 }) => {
  return (
    <div className="bg-actions-blue rounded-100px w-full h-2.5">
      <div
        className={`bg-blue h-full rounded-100px`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
