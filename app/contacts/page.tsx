import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact | Young Ventures — Get in Touch",
  description:
    "Reach the Young Ventures team for media enquiries, partnerships or founder introductions. Offices in Milan and San Francisco, network across nine countries.",
};

export default function Page() {
  return <ContactPage />;
}
