import { SafeArea } from "@/components/layout/SafeArea";
import { Hero } from "@/components/home/Hero";
import { QuickActions } from "@/components/home/QuickActions";
import { NearbyCatsPreview } from "@/components/home/NearbyCatsPreview";
import { MapPreview } from "@/components/home/MapPreview";
import { BottomNavigation } from "@/components/navigation/BottomNavigation";

export default function Home() {
  return (
    // Bottom edge is handled here instead of SafeArea's own safe-area-inset
    // padding: cn() doesn't merge conflicting utilities, so only one
    // padding-bottom source should apply. 5rem clears BottomNavigation's own
    // ~65px content height; env(safe-area-inset-bottom) matches the matching
    // inset BottomNavigation adds to itself on notched devices.
    <SafeArea edges={["top", "left", "right"]} className="pb-[calc(5rem+env(safe-area-inset-bottom))]">
      <Hero />
      <QuickActions />
      <NearbyCatsPreview />
      <MapPreview />
      <BottomNavigation />
    </SafeArea>
  );
}
