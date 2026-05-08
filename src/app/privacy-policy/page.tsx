/** @format */
import React from "react";

export const metadata = {
  title: "Terms and Conditions | exSTAD",
  description:
    "Read the exSTAD Terms and Conditions, including rules for accessing the site, course registration, payments, intellectual property, and responsible website usage for Cambodian students exploring ISTAD programs.",
  keywords: [
    "exSTAD terms",
    "ISTAD courses",
    "Cambodian students",
    "course registration rules",
    "payment policies",
    "intellectual property",
    "website usage guidelines",
  ],
  alternates: {
    canonical: "/terms-and-conditions",
  },
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold tracking-[0.2rem] mb-4">{title}</h2>
      <div className="text-color leading-relaxed">{children}</div>
    </section>
  );
}

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-background flex justify-center p-6">
      <div className="bg-card shadow-lg rounded-2xl max-w-6xl w-full p-8">
        <h1 className="text-xl font-semibold tracking-[0.2rem] mb-6">
          TERM AND CONDITION
        </h1>

        <Section title="Introduction">
          <p>
            This webpage (together with the webpages and documents referred to
            in it) sets out the terms and conditions (the Terms) on which you
            may use our websites whether as a guest or a registered user. Please
            read these Terms carefully before you start to use our sites. By
            using our sites, you accept these Terms and agree to abide by them.
            If you do not agree to, or breach these Terms, please refrain from
            using our sites.
          </p>
        </Section>

        <Section title="ACCESSING TO OUR SITE">
          <p>
            You should not use this site in an unlawful manner; you must respect
            website terms and conditions and follow the privacy policy.
          </p>
          <p>
            Access to our sites is permitted on a temporary basis, and we
            reserve the right to withdraw or amend the service or content we
            provide on our sites without notice. We shall not be liable if for
            any reason our sites are unavailable at any time or for any period.
          </p>
          <p>
            If you choose, or you are provided with, a username or user
            identification code, password or any other information as part of
            our security procedures, you must treat that information as
            confidential, and you must not disclose it to any third party. We
            have the right to disable any username or user identification code
            or password, whether chosen by you or allocated by us, at any time,
            if in our opinion you have failed to comply with any of these Terms
            or the terms of any of our programmers.
          </p>
        </Section>

        <Section title="WEBSITE USAGE GUIDELINES">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Do not insult, abuse, harass, stalk, threaten or otherwise
              infringe the rights of others.
            </li>
            <li>
              Do not publish, post, distribute or disseminate any defamatory,
              infringing, indecent, offensive or unlawful material or
              information.
            </li>
            <li>
              Do not upload, install, transfer files which are protected by
              Intellectual Property laws or software which affect other
              computers.
            </li>
            <li>
              It’s prohibited to edit HTML source code, reverse engineer or
              attempt to hack.
            </li>
            <li>
              Do not run spam services/scripts or anything which could affect
              infrastructure, and in turn, users.
            </li>
            <li>
              Do not communicate spam, advertise or sell services such as
              digital downloads, eBooks or phishing links.
            </li>
            <li>
              You may not copy, distribute and indulge in plagiarism with
              website content or user submitted content.
            </li>
          </ul>
        </Section>

        <Section title="HYPERLINKS TERM">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              You may not mirror or frame the home page or any other pages of
              this Site on any other web site or web page.
            </li>
            <li>
              Do not link to ISTAD pages and subpages with spam links/anchor
              text which could provide false impression. This may create
              misunderstanding for the users.
            </li>
            <li>
              Do not use or include copyrighted or registered trademarks, or
              Intellectual property images, design or content as a link to ISTAD
              website.
            </li>
            <li>Do not link to pages which support racism, terrorism.</li>
            <li>
              Do not link to pages which provide pornographic content and
              violate human rights.
            </li>
            <li>
              Do not communicate spam, advertise or sell services such as
              digital downloads, eBooks or phishing links.
            </li>
            <li>
              You may not copy, distribute and indulge in plagiarism with
              website content or user submitted content.
            </li>
          </ul>
        </Section>

        <Section title="COURSE SCHEDULE AND REGISTRATION">
          <p>
            Registration: we open for online registration. The registration will
            be closed one week before the course starts. The registration of
            specific courses can be closed earlier due to the number of students
            registered.
          </p>
          <p>
            Once the registration is closed, we do not accept new students
            except in some cases approved by mutual discussion.
          </p>
        </Section>

        <Section title="PAYMENT METHOD">
          <p>
            The course fee must be paid at least one week before the course
            starts. Once payment is made, it cannot be refunded.
          </p>
          <p>
            Payment can be done by coming to the front desk or making ABA bank
            transactions.
          </p>
          <p>
            After completing the payment, the school will send the receipt for
            students to study the course.
          </p>
        </Section>

        <Section title="COURSE COMPLETION">
          <p>
            Certificate: The certificate will be issued for students who
            successfully complete all assessments of each course including
            Homework, attendance, mini project and final project.
          </p>
          <p>
            Students can be dismissed from the course without any compensation
            if he/she fails to follow the assessment of the course.
          </p>
        </Section>

        <Section title="OUR INTELLECTUAL PROPERTY RIGHT">
          <p>
            We are the owner or the licensee of all existing and future
            intellectual property rights (including trademarks, copyright,
            database rights, design rights, course curriculum, confidentiality
            rights and all other rights having equivalent or similar effect) in
            our sites (including the material published on it). All such rights
            are reserved. Please contact us if you would like to refer to our
            sites or any material on them. Our status as the authors of material
            on our sites must always be acknowledged.
          </p>
        </Section>
      </div>
    </div>
  );
}
