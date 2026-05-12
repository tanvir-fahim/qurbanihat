"use client";
import { useSession, authClient } from "@/lib/auth-client"; // Use the fixed exports
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const UpdateProfile = () => {
  const { data: session } = useSession(); 
  const router = useRouter();

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Since we are using onSubmit, e.target is the FORM
    const name = e.target.name.value;
    const image = e.target.image.value;

    await authClient.updateUser({
      name: name,
      image: image,
    }, {
      onSuccess: () => {
        toast.success("Profile updated successfully!");
        router.refresh(); // Refresh to show new data in Navbar
        router.push("/my-profile");
      },
      onError: (ctx) => {
        toast.error(ctx.error.message);
      }
    });
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-base-100 shadow-xl rounded-2xl mt-10">
      <h1 className="text-2xl font-bold mb-8 text-center">Update Your Info</h1>
      
      <form onSubmit={handleUpdate} className="space-y-6">
        {/* Name Legend */}
        <fieldset className="border border-gray-300 rounded-lg px-3 pb-1">
          <legend className="text-xs font-bold text-orange-600 px-2 ml-2 uppercase">New Name</legend>
          <input 
            name="name" 
            defaultValue={session?.user?.name} 
            className="input w-full border-none focus:outline-none focus:ring-0 h-10 bg-transparent" 
            required 
          />
        </fieldset>

        {/* Image Legend */}
        <fieldset className="border border-gray-300 rounded-lg px-3 pb-1">
          <legend className="text-xs font-bold text-orange-600 px-2 ml-2 uppercase">New Photo URL</legend>
          <input 
            name="image" 
            defaultValue={session?.user?.image} 
            className="input w-full border-none focus:outline-none focus:ring-0 h-10 bg-transparent" 
            required 
          />
        </fieldset>

        {/* REMOVED onClick={handleUpdate} here */}
        <button type="submit" className="btn btn-warning w-full shadow-md">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;