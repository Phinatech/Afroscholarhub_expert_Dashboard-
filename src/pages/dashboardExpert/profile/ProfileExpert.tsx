import { useSelector } from "react-redux";
import { RootState } from "../../../global/redux/Store";

const ProfileExpert = () => {
//   const user = useSelector((state: RootState) => state.user.user);
  // const isLoading = useSelector((state: RootState) => state.profile.isLoading);
  const profile = useSelector((state: RootState) => state.profile.profile);
  // const expertId = useSelector((state: RootState) => state.profile.expertId);

  // const token = useSelector((state: RootState) => state.user);

  // console.log("token", token)


  // console.log("Redux Profile:", profile);
  // console.log("Redux Expert ID:", expertId);

  return (
    <div className="w-full min-h-screen mt-[80px] flex flex-col gap-4 font-mon pb-[30px]">
        <li className="text-[18px] md:text-[22px] font-bold text-[#333]">Profile</li>

        <div className="bg-white w-full min-h-[100vh] p-4 md:p-6 rounded-bl-[20px] rounded-tr-[20px] flex flex-col justify-betwee gap-4 pb-[20px] shadow-md">

        {/* {isLoading ? (
            <p className="text-center text-gray-500">Loading profile...</p>
        ) : (  */}
           {/* profile && ( */}
            <div className=" p-6 space-y-6">
                {/* Personal Information */}
                {/* { profile.status === "approved" ? */}
                <section>
                <h3 className="text-lg font-semibold text-[#444] mb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProfileItem label="First Name" value={profile.first_name} />
                    <ProfileItem label="Last Name" value={profile.last_name} />
                    <ProfileItem label="Nationality" value={profile.nationality} />
                    <ProfileItem label="Phone" value={profile.phone} />
                    <ProfileArray label="Spoken Languages" data={profile.spoken_languages} />
                    {/* <a href={profile.social_media_profiles} className="cursor-pointer text-blue-400"><ProfileArray label="Social Media Profiles" data={profile.social_media_profiles} /></a> */}
                    <ProfileArray 
                      label="Social Media Profiles" 
                      data={profile.social_media_profiles.map((prof: any) => (
                        <a 
                          key={prof} 
                          href={prof} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="cursor-pointer text-blue-400 block"
                        >
                          {prof}
                        </a>
                      ))} 
                    />
                </div>
                </section>
                {/* :
                null
                } */}

                <hr className="border-[1px] border-[#84877d] my-3 md:hidde" />

                {/* Professional Details */}
                {/* { profile.status === "approved" ? */}
                <section>
                <h3 className="text-lg font-semibold text-[#444] mb-2">Professional Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProfileItem label="Professional Affiliation" value={profile.professional_affliation} />
                    <ProfileItem label="Years of Experience" value={profile.year_of_experience} />
                    <ProfileArray label="Academic Qualifications" data={profile.academics_qualifications} />
                </div>
                </section>
                {/* // :
                // null
                // } */}

                <hr className="border-[1px] border-[#84877d] my-3 md:hidde" />

                {/* Specialization */}
                {/* { profile.status === "approved" ? */}
                <section>
                <h3 className="text-lg font-semibold text-[#444] mb-2">Specialization</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProfileArray label="Geographic Specialization" data={profile.geographic_specialization} />
                    <ProfileArray label="Specialization Areas" data={profile.specialization} />
                </div>
                </section>
                {/* // :
                // null
                // } */}
            </div>
             {/* )} */}
         {/*)} */}

        </div>
    </div>
  );
};

// Helper component for displaying single value items
const ProfileItem = ({ label, value }: { label: string; value: string | number }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-base font-medium text-gray-800">{value || "N/A"}</p>
  </div>
);

// Helper component for displaying array data
const ProfileArray = ({ label, data }: { label: string; data: string[] }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <ul className="list-disc ml-5 text-base font-medium text-gray-800">
      {data && data.length > 0 ? data.map((item, index) => <li key={index}>{item}</li>) : <li>N/A</li>}
    </ul>
  </div>
);

export default ProfileExpert;
