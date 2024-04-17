const ItemLoading = () => {
  return (
    <>
      {Array(10)
        .fill(null)
        .map((_, idx) => (
          <div
            key={idx}
            className="p-4  shadow-inner border border-slate-400  rounded-md px-2 mr-[5px]"
          >
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-700 rounded w-12"></div>
                <div className="space-y-3">
                  <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ItemLoading;
