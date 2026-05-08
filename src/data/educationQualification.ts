export type EducationQualification = {
  uuid: string;
  englishName: string;
  khmerName: string;
};

export const educationQualificationData: EducationQualification[] = [
  { uuid: "1", englishName: "High School Diploma", khmerName: "វិទ្យាល័យ" },
  { uuid: "2", englishName: "Associate Degree", khmerName: "បរិញ្ញាប័ត្ររង" },
  { uuid: "3", englishName: "Bachelor’s Degree", khmerName: "បរិញ្ញាប័ត្រ" },
  {
    uuid: "4",
    englishName: "Master’s Degree",
    khmerName: "បរិញ្ញាប័ត្រេជាន់ខ្ពស់",
  },
  { uuid: "5", englishName: "Doctorate (Ph.D.)", khmerName: "បណ្ឌិត" },
];
