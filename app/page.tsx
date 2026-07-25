import { SafeArea } from "@/components/layout/SafeArea";
import { Hero } from "@/components/home/Hero";
import { QuickActions } from "@/components/home/QuickActions";
import { NearbyCatsPreview } from "@/components/home/NearbyCatsPreview";
import { MapPreview } from "@/components/home/MapPreview";
import { BottomNavigation } from "@/components/navigation/BottomNavigation";

export default function Home() {
  return (
    // Bottom edge is handled by pb-20 (clears the ~65px fixed BottomNavigation)
    // instead of SafeArea's own safe-area-inset padding: cn() doesn't merge
    // conflicting utilities, so only one padding-bottom source should apply here.
    <SafeArea edges={["top", "left", "right"]} className="pb-20">
      <Hero />
      <QuickActions />
      <NearbyCatsPreview />
      <MapPreview />
      <BottomNavigation />
    </SafeArea>
  );
}
