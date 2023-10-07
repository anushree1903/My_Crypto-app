// eslint-disable-next-line react/prop-types
const ErrorComponent = ({ message }) => {
  return (
    <div className="bg-red-500 text-white fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg">
      { message }
    </div>
  );
};

export default ErrorComponent;

