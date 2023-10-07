const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
      <div className="transform scale-150">
        <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-700 h-12 w-12"></div>
      </div>
    </div>
  );
};

export default Loader