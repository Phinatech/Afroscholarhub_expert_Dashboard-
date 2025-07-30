import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApplications } from '../../utils/Api';
import { RootState } from '../../global/redux/Store';

const HomeAllApplications = () => {
  const dispatch = useDispatch();
  const expert = useSelector((state: RootState) => state.profile.expertId);
  const apps = useSelector((state: RootState) => state.profile.applications);
  const token = localStorage.getItem("accessToken");
  let expertToken = token ? JSON.parse(token) : null;

  useEffect(() => {
    if (expert && expertToken) {
      getApplications(expert, expertToken, dispatch);
    }
  }, [expert, expertToken, dispatch]);

  const [activeButton, setActiveButton] = useState(0);
  const handleButtonClick = (index: number) => setActiveButton(index);

  const statusMapping = ["Processed", "Completed", "In-Progress", "Pending", "Canceled"];

  const renderContent = () => {
    if (!Array.isArray(apps)) {
      return <p>Loading applications...</p>;
    }

    const statusColors: { [key: string]: string } = {
      pending: "text-yellow-500",
      in_progress: "text-blue-500",
      completed: "text-green-500",
      canceled: "text-red-500",
    };

    const filteredApps =
      activeButton === 0
        ? apps
        : apps.filter((app: any) => {
            const statusMap = ["processed", "completed", "in_progress", "pending", "canceled"];
            return app.status === statusMap[activeButton];
          });

    return (
      <div className="flex flex-col gap-3">
        {/* Table Header (Hidden on Mobile) */}
        <div className="hidden md:flex justify-between bg-black text-white p-2 text-sm">
          <h1 className="w-1/4">Scholarship Title</h1>
          <h1 className="w-1/4">Scholar</h1>
          <h1 className="w-1/6">Fee</h1>
          <h1 className="w-1/6">Status</h1>
          <h1 className="w-1/6">Created</h1>
          <h1 className="w-1/6"></h1>
        </div>

        {filteredApps.length === 0 ? (
          <p className="text-gray-500 text-center">No applications found.</p>
        ) : (
          filteredApps.slice(0, 3).map((app) => (
            <div
              key={app._id}
              className="flex flex-col md:flex-row justify-between border p-4 text-sm bg-gray-100 md:bg-transparent rounded-lg md:rounded-none"
            >
              {/* Mobile View (Stacked Layout) */}
              <div className="md:hidden space-y-2">
                <p className="text-lg font-bold">{app.scholarship?.title || "N/A"}</p>
                <p className="text-sm text-gray-600">Scholar: {app.scholar?.name || "N/A"}</p>
                <p className="text-sm text-gray-600">Fee: ${app.scholarship?.application_fee || "0"}</p>
                <p className={`text-sm font-semibold ${statusColors[app.status] || "text-gray-500"}`}>
                  Status: {app.status}
                </p>
                <p className="text-sm text-gray-600">Created: {app.createdAt?.slice(0, 10)}</p>

                {/* Completed Button (Hidden if status is "completed") */}
                {app.status !== "completed" && (
                  <button className="mt-2 bg-black text-white px-3 py-1 rounded-md text-sm">
                    Completed
                  </button>
                )}
              </div>

              {/* Tablet & Desktop View (Table Row) */}
              <div className="hidden md:flex w-full justify-between">
                <h1 className="w-1/4">{app.scholarship?.title || "N/A"}</h1>
                <h1 className="w-1/4">{app.scholar?.name || "N/A"}</h1>
                <h1 className="w-1/6">${app.scholarship?.application_fee || "0"}</h1>
                <h1 className={`w-1/6 ${statusColors[app.status] || "text-gray-500"}`}>
                  {app.status}
                </h1>
                <h1 className="w-1/6">{app.createdAt?.slice(0, 10)}</h1>

                {/* Completed Button (Hidden if status is "completed") */}
                {app.status !== "completed" && (
                  <button className="ml-4 bg-black text-white px-3 py-1 rounded-md text-sm">
                    Completed
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div className="w-full min-h-scree p-6 bg-white rounded-lg mt-[90px pb-[30px]">
      <p className="text-black font-bold text-lg">All Application(s)</p>

      {/* Status Filter Buttons */}
      <div className="grid grid-cols-2 md:flex gap-2 flex-wrap justify-center py-2">
        {statusMapping.map((text, index) => (
          <button
            key={index}
            className={`text-[14px] px-4 py-2 rounded-lg bg-gray-200 ${
              index === activeButton ? "bg-black text-white" : "text-gray-700"
            }`}
            onClick={() => handleButtonClick(index)}
          >
            {text}
          </button>
        ))}
      </div>

      {/* Applications List */}
      <div className="mt-4">{renderContent()}</div>

      <div className='w-full flex justify-between items-center mt-[20px]'>
        <div></div>
        <button className='text-[12px] md:text-[15px] lg:text-[17px] font-[600]'>See All Applications</button>
      </div>
    </div>
  );
};

export default HomeAllApplications;
