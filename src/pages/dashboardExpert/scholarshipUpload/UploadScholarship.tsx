import React, { useState } from 'react'

import Select, {MultiValue} from "react-select"
// import { expertNationality } from "./ExpertNationality"
// import { specializationOptions } from './Specialties';
// import { FiUploadCloud } from 'react-icons/fi';
// import { NavLink } from 'react-router-dom';
import { RootState } from '../../../global/redux/Store';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { url } from '../../../utils/Api';
import { useNavigate } from 'react-router-dom';
import { expertNationality } from '../profile/ExpertNationality';
import { specializationOptions } from '../profile/Specialties';


// type OptionType = { value: string; label: string };

const UploadScholarship = () => {

    const navigate = useNavigate()


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [country, setCountry] = useState('');
  const [applicationFee, setApplicationFee] = useState<number | ''>('');
  const [applicationLink, setApplicationLink] = useState('');
  const [scholarshipKeywords, setScholarshipKeywords] = useState<MultiValue<{ value: string; label: string }>>([]);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state: RootState) => state.user.accessToken);

//   console.log("token", token)


    // const [selectRelatedKeyword, setselectRelatedKeyword] = React.useState<MultiValue<OptionType>>([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // if (!selectedImage) {
        //   toast.error("Please upload an image.");
        //   return;
        // }
      
        setLoading(true);
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('course', course);
        formData.append('country', country);
        formData.append("application_fee", applicationFee.toString());
        formData.append('application_link', applicationLink);

        // formData.append('scholarship_keywords', JSON.stringify(scholarshipKeywords.map(k => k.value)));

        const keywordLabels = scholarshipKeywords.map(keyword => keyword.value); 

        formData.append('scholarship_keywords', JSON.stringify(keywordLabels));

        // const keywordStrings = scholarshipKeywords.map(keyword => keyword.value);
        // formData.append('scholarship_keywords', JSON.stringify(keywordStrings));

        // formData.append("image", selectedImag);
        if (image) formData.append('image', image);

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
    
        try {
          const response = await axios.post(`${url}/scholarship/add`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data) {

            // console.log("sch-data", response)
    
            toast.success('Scholarship uploaded successfully');

            setTitle('');
            setDescription('');
            setCourse('');
            setCountry('');
            setApplicationFee("");
            setApplicationLink('');
            setScholarshipKeywords([]);
            setImage(null);

            navigate("/dashboard/uploadscholarship/uploadsuccess")
        } else {
            toast.error("Failed to upload scholarship. Please try again.");
          }

        } catch (error: any) {
            console.error("Error uploading scholarship:", error);
            toast.error(error.response?.data?.message || "Failed to upload scholarship.");
        } finally {
          setLoading(false);
        }
      };


  return (
    <div className="w-full min-h-[100%] mt-[80px] flex flex-col gap-4 font-mon pb-[30px] ">
      <li className="text-[14px] md:text-[16px] font-bold text-[#84877d]">Upload Scholarship</li>

      <div className="bg-white w-full p-4 md:p-6 rounded-bl-[20px] rounded-tr-[20px] flex flex-col justify-between gap-4 pb-[20px]">
        <h1 className="font-bold text-[15px] md:text-[17px] lg:text-[20px]">Upload</h1>

        <form action="" onSubmit={handleSubmit} className="w-full md:w-[65%] lg:w-[45%] flex flex-col gap-3">
            <div className="w-full flex flex-col gap-2 text-[13px] md:text-[14px] lg:text-[16px]">
                <h2 className="text-[#595959]">Scholarship Title*</h2>
                <input type="text" className="w-full h-[40px] md:h-[45px] rounded-bl-[10px] rounded-tr-[10px] border-[#84877d] border-[1px] pl-[6px] outline-none" value={title} onChange={(e) => setTitle(e.target.value)} required
                />
            </div>

            <div className="w-full flex flex-col gap-2 text-[13px] md:text-[14px] lg:text-[16px]">
                <h2 className="text-[#595959]">Scholarship Information* (Not more than 150 words)*</h2>
                <textarea className="w-full h-[120px] md:h-[125px] rounded-bl-[10px] rounded-tr-[10px] border-[#84877d] border-[1px] pl-[6px] outline-none"  value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            
            <div className="w-full flex flex-col gap-2 text-[13px] md:text-[14px] lg:text-[16px]">
                <h2 className="text-[#595959]">Course*</h2>
                <input type="text" className="w-full h-[40px] md:h-[45px] rounded-bl-[10px] rounded-tr-[10px] border-[#84877d] border-[1px] pl-[6px] outline-none" value={course} onChange={(e) => setCourse(e.target.value)} required />
            </div>

            <div className="w-full flex flex-col gap-2 text-[13px] md:text-[14px] lg:text-[16px]">
                <p className="text-[#595959]">Country*</p>
                <select
                    className="border-[#84877d] border-[1px] rounded-bl-[10px] rounded-tr-[10px] text-[13px] h-[40px] pl-[6px] md:h-[45px] w-full outline-none" value={country} onChange={(e) => setCountry(e.target.value)} required>
                        <option value="" disabled selected>
                            Select Country
                        </option>
                        {expertNationality.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                </select>
            </div>

            <div className="w-full flex flex-col gap-2 text-[13px] md:text-[14px] lg:text-[16px]">
                <h2 className="text-[#595959]">Scholarship Application Fee*</h2>
                <input type="text" className="w-full h-[40px] md:h-[45px] rounded-bl-[10px] rounded-tr-[10px] border-[#84877d] border-[1px] pl-[6px] outline-none" value={applicationFee} onChange={(e) => setApplicationFee(Number(e.target.value) || '')} required />
            </div>

            <div className="w-full flex flex-col gap-2 text-[13px] md:text-[14px] lg:text-[16px]">
                <p className="text-[#595959]">Select Related Keyword(s)*</p>
                <Select
                    isMulti
                    options={specializationOptions}
                    placeholder="Select Specialization"
                    className="w-full text-[13px]"
                    value={scholarshipKeywords}
                    onChange={setScholarshipKeywords}
                    // inputValue=""
                    onInputChange={() => {}}
                    onMenuOpen= {() => {}}
                    onMenuClose={() => {}}
                    />
            </div>

            <div className='w-full flex flex-col md:flex-ro items-cente justify-between gap-3'>
                <div className="w-full md:w-[30% lg:w-[25% flex flex-col gap-2  text-[13px] md:text-[14px] lg:text-[16px]">
                    <label htmlFor="uploadDoc" className="text-gray-600">Upload Image* <span className='text-[9px] text-[#f63535]'>(Image type must be jpg or png, and size is less than 4mb)</span></label>
                    <div className="border border-gray-500 rounded-bl-lg rounded-tr-lg h-10 w-full flex items-center justify-cente text-gray-500 cursor-pointer pl-[10px]">
                        <input 
                            type="file" 
                            onChange={(e) => setImage(e.target.files?.[0] || null)} 
                            required
                        />
                        {/* <FiUploadCloud className="text-2xl" /> */}
                    </div>
                </div>
                

                <div className="w-full md:w-[67% lg:w-[73% flex flex-col gap-2 text-[13px] md:text-[14px] lg:text-[16px]">
                    <h2 className="text-[#595959]">Scholarship Application Link*</h2>
                    <input type="text" className="w-full h-[40px] md:h-[45px] rounded-bl-[10px] rounded-tr-[10px] border-[#84877d] border-[1px] pl-[6px] outline-none" placeholder='i.e. https://scholarshiplink.com/scholarship' value={applicationLink} onChange={(e) => setApplicationLink(e.target.value)} required  />
                </div>
            </div>

            {/* <NavLink to="/dashadmin/uploadscholarship/success"> */}
                <button className={`bg-[#000] text-white text-center w-full h-[43px] md:h-[48px] border-none outline-none rounded-bl-[10px] rounded-tr-[10px] font-bold ${loading ? "opacity-50 cursor-not-allowed" : ""}`} type='submit' >
                    {loading ? 'Uploading...' : 'Submit'}
                </button>
            {/* </NavLink> */}
        </form>
      </div>
    </div>
  )
}

export default UploadScholarship