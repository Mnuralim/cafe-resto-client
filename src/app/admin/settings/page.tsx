import { findCurrentAdmin, getLocationSettings } from "@/lib/api";
import { Setting } from "./_components/setting";
import { cookies } from "next/headers";

export default async function SettingsPage() {
  const cookie = (await cookies()).get("token")?.value;
  const [locationSettings, admin] = await Promise.all([
    getLocationSettings(cookie!),
    findCurrentAdmin(cookie!),
  ]);
  return (
    <div>
      <Setting
        initialLocationSettings={locationSettings}
        token={cookie!}
        admin={admin}
      />
    </div>
  );
}
