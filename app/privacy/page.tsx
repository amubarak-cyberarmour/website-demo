import { SimplePage } from "@/components/Site";

export default function PrivacyPage() {
  return (
    <SimplePage eyebrow="Privacy" title="Privacy Policy">
      <p>
        We collect only the information needed to respond to enquiries, scope automation work, and deliver services.
        Project data is handled with limited access, documented retention expectations, and confidentiality controls.
      </p>
      <p className="mt-5">
        We do not sell customer data. When AI systems are deployed, data flows, storage locations, and integration
        permissions are reviewed with each client before launch.
      </p>
    </SimplePage>
  );
}
