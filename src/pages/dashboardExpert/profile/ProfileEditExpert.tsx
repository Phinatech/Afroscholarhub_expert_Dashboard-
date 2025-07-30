import React, { useState } from 'react'
import { specializationOptions } from "./Specialties";
import { expertNationality, expertNationalityOptions } from "./ExpertNationality";
import Select, { MultiValue } from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../global/redux/Store';
import { jwtDecode } from 'jwt-decode';
import { DecodedUser, Expert } from '../../../types/Interface';
import { url } from '../../../utils/Api';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setExpertId, setProfile } from '../../../global/redux/ProfileSlice';
import { useNavigate } from 'react-router-dom';

type OptionType = { value: string; label: string };

const ProfileEditExpert = () => {

    const profile = useSelector((state: RootState) => state.profile.profile);
    console.log("profile", profile)

    const navigate = useNavigate()

    type SocialPlatform = 'linkedin' | 'facebook' | 'website' | 'others';

    const platforms: SocialPlatform[] = ['linkedin', 'facebook', 'website', 'others'];

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    // const token = user?.accessToken;

    console.log("user", user)
    // console.log("token", token)

    
  const storedToken  = localStorage.getItem("refreshToken");
  const token1  = localStorage.getItem("accessToken");

    //   let refreshToken = null;
      let accessToken = null;

    if (storedToken && token1) {
      try {
        // refreshToken = JSON.parse(storedToken);
        accessToken = JSON.parse(token1);
        // console.log("refe-profile", refreshToken); 
        // console.log("acc-profile", accessToken); 
      } catch (error) {
        console.error("Failed to parse refreshToken:", error);
      }
    } else {
      console.log("No refreshToken or accessToken found in localStorage");
    }

    const decoded = accessToken ? jwtDecode<DecodedUser>(accessToken) : null;
    const expertId = decoded?._id;

    console.log("expert-id", expertId)

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nationality, setNationality] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [socialLinks, setSocialLinks] = useState({
        linkedin: '',
        facebook: '',
        website: '',
        others: ''
    });
    const [languages, setLanguages] = useState({
        universal: '',
        others: '',
      });
    const [qualification1, setQualification1] = useState('');
    const [qualification2, setQualification2] = useState('');
    const [experience, setExperience] = useState<number | ''>('');
    const [specializations, setSpecializations] = useState<MultiValue<OptionType>>([]);
    const [geoSpecializations, setGeoSpecializations] = useState<MultiValue<OptionType>>([]);
    const [doc1, setDoc1] = useState<File | null>(null);
    const [doc2, setDoc2] = useState<File | null>(null);
    const [professionalAffiliation, setProfessionalAffiliation] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setNationality('');
        setPhoneNumber('');
        setSocialLinks({ linkedin: '', facebook: '', website: '', others: '' });
        setLanguages({ universal: '', others: '' });
        setQualification1('');
        setQualification2('');
        setExperience('');
        setSpecializations([]);
        setGeoSpecializations([]);
        setDoc1(null);
        setDoc2(null);
        setProfessionalAffiliation('');
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        const formData = new FormData();
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("nationality", nationality);
        formData.append("phone", phoneNumber);
    
        // Object.entries(socialLinks).forEach(([value, index]) => {
        //     if (value) {
        //       formData.append(`social_media_profiles[${index}]`, value);
        //     }
        //   });

        Object.values(socialLinks).forEach((value) => {
            if (value) {
                formData.append("social_media_profiles[]", value); 
            }
        });
    
        // Spoken Languages
        const spokenLanguages = [languages.universal, ...languages.others.split(",")];
        spokenLanguages.forEach((lang, index) => {
          formData.append(`spoken_languages[${index}]`, lang.trim());
        });
    
        const academicQualifications = [qualification1, qualification2].filter(Boolean);
        academicQualifications.forEach((qual, index) => {
            formData.append(`academics_qualifications[${index}]`, qual);
        });
    
        // Document Uploads
        [doc1, doc2].forEach((doc) => {
          if (doc) formData.append("docUpload", doc);
        });
    
        formData.append("year_of_experience", experience.toString());
        formData.append("professional_affliation", professionalAffiliation);
    
        // Specializations
        specializations.forEach((spec, index) => {
          formData.append(`specialization[${index}]`, spec.value);
        });
    
        // Geographic Specializations
        geoSpecializations.forEach((geo, index) => {
          formData.append(`geographic_specialization[${index}]`, geo.value);
        });
    
        try {
            const response = await axios.patch(`${url}/expert/profile/${expertId}`,
                formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // console.log(response)
    
            if (response.status === 200) {
                const updatedProfile: Expert = response.data;

                console.log("new-profile", updatedProfile)

                dispatch(setProfile(updatedProfile));
                dispatch(setExpertId(expertId as string));
                
                navigate("/dashboard/profile/edit/verify")

                console.log("pro-data", response)

                toast.success("Profile updated successfully!");
                resetForm()
            } else {
                console.log("in-error", response);
                toast.error('error updating. Please try again.', {
                position: 'top-right',
                });
            }
        } catch (error) {
            console.log("error", error)
            toast.error("An error occurred while updating your profile.");
        } finally {
            setIsSubmitting(false);
        }
      };
    
    
    

  return (
    <div className="w-full mt-[80px] flex justify-center items-center">
        <div className="w-[100%] md:w-full flex flex-col gap-4 mb-[30px]">
            <li className="font-bold text-[14px] md:text-[16px] text-[#84877d]">Profile/Edit</li>


            <form onSubmit={handleSubmit} action="" className="bg-white w-full p-4 md:p-6 rounded-bl-[20px] rounded-tr-[20px] flex flex-col gap-4 pb-[30px]">

                <h1 className="text-[16px] md:text-[20px] font-bold">Complete Profile</h1>

                { profile.first_name ?
                    <p className='text-red-400 text-[11px] lg:text-[12px] text-justify'>*Do not bother filling or sending this form again, if you have already done that, and have gotten a reply "Profile updated successfully!". We will send you a mail when your account/profile is approved.*</p>
                :
                    null
                }

                <div className="w-full flex flex-col md:flex-row gap-4 md:justify-between">
                    
                    <div className="w-full lg:w-[48%] flex flex-col gap-2">
                        <h2 className="text-[15px] md:text-[18px] font-bold">Basic Information</h2>
                        
                        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3">
                            <div className="w-full md:w-[48%] flex flex-col gap-2">
                                <p className="text-[14px] font-bold">First Name</p>
                                <input 
                                    className="border-[#84877d] border-[1px] rounded-bl-[6px] rounded-tr-[6px] text-[13px] h-[40px] pl-[6px] w-full outline-none"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First Name" 
                                    required
                                />
                            </div>

                            <div className="w-full md:w-[48%] flex flex-col gap-2">
                                <p className="text-[14px] font-bold">Last Name</p>
                                <input 
                                type="text" 
                                className="border-[#84877d] border-[1px] rounded-bl-[6px] rounded-tr-[6px] text-[13px] h-[40px] pl-[6px] w-full outline-none" 
                                placeholder="Last Name" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                />
                            </div>  
                        </div>
                        
                        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3">
                            <div className="w-full md:w-[48%] flex flex-col gap-2">
                                <p className="text-[14px] font-bold">Nationality</p>
                                <select
                                    className="border-[#84877d] border-[1px] rounded-bl-[6px] rounded-tr-[6px] text-[13px] h-[40px] px-[6px] w-full outline-none"
                                    value={nationality}
                                    onChange={(e) => setNationality(e.target.value)}
                                    required
                                    >
                                    <option value="" disabled selected>
                                        Select Nationality
                                    </option>
                                    {expertNationality.map((country) => (
                                        <option key={country} value={country}>
                                        {country}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="w-full md:w-[48%] flex flex-col gap-2">
                                <p className="text-[14px] font-bold">Phone Number</p>
                                <input 
                                className="border-[#84877d] border-[1px] rounded-bl-[6px] rounded-tr-[6px] text-[13px] h-[40px] pl-[6px] w-full outline-none" 
                                placeholder="Phone Number" 
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                />
                            </div>  
                        </div>

                        <div className="w-full md:w-[48% flex flex-col gap-2">
                            <p className="text-[14px] font-bold">Social Media Profile Links</p>
                            <div className="w-full flex flex-wrap justify-between gap-2">
                                {platforms.map((platform) => (
                                <input
                                    key={platform}
                                    type="text"
                                    placeholder={platform.charAt(0).toUpperCase() + platform.slice(1)}
                                    value={socialLinks[platform]}
                                    onChange={(e) => setSocialLinks({ ...socialLinks, [platform]: e.target.value })}
                                    className="h-[40px] w-full md:w-[48%] border-[#84877d] border-[1px] rounded-bl-[6px] rounded-tr-[6px] text-[13px] pl-[6px] outline-none "
                                />
                                ))}
                            </div>
                        </div>

                        <div className="w-full md:w-[48% flex flex-col gap-2">
                            <p className="text-[14px] font-bold">Language(s) Spoken</p>
                            <div className="w-full flex flex-wrap justify-between gap-2">
                                <input type="text" className="h-[40px] w-full md:w-[48% border-[#84877d] border-[1px] rounded-bl-[6px] rounded-tr-[6px] text-[13px] pl-[6px] outline-none" placeholder="Universal (English, French etc.)" 
                                value={languages.universal}
                                onChange={(e) => setLanguages({ ...languages, universal: e.target.value })}
                                />

                                <input type="text" className="h-[40px] w-full md:w-[48% border-[#84877d] border-[1px] rounded-bl-[6px] rounded-tr-[6px] text-[13px] pl-[6px] outline-none" placeholder="Others (If more than one, seperate with a comma)"
                                value={languages.others}
                                onChange={(e) => setLanguages({ ...languages, others: e.target.value })} 
                                />
                            </div>
                        </div>

                    </div>

                    <hr className="border-[1px] border-[#84877d] my-3 md:hidden" />

                    <div className="w-full lg:w-[48%] flex flex-col gap-2">
                        <h2 className="text-[15px] md:text-[18px] font-bold">Professional Information</h2>

                        <div className="w-full md:w-[48% flex flex-col gap-2">
                            <p className="text-[14px] font-bold">Academic Qualification</p>
                            <div className="w-full flex flex-wrap justify-between gap-2">
                                <input type="text" className="h-[40px] w-full md:w-[48% border-[#84877d] border-[1px] rounded-bl-[6px] rounded-tr-[6px] text-[13px] pl-[6px] outline-none" placeholder="Certification/Relevant Qualification" 
                                 value={qualification1}
                                 onChange={(e) => setQualification1(e.target.value)}
                                 required
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-[48% flex flex-col gap-2">
                            <p className="text-[14px] font-bold">Academic Qualification 2 (Optional)</p>
                            <div className="w-full flex flex-wrap justify-between gap-2">
                                <input type="text" className="h-[40px] w-full md:w-[48% border-[#84877d] border-[1px] rounded-bl-[6px] rounded-tr-[6px] text-[13px] pl-[6px] outline-none" placeholder="Certification/Relevant Qualification" 
                                value={qualification2}
                                onChange={(e) => setQualification2(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <div className="w-full flex flex-co md:flex-row items-center justify-between gap-3">
                            <div className="w-ful w-[48%] flex flex-col gap-2">
                                <p className="text-[14px] font-bold">Upload Doc.</p>
                                    <input 
                                        type="file" onChange={(e: any) => setDoc1(e.target.files[0] || null)}
                                        className="border-[#84877d border-[1px rounded-bl-[6px] rounded-tr-[6px] text-[13px] h-[40px] pl-[6px] w-full outline-none cursor-pointer flex items-center justify-center text-[#84877d]" 
                                         accept=".pdf,.png.jpg,.jpeg,.PNG,.JPEG,.JPG,.zip,.ZIP"
                                        />
                                {/* </div> */}
                            </div>

                            <div className="w-ful w-[48%] flex flex-col gap-2">
                                <p className="text-[14px] font-bold">Upload Doc. 2</p>
                                    <input 
                                    type="file" 
                                    onChange={(e: any) => setDoc2(e.target.files[0] || null)}
                                      className="border-[#84877d border-[1px rounded-bl-[6px] rounded-tr-[6px] text-[13px] h-[40px] pl-[6px] w-full outline-none cursor-pointer flex items-center justify-center text-[#84877d]"
                                      accept=".pdf,.png.jpg,.jpeg,.PNG,.JPEG,.JPG,.zip,.ZIP"
                                    />
                                {/* </div> */}
                            </div>  
                        </div>

                        <div className="w-full md:w-[48% flex flex-col gap-2">
                            <p className="text-[14px] font-bold">Year of Experience</p>
                                <input type="number" className="h-[40px] w-full md:w-[48% border-[#84877d] border-[1px] rounded-bl-[6px] rounded-tr-[6px] text-[13px] pl-[6px] outline-none" placeholder="Years working on Scholarship Applications i.e 5"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value === '' ? '' : parseInt(e.target.value))} 
                                />
                        </div>

                        <div className="w-full md:w-[48% flex flex-col gap-2">
                            <p className="text-[14px] font-bold">Specialization (Select field of Scholarship Specialty)</p>
                                <Select
                                    isMulti
                                    options={specializationOptions}
                                    placeholder="Select Specialization"
                                    value={specializations}
                                    onChange={setSpecializations}
                                    className="w-full text-[13px]"
                                />
                        </div>

                        <div className="w-full md:w-[48% flex flex-col gap-2">
                            <p className="text-[14px] font-bold">Professional Affiliation</p>
                                <input type="text" className="h-[40px] w-full md:w-[48% border-[#84877d] border-[1px] rounded-bl-[6px] rounded-tr-[6px] text-[13px] pl-[6px] outline-none" placeholder="Advisory Board, Educational Consult etc." 
                                value={professionalAffiliation}
                                onChange={(e) => setProfessionalAffiliation(e.target.value)}
                                />
                        </div>

                        <div className="w-full md:w-[48% flex flex-col gap-2">
                            <p className="text-[14px] font-bold">Geographic Specialization (Select Multiple Countries)</p>
                                <Select
                                    isMulti
                                    options={expertNationalityOptions}
                                    placeholder="Select Countries"
                                    value={geoSpecializations}
                                    onChange={setGeoSpecializations}
                                    className="w-full text-[13px] outline-none"
                                />
                        </div>
                    </div>
                    
                </div>

                    <button className={`bg-[#000] text-white text-center w-full h-[40px] border-none outline-none rounded-bl-[10px] rounded-tr-[10px] font-bold ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`} type='submit'>
                        {isSubmitting ? 'Updating...' : 'Submit'}
                    </button>
            </form>

        </div>
    </div>
  )
}

export default ProfileEditExpert