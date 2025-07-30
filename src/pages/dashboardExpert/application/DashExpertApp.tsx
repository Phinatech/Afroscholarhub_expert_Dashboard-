import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../global/redux/Store";
import { getApplications, url } from "../../../utils/Api";
import { toast } from "react-toastify";
import axios from "axios";

const DashExpertApp = () => {
  const dispatch = useDispatch();
  const expert = useSelector((state: RootState) => state.profile.expertId);
  const apps = useSelector((state: RootState) => state.profile.applications);
  const token = localStorage.getItem("accessToken");
  let expertToken = token ? JSON.parse(token) : null;

  useEffect(() => {
    if (expert && expertToken) {
      getApplications(String(expert), expertToken, dispatch);
    }
  }, [expert, dispatch]);

  const [activeButton, setActiveButton] = useState(0);
  const [loading, setLoading] = useState<{ id: string | null; status: string | null }>({ id: null, status: null });


  const handleButtonClick = (index: number) => setActiveButton(index);

  const statusMapping = ["Processed", "Completed", "In-Progress", "Pending", "Canceled"];

  // Axios instance
  const axiosInstance = axios.create({
    baseURL: url, 
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${expertToken}`,
    },
  });

  // Function to update application status
  const updateApplicationStatus = async (applicationId: string, status: "completed" | "cancelled") => {
    setLoading({ id: applicationId, status }); 
  
    try {
      const response = await axiosInstance.put(`application/status/${applicationId}`, { status });
  
      console.log("app-update-res", response);
  
      toast.success(`Application ${status} successfully`);
      getApplications(String(expert), expertToken, dispatch);

    } catch (error: any) {
      console.error("error", error.response?.data?.message || "Error updating application status");
      console.log(error.response)
      toast.error("Error updating application status. Try again");
    } finally {
      setLoading({ id: null, status: null }); 
    }
  };
  
  

  const renderContent = () => {
    if (!Array.isArray(apps)) {
      return <p>Loading applications...</p>;
    }

    const statusColors: { [key: string]: string } = {
      pending: "text-yellow-500",
      in_progress: "text-blue-500",
      completed: "text-green-500",
      cancelled: "text-red-500",
    };

    const filteredApps =
      activeButton === 0
        ? apps
        : apps.filter((app: any) => {
            const statusMap = ["processed", "completed", "in_progress", "pending", "cancelled"];
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
          <p className="text-[#d2d2d2] text-center">No applications found.</p>
        ) : (
          filteredApps.map((app) => (
            <div
              key={app._id}
              className="flex flex-col md:flex-row justify-between border p-4 text-sm bg-[#f5f4f4] md:bg-transparent rounded-lg md:rounded-none"
            >
              {/* Mobile View (Stacked Layout) */}
              <div className="md:hidden space-y-2">
                <p className="text-lg font-bold">{app.scholarship?.title || "N/A"}</p>
                <p className="text-sm text-[#b8b5b5]">Scholar: {app.scholar?.name || "N/A"}</p>
                <p className="text-sm text-[#b8b5b5]">Fee: ${app.scholarship?.application_fee || "0"}</p>
                <p className={`text-sm font-semibold ${statusColors[app.status] || "text-[#b8b5b5]"}`}>
                  Status: {app.status}
                </p>
                <p className="text-sm text-gray-600">Created: {app.createdAt?.slice(0, 10)}</p>

                {/* Buttons (Hidden if status is "completed" or "cancelled") */}
                {app.status === "in_progress" && (
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-black text-white px-3 py-1 rounded-md text-sm"
                      onClick={() => updateApplicationStatus(app._id, "completed")}
                      disabled={loading.id === app._id && loading.status === "completed"}
                    >
                      {loading.id === app._id && loading.status === "completed" ? "Processing..." : "Completed"}
                    </button>

                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                      onClick={() => updateApplicationStatus(app._id, "cancelled")}
                      disabled={loading.id === app._id && loading.status === "cancelled"}
                    >
                      {loading.id === app._id && loading.status === "cancelled" ? "Processing..." : "Cancel"}
                    </button>

                  </div>
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

                {/* Buttons (Hidden if status is "completed" or "cancelled") */}
                {app.status === "in_progress" && (
                  <div className="flex gap-2">
                    <button
                      className="bg-black text-white px-3 py-1 rounded-md text-sm"
                      onClick={() => updateApplicationStatus(app._id, "completed")}
                      disabled={loading.id === app._id && loading.status === "completed"}
                    >
                      {loading.id === app._id && loading.status === "completed" ? "Processing..." : "Completed"}
                    </button>

                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                      onClick={() => updateApplicationStatus(app._id, "cancelled")}
                      disabled={loading.id === app._id && loading.status === "cancelled"}
                    >
                      {loading.id === app._id && loading.status === "cancelled" ? "Processing..." : "Cancel"}
                    </button>

                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen p-6 bg-white rounded-lg mt-[90px] pb-[20px]">
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
    </div>
  );
};

export default DashExpertApp;
