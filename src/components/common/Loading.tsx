type Props = {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
};

export const Loading = ({ size = "md", fullScreen = false }: Props) => {
  const sizeMap = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-10 h-10 border-4",
  };

  const spinner = (
    <div
      className={`${sizeMap[size]} border-gray-300 border-t-blue-500 rounded-full animate-spin`}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-4">{spinner}</div>;
};
