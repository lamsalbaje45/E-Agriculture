import { useEffect, useMemo, useRef, useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { resolveMediaUrl } from "../utils/media";
import ProfileLocationPickerMap from "../components/ProfileLocationPickerMap";

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const addressRef = useRef(null);
  const [form, setForm] = useState({
    fullName: user?.full_name || "",
    phone: user?.phone || "",
    region: user?.region || "",
    address: user?.address || "",
    latitude: user?.latitude ?? "",
    longitude: user?.longitude ?? "",
  });
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [removePhoto, setRemovePhoto] = useState(false);
  const [message, setMessage] = useState("");
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const previewUrl = useMemo(() => {
    if (selectedPhoto) {
      return URL.createObjectURL(selectedPhoto);
    }

    if (!removePhoto && user?.photo_url) {
      return resolveMediaUrl(user.photo_url);
    }

    return "";
  }, [selectedPhoto, removePhoto, user?.photo_url]);

  useEffect(() => {
    return () => {
      if (selectedPhoto) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [selectedPhoto, previewUrl]);

  useEffect(() => {
    if (!addressRef.current) {
      return;
    }

    addressRef.current.style.height = "0px";
    addressRef.current.style.height = `${addressRef.current.scrollHeight}px`;
  }, [form.address]);

  const saveProfile = async (event) => {
    event.preventDefault();
    const payload = new FormData();
    payload.append("fullName", form.fullName);
    payload.append("phone", form.phone);
    payload.append("region", form.region);
    payload.append("address", form.address);
    payload.append("latitude", form.latitude);
    payload.append("longitude", form.longitude);
    payload.append("removePhoto", String(removePhoto));

    if (selectedPhoto) {
      payload.append("photo", selectedPhoto);
    }

    await api.put("/users/profile", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    await refreshUser();
    setSelectedPhoto(null);
    setRemovePhoto(false);
    setMessage("Profile updated successfully.");
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setMessage("Geolocation is not supported by your browser.");
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude.toFixed(7);
        const longitude = position.coords.longitude.toFixed(7);

        setForm((current) => ({
          ...current,
          latitude,
          longitude,
        }));
        setMessage("Current location detected and coordinates were filled.");
        setIsDetectingLocation(false);
      },
      () => {
        setMessage("Unable to access your location. Please allow location permission and try again.");
        setIsDetectingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  return (
    <form className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[320px,1fr]" onSubmit={saveProfile}>
      <section className="glass rounded-[2rem] p-6 shadow-panel sm:p-8">
        <h1 className="font-display text-3xl text-bark sm:text-4xl">Profile photo</h1>
        <p className="mt-3 text-bark/72">
          Add a clear personal photo so buyers and farmers can recognize who they are dealing with.
        </p>

        <div className="mt-8 flex justify-center">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt={form.fullName || "Profile"}
              className="h-40 w-40 rounded-full border-4 border-white object-cover shadow-panel"
            />
          ) : (
            <div className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-white bg-leaf/20 text-5xl font-bold text-bark shadow-panel">
              {(form.fullName || user?.full_name || "U").charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <label className="mt-8 block rounded-2xl border border-dashed border-bark/20 bg-white px-4 py-4 text-center font-semibold text-bark cursor-pointer">
          Choose photo from device
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setSelectedPhoto(file);
              if (file) {
                setRemovePhoto(false);
              }
            }}
          />
        </label>

        {(user?.photo_url || selectedPhoto) && (
          <button
            type="button"
            className="mt-4 w-full rounded-2xl bg-white px-4 py-3 font-semibold text-bark"
            onClick={() => {
              setSelectedPhoto(null);
              setRemovePhoto(true);
            }}
          >
            Remove photo
          </button>
        )}
        <p className="mt-3 text-sm text-bark/65">Supported images up to 5 MB.</p>
      </section>

      <section className="glass space-y-4 rounded-[2rem] p-6 shadow-panel sm:p-8">
        <h2 className="font-display text-3xl text-bark sm:text-4xl">Your details</h2>
        <div className="space-y-2">
          <label className="block text-sm font-semibold uppercase tracking-[0.18em] text-bark/65">Full Name</label>
          <input
            className="w-full rounded-2xl border border-bark/10 bg-white px-4 py-3"
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold uppercase tracking-[0.18em] text-bark/65">Phone Number</label>
          <input
            className="w-full rounded-2xl border border-bark/10 bg-white px-4 py-3"
            placeholder="Enter your phone number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold uppercase tracking-[0.18em] text-bark/65">Region</label>
          <input
            className="w-full rounded-2xl border border-bark/10 bg-white px-4 py-3"
            placeholder="Enter your region"
            value={form.region}
            onChange={(e) => setForm({ ...form, region: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold uppercase tracking-[0.18em] text-bark/65">Address</label>
          <textarea
            ref={addressRef}
            className="w-full resize-none overflow-hidden rounded-2xl border border-bark/10 bg-white px-4 py-3 leading-6"
            rows="1"
            placeholder="Enter your address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>
        {user?.role === "farmer" && (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-semibold uppercase tracking-[0.18em] text-bark/65">
                Farm Latitude
              </label>
              <input
                className="w-full rounded-2xl border border-bark/10 bg-white px-4 py-3"
                placeholder="Example: 27.7172"
                value={form.latitude}
                onChange={(e) => setForm({ ...form, latitude: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold uppercase tracking-[0.18em] text-bark/65">
                Farm Longitude
              </label>
              <input
                className="w-full rounded-2xl border border-bark/10 bg-white px-4 py-3"
                placeholder="Example: 85.3240"
                value={form.longitude}
                onChange={(e) => setForm({ ...form, longitude: e.target.value })}
              />
            </div>
            <button
              type="button"
              className="w-full rounded-2xl bg-leaf/25 px-4 py-3 text-sm font-semibold text-bark sm:w-auto"
              onClick={useCurrentLocation}
              disabled={isDetectingLocation}
            >
              {isDetectingLocation ? "Detecting location..." : "Use my current location"}
            </button>
            <button
              type="button"
              className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-bark sm:w-auto"
              onClick={() => setShowMapPicker((current) => !current)}
            >
              {showMapPicker ? "Hide map picker" : "Pick location from map"}
            </button>
            {showMapPicker && (
              <div className="space-y-2">
                <ProfileLocationPickerMap
                  latitude={form.latitude}
                  longitude={form.longitude}
                  onPick={(lat, lng) => {
                    setForm((current) => ({
                      ...current,
                      latitude: lat.toFixed(7),
                      longitude: lng.toFixed(7),
                    }));
                  }}
                />
                <p className="text-sm text-bark/65">Click on the map to set your exact farm location.</p>
              </div>
            )}
            <p className="text-sm text-bark/65">
              Tip: You can copy these from Google Maps by right-clicking your farm location and using the coordinates.
            </p>
          </>
        )}
        {message && <p className="text-sm text-moss">{message}</p>}
        <button className="w-full rounded-2xl bg-bark px-5 py-3 font-semibold text-sand sm:w-auto">Save changes</button>
      </section>
    </form>
  );
}
