const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-[50] flex items-center justify-center backdrop-blur-sm bg-black/60">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-[4px] border-t-transparent border-green-400 rounded-full animate-spin" />
        <p className="text-green-400 text-sm font-medium tracking-wide">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
