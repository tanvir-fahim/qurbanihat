"use client";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const UpdateProfile = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.value;

    await authClient.user.update({
      name: name,
      image: image,
    }, {
      onSuccess: () => {
        toast.success("Profile updated successfully!");
        router.push("/my-profile");
      },
      onError: (ctx) => {
        toast.error(ctx.error.message);
      }
    });
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Update Your Info</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="form-control">
          <label className="label font-bold text-sm text-gray-600">New Name</label>
          <input name="name" defaultValue={session?.user?.name} className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label font-bold text-sm text-gray-600">New Photo URL</label>
          <input name="image" defaultValue={session?.user?.image} className="input input-bordered" required />
        </div>
        <button type="submit" className="btn btn-warning w-full mt-4">Update Information</button>
      </form>
    </div>
  );
};

export default UpdateProfile;