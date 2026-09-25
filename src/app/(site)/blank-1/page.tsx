import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { title: "Privacy Policy" };

const Email = () => (
  <a href="mailto:info@myrobot.ie" className="underline">
    info@myrobot.ie
  </a>
);

const Site = () => (
  <a href="http://www.myrobot.ie/" className="underline">
    www.myrobot.ie
  </a>
);

type Block =
  | { p: ReactNode }
  | { list: ReactNode[] }
  | { table: string[][] };

type Section = { heading?: string; blocks: Block[] };

const SECTIONS: Section[] = [
  {
    blocks: [{ p: "Privacy Policy" }, { p: "NOLAR Tech Limited" }, { p: "Last Updated: May 2025" }],
  },
  {
    heading: "1. Who We Are",
    blocks: [
      { p: 'NOLAR Tech Limited ("NOLAR", "we", "us", "our") is a company registered in Ireland.' },
      {
        p: "Registered Address: Unit 5, Kilmallock Business Park, Kilmallock, Co. Limerick, V35 CY89, Ireland",
      },
      {
        p: (
          <>
            Contact: Email: <Email /> Phone: +353 (85) 194 2831 Website: <Site />
          </>
        ),
      },
      {
        p: "NOLAR Tech Limited is the data controller responsible for your personal data collected through this website.",
      },
    ],
  },
  {
    heading: "2. What This Policy Covers",
    blocks: [
      {
        p: "This Privacy Policy explains how we collect, use, store and protect your personal data when you:",
      },
      {
        list: [
          <>
            Visit our website at <Site />
          </>,
          "Submit an enquiry or contact form",
          "Book a demo or site assessment",
          "Communicate with us by email or phone",
          "Use our Client Portal",
        ],
      },
      {
        p: "This policy is prepared in accordance with the General Data Protection Regulation (GDPR) (EU) 2016/679 and the Data Protection Acts 1988–2018 (Ireland).",
      },
    ],
  },
  {
    heading: "3. What Personal Data We Collect",
    blocks: [
      { p: "We may collect the following categories of personal data:" },
      { p: "Contact Information:" },
      {
        list: [
          "Full name",
          "Business email address",
          "Phone number",
          "Company name and address",
          "Job title or role",
        ],
      },
      { p: "Enquiry Information:" },
      {
        list: [
          "Details of your cleaning requirements",
          "Facility type and size",
          "Messages submitted through our contact forms",
        ],
      },
      { p: "Technical Data:" },
      {
        list: [
          "IP address",
          "Browser type and version",
          "Pages visited and time spent on our website",
          "Referring website",
          "Cookie data (see Section 9)",
        ],
      },
      { p: "Communication Data:" },
      { list: ["Records of correspondence between you and NOLAR"] },
    ],
  },
  {
    heading: "4. How We Collect Your Data",
    blocks: [
      { p: "We collect personal data in the following ways:" },
      {
        list: [
          "Directly from you — when you fill in a contact form, book a demo, call us or email us",
          "Automatically — through cookies and analytics tools when you visit our website",
          "From third parties — such as business referrals or publicly available information",
        ],
      },
    ],
  },
  {
    heading: "5. Why We Process Your Data (Legal Basis)",
    blocks: [
      {
        p: "Under GDPR we must have a lawful basis for processing your personal data. We rely on the following:",
      },
      { p: "Legitimate Interests (Article 6(1)(f)):" },
      {
        list: [
          "To respond to your enquiries and provide information about our products and services",
          "To send follow-up communications after a demo or assessment",
          "To improve our website and services",
        ],
      },
      { p: "Contractual Necessity (Article 6(1)(b)):" },
      {
        list: [
          "To fulfil any contract or service agreement between you and NOLAR Tech Limited",
          "To manage the deployment and support of robots at your facility",
        ],
      },
      { p: "Legal Obligation (Article 6(1)(c)):" },
      {
        list: [
          "To comply with Irish and EU legal requirements including tax, accounting and regulatory obligations",
        ],
      },
      { p: "Consent (Article 6(1)(a)):" },
      {
        list: [
          "To send you marketing communications where you have opted in",
          "To place non-essential cookies on your device",
        ],
      },
      {
        p: (
          <>
            You may withdraw consent at any time by contacting us at <Email />
          </>
        ),
      },
    ],
  },
  {
    heading: "6. How We Use Your Data",
    blocks: [
      { p: "We use your personal data for the following purposes:" },
      {
        list: [
          "To respond to your enquiries and contact form submissions",
          "To arrange and conduct site assessments and robot demonstrations",
          "To provide deployment, training and ongoing support services",
          "To send you relevant information about our products and services",
          "To process and manage your Client Portal access",
          "To improve our website, products and services",
          "To comply with legal and regulatory obligations",
          "To prevent fraud and ensure website security",
        ],
      },
    ],
  },
  {
    heading: "7. Who We Share Your Data With",
    blocks: [
      { p: "We do not sell your personal data to third parties." },
      { p: "We may share your data with the following categories of third parties where necessary:" },
      { p: "Service Providers:" },
      {
        list: [
          "Wix.com — our website platform and hosting provider",
          "Email service providers — for sending communications",
          "Google — for analytics and mapping services",
        ],
      },
      { p: "Business Partners:" },
      {
        list: ["Gausium — our technology partner, where necessary for product support and deployment"],
      },
      { p: "Legal and Regulatory Authorities:" },
      {
        list: [
          "Revenue Commissioners Ireland",
          "Data Protection Commission Ireland",
          "Any other authority where we are legally required to disclose information",
        ],
      },
      {
        p: "All third parties are required to handle your data securely and in accordance with GDPR. We only share the minimum data necessary.",
      },
    ],
  },
  {
    heading: "8. International Data Transfers",
    blocks: [
      {
        p: "Some of our service providers may process your data outside of the European Economic Area (EEA). Where this occurs we ensure appropriate safeguards are in place, such as:",
      },
      {
        list: [
          "Standard Contractual Clauses approved by the European Commission",
          "Adequacy decisions made by the European Commission",
        ],
      },
      {
        p: (
          <>
            For more information about the safeguards in place contact us at <Email />
          </>
        ),
      },
    ],
  },
  {
    heading: "9. Cookies",
    blocks: [
      {
        p: "Our website uses cookies to improve your browsing experience and to help us understand how visitors use our site.",
      },
      {
        p: "What are cookies? Cookies are small text files placed on your device when you visit a website.",
      },
      { p: "Types of cookies we use:" },
      {
        table: [
          ["Cookie Type", "Purpose", "Duration"],
          ["Essential", "Required for the website to function", "Session"],
          ["Analytics", "Help us understand website usage (Google Analytics)", "Up to 2 years"],
          ["Functional", "Remember your preferences", "Up to 1 year"],
          ["Marketing", "Track visits for advertising purposes", "Up to 2 years"],
        ],
      },
      {
        p: "Your cookie choices: When you first visit our website you will be asked to accept or decline non-essential cookies. You can change your preferences at any time by clicking the cookie settings link in the footer of our website.",
      },
      {
        p: "You can also control cookies through your browser settings. Note that disabling certain cookies may affect the functionality of our website.",
      },
    ],
  },
  {
    heading: "10. How Long We Keep Your Data",
    blocks: [
      {
        p: "We retain your personal data only for as long as necessary for the purposes for which it was collected:",
      },
      {
        table: [
          ["Data Type", "Retention Period"],
          ["Enquiry and contact form data", "2 years from last contact"],
          ["Client and contract data", "7 years (legal requirement)"],
          ["Website analytics data", "26 months"],
          ["Marketing data", "Until you unsubscribe or withdraw consent"],
          ["Job application data", "12 months"],
        ],
      },
      { p: "After the retention period your data will be securely deleted or anonymised." },
    ],
  },
  {
    heading: "11. Your Rights Under GDPR",
    blocks: [
      { p: "As a data subject under GDPR you have the following rights:" },
      {
        p: "Right of Access (Article 15) You have the right to request a copy of the personal data we hold about you.",
      },
      {
        p: "Right to Rectification (Article 16) You have the right to request correction of any inaccurate or incomplete personal data.",
      },
      {
        p: "Right to Erasure (Article 17) You have the right to request deletion of your personal data in certain circumstances, also known as the right to be forgotten.",
      },
      {
        p: "Right to Restriction of Processing (Article 18) You have the right to request that we restrict the processing of your personal data in certain circumstances.",
      },
      {
        p: "Right to Data Portability (Article 20) You have the right to receive your personal data in a structured, commonly used and machine-readable format.",
      },
      {
        p: "Right to Object (Article 21) You have the right to object to the processing of your personal data where we rely on legitimate interests as our legal basis.",
      },
      {
        p: "Right to Withdraw Consent Where we process your data based on consent you have the right to withdraw that consent at any time.",
      },
      {
        p: "Right to Lodge a Complaint You have the right to lodge a complaint with the Data Protection Commission Ireland if you believe we have not handled your data correctly.",
      },
      {
        p: (
          <>
            Data Protection Commission Ireland Website:{" "}
            <a href="http://www.dataprotection.ie/" className="underline">
              www.dataprotection.ie
            </a>{" "}
            Phone: +353 (0)761 104 800 Email:{" "}
            <a href="mailto:info@dataprotection.ie" className="underline">
              info@dataprotection.ie
            </a>{" "}
            Address: 21 Fitzwilliam Square South, Dublin 2, D02 RD28
          </>
        ),
      },
      {
        p: (
          <>
            To exercise any of your rights please contact us at: Email: <Email /> Phone: +353 (85) 194 2831
          </>
        ),
      },
      { p: "We will respond to all requests within 30 days." },
    ],
  },
  {
    heading: "12. Data Security",
    blocks: [
      {
        p: "We take the security of your personal data seriously and implement appropriate technical and organisational measures to protect it against unauthorised access, loss, destruction or alteration. These measures include:",
      },
      {
        list: [
          "Secure HTTPS encryption on our website",
          "Access controls limiting who can access personal data",
          "Regular security reviews",
          "Secure data storage through our website platform provider Wix",
        ],
      },
      {
        p: "However please note that no method of transmission over the internet is 100% secure. We cannot guarantee the absolute security of data transmitted to our website.",
      },
    ],
  },
  {
    heading: "13. Children's Privacy",
    blocks: [
      {
        p: (
          <>
            Our website and services are directed at business professionals and are not intended for children
            under the age of 16. We do not knowingly collect personal data from children. If you believe we
            have inadvertently collected data from a child please contact us immediately at <Email />
          </>
        ),
      },
    ],
  },
  {
    heading: "14. Links to Other Websites",
    blocks: [
      {
        p: (
          <>
            Our website may contain links to third party websites including Gausium&apos;s website at{" "}
            <a href="http://www.gausium.com/" className="underline">
              www.gausium.com
            </a>
            . We are not responsible for the privacy practices of those websites and encourage you to review
            their privacy policies.
          </>
        ),
      },
    ],
  },
  {
    heading: "15. Changes to This Privacy Policy",
    blocks: [
      {
        p: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the updated policy on our website with a new effective date. We encourage you to review this policy periodically.",
      },
    ],
  },
  {
    heading: "16. Contact Us",
    blocks: [
      {
        p: "If you have any questions, concerns or requests regarding this Privacy Policy or how we handle your personal data please contact us:",
      },
      {
        p: "NOLAR Tech Limited Unit 5, Kilmallock Business Park, Kilmallock, Co. Limerick, V35 CY89, Ireland",
      },
      {
        p: (
          <>
            Email: <Email /> Phone: +353 (85) 194 2831 Website: <Site />
          </>
        ),
      },
    ],
  },
  {
    blocks: [
      {
        p: "This Privacy Policy was prepared in accordance with GDPR (EU) 2016/679 and the Data Protection Acts 1988–2018 (Ireland).",
      },
    ],
  },
  {
    blocks: [
      {
        p: "NOLAR Tech Limited recommends seeking independent legal advice to ensure full compliance with applicable data protection legislation.",
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-navy px-24 pb-80 pt-40 lg:px-44 lg:pb-160 lg:pt-57">
      <div className="text-[1.125rem] leading-[1.2] text-ink lg:text-[1.5rem]">
        {SECTIONS.map((section, i) => (
          <div key={i} className="mb-[1.2em]">
            {section.heading && <h2 className="font-normal">{section.heading}</h2>}
            {section.blocks.map((block, j) => {
              if ("list" in block) {
                return (
                  <ul key={j} className="list-disc pl-43">
                    {block.list.map((item, k) => (
                      <li key={k}>{item}</li>
                    ))}
                  </ul>
                );
              }
              if ("table" in block) {
                return (
                  <div key={j} className="overflow-x-auto">
                    <table className="border-collapse text-left">
                      <tbody>
                        {block.table.map((row, k) => (
                          <tr key={k}>
                            {row.map((cell, l) => (
                              <td key={l} className="pr-40 align-top font-normal">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
              return i === 0 && j === 0 ? <h1 key={j}>{block.p}</h1> : <p key={j}>{block.p}</p>;
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
