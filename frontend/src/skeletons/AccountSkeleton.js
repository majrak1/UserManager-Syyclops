const AccountSkeleton = () => {
    return (
      <div className="flex flex-col gap-4 p-4 border border-gray-300 rounded shadow animate-pulse">
        <div className="skeleton h-6 w-1/2"></div>
        <div className="skeleton h-4 w-3/4"></div>
        <div className="skeleton h-4 w-3/4"></div>
        <div className="skeleton h-4 w-1/2"></div>
      </div>
    );
  };
  
  export default AccountSkeleton;
  