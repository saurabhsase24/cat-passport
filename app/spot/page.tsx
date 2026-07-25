import { SafeArea } from "@/components/layout/SafeArea";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { BottomNavigation } from "@/components/navigation/BottomNavigation";

export default function SpotPage() {
  return (
    <SafeArea
      edges={["top", "left", "right"]}
      className="pb-[calc(5rem+env(safe-area-inset-bottom))]"
    >
      <Section spacing="lg">
        <Container size="md">
          <PageHeader
            title="Spot a Cat"
            description="Log a sighting once you meet a neighborhood cat."
          />
        </Container>
      </Section>

      <BottomNavigation />
    </SafeArea>
  );
}
