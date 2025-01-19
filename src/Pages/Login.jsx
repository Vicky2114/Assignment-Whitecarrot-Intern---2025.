import { FcGoogle } from "react-icons/fc";

function Login({ supabase }) {
  const googleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes:
          "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events",
      },
    });
    if (error) {
      alert("Error logging in to Google provider with Supabase");
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">Faster Access to Events</h1>
        <p className="text-lg mb-6 text-center">
          Filter and create events whenever you want with ease.
        </p>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 flex justify-center items-center bg-gray-100">
        <button
          onClick={googleSignIn}
          className="flex items-center px-6 py-3 bg-white text-gray-700 border border-gray-300 shadow-md rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
        >
          <FcGoogle className="mr-3 text-2xl" />
          Sign In With Google
        </button>
      </div>
    </div>
  );
}

export default Login;
