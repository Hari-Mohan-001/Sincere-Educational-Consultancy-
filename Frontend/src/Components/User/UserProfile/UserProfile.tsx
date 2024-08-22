import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Interface/User/UserInterface";
import { validateUserImage } from "../../../Utils/Validation/UserSignUpValidation";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { updateUser } from "../../../Redux/User/UserSlice";
import { AppDispatch } from "../../../Redux/Store";

interface User {
  name?: string;
  email?: string;
  mobile?: string;
  image?: string;
  password?: string;
}

const UserProfile = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [files, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [userData, setUserData] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  //   useEffect(() => {
  //     if (image) {
  //       handleImageUpload(image);
  //     }
  //   }, [image]);

  const ImagePreview = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
        setUserData({ ...userData, image: reader.result });
      } else {
        toast.error("Loading error");
        return;
      }
    };
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const isImage = validateUserImage(file);
      if (isImage) {
        toast.error("Choose an image file");
        return;
      }
      setFile(file);
      ImagePreview(file);
      console.log(files);
      
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setUpdateMessage("")
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (userData && user) {
        setLoading(true);
        const userId = user?.id;
        const updatedUser = await dispatch(
          updateUser({ userData, userId })
        ).unwrap();
        if (!updatedUser) {
          toast.error("Failed to update");
        } else {
          toast.success("Updated Successfully");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-sky-700">
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-center my-3 text-3xl font-bold underline">Profile</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-3">
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          onChange={handleImageChange}
          hidden
        />
        <img
          className="h-36 w-36 rounded-full object-cover self-center cursor-pointer border"
          src={ image || user?.image || '../../../Images/UserAvatar.png'}
          alt="profile Image"
          onClick={() => fileRef.current?.click()}
        />

        <input
          type="text"
          placeholder="Name"
          id="name"
          defaultValue={user?.name}
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={user?.email}
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="mobile"
          placeholder="Mobile"
          id="mobile"
          defaultValue={user?.mobile}
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-slate-950 text-white rounded-lg p-3 uppercase mt-2 hover:opacity-90"
        >
          {loading ? "loading.." : "update"}
        </button>
      </form>
      {loading && (
        <div className="flex justify-center items-center mb-4">
          <ClipLoader color="#4A90E2" loading={loading} size={50} />{" "}
          {/* Use ClipLoader */}
          <p className="ml-2">Updating...</p>
        </div>
      )}
    </div>
    </section>
  );
};

export default UserProfile;
