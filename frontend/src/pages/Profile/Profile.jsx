import { useEffect, useMemo, useState } from "react";

import {
  User,
  Save,
  Ruler,
  Weight,
  Calendar,
  Sparkles,
  Edit3,
  Camera,
  Trash2,
  Check,
  Palette,
  ArrowRight,
} from "lucide-react";

import toast from "react-hot-toast";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import {
  getProfile,
  createProfile,
  updateProfile,
  uploadProfilePhoto,
  deleteProfilePhoto,
} from "../../services/profileService";

const API_URL = "http://127.0.0.1:8000";


// ============================================================
// OPTIONS
// ============================================================

const BODY_SHAPES = [
  {
    value: "rectangle",
    label: "Rectangle",
    description: "Balanced shoulders and hips",
  },
  {
    value: "triangle",
    label: "Triangle",
    description: "Hips wider than shoulders",
  },
  {
    value: "inverted_triangle",
    label: "Inverted Triangle",
    description: "Shoulders wider than hips",
  },
  {
    value: "oval",
    label: "Oval",
    description: "Fuller through the center",
  },
  {
    value: "hourglass",
    label: "Hourglass",
    description: "Balanced with defined waist",
  },
];

const SKIN_TONES = [
  {
    value: "fair",
    label: "Fair",
    color: "#F4D5C0",
  },
  {
    value: "light",
    label: "Light",
    color: "#E8B99B",
  },
  {
    value: "medium",
    label: "Medium",
    color: "#C98D6B",
  },
  {
    value: "tan",
    label: "Tan",
    color: "#A96E4D",
  },
  {
    value: "deep",
    label: "Deep",
    color: "#70432F",
  },
];

const COLOR_SEASONS = [
  {
    value: "spring",
    label: "Spring",
    description: "Warm · Light · Bright",
    colors: ["#F6C453", "#F39B76", "#A8C97F", "#F6D9B0"],
  },
  {
    value: "summer",
    label: "Summer",
    description: "Cool · Soft · Muted",
    colors: ["#B8C9D9", "#D7B7C8", "#8EA8B8", "#E4D8C8"],
  },
  {
    value: "autumn",
    label: "Autumn",
    description: "Warm · Rich · Earthy",
    colors: ["#A9552D", "#C58A3A", "#66734B", "#7A4635"],
  },
  {
    value: "winter",
    label: "Winter",
    description: "Cool · Deep · Clear",
    colors: ["#182A45", "#7C2637", "#F1F1EC", "#1C1C1C"],
  },
];

const GENDERS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];


// ============================================================
// BODY SHAPE ICON
// ============================================================

function BodyShapeIcon({ type, selected }) {
  const stroke = selected ? "#111111" : "#777777";

  if (type === "rectangle") {
    return (
      <svg
        viewBox="0 0 80 100"
        className="w-14 h-16"
        fill="none"
        stroke={stroke}
        strokeWidth="3"
      >
        <path d="M28 10 C28 5 52 5 52 10" />
        <path d="M28 14 L24 35 L27 68 L25 92" />
        <path d="M52 14 L56 35 L53 68 L55 92" />
        <path d="M27 35 L53 35" />
        <path d="M27 68 L53 68" />
        <path d="M25 92 L20 97" />
        <path d="M55 92 L60 97" />
      </svg>
    );
  }

  if (type === "triangle") {
    return (
      <svg
        viewBox="0 0 80 100"
        className="w-14 h-16"
        fill="none"
        stroke={stroke}
        strokeWidth="3"
      >
        <path d="M30 10 C30 5 50 5 50 10" />
        <path d="M30 14 L29 34 L22 50 L18 68 L22 92" />
        <path d="M50 14 L51 34 L58 50 L62 68 L58 92" />
        <path d="M29 34 L51 34" />
        <path d="M18 68 L62 68" />
        <path d="M22 92 L17 97" />
        <path d="M58 92 L63 97" />
      </svg>
    );
  }

  if (type === "inverted_triangle") {
    return (
      <svg
        viewBox="0 0 80 100"
        className="w-14 h-16"
        fill="none"
        stroke={stroke}
        strokeWidth="3"
      >
        <path d="M30 10 C30 5 50 5 50 10" />
        <path d="M25 18 L15 34 L23 48 L28 70 L25 92" />
        <path d="M55 18 L65 34 L57 48 L52 70 L55 92" />
        <path d="M15 34 L65 34" />
        <path d="M28 70 L52 70" />
        <path d="M25 92 L20 97" />
        <path d="M55 92 L60 97" />
      </svg>
    );
  }

  if (type === "oval") {
    return (
      <svg
        viewBox="0 0 80 100"
        className="w-14 h-16"
        fill="none"
        stroke={stroke}
        strokeWidth="3"
      >
        <path d="M30 10 C30 5 50 5 50 10" />
        <path d="M30 14 C20 25 20 45 25 55 C30 65 30 72 26 92" />
        <path d="M50 14 C60 25 60 45 55 55 C50 65 50 72 54 92" />
        <path d="M25 92 L20 97" />
        <path d="M54 92 L59 97" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 80 100"
      className="w-14 h-16"
      fill="none"
      stroke={stroke}
      strokeWidth="3"
    >
      <path d="M30 10 C30 5 50 5 50 10" />
      <path d="M30 14 C23 24 22 32 28 40" />
      <path d="M50 14 C57 24 58 32 52 40" />
      <path d="M28 40 C22 50 22 60 29 68" />
      <path d="M52 40 C58 50 58 60 51 68" />
      <path d="M29 68 L25 92" />
      <path d="M51 68 L55 92" />
      <path d="M25 92 L20 97" />
      <path d="M55 92 L60 97" />
    </svg>
  );
}


// ============================================================
// SMALL READ-ONLY VALUE
// ============================================================

function ProfileValue({ label, value }) {
  return (
    <div className="border border-stone-200 bg-stone-50/60 rounded-2xl p-5">
      <p className="text-[11px] tracking-[0.18em] uppercase text-stone-400 font-semibold">
        {label}
      </p>

      <p className="mt-2 text-lg font-semibold text-stone-900 capitalize">
        {value || "Not set"}
      </p>
    </div>
  );
}


// ============================================================
// MAIN COMPONENT
// ============================================================

export default function Profile() {
  const [profile, setProfile] = useState(null);

  const [form, setForm] = useState({
    body_shape: "",
    skin_tone: "",
    color_season: "",
    gender: "",
    height: "",
    weight: "",
    age: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoDeleting, setPhotoDeleting] = useState(false);

  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");


  // ============================================================
  // LOAD PROFILE
  // ============================================================

  useEffect(() => {
    loadProfile();
  }, []);


  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProfile();

      setProfile(data);

      setForm({
        body_shape: data.body_shape || "",
        skin_tone: data.skin_tone || "",
        color_season: data.color_season || "",
        gender: data.gender || "",
        height: data.height || "",
        weight: data.weight || "",
        age: data.age || "",
      });

    } catch (err) {
      if (err.response?.status === 404) {
        setProfile(null);
        setEditing(true);
      } else {
        console.error("Profile loading error:", err);

        setError(
          err.response?.data?.detail ||
          "Unable to load your profile."
        );
      }
    } finally {
      setLoading(false);
    }
  };


  // ============================================================
  // FORM CHANGE
  // ============================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  // ============================================================
  // PROFILE COMPLETION
  // ============================================================

  const completion = useMemo(() => {
    const fields = [
      form.body_shape,
      form.skin_tone,
      form.color_season,
      form.gender,
      form.height,
      form.weight,
      form.age,
    ];

    const completed = fields.filter(
      (value) =>
        value !== "" &&
        value !== null &&
        value !== undefined
    ).length;

    return Math.round((completed / fields.length) * 100);
  }, [form]);


  // ============================================================
  // UPLOAD PHOTO
  // ============================================================

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Only JPG, PNG and WEBP images are allowed."
      );

      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError(
        "Profile photo must be smaller than 5 MB."
      );

      e.target.value = "";
      return;
    }

    try {
      setPhotoUploading(true);
      setError("");

      const data = await uploadProfilePhoto(file);

      setProfile((previous) => ({
        ...previous,
        profile_photo: data.profile_photo,
      }));

      toast.success("Profile photo updated!");

    } catch (err) {
      console.error(
        "Profile photo upload error:",
        err
      );

      setError(
        err.response?.data?.detail ||
        "Unable to upload profile photo."
      );

    } finally {
      setPhotoUploading(false);

      e.target.value = "";
    }
  };


  // ============================================================
  // DELETE PHOTO
  // ============================================================

  const handleDeletePhoto = async () => {
    try {
      setPhotoDeleting(true);
      setError("");

      await deleteProfilePhoto();

      setProfile((previous) => {
        if (!previous) {
          return previous;
        }

        const updated = {
          ...previous,
        };

        delete updated.profile_photo;

        return updated;
      });

      toast.success("Profile photo removed.");

    } catch (err) {
      console.error(
        "Profile photo delete error:",
        err
      );

      setError(
        err.response?.data?.detail ||
        "Unable to remove profile photo."
      );

    } finally {
      setPhotoDeleting(false);
    }
  };


  // ============================================================
  // SAVE PROFILE
  // ============================================================

  const handleSave = async () => {
    setError("");

    if (
      !form.body_shape ||
      !form.skin_tone ||
      !form.color_season ||
      !form.gender ||
      !form.height ||
      !form.weight ||
      !form.age
    ) {
      setError(
        "Please complete all profile fields."
      );

      return;
    }

    try {
      setSaving(true);

      const profileData = {
        body_shape: form.body_shape,
        skin_tone: form.skin_tone,
        color_season: form.color_season,
        gender: form.gender,
        height: Number(form.height),
        weight: Number(form.weight),
        age: Number(form.age),
      };

      if (profile) {
        await updateProfile(profileData);

        toast.success(
          "Profile updated successfully!"
        );
      } else {
        await createProfile(profileData);

        toast.success(
          "Profile created successfully!"
        );
      }

      const updatedProfile = await getProfile();

      setProfile(updatedProfile);

      setForm({
        body_shape: updatedProfile.body_shape || "",
        skin_tone: updatedProfile.skin_tone || "",
        color_season: updatedProfile.color_season || "",
        gender: updatedProfile.gender || "",
        height: updatedProfile.height || "",
        weight: updatedProfile.weight || "",
        age: updatedProfile.age || "",
      });

      setEditing(false);

    } catch (err) {
      console.error(
        "Profile save error:",
        err
      );

      setError(
        err.response?.data?.detail ||
        "Unable to save your profile."
      );

    } finally {
      setSaving(false);
    }
  };


  // ============================================================
  // CANCEL EDIT
  // ============================================================

  const handleCancel = () => {
    if (!profile) {
      return;
    }

    setForm({
      body_shape: profile.body_shape || "",
      skin_tone: profile.skin_tone || "",
      color_season: profile.color_season || "",
      gender: profile.gender || "",
      height: profile.height || "",
      weight: profile.weight || "",
      age: profile.age || "",
    });

    setError("");
    setEditing(false);
  };


  // ============================================================
  // PHOTO URL
  // ============================================================

  const profilePhotoUrl =
    profile?.profile_photo
      ? `${API_URL}/uploads/${profile.profile_photo}`
      : null;


  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f5f0]">
        <Sidebar />

        <div className="ml-72 min-h-screen">
          <Topbar />

          <main className="p-10">

            <div className="max-w-6xl mx-auto">

              <div className="animate-pulse">

                <div className="h-5 w-32 bg-stone-200 rounded mb-4" />

                <div className="h-12 w-80 bg-stone-200 rounded-xl" />

                <div className="h-5 w-96 bg-stone-200 rounded mt-4" />

                <div className="bg-white rounded-[2rem] mt-10 p-8 border border-stone-200">

                  <div className="flex items-center gap-5 pb-8 border-b border-stone-100">

                    <div className="w-24 h-24 rounded-full bg-stone-200" />

                    <div className="space-y-3">
                      <div className="h-6 w-48 bg-stone-200 rounded" />
                      <div className="h-4 w-72 bg-stone-200 rounded" />
                    </div>

                  </div>

                  <div className="grid grid-cols-2 gap-6 mt-10">

                    {[1, 2, 3, 4, 5, 6].map(
                      (item) => (
                        <div
                          key={item}
                          className="h-20 bg-stone-100 rounded-2xl"
                        />
                      )
                    )}

                  </div>

                </div>

              </div>

            </div>

          </main>
        </div>
      </div>
    );
  }


  // ============================================================
  // MAIN
  // ============================================================

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-stone-900">

      <Sidebar />

      <div className="ml-72 min-h-screen">

        <Topbar />

        <main className="px-10 py-12">

          <div className="max-w-6xl mx-auto">


            {/* ==================================================
                PAGE HEADER
            ================================================== */}

            <div className="flex items-end justify-between mb-10">

              <div>

                <p className="text-xs tracking-[0.25em] uppercase text-stone-400 font-semibold mb-3">
                  StyleAI / Personal
                </p>

                <h1 className="font-serif text-5xl leading-tight tracking-tight text-stone-950">
                  Your Style Profile
                </h1>

                <p className="text-stone-500 mt-3 text-base">
                  The details StyleAI uses to understand what looks best on you.
                </p>

              </div>


              {profile && !editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="group flex items-center gap-2 bg-stone-950 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-[#c6a15b] hover:text-stone-950 transition-all duration-300"
                >
                  <Edit3 size={17} />

                  Edit Profile

                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              )}

            </div>


            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-2xl text-sm">
                {error}
              </div>
            )}


            {/* ==================================================
                PROFILE HERO
            ================================================== */}

            <section className="bg-white border border-stone-200 rounded-[2rem] overflow-hidden">

              <div className="p-8">

                <div className="flex items-center justify-between gap-8">

                  {/* PHOTO + TITLE */}

                  <div className="flex items-center gap-6">

                    <div className="relative shrink-0">

                      <div className="w-28 h-28 rounded-full overflow-hidden bg-stone-950 text-white flex items-center justify-center ring-4 ring-stone-100 shadow-lg">

                        {profilePhotoUrl ? (
                          <img
                            src={profilePhotoUrl}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User size={40} />
                        )}

                        {photoUploading && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">

                            <div className="w-7 h-7 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                          </div>
                        )}

                      </div>


                      {editing && (
                        <>
                          <label
                            htmlFor="profile-photo"
                            className={`absolute bottom-1 right-1 w-9 h-9 rounded-full bg-[#c6a15b] text-stone-950 flex items-center justify-center shadow-lg transition-all ${
                              photoUploading
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer hover:bg-[#b48d49] hover:scale-105"
                            }`}
                          >
                            <Camera size={17} />
                          </label>

                          <input
                            id="profile-photo"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handlePhotoUpload}
                            disabled={photoUploading}
                            className="hidden"
                          />
                        </>
                      )}


                      {editing && profilePhotoUrl && (
                        <button
                          type="button"
                          onClick={handleDeletePhoto}
                          disabled={
                            photoDeleting ||
                            photoUploading
                          }
                          title="Remove profile photo"
                          className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-stone-950 text-white flex items-center justify-center shadow-md hover:bg-red-500 transition disabled:opacity-50"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}

                    </div>


                    <div>

                      <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold">
                        Personal styling profile
                      </p>

                      <h2 className="font-serif text-3xl text-stone-950 mt-1">
                        Your Style Identity
                      </h2>

                      <p className="text-stone-500 mt-2 max-w-xl">
                        Your profile helps StyleAI create recommendations that feel considered, flattering and personal.
                      </p>

                      {photoUploading && (
                        <p className="text-xs text-[#a17d3c] font-semibold mt-2">
                          Uploading profile photo...
                        </p>
                      )}

                      {photoDeleting && (
                        <p className="text-xs text-red-500 font-semibold mt-2">
                          Removing profile photo...
                        </p>
                      )}

                    </div>

                  </div>


                  {/* COMPLETION */}

                  <div className="min-w-[210px]">

                    <div className="flex items-end justify-between mb-3">

                      <div>

                        <p className="text-xs uppercase tracking-[0.18em] text-stone-400 font-semibold">
                          Profile complete
                        </p>

                        <p className="font-serif text-3xl mt-1">
                          {completion}%
                        </p>

                      </div>

                      <Sparkles
                        size={20}
                        className="text-[#b48d49] mb-1"
                      />

                    </div>

                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden">

                      <div
                        className="h-full bg-[#c6a15b] transition-all duration-500"
                        style={{
                          width: `${completion}%`,
                        }}
                      />

                    </div>

                    <p className="text-xs text-stone-400 mt-2">
                      {completion === 100
                        ? "Everything StyleAI needs is ready."
                        : "Complete your profile for better recommendations."}
                    </p>

                  </div>

                </div>

              </div>

            </section>


            {/* ==================================================
                VIEW MODE
            ================================================== */}

            {!editing && profile && (
              <div className="mt-8 space-y-8">


                {/* STYLE IDENTITY */}

                <section className="bg-white border border-stone-200 rounded-[2rem] p-8">

                  <div className="flex items-end justify-between mb-7">

                    <div>

                      <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold">
                        Your foundation
                      </p>

                      <h2 className="font-serif text-3xl mt-1">
                        Style Identity
                      </h2>

                    </div>

                    <Palette
                      size={22}
                      className="text-stone-300"
                    />

                  </div>


                  <div className="grid grid-cols-4 gap-5">

                    <ProfileValue
                      label="Body shape"
                      value={profile.body_shape}
                    />

                    <ProfileValue
                      label="Skin tone"
                      value={profile.skin_tone}
                    />

                    <ProfileValue
                      label="Color season"
                      value={profile.color_season}
                    />

                    <ProfileValue
                      label="Gender"
                      value={profile.gender}
                    />

                  </div>

                </section>


                {/* MEASUREMENTS */}

                <section className="bg-white border border-stone-200 rounded-[2rem] p-8">

                  <div className="mb-7">

                    <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold">
                      Proportion & fit
                    </p>

                    <h2 className="font-serif text-3xl mt-1">
                      Measurements
                    </h2>

                  </div>


                  <div className="grid grid-cols-3 gap-5">

                    <ProfileValue
                      label="Height"
                      value={
                        profile.height
                          ? `${profile.height} cm`
                          : null
                      }
                    />

                    <ProfileValue
                      label="Weight"
                      value={
                        profile.weight
                          ? `${profile.weight} kg`
                          : null
                      }
                    />

                    <ProfileValue
                      label="Age"
                      value={
                        profile.age
                          ? `${profile.age} years`
                          : null
                      }
                    />

                  </div>

                </section>

              </div>
            )}


            {/* ==================================================
                EDIT MODE
            ================================================== */}

            {editing && (
              <section className="mt-8 bg-white border border-stone-200 rounded-[2rem] p-8">


                {/* STYLE IDENTITY */}

                <div>

                  <div className="mb-7">

                    <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold">
                      Personal styling
                    </p>

                    <h2 className="font-serif text-3xl mt-1">
                      Style Identity
                    </h2>

                    <p className="text-sm text-stone-500 mt-2">
                      These details help StyleAI understand your proportions and natural coloring.
                    </p>

                  </div>


                  {/* BODY SHAPE */}

                  <div>

                    <div className="flex items-end justify-between mb-4">

                      <div>

                        <label className="block text-sm font-semibold text-stone-900">
                          Body Shape
                        </label>

                        <p className="text-xs text-stone-400 mt-1">
                          Choose the silhouette that best describes you.
                        </p>

                      </div>

                      {form.body_shape && (
                        <span className="text-xs font-semibold text-[#9b7839] uppercase tracking-wider">
                          Selected
                        </span>
                      )}

                    </div>


                    <div className="grid grid-cols-5 gap-4">

                      {BODY_SHAPES.map((shape) => {

                        const selected =
                          form.body_shape === shape.value;

                        return (
                          <button
                            key={shape.value}
                            type="button"
                            onClick={() =>
                              setForm((previous) => ({
                                ...previous,
                                body_shape: shape.value,
                              }))
                            }
                            className={`relative text-left rounded-2xl border p-5 transition-all duration-200 ${
                              selected
                                ? "border-stone-950 bg-[#f5f1e8] shadow-sm"
                                : "border-stone-200 bg-white hover:border-stone-400 hover:bg-stone-50"
                            }`}
                          >

                            {selected && (
                              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-stone-950 text-white flex items-center justify-center">
                                <Check size={13} />
                              </div>
                            )}

                            <div className="flex justify-center mb-4">
                              <BodyShapeIcon
                                type={shape.value}
                                selected={selected}
                              />
                            </div>

                            <p className="font-semibold text-sm">
                              {shape.label}
                            </p>

                            <p className="text-[11px] leading-4 text-stone-400 mt-1">
                              {shape.description}
                            </p>

                          </button>
                        );
                      })}

                    </div>

                  </div>


                  {/* SKIN TONE */}

                  <div className="mt-10">

                    <div className="mb-4">

                      <label className="block text-sm font-semibold text-stone-900">
                        Skin Tone
                      </label>

                      <p className="text-xs text-stone-400 mt-1">
                        Used to refine your most flattering color combinations.
                      </p>

                    </div>


                    <div className="flex gap-4">

                      {SKIN_TONES.map((tone) => {

                        const selected =
                          form.skin_tone === tone.value;

                        return (
                          <button
                            key={tone.value}
                            type="button"
                            onClick={() =>
                              setForm((previous) => ({
                                ...previous,
                                skin_tone: tone.value,
                              }))
                            }
                            className={`group flex-1 rounded-2xl border p-4 transition-all ${
                              selected
                                ? "border-stone-950 bg-[#f5f1e8]"
                                : "border-stone-200 hover:border-stone-400"
                            }`}
                          >

                            <div className="flex items-center gap-3">

                              <span
                                className={`w-11 h-11 rounded-full shrink-0 ring-2 ring-offset-2 transition ${
                                  selected
                                    ? "ring-stone-950"
                                    : "ring-transparent group-hover:ring-stone-200"
                                }`}
                                style={{
                                  backgroundColor: tone.color,
                                }}
                              />

                              <div className="text-left">

                                <p className="text-sm font-semibold">
                                  {tone.label}
                                </p>

                                {selected && (
                                  <p className="text-[10px] text-stone-400 uppercase tracking-wider mt-0.5">
                                    Selected
                                  </p>
                                )}

                              </div>

                            </div>

                          </button>
                        );
                      })}

                    </div>

                  </div>


                  {/* COLOR SEASON */}

                  <div className="mt-10">

                    <div className="mb-4">

                      <label className="block text-sm font-semibold text-stone-900">
                        Color Season
                      </label>

                      <p className="text-xs text-stone-400 mt-1">
                        Your seasonal palette guides the colors StyleAI recommends.
                      </p>

                    </div>


                    <div className="grid grid-cols-4 gap-4">

                      {COLOR_SEASONS.map((season) => {

                        const selected =
                          form.color_season === season.value;

                        return (
                          <button
                            key={season.value}
                            type="button"
                            onClick={() =>
                              setForm((previous) => ({
                                ...previous,
                                color_season: season.value,
                              }))
                            }
                            className={`relative overflow-hidden text-left rounded-2xl border transition-all duration-200 ${
                              selected
                                ? "border-stone-950 shadow-md"
                                : "border-stone-200 hover:border-stone-400"
                            }`}
                          >

                            {selected && (
                              <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-stone-950 text-white flex items-center justify-center">
                                <Check size={14} />
                              </div>
                            )}

                            <div className="grid grid-cols-4 h-24">

                              {season.colors.map(
                                (color) => (
                                  <div
                                    key={color}
                                    style={{
                                      backgroundColor:
                                        color,
                                    }}
                                  />
                                )
                              )}

                            </div>

                            <div className="p-4 bg-white">

                              <p className="font-serif text-xl">
                                {season.label}
                              </p>

                              <p className="text-[11px] uppercase tracking-wider text-stone-400 mt-1">
                                {season.description}
                              </p>

                            </div>

                          </button>
                        );
                      })}

                    </div>

                  </div>


                  {/* PERSONAL DETAILS */}

                  <div className="mt-10 pt-10 border-t border-stone-100">

                    <div className="mb-6">

                      <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold">
                        Personal details
                      </p>

                      <h2 className="font-serif text-2xl mt-1">
                        About you
                      </h2>

                    </div>


                    <div className="grid grid-cols-2 gap-5">

                      {/* GENDER */}

                      <div>

                        <label className="block text-sm font-semibold mb-2">
                          Gender
                        </label>

                        <select
                          name="gender"
                          value={form.gender}
                          onChange={handleChange}
                          className="w-full h-14 px-4 rounded-xl border border-stone-200 bg-white outline-none focus:ring-2 focus:ring-[#c6a15b] focus:border-transparent transition"
                        >

                          <option value="">
                            Select gender
                          </option>

                          {GENDERS.map(
                            (gender) => (
                              <option
                                key={gender.value}
                                value={gender.value}
                              >
                                {gender.label}
                              </option>
                            )
                          )}

                        </select>

                      </div>


                      {/* AGE */}

                      <div>

                        <label className="block text-sm font-semibold mb-2">
                          Age
                        </label>

                        <div className="relative">

                          <Calendar
                            size={18}
                            className="absolute left-4 top-4 text-stone-400"
                          />

                          <input
                            type="number"
                            name="age"
                            value={form.age}
                            onChange={handleChange}
                            placeholder="e.g. 21"
                            className="w-full h-14 pl-11 pr-4 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-[#c6a15b] focus:border-transparent transition"
                          />

                        </div>

                      </div>

                    </div>

                  </div>


                  {/* MEASUREMENTS */}

                  <div className="mt-10 pt-10 border-t border-stone-100">

                    <div className="mb-6">

                      <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold">
                        Proportion & fit
                      </p>

                      <h2 className="font-serif text-2xl mt-1">
                        Measurements
                      </h2>

                    </div>


                    <div className="grid grid-cols-2 gap-5">

                      {/* HEIGHT */}

                      <div>

                        <label className="block text-sm font-semibold mb-2">
                          Height
                        </label>

                        <div className="relative">

                          <Ruler
                            size={18}
                            className="absolute left-4 top-4 text-stone-400"
                          />

                          <input
                            type="number"
                            name="height"
                            value={form.height}
                            onChange={handleChange}
                            placeholder="e.g. 175"
                            className="w-full h-14 pl-11 pr-16 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-[#c6a15b] focus:border-transparent transition"
                          />

                          <span className="absolute right-4 top-4 text-sm text-stone-400">
                            cm
                          </span>

                        </div>

                      </div>


                      {/* WEIGHT */}

                      <div>

                        <label className="block text-sm font-semibold mb-2">
                          Weight
                        </label>

                        <div className="relative">

                          <Weight
                            size={18}
                            className="absolute left-4 top-4 text-stone-400"
                          />

                          <input
                            type="number"
                            name="weight"
                            value={form.weight}
                            onChange={handleChange}
                            placeholder="e.g. 70"
                            className="w-full h-14 pl-11 pr-16 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-[#c6a15b] focus:border-transparent transition"
                          />

                          <span className="absolute right-4 top-4 text-sm text-stone-400">
                            kg
                          </span>

                        </div>

                      </div>

                    </div>

                  </div>


                  {/* ACTIONS */}

                  <div className="flex justify-end gap-3 mt-10 pt-8 border-t border-stone-100">

                    {profile && (
                      <button
                        onClick={handleCancel}
                        className="px-6 py-3 rounded-xl border border-stone-200 text-stone-600 font-semibold hover:bg-stone-50 transition"
                      >
                        Cancel
                      </button>
                    )}

                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="flex items-center gap-2 bg-stone-950 text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#c6a15b] hover:text-stone-950 transition disabled:opacity-50"
                    >

                      <Save size={17} />

                      {saving
                        ? "Saving..."
                        : profile
                          ? "Save Changes"
                          : "Create Profile"}

                    </button>

                  </div>

                </div>

              </section>
            )}


            {/* ==================================================
                AI EXPLANATION
            ================================================== */}

            <section className="mt-8 rounded-[2rem] overflow-hidden border border-[#dfcfaa] bg-[#f4eddd]">

              <div className="p-8">

                <div className="flex items-start gap-5">

                  <div className="w-12 h-12 rounded-2xl bg-[#dfc88f] flex items-center justify-center shrink-0">

                    <Sparkles
                      size={22}
                      className="text-stone-900"
                    />

                  </div>


                  <div className="flex-1">

                    <p className="text-xs uppercase tracking-[0.2em] text-[#8e713c] font-semibold">
                      The StyleAI advantage
                    </p>

                    <h2 className="font-serif text-3xl mt-1">
                      Your profile powers better recommendations.
                    </h2>

                    <p className="text-stone-600 mt-3 leading-7 max-w-3xl">
                      StyleAI combines your body shape, natural coloring,
                      seasonal palette and proportions to make outfit
                      recommendations feel intentional rather than random.
                    </p>


                    <div className="grid grid-cols-3 gap-4 mt-7">

                      <div className="bg-white/70 border border-[#dfcfaa] rounded-2xl p-5">

                        <p className="text-sm font-semibold">
                          Body shape
                        </p>

                        <p className="text-xs text-stone-500 mt-2 leading-5">
                          Helps guide silhouettes, proportions and layering.
                        </p>

                      </div>


                      <div className="bg-white/70 border border-[#dfcfaa] rounded-2xl p-5">

                        <p className="text-sm font-semibold">
                          Color season
                        </p>

                        <p className="text-xs text-stone-500 mt-2 leading-5">
                          Helps select colors that work naturally together.
                        </p>

                      </div>


                      <div className="bg-white/70 border border-[#dfcfaa] rounded-2xl p-5">

                        <p className="text-sm font-semibold">
                          Measurements
                        </p>

                        <p className="text-xs text-stone-500 mt-2 leading-5">
                          Helps refine proportion and fit recommendations.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </section>


          </div>

        </main>

      </div>

    </div>
  );
}